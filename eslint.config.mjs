import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
        rules: {
            'no-console': 'off', // allow console.log in TypeScript files
            // ignore 19:27  error  Unexpected any.
            'no-restricted-syntax': ['error', { selector: 'TSTypeReference' }],
             // 19:54  error  Using 'TSTypeReference' is not allowed  no-restricted-syntax
            '@typescript-eslint/no-restricted-syntax': 'off',
        }
    }
)
