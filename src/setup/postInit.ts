import { logger } from '@/utils';
import { isProd } from '@/vars';



export const postInit = async () => {
    logger.log('postInit');

    if (isProd) return;

    const ReactDOM = await import('react-dom');
    const React = await import('react');

    await import('@axe-core/react').then((axe) => {
        const axeReact = () => {
            void axe.default(React, ReactDOM, 1_000, {
                disableDeduplicate: true,
                rules: [
                    // https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                    {
                        id: 'color-contrast-enhanced',
                        enabled: false,
                    },
                ],
            });
        };

        axeReact();

        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        window._devtools = {
            // @ts-expect-error
            ...window._devtools,
            axeReact,
        };
    });
};