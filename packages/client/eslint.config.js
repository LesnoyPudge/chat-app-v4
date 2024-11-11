import { config } from "@lesnoypudge/eslint-config";



export default config.createConfig(
    config.configs.base,
    config.configs.react,
    config.configs.web,
    config.configs.disableTypeChecked,
    {
        rules: {
            'unicorn/prefer-top-level-await': 'off',
            '@stylistic/jsx-tag-spacing': ['warn', {
                "closingSlash": "never",
                "beforeSelfClosing": "never",
                "afterOpening": "never",
                "beforeClosing": "never"
            }],
            '@stylistic/multiline-ternary': 'off',
        }
    }
);