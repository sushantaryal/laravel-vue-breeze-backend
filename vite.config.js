import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    define: {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    },
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                'resources/css/admin.css',
                'resources/css/app.css',
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
                compilerOptions: {
                    isCustomElement: (tag) => tag === 'trix-editor',
                },
            },
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    ckeditor: ['@ckeditor/ckeditor5-vue', 'ckeditor5'],
                    tiptap: [
                        '@tiptap/extension-image',
                        '@tiptap/extension-link',
                        '@tiptap/extension-underline',
                        '@tiptap/starter-kit',
                        '@tiptap/vue-3',
                    ],
                },
            },
        },
        chunkSizeWarningLimit: 1500,
    },
})
