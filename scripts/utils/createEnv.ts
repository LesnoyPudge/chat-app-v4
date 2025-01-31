import fs from 'node:fs';
import path from 'node:path';
import { catchError } from '@lesnoypudge/utils';



export const createEnv = (
    options: {
        envPath: string;
        typePath: string;
        publicPrefix?: string;
        value: Record<string, string>;
    },
) => {
    const {
        value,
        envPath,
        typePath,
        publicPrefix,
    } = options;

    const envData = Object.keys(value).map((key) => {
        return `${key} = ${String(value[key])}`;
    }).join('\n');

    const fullEnvFolderPath = path.resolve(envPath);
    const pathToEnv = path.join(fullEnvFolderPath, '.env');

    catchError(() => fs.rmSync(pathToEnv));
    catchError(() => fs.rmdirSync(pathToEnv));

    fs.mkdirSync(fullEnvFolderPath, { recursive: true });
    fs.writeFileSync(
        pathToEnv,
        envData,
    );

    const spaces = ' '.repeat(4);
    const nodeEnv = `${spaces}NODE_ENV: 'development' | 'production';`;

    const privateEnvTypeValues = Object.keys(value).map((key) => {
        return `${spaces}${key}: '${String(value[key])}';`;
    }).join('\n');

    const privateEnvType = [
        'export type Env = {',
        privateEnvTypeValues,
        nodeEnv,
        '}',
    ].join('\n');

    const publicEnvTypeValues = Object.keys(value).filter((key) => {
        if (!publicPrefix) return false;

        return key.startsWith(publicPrefix);
    }).map((key) => {
        return `${spaces}${key}: '${String(value[key])}';`;
    }).join('\n');

    const publicEnvType = [
        'export type PublicEnv = {',
        publicEnvTypeValues,
        '}',
    ].join('\n');

    const envTypeData = [
        '/* eslint-disable */',
        privateEnvType,
        publicEnvType,
    ].join('\n\n');

    const pathToEnvType = path.join(typePath, '/env.d.ts');

    catchError(() => fs.rmSync(pathToEnvType));

    fs.mkdirSync(typePath, { recursive: true });
    fs.writeFileSync(
        pathToEnvType,
        envTypeData,
    );
};