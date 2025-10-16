import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "localhost",
    port: 3000,
  },
  build: {
    outDir: "src/build",
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "../styles/constants" as *;\n`,
      },
    },
  },
});
