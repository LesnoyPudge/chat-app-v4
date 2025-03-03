import { defineConfig, loadEnv, UserConfigFn } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { checker } from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';
import { Env } from './generated/env';
import fs from 'node:fs';
import url from 'node:url';
import ts from 'typescript';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { invariant } from '@lesnoypudge/utils';



const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const envDir = path.join(__dirname, './generated');

const getTsConfigPath = () => {
    const configFileName = 'tsconfig.react.build.json';
    let currentDir = __dirname;

    while (true) {
        const configPath = path.resolve(currentDir, configFileName);
        try {
            fs.readFileSync(configPath);
            return configPath;
        } catch {
            const parentDir = path.dirname(currentDir);
            if (parentDir === currentDir) {
                throw new Error('tsconfig.json not found');
            }
            currentDir = parentDir;
        }
    }
};

const getPathAliases = () => {
    const configPath = getTsConfigPath();
    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);

    if (configFile.error) {
        throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
    }

    const { options: compilerOptions } = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        path.dirname(configPath),
    );

    const baseUrl = compilerOptions.baseUrl ?? '.';
    const paths = compilerOptions.paths ?? {};

    const aliases = {} as T.UnknownRecord;
    for (const alias in paths) {
        invariant(paths[alias]);

        aliases[alias] = paths[alias].map((p) => path.resolve(baseUrl, p));
    }

    return aliases;
};


// https://vite.dev/config/
const config: UserConfigFn = async ({ mode }) => {
    const env = {
        ...process.env,
        ...loadEnv(mode, envDir, ''),
    } as Env;

    const aliases = getPathAliases();

    // console.log('Path Aliases:', aliases);


    return defineConfig({
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
        server: {
            port: Number.parseInt(env._PUBLIC_CLIENT_PORT),
            watch: {
                ignored: ['**/generated/**'],
            },
        },
        preview: {
            port: Number.parseInt(env._PUBLIC_CLIENT_PORT),
        },
        build: {
            outDir: 'build',
            emptyOutDir: true,
            assetsInlineLimit: 0,
        },
        envPrefix: env._PUBLIC_SAFE_ENV_PREFIX,
        envDir,
        assetsInclude: ['./generated/assets/**/*'],
        plugins: [
            // (() => ({
            //     name: 'qwezxc',
            //     enforce: 'pre',
            //     load(id, options) {
            //         console.log('LOAD', id);
            //     },
            //     buildStart(options) {
            //         console.log('BUILD_START');
            //     },
            // }))(),
            react({
                babel: {
                    plugins: [
                        [
                            '@babel/plugin-transform-react-jsx',
                            { runtime: 'automatic' },
                        ],
                        'jsx-control-statements',
                        ['transform-barrels', {
                            executorName: 'vite',
                            alias: aliases,
                            modulesDirs: [
                                // 'node_modules',
                                './',
                                // __dirname,
                            ],
                            moduleIgnorePatterns: [
                                'build',
                                'node_modules',
                                '^(?!@/).*',
                                // '@lesnoypudge/*',
                                '@/generated/*',
                            ],
                            logging: { type: 'file', filePath: 'log.txt' },
                        }],
                        // [
                        //     'import',
                        //     {
                        //         'libraryName': '@/components',
                        //         'libraryDirectory': 'src/components',
                        //     },
                        // ],
                    ],
                },
            }),
            tsconfigPaths(),
            checker({ typescript: true }),
            VitePWA({
                disable: env.NODE_ENV !== 'production',
                workbox: {
                    globPatterns: ['**/*'],
                },
                includeAssets: [
                    '**/*',
                ],
                registerType: 'autoUpdate',
                manifest: {
                    'short_name': env._PUBLIC_APP_NAME,
                    'name': [
                        env._PUBLIC_APP_NAME,
                        'by',
                        env._PUBLIC_AUTHOR_NAME,
                    ].join(' '),
                    'icons': [
                        {
                            'src': '/android-chrome-192x192.png',
                            'sizes': '192x192',
                            'type': 'image/png',
                        },
                        {
                            'src': '/android-chrome-512x512.png',
                            'sizes': '512x512',
                            'type': 'image/png',
                        },
                    ],
                    'start_url': '.',
                    'display': 'standalone',
                    'theme_color': '#000000',
                    'background_color': '#000000',
                },
            }),
        ],
    });
};

export default config;