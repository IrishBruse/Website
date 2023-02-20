import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(
    {
        plugins: [react()],
        appType: 'spa',
        base: "/home/",
        build: {
            outDir: "../IrishBruse.github.io/home",
        }
    }
);
