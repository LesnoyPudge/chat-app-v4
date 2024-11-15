import { config } from "@lesnoypudge/eslint-config";


console.dir(config.configs.base.plugins, {
    depth: 1,
})
export default config.createConfig(
    config.mergeConfigs(
        config.configs.base,
        config.configs.node,
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
                'import-x/no-cycle': ['warn', {
                    'ignoreExternal': true,
                }],
            }
        },
    ),
    config.configs.disableTypeChecked,
);