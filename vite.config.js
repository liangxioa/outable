import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'packages/index.js'),
            name: 'Outable'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    plugins: [vue()]
})
