import { defineConfig, loadEnv, UserConfigFn } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { checker } from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';



const envDir = path.join(process.cwd(), '../shared/generated');

// https://vite.dev/config/
const config: UserConfigFn = ({ mode }) => {
    const env = {
        ...process.env,
        ...loadEnv(mode, envDir, ''),
    } as PublicEnv;

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
        },
        preview: {
            port: Number.parseInt(env._PUBLIC_CLIENT_PORT),
        },
        build: {
            outDir: 'build',
            emptyOutDir: true,
        },
        envPrefix: env._PUBLIC_SAFE_ENV_PREFIX,
        envDir,
        assetsInclude: ['generated/assets/**/*'],
        plugins: [
            react({
                babel: {
                    plugins: [
                        [
                            '@babel/plugin-transform-react-jsx',
                            { runtime: 'automatic' },
                        ],
                        'jsx-control-statements',
                    ],
                },
            }),,
            tsconfigPaths(),
            checker({ typescript: true }),
            // VitePWA({
            //     workbox: {
            //         globPatterns: ['**/*'],
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