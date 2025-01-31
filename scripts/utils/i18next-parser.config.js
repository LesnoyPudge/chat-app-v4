import { config } from '@dotenvx/dotenvx';
import fs from 'node:fs';
import { invariant } from '@lesnoypudge/utils';
import path from 'node:path';



const pathToEnv = path.join(
    process.cwd(),
    './generated/.env',
);
invariant(fs.existsSync(pathToEnv), 'env not found');
config({
    path: pathToEnv,
});
/** @type {import('generated/env').Env} */
// @ts-ignore
const env = process.env;

/** @type {string[]} */
// @ts-ignore
const locales = JSON.parse(env._PUBLIC_SUPPORTED_LNGS);

const input = ['/**/*.ts', '/**/*.tsx'].flatMap((item) => {
    return [
        path.join(process.cwd(), 'src') + item,
        path.join(process.cwd(), 'fakeShared') + item,
        path.join(process.cwd(), 'fakeServer') + item,
    ];
});

invariant(
    fs.globSync(input).length,
    `input files not found: ${input}`,
);

const outputDir = path.join(process.cwd(), 'public/locales');
invariant(
    fs.existsSync(outputDir),
    'output dir not found',
);

/** @type {import('i18next-parser').UserConfig} */
export default {
    contextSeparator: '_',
    // Key separator used in your translation keys

    createOldCatalogs: true,
    // Save the \_old files

    defaultNamespace: env._PUBLIC_DEFAULT_LNG_NS,
    // Default namespace used in your i18next config

    defaultValue: '__NOT_TRANSLATED__',
    // Default value to give to keys with no value
    // You may also specify a function accepting the locale, namespace, key, and value as arguments

    indentation: 4,
    // Indentation of the catalog files

    keepRemoved: false,
    // Keep keys from the catalog that are no longer in code
    // You may either specify a boolean to keep or discard all removed keys.
    // You may also specify an array of patterns: the keys from the catalog that are no long in the code but match one of the patterns will be kept.
    // The patterns are applied to the full key including the namespace, the parent keys and the separators.

    keySeparator: false,
    // Key separator used in your translation keys
    // If you want to use plain english keys, separators such as `.` and `:` will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`. That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.

    // see below for more details
    lexers: {
        hbs: ['HandlebarsLexer'],
        handlebars: ['HandlebarsLexer'],

        htm: ['HTMLLexer'],
        html: ['HTMLLexer'],

        mjs: ['JavascriptLexer'],
        js: ['JavascriptLexer'], // if you're writing jsx inside .js files, change this to JsxLexer
        ts: ['JavascriptLexer'],
        jsx: ['JsxLexer'],
        tsx: ['JsxLexer'],

        default: ['JavascriptLexer'],
    },

    lineEnding: 'auto',
    // Control the line ending. See options at https://github.com/ryanve/eol

    locales,
    // An array of the locales in your applications

    namespaceSeparator: ':',
    // Namespace separator used in your translation keys
    // If you want to use plain english keys, separators such as `.` and `:` will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`. That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.

    output: `${outputDir}/$LOCALE/$NAMESPACE.json`,
    // Supports $LOCALE and $NAMESPACE injection
    // Supports JSON (.json) and YAML (.yml) file formats
    // Where to write the locale files relative to process.cwd()

    pluralSeparator: '_',
    // Plural separator used in your translation keys
    // If you want to use plain english keys, separators such as `_` might conflict. You might want to set `pluralSeparator` to a different string that does not occur in your keys.
    // If you don't want to generate keys for plurals (for example, in case you are using ICU format), set `pluralSeparator: false`.

    input,
    // An array of globs that describe where to look for source files
    // relative to the location of the configuration file

    sort: true,
    // Whether or not to sort the catalog. Can also be a [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters)

    verbose: false,
    // Display info about the parsing including some stats

    failOnWarnings: false,
    // Exit with an exit code of 1 on warnings

    failOnUpdate: false,
    // Exit with an exit code of 1 when translations are updated (for CI purpose)

    customValueTemplate: null,
    // If you wish to customize the value output the value as an object, you can set your own format.
    //
    // - ${defaultValue} is the default value you set in your translation function.
    // - ${filePaths} will be expanded to an array that contains the absolute
    //   file paths where the translations originated in, in case e.g., you need
    //   to provide translators with context
    //
    // Any other custom property will be automatically extracted from the 2nd
    // argument of your `t()` function or tOptions in <Trans tOptions={...} />
    //
    // Example:
    // For `t('my-key', {maxLength: 150, defaultValue: 'Hello'})` in
    // /path/to/your/file.js,
    //
    // Using the following customValueTemplate:
    //
    // customValueTemplate: {
    //   message: "${defaultValue}",
    //   description: "${maxLength}",
    //   paths: "${filePaths}",
    // }
    //
    // Will result in the following item being extracted:
    //
    // "my-key": {
    //   "message": "Hello",
    //   "description": 150,
    //   "paths": ["/path/to/your/file.js"]
    // }

    resetDefaultValueLocale: null,
    // The locale to compare with default values to determine whether a default value has been changed.
    // If this is set and a default value differs from a translation in the specified locale, all entries
    // for that key across locales are reset to the default value, and existing translations are moved to
    // the `_old` file.

    i18nextOptions: null,
    // If you wish to customize options in internally used i18next instance, you can define an object with any
    // configuration property supported by i18next (https://www.i18next.com/overview/configuration-options).
    // { compatibilityJSON: 'v3' } can be used to generate v3 compatible plurals.

    yamlOptions: null,
    // If you wish to customize options for yaml output, you can define an object here.
    // Configuration options are here (https://github.com/nodeca/js-yaml#dump-object---options-).
    // Example:
    // {
    //   lineWidth: -1,
    // }
};