import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import {fileURLToPath} from "url";

export default defineConfig({
    base: "/BFG-FleetBuilder",
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})