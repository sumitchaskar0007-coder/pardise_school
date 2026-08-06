import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub project pages are hosted below the repository name.
  base: process.env.GITHUB_ACTIONS ? '/pardise_school/' : '/',
})









