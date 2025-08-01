import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
// import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {host: 'localhost',port: 3003},
  resolve: {
    alias: {
       "@": path.resolve(__dirname, "src"),
    },
  },
   css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#005bac', // azul GPA
          '@font-size-base': '14px',
          '@border-radius-base': '6px',
          '@layout-body-background': '#f5f6fa',
          '@layout-header-background': '#001529',
          '@text-color': '#2c3e50',
        },
      },
    },
  },
})
