import { defineConfig, type PluginOption } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(async ({ command }) => {
  const plugins: PluginOption[] = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
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
    plugins.push(
      nitro({
        defaultPreset: "cloudflare-module",
        hooks: {
          async compiled(nitro) {
            const publicDir = nitro.options.output.publicDir;
            const rootDir = nitro.options.rootDir;
            const ssrPath = path.resolve(
              rootDir,
              "node_modules/.nitro/vite/services/ssr/index.js",
            );

            console.log("[frezso-prerender] Prerendering static pages for GitHub Pages...");

            if (fs.existsSync(ssrPath)) {
              const ssrUrl = pathToFileURL(ssrPath).href;
              const { default: ssrHandler } = await import(ssrUrl);
              const response = await ssrHandler.fetch(
                new Request("https://www.oyefoods.in/"),
              );
              const html = await response.text();

              if (html && !html.includes("This page didn't load")) {
                await fs.promises.mkdir(publicDir, { recursive: true });
                await fs.promises.writeFile(
                  path.join(publicDir, "index.html"),
                  html,
                  "utf-8",
                );
                await fs.promises.writeFile(
                  path.join(publicDir, "404.html"),
                  html,
                  "utf-8",
                );
                console.log("[frezso-prerender] Successfully generated index.html and 404.html");
              } else {
                console.error("[frezso-prerender] SSR render produced an error page!");
              }
            } else {
              console.error("[frezso-prerender] SSR entry not found at:", ssrPath);
            }

            // Ensure CNAME and .nojekyll exist for GitHub Pages
            await fs.promises.writeFile(
              path.join(publicDir, "CNAME"),
              "www.oyefoods.in\n",
              "utf-8",
            );
            await fs.promises.writeFile(
              path.join(publicDir, ".nojekyll"),
              "\n",
              "utf-8",
            );
            console.log("[frezso-prerender] CNAME and .nojekyll written to output directory.");
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
