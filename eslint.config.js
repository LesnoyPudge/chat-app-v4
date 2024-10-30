import { config } from "@lesnoypudge/eslint-config";



export default config.createConfig(
    config.configs.base,
    config.configs.disableTypeChecked,
    {
        rules: {
            'unicorn/prevent-abbreviations': 'off',
            'n/no-unpublished-import': 'off',
            "unicorn/filename-case": 'off',
            'unicorn/no-abusive-eslint-disable': 'off',
            '@typescript-eslint/no-confusing-void-expression': 'off'
        }
    }
);