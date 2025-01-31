import { FC, useMemo } from 'react';
import { RTETypes } from '../../RTETypes';
import { parseJSON } from '@lesnoypudge/utils';
import { RTEModules } from '../../RTEModules';



export namespace RTESerialized {
    export type Props = {
        value: string;
    };
}

export const RTESerialized: FC<RTESerialized.Props> = ({
    value,
}) => {
    const result = useMemo(() => {
        const parsed = parseJSON(value) as RTETypes.Nodes;

        try {
            return RTEModules.Render.serialize(parsed);
        } catch {
            return null;
        }
    }, [value]);

    return result;
};