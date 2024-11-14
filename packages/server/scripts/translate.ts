import path from 'node:path';
import fs from 'node:fs';



type Keyset = Record<string, string>;
type Namespace = Record<string, Keyset>;
type Locales = Record<string, Namespace>;

const rootPath = path.join(import.meta.dirname, '..');
const localesFolder = path.join(rootPath, 'locales');

if (!fs.existsSync(localesFolder)) {
    console.log('locales not found on path', localesFolder);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
}

const locales = fs.readdirSync(
    localesFolder,
).filter((fileName) => {
    const localePath = path.join(localesFolder, fileName);
    return fs.lstatSync(localePath).isDirectory();
});

const resources: Locales = {};
const jsonExt = '.json';
const namespacesSet = new Set<string>();
let namespacesObj = {};

for (const locale of locales) {
    const namespacesFolder = path.join(localesFolder, locale);
    const namespaces = fs.readdirSync(
        namespacesFolder,
    ).filter((fileName) => {
        const namespacePath = path.join(namespacesFolder, fileName);
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

const typePath = path.join(
    rootPath,
    'src/i18n/generated.ts',
);

const typeData = [
    '// DO NOT MODIFY',
    `// GENERATED IN ${
        path.basename(import.meta.dirname)
    }/${
        path.basename(import.meta.filename)
    }`,
    '',
    `export const namespaces = ${
        JSON.stringify([...namespacesSet])
    } as const;`,
    '',
    `export const resources = ${
        JSON.stringify(resources, null, 4)
    };`,
    '',
    `export type NamespacesType = ${
        JSON.stringify(namespacesObj, null, 4)
    };`,
].join('\n');

if (fs.existsSync(typePath)) {
    fs.rmSync(typePath);
}

fs.writeFileSync(
    typePath,
    typeData,
);