import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    appType: 'custom',
    assetsInclude: ['**/*.vue', '**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx'],
    base: '/vitest/',
    build: {
        outDir: 'dist',
    },
})
