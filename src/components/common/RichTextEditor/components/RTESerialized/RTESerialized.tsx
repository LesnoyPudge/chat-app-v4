import { FC, useMemo } from 'react';
import { RTETypes } from '../../types';
import { parseJSON } from '@lesnoypudge/utils';
import { RTEModules } from '../../RTEModules';



export const RTESerialized: FC<RTETypes.Serialized.Props> = ({
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