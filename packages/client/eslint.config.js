import rootConfig from '../../eslint.config.js'
import { config } from "@lesnoypudge/eslint-config";



export default config.createConfig(
    { extends: [...rootConfig] },
    config.configs.react,
);