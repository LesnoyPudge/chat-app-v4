import { config } from "@lesnoypudge/eslint-config";



export default config.createConfig(
    config.configs.base,
    config.configs.node,
    config.configs.disableTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                cacheLifetime: undefined, 
            },
        },
        rules: {
            'n/no-unpublished-import': 'off',
            'import-x/no-named-as-default-member': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
            'unicorn/no-process-exit': 'off',
        }
    },
);