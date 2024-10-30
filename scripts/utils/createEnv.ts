import fs from 'node:fs';
import path from 'node:path';
import { catchError } from '@lesnoypudge/utils';



export const createEnv = (
    options: {
        envPath: string;
        typePath: string;
        publicPrefix?: string;
        obj: Record<string, string>;
    },
) => {
    const envData = Object.keys(options.obj).map((key) => {
        return `${key} = ${options.obj[key] ?? ''}`;
    }).join('\n');

    const pathToEnv = path.join(options.envPath, '/.env');

    catchError(() => fs.rmSync(pathToEnv));

    fs.writeFileSync(
        pathToEnv,
        envData,
    );

    const spaces = ' '.repeat(4);

    const privateEnvTypeValues = Object.keys(options.obj).map((key) => {
        return `${spaces}${key}: '${options.obj[key] ?? ''}';`;
    }).join('\n');

    const privateEnvType = [
        'interface Env {',
        privateEnvTypeValues,
        '}',
    ].join('\n');

    const publicEnvTypeValues = Object.keys(options.obj).filter((key) => {
        if (!options.publicPrefix) return false;

        return key.startsWith(options.publicPrefix);
    }).map((key) => {
        return `${spaces}${key}: '${options.obj[key] ?? ''}';`;
    }).join('\n');

    const publicEnvType = [
        'interface PublicEnv {',
        publicEnvTypeValues,
        '}',
    ].join('\n');

    const envTypeData = [
        '/* eslint-disable */',
        privateEnvType,
        publicEnvType,
    ].join('\n\n');

    const pathToEnvType = path.join(options.typePath, '/env.d.ts');

    catchError(() => fs.rmSync(pathToEnvType));

    fs.writeFileSync(
        pathToEnvType,
        envTypeData,
    );
};