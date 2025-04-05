import { isProd, LOGGER_FLAGS } from '@/vars';



type FlaggedMethods = Record<
    keyof LOGGER_FLAGS,
    Console
>;

const loggerFlagList = Object.keys<LOGGER_FLAGS>(LOGGER_FLAGS);

const createMethods = (flagName: keyof LOGGER_FLAGS) => {
    return Object.keys(console).reduce<Console>((acc, cur) => {
        acc[cur as keyof Console] = (...data: unknown[]) => {
            if (isProd) return;

            if (!LOGGER_FLAGS[flagName]) return;

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