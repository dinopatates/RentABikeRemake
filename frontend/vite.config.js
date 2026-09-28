import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: "0.0.0.0",
    // expose le serveur

    port: 5173,
    // port surlequel il tourne

    watch: {
      usePolling: true,
      // pour détecter les changements dans docker

      interval: 100,
      // vérifie à chaque 100ms
    },

    hmr: {
      host: "localhost",
      // connecte au serveur hmr sur localhost

      protocol: "ws",
      // utiliser websocket

      port: 5173,
      // port qui utilise le hmr
    },
    proxy: {
      "/api": {
        target: "http://nginx:80",
        changeOrigin: true,
      },
    },
  },
});