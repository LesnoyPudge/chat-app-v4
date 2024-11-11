import { config } from "@lesnoypudge/eslint-config";



export default config.createConfig(
    config.configs.base,
    config.configs.node,
    config.configs.disableTypeChecked,
    {
        rules: {
            'n/no-unpublished-import': 'off',
        }
    },
);