import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative asset URLs work on a Hostinger domain and on GitHub project pages.
  base: './',
})









