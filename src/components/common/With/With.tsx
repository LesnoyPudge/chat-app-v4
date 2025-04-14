import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { renderFunction } from '@lesnoypudge/utils-react';



export namespace With {
    export type Props<_Value> = (
        {
            value: _Value;
        }
        & RT.PropsWithRenderFunction<[NonNullable<_Value>]>
    );
}

export const With = <_Value,>({
    value,
    children,
}: With.Props<_Value>) => {
    if (value === undefined || value === null) return null;

    return renderFunction(children, value);
};