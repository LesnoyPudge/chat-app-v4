import { config } from "@lesnoypudge/eslint-config";



export default config.createConfig(
    config.configs.base,
    config.configs.react,
    config.configs.disableTypeChecked,
);

// import rootConfig from '../../eslint.config.js'
// import { config } from "@lesnoypudge/eslint-config";



// export default config.createConfig(
//     { extends: [...rootConfig] },
//     config.mergeConfigs(
//         config.configs.react,
//         {
//             rules: {
//                 'react/react-in-jsx-scope': 'off',
//                 '@stylistic/jsx-closing-bracket-location': 'off',
//                 'jsx-control-statements/jsx-use-if-tag': 'off',
//                 'unicorn/no-null': 'off',
//                 '@stylistic/multiline-ternary': 'off',
//             }
//         }
//     ),
// );