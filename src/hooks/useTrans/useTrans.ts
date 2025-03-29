import { getI18nInstance } from '@/features';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import type { FlatNamespace, KeyPrefix } from 'i18next';
import type { $Tuple } from 'node_modules/react-i18next/helpers';
import {
    FallbackNs,
    useTranslation,
    UseTranslationOptions,
} from 'react-i18next';



export const useTrans = <
    _Ns extends FlatNamespace | $Tuple<FlatNamespace> | undefined = undefined,
    _KPrefix extends KeyPrefix<FallbackNs<_Ns>> = undefined,
>(
    ns?: _Ns,
    options: T.StrictOmit<UseTranslationOptions<_KPrefix>, 'i18n'> = {},
) => {
    // using options like this due to bug in i18next-parser.
    // https://github.com/i18next/i18next-parser/pull/1064
    const res = useTranslation(ns, {
        i18n: getI18nInstance(),
        bindI18n: options.bindI18n,
        keyPrefix: options.keyPrefix,
        lng: options.lng,
        nsMode: options.nsMode,
        useSuspense: options.useSuspense,
    });

    return {
        t: res[0],
        i18n: res[1],
        ready: res[2],
    };
};