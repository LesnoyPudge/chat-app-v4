import { createContextSelectable } from '@lesnoypudge/utils-react';
import { RTETypes } from '../../RTETypes';



export type RTEContext = {
    name: string;
    label: string;
    placeholder: string;
    maxLength: number;
    disabled: boolean;
    onSubmit: (value: RTETypes.Nodes, editor: RTETypes.Editor) => void;
};

export const RTEContext = createContextSelectable<RTEContext>();