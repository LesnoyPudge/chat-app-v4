import { ContextSelectable } from '@lesnoypudge/utils-react';
import { CheckBoxContext } from '../../context';



export const useCheckBoxContext = () => {
    return ContextSelectable.useProxy(CheckBoxContext);
};