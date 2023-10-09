import { defineConfig } from 'vite'
import packageInfo from './package.json'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' 

// https://vitejs.dev/config/
export default defineConfig({
  base: packageInfo.homepage,
  plugins: [
    react(), 
    svgr({ 
      svgrOptions: {
        ref: true,
      },
    }),
  ], 
})