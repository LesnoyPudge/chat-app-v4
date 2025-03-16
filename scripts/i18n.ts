import path from 'node:path';
import fs from 'node:fs';
import { invariant } from '@lesnoypudge/utils';
import childProcess from 'node:child_process';
import { createTsData } from './utils/createTsData';
import { override } from './utils/override';



type Keyset = Record<string, string>;
type Namespace = Record<string, Keyset>;
type Locales = Record<string, Namespace>;

const rootPath = process.cwd();
const generatedDirPath = path.join(rootPath, 'generated');
const i18nGeneratedPath = path.join(generatedDirPath, 'i18n.ts');
const localesDirPath = path.join(rootPath, 'public/locales');

invariant(
    fs.existsSync(localesDirPath),
    'locales in public not found',
);

const localeNames = fs.readdirSync(
    localesDirPath,
).filter((fileName) => {
    const localePath = path.join(localesDirPath, fileName);
    return fs.lstatSync(localePath).isDirectory();
});

const parserConfigPath = path.join(
    rootPath,
    'scripts/utils/i18next-parser.config.js',
);
invariant(fs.existsSync(parserConfigPath));

const jsonExt = '.json';
const namespacesSet = new Set<string>();

const main = () => {
    const startTime = performance.now();
    let namespacesObj = {};
    const resources: Locales = {};

    childProcess.execSync(`i18next -c ${parserConfigPath}`);
    console.log('locales generated');

    invariant(
        fs.existsSync(localesDirPath),
        `locales not found on path ${localesDirPath}`,
    );

    // fs.mkdirSync(
    //     generatedDirPath,
    //     { recursive: true },
    // );

    for (const locale of localeNames) {
        const namespacesFolder = path.join(
            localesDirPath,
            locale,
        );
        const namespaces = fs.readdirSync(
            namespacesFolder,
        ).filter((fileName) => {
            const namespacePath = path.join(
                namespacesFolder,
                fileName,
            );
            const stats = fs.lstatSync(namespacePath);

            return stats.isFile() && fileName.endsWith(jsonExt);
        });

        for (const namespace of namespaces) {
            const namespacesWithoutExt = namespace.slice(
                0,
                -jsonExt.length,
            );

            namespacesSet.add(namespacesWithoutExt);

            const namespaceData = fs.readFileSync(
                path.join(namespacesFolder, namespace),
            ).toString();

            if (!resources[locale]) {
                resources[locale] = {};
            }

            resources[locale][namespacesWithoutExt] = JSON.parse(
                namespaceData,
            ) as Keyset;
        }

        const ns = resources[locale];
        invariant(ns);

        namespacesObj = ns;
    }

    const i18nData = createTsData([
        `// GENERATED IN ${path.basename(import.meta.filename)}`,

        `export const namespaces = ${
            JSON.stringify([...namespacesSet])
        } as const;`,

        `export type NamespacesType = ${
            JSON.stringify({ name: '', obj: namespacesObj }, null, 4)
        };`,
    ]);

    override({
        data: i18nData,
        pathToFile: i18nGeneratedPath,
    });

    // fs.writeFileSync(
    //     i18nGeneratedPath,
    //     i18nData,
    //     'utf8',
    // );
    console.log('i18n data generated');

    const diffTime = performance.now() - startTime;
    console.log(`localization generated in ${
        (diffTime / 1_000).toFixed(2)
    } seconds`);
};

main();