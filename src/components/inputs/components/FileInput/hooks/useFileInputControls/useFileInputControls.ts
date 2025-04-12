import { FileInputTypes } from '../../types';
import { useFunction } from '@lesnoypudge/utils-react';



export const useFileInputControls: FileInputTypes.useFileInputControls.Fn = (
    setValue,
) => {
    return {
        removeAll: useFunction(() => setValue(null)),

        removeOne: useFunction((index) => {
            setValue((value) => {
                if (!value) return null;

                // @ts-expect-error
                return value.with(index, undefined).filter(Boolean);
            });
        }),
    };
};