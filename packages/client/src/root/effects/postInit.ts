import { logger } from '@utils';
import { isDev } from '@vars';



export const postInit = async () => {
    logger.log('postInit');

    if (isDev) {
        const ReactDOM = await import('react-dom');
        const React = await import('react');

        await import('@axe-core/react').then((axe) => {
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
        });
    }
};