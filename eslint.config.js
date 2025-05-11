import { config } from '@lesnoypudge/eslint-config';
import tailwind from 'eslint-plugin-tailwindcss';



const customConfigArray = config.createConfig({
    settings: {
        tailwindcss: {
            callees: ['styles', 'createStyles'],
        },
    },
    rules: {
        'tailwindcss/enforces-shorthand': 'off',
        'tailwindcss/no-unnecessary-arbitrary-value': 'off',
        '@typescript-eslint/prefer-function-type': 'off',
        'react-refresh/only-export-components': 'off',
    },
});

const _config = config.createConfig(
    config.configs.base,
    config.configs.react,
    config.configs.web,
    config.mergeConfigs(
        ...tailwind.configs['flat/recommended'],
        config.configs.common,
        ...customConfigArray,
    ),
    {
        ...config.configs.node,
        files: ['./scripts/**/*.ts'],
    },
    config.configs.disableTypeChecked,
);

export default _config;