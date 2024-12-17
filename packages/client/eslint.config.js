import { config } from "@lesnoypudge/eslint-config";
import tailwind from "eslint-plugin-tailwindcss";



const configArr = config.createConfig({
    files: [
        './vite.config.ts'
    ],
    languageOptions: {
        parserOptions: {
            cacheLifetime: undefined, 
        },
    },
    settings: {
        tailwindcss: {
            callees: ["styles", "createStyles"],
        }
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
        'jsx-control-statements/jsx-for-require-each': 'off',
        'no-console': 'error',
        'tailwindcss/enforces-shorthand': 'off',
        'import-x/no-named-as-default-member': 'off',
        'jsx-a11y/no-autofocus': 'off',
        '@typescript-eslint/no-invalid-void-type': 'off',
        'unicorn/prefer-export-from': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@stylistic/jsx-closing-bracket-location': 'off',
        'unicorn/no-nested-ternary': 'off',
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                "args": "all",
                "argsIgnorePattern": "^_",
                "caughtErrors": "all",
                "caughtErrorsIgnorePattern": "^_",
                "destructuredArrayIgnorePattern": "^_",
                "varsIgnorePattern": "^_",
                "ignoreRestSiblings": true
            }
        ],
        'unicorn/no-abusive-eslint-disable': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@stylistic/no-extra-parens': 'off',
        '@typescript-eslint/consistent-indexed-object-style': 'off',
        'unicorn/no-static-only-class': 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
    }
})

const _config = config.createConfig(
    config.mergeConfigs(
        config.configs.base,
        config.configs.react,
        config.configs.web,
        ...tailwind.configs["flat/recommended"],
        ...configArr,
    ),
    {
        ...config.configs.node,
        files: ['./scripts/**/*.ts']
    },
    {
        files: ['**/*.tsx'],
        rules: {
            '@stylistic/max-len': ['warn', {
                'code': 100,
                'ignoreComments': true,
            }],
        }
    },
    config.configs.disableTypeChecked,
);

export default _config;