import fs from "fs";
import path from "path";
import { catchError } from "@lesnoypudge/utils";



export const createEnv = <T extends Record<string, string>>(
    options: {
        envPath: string,
        typePath: string,
        publicPrefix?: string,
        obj: T,
    }
) => {
    const envData = Object.keys(options.obj).map((key) => {
        return `${key} = ${options.obj[key]}`;
    }).join('\n');

    const pathToEnv = path.join(options.envPath, '/.env')

    catchError(() => fs.rmSync(pathToEnv))

    fs.writeFileSync(
        pathToEnv,
        envData,
    );
    
    const privateEnv = [
        'interface Env {',
        
        Object.keys(options.obj).map((key) => {
            return `${key}: '${options.obj[key]}',`;
        }).join('\n'),
        
        '}'
    ].join('\n');

    const publicEnv = [
        'interface PublicEnv {',
        
        Object.keys(options.obj).filter((key) => {
            if (!options.publicPrefix) return false;

            return key.startsWith(options.publicPrefix);
        }).map((key) => {
            return `${key}: '${options.obj[key]}',`;
        }).join('\n'),
        
        '}',
    ].join('\n');

    const pathToEnvType = path.join(options.typePath, '/env.d.ts')

    catchError(() => fs.rmSync(pathToEnvType))

    fs.writeFileSync(
        pathToEnvType,
        privateEnv.concat('\n\n', publicEnv),
    );
}