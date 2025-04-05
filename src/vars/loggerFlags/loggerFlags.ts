import { isDev } from '../common';



export const LOGGER_FLAGS = {
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

export type LOGGER_FLAGS = typeof LOGGER_FLAGS;

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