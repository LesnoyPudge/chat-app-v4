import { T } from '@lesnoypudge/types-utils-base/namespace';



export type ExtendedRecord<
    _Source extends T.UnknownRecord,
    _Value,
> = {
    [_Key in keyof _Source]: _Source[_Key] | _Value;
};