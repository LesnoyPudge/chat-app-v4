import { isDev } from '@/vars';



export namespace FLAGS {
    export const GENERAL = {
        ENABLE_REACT_STRICT_MODE: true,
        ENABLE_FOCUS_TRACKER: false,
        ENABLE_ELEMENT_COUNT: true,
    };

    export const LOGGER = {
        _: true,
        _common: true,
        _errors: true,
        _warns: true,
        prod: true,
        setup: false,
        globalLoader: false,
        lazyModules: false,
        fakeServer: false,
        scenarios: true,
        selectors: true,
        selectorsTrace: true,
    } satisfies Record<string, boolean>;

    export type LOGGER = typeof LOGGER;

    const thirdPartyRawFlags = {
        reactScan: false,
        reactScanDeep: false,
        msw: true,
        reactAxe: false,
    } satisfies Record<string, boolean>;

    export const THIRD_PARTY_LOGS = (
        Object.entries(thirdPartyRawFlags)
            .reduce<typeof thirdPartyRawFlags>((acc, [key, value]) => {
                Object.assign(
                    acc,
                    {
                        // prevent third party logs in prod
                        [key]: isDev && value,
                    },
                );

                return acc;
            }, {})
    );
};