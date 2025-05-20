import { defineConfig, loadEnv, UserConfigFn } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { checker } from 'vite-plugin-checker';
// import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';
import { Env } from './generated/env';
import url from 'node:url';
import { debarrelPlugin } from './vitePlugins';
// import ViteRestart from 'vite-plugin-restart';
// import { run } from 'vite-plugin-run';
import { babelPluginReactIf } from '@lesnoypudge/react-if';



const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const envDir = path.join(__dirname, './generated');

// https://vite.dev/config/
const config: UserConfigFn = ({ mode }) => {
    const env = {
        ...process.env,
        ...loadEnv(mode, envDir, ''),
    } as Env;

    const isHMREnabled = false;

    const isProd = env.NODE_ENV === 'production';
    // const isProd = false;
    const isDev = !isProd;

    return defineConfig({
        base: '/chat-app-v4/',
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
                ignored: ['**/generated/**/*'],
            },
            hmr: isHMREnabled,
        },
        preview: {
            port: Number.parseInt(env._PUBLIC_CLIENT_PORT),
        },
        build: {
            outDir: 'build',
            emptyOutDir: true,
            assetsInlineLimit: 0,
            minify: isProd,
            cssMinify: isProd,
            modulePreload: {
                polyfill: isProd,
            },
        },
        envPrefix: env._PUBLIC_SAFE_ENV_PREFIX,
        envDir,
        assetsInclude: ['./generated/assets/**/*'],
        optimizeDeps: {
            // force: true,
            // include: [],
            // noDiscovery: true,
        },
        plugins: [
            // ViteRestart({
            //     restart: [
            //         './src/**/*',
            //         './fakeServer/**/*',
            //         './fakeShared/**/*',
            //         './fakeSocket/**/*',
            //         // './public/**/*',
            //         './rawAssets/**/*',
            //         './twPlugins/**/*',
            //         './tailwind.config.ts',
            //         './index.html',
            //         // '!./generated/**/*',
            //         '../../.env',
            //         '../shared/build/**/*',
            //     ],
            // }),
            // run({
            //     input: [{
            //         name: 'generate localization',
            //         run: ['npm', 'run', 'scripts:i18n'],
            //         pattern: [
            //             './src/**/*.{ts,tsx,js,jsx}',
            //         ],
            //     }, {
            //         name: 'track all files',
            //         pattern: [
            //             // './src/**/*',
            //             // './fakeServer/**/*',
            //             // './fakeShared/**/*',
            //             // './fakeSocket/**/*',
            //             // // './public/**/*',
            //             // './rawAssets/**/*',
            //             // './twPlugins/**/*',
            //             // // '!./generated/**/*',
            //             // '../../.env',
            //             // '../shared/build/**/*',
            //         ],
            //     }],
            //     silent: false,
            // }),
            tsconfigPaths(),
            debarrelPlugin(),
            // babel({
            //     babelConfig: {
            //         babelrc: false,
            //         configFile: false,
            //         // include: /\.(js|jsx|ts|tsx)$/,
            //         plugins: [
            //             [
            //                 '@babel/plugin-transform-react-jsx',
            //                 { runtime: 'automatic' },
            //             ],
            //             'jsx-control-statements',
            //             '@babel/plugin-transform-react-constant-elements',
            //             'macros',
            //             fasterJs,
            //             'closure-elimination',



            //             // [
            //             //     '@babel/plugin-transform-react-jsx',
            //             //     { runtime: 'automatic' },
            //             // ],
            //             // 'jsx-control-statements',
            //             // '@babel/plugin-transform-react-constant-elements',
            //             // 'minify-dead-code-elimination',
            //             // 'minify-guarded-expressions',
            //             // 'macros',
            //             // fasterJs,
            //             // 'closure-elimination',
            //         ],
            //     },
            // }),
            react({
                babel: {
                    comments: isDev,
                    plugins: [
                        babelPluginReactIf,
                        // unstable, multiple crashes
                        // [
                        //     'babel-plugin-react-compiler',
                        //     { target: '18' },
                        // ],
                        ['babel-plugin-hoist-constant-jsx-attributes', {
                            include: '*',
                            freezeObjects: 'development',
                        }],
                        'macros',
                        // 'closure-elimination',
                        'tailcall-optimization',
                        // 'autobind-class-methods',
                    ].filter((item) => typeof item !== 'boolean'),
                },
            }),
            checker({ typescript: true }),
            // FOR SOME REASON PREVENTS MSW FROM WORKING AFTER RELOAD
            // SHOULD PROBABLY ADD AN EXCEPTION FOR MSW
            // VitePWA({
            //     disable: env.NODE_ENV !== 'production',
            //     workbox: {
            //         globPatterns: ['**/*'],
            //         maximumFileSizeToCacheInBytes: 50 * 1_000_000,
            //     },
            //     includeAssets: [
            //         '**/*',
            //     ],
            //     registerType: 'autoUpdate',
            //     manifest: {
            //         'short_name': env._PUBLIC_APP_NAME,
            //         'name': [
            //             env._PUBLIC_APP_NAME,
            //             'by',
            //             env._PUBLIC_AUTHOR_NAME,
            //         ].join(' '),
            //         'icons': [
            //             {
            //                 'src': '/android-chrome-192x192.png',
            //                 'sizes': '192x192',
            //                 'type': 'image/png',
            //             },
            //             {
            //                 'src': '/android-chrome-512x512.png',
            //                 'sizes': '512x512',
            //                 'type': 'image/png',
            //             },
            //         ],
            //         'start_url': '.',
            //         'display': 'standalone',
            //         'theme_color': '#000000',
            //         'background_color': '#000000',
            //     },
            // }),
        ],
    });
};

export default config;