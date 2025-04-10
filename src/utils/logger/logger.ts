import { isProd, FLAGS } from '@/vars';



type FlaggedMethods = Record<
    keyof FLAGS.LOGGER,
    Console
>;

const loggerFlagList = Object.keys<FLAGS.LOGGER>(FLAGS.LOGGER);

const createMethods = (flagName: keyof FLAGS.LOGGER) => {
    return Object.keys(console).reduce<Console>((acc, cur) => {
        acc[cur as keyof Console] = (...data: unknown[]) => {
            if (isProd) return;

            if (!FLAGS.LOGGER[flagName]) return;

            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            console[cur](`[${flagName}]`, ...data);
        };

        return acc;
    }, {});
};

export const logger = (() => {
    const flaggedMethods = loggerFlagList.map((flagName) => {
        return [flagName, createMethods(flagName)] as const;
    }).reduce<FlaggedMethods>((acc, [flagName, methods]) => {
        Object.assign(
            acc,
            {
                [flagName]: methods,
            },
        );

        return acc;
    }, {});

    return flaggedMethods;
})();