import { devtools } from '@/features';
import { logger } from '@/utils';
import { isProd, THIRD_PARTY_LOGS } from '@/vars';
import { defer } from '@lesnoypudge/utils-web';



export const postInit = async () => {
    logger.setup.log('postInit');

    if (isProd) return;

    const ReactDOM = await import('react-dom');
    const React = await import('react');

    void import('@axe-core/react').then((axe) => {
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
            }, undefined, (...args) => {
                if (!THIRD_PARTY_LOGS.reactAxe) return;

                axe.logToConsole(...args);
            });
        };

        void defer(() => axeReact());

        devtools.append('axeReact', axeReact);
    });
};