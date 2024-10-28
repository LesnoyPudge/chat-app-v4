import { config } from "@lesnoypudge/eslint-config";



export default config.createConfig(
    config.configs.base,
    config.configs.disableTypeChecked,
    {
        rules: {
            'unicorn/prevent-abbreviations': 'off',
            'n/no-unpublished-import': 'off',
            "unicorn/filename-case": 'off'
        }
    }
);