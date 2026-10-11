import { defineConfig, type PluginOption } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(async ({ command }) => {
  const plugins: PluginOption[] = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      pages: [
        {
          path: "/",
          prerender: {
            enabled: true,
          },
        },
      ],
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
  ];

  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    const fs = await import("node:fs");
    plugins.push(
      nitro({
        preset: "github-pages",
        prerender: {
          routes: ["/"],
          crawlLinks: true,
          failOnError: false,
        },
        hooks: {
          async compiled(nitro) {
            const publicDir = nitro.options.output.publicDir;
            const indexPath = path.join(publicDir, "index.html");
            const notFoundPath = path.join(publicDir, "404.html");
            if (fs.existsSync(indexPath) && !fs.existsSync(notFoundPath)) {
              await fs.promises.copyFile(indexPath, notFoundPath);
            }
          },
        },
      }),
    );
  }

  plugins.push(viteReact());

  return {
    server: {
      host: "::",
      port: 8080,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
    plugins,
  };
});
