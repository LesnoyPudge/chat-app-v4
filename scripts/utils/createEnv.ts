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

    const pathToEnv = path.join(envPath, '/.env');

    catchError(() => fs.rmSync(pathToEnv));

    fs.mkdirSync(envPath, { recursive: true });
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
        'interface Env {',
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
        'interface PublicEnv {',
        publicEnvTypeValues,
        nodeEnv,
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