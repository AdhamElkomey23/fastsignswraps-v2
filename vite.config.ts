import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const isVercel = process.env.VERCEL === "1";

export default defineConfig(async () => {
  const plugins = [react()];

  // Only load Replit plugins when running on Replit
  if (!isVercel && process.env.REPL_ID !== undefined) {
    const runtimeErrorOverlay = await import("@replit/vite-plugin-runtime-error-modal").then(m => m.default);
    plugins.push(runtimeErrorOverlay());

    if (process.env.NODE_ENV !== "production") {
      const cartographer = await import("@replit/vite-plugin-cartographer").then(m => m.cartographer);
      const devBanner = await import("@replit/vite-plugin-dev-banner").then(m => m.devBanner);
      plugins.push(cartographer(), devBanner());
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
