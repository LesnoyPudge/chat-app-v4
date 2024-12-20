import path from 'node:path';
import fs from 'node:fs';
import { invariant } from '@lesnoypudge/utils';
import childProcess from 'node:child_process';



type Keyset = Record<string, string>;
type Namespace = Record<string, Keyset>;
type Locales = Record<string, Namespace>;

const rootPath = process.cwd();
const generatedDirPath = path.join(rootPath, 'src/generated');
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

const resources: Locales = {};
const jsonExt = '.json';
const namespacesSet = new Set<string>();
let namespacesObj = {};

const main = async () => {
    const startTime = performance.now();

    await new Promise<void>((res, rej) => {
        childProcess.exec(
            `i18next -c ${parserConfigPath}`,
            (err) => {
                if (err) rej(err.message);

                res();
            },
        );
    });
    console.log('locales generated');

    invariant(
        fs.existsSync(localesDirPath),
        `locales not found on path ${localesDirPath}`,
    );

    // fs.rmSync(
    //     i18nGeneratedPath,
    //     { force: true },
    // );
    // console.log('i18n vars deleted');

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

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        namespacesObj = resources[locale]!;
    }

    const i18nData = [
        `// GENERATED IN ${import.meta.filename}`,
        '',
        `export const namespaces = ${
            JSON.stringify([...namespacesSet])
        } as const;`,
        '',
        `export type NamespacesType = ${
            JSON.stringify(namespacesObj, null, 4)
        };`,
    ].join('\n');

    fs.writeFileSync(
        i18nGeneratedPath,
        i18nData,
        'utf8',
    );
    console.log('i18n data generated');

    const diffTime = performance.now() - startTime;
    console.log(`translated in ${
        (diffTime / 1_000).toFixed(2)
    } seconds`);
};

await main();