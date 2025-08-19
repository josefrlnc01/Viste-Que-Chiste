import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  base: '/Viste-Que-Chiste/',
  plugins: [react(), tailwindcss()],
  server: { host: true, port: 5173 },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
})
