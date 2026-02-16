import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss() 
  ],
  //   test: {
  //   globals: true,
  //   environment: "jsdom",
  //   css: true,
  //   setupFiles: "./src/setupTests.js"
  // }
  test: {
  environment: 'jsdom',
  setupFiles: './src/setupTests.js',
  globals: true,
  css: false,   // 👈 ADD THIS
},
})
