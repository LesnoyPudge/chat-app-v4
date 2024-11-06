import { config } from "@lesnoypudge/eslint-config";



export default config.createConfig(
    config.mergeConfigs(
        config.configs.base,
        {
            rules: {
                'unicorn/prevent-abbreviations': 'off',
                'n/no-unpublished-import': 'off',
                "unicorn/filename-case": 'off',
                'unicorn/no-abusive-eslint-disable': 'off',
                '@typescript-eslint/no-confusing-void-expression': 'off'
            }
        }
    ),
    config.configs.disableTypeChecked,
);