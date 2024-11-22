import { config } from "@lesnoypudge/eslint-config";



const [custom] = config.createConfig({
    files: [
        './vite.config.ts'
    ],
    languageOptions: {
        parserOptions: {
            cacheLifetime: undefined, 
        },
    },
    rules: {
        'prefer-const': 'off',
        'unicorn/prefer-top-level-await': 'off',
        '@stylistic/jsx-tag-spacing': ['warn', {
            "closingSlash": "never",
            "beforeSelfClosing": "never",
            "afterOpening": "never",
            "beforeClosing": "never"
        }],
        '@stylistic/multiline-ternary': 'off',
        '@stylistic/jsx-one-expression-per-line': 'off',
        '@stylistic/jsx-quotes': ['warn', 'prefer-single'],
        '@typescript-eslint/consistent-type-definitions': 'off',
        'unicorn/numeric-separators-style': [
            "warn", 
            {
                "number": {
                    "minimumDigits": 0, 
                    "groupLength": 3
                }
            }
        ],
    }
})

const _config = config.createConfig(
    config.mergeConfigs(
        config.configs.base,
        config.configs.react,
        config.configs.web,
        custom,
    ),
    {
        ...config.configs.node,
        files: ['./scripts/**/*.ts']
    },
    config.configs.disableTypeChecked,
);

export default _config;