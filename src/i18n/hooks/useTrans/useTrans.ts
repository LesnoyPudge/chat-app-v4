import { FlatNamespace, KeyPrefix } from 'i18next';
import { $Tuple } from 'node_modules/react-i18next/helpers';
import { FallbackNs, useTranslation, UseTranslationOptions } from 'react-i18next';



export const useTrans = <
    _Ns extends FlatNamespace | $Tuple<FlatNamespace> | undefined = undefined,
    _KPrefix extends KeyPrefix<FallbackNs<_Ns>> = undefined,
>(
    ns?: _Ns,
    options?: UseTranslationOptions<_KPrefix>,
) => {
    const res = useTranslation(ns, options);

    return {
        t: res[0],
        i18n: res[1],
        ready: res[2],
    };
};