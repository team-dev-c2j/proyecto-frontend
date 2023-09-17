import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Carga el valor de VITE_PORT desde las variables de entorno
const port = process.env.VITE_PORT || 3000;

export default defineConfig({
  plugins: [react()],
  server: {
    port: port,
  },
});
