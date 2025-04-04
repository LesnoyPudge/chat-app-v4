import { ContextSelectable } from '@lesnoypudge/utils-react';
import { LayoutTypeContext } from '../../context';



export const useLayoutType = () => {
    return ContextSelectable.useSelector(LayoutTypeContext);
};