import { ContextSelectable } from '@lesnoypudge/utils-react';
import { FileInputContext } from '../../context';



export const useFileInputContext = () => {
    return ContextSelectable.useProxy(FileInputContext);
};