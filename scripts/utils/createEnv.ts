import path from 'node:path';
import { override } from './override';
import { joinLines } from './joinLines';
import { createTsData } from './createTsData';



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

    const envFileFolderPath = path.resolve(envPath);
    const envTypeFolderPath = path.resolve(typePath);

    const pathToEnvFile = path.join(envFileFolderPath, '.env');
    const pathToEnvType = path.join(envTypeFolderPath, 'env.ts');

    const envData = joinLines(Object.keys(value).map((key) => {
        return `${key} = ${String(value[key])}`;
    }));

    override({
        pathToFile: pathToEnvFile,
        data: envData,
    });

    const spaces = ' '.repeat(4);
    const nodeEnv = `${spaces}NODE_ENV: 'development' | 'production';`;

    const privateEnvTypeValues = joinLines(Object.keys(value).map((key) => {
        return `${spaces}${key}: '${String(value[key])}';`;
    }));

    const privateEnvType = joinLines([
        'export type Env = {',
        privateEnvTypeValues,
        nodeEnv,
        '};',
    ]);

    const publicEnvTypeValues = joinLines(Object.keys(value).filter((key) => {
        if (!publicPrefix) return false;

        return key.startsWith(publicPrefix);
    }).map((key) => {
        return `${spaces}${key}: '${String(value[key])}';`;
    }));

    const publicEnvType = joinLines([
        'export type PublicEnv = {',
        publicEnvTypeValues,
        '};',
    ]);

    const envTypeData = createTsData([
        privateEnvType,
        publicEnvType,
    ]);


    override({
        pathToFile: pathToEnvType,
        data: envTypeData,
    });
};