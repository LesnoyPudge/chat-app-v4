import { T } from '@lesnoypudge/types-utils-base/namespace';
import { isProd } from '@vars';



const consoleMethodNames = ['log', 'error', 'warn'] as const;
type MethodName = T.ArrayValues<typeof consoleMethodNames>;

export const logger = {
    dev: (consoleMethodNames).reduce<
        Pick<Console, MethodName>
    >((acc, cur) => {
        // eslint-disable-next-line no-console
        const originalFn = console[cur];
        acc[cur] = (...args: Parameters<typeof originalFn>) => {
            if (isProd) return;
            originalFn(...args);
        };
        return acc;
    }, {}),

    prod: console,
};