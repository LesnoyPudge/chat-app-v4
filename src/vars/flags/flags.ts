import { isDev } from '@/vars';



export namespace FLAGS {
    export const GENERAL = {
        ENABLE_REACT_STRICT_MODE: true,
        ENABLE_FOCUS_TRACKER: false,
        ENABLE_ELEMENT_COUNT: true,
        DEBUG_I18N: false,
        ENABLE_REACT_SCAN: true,
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

    const THIRD_PARTY_LOGS_RAW = {
        reactScan: false,
        reactScanDeep: false,
        msw: true,
        reactAxe: false,
    } satisfies Record<string, boolean>;

    export const THIRD_PARTY_LOGS = (
        Object.entries(THIRD_PARTY_LOGS_RAW)
            .reduce<typeof THIRD_PARTY_LOGS_RAW>((acc, [key, value]) => {
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