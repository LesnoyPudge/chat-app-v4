import { ContextSelectable } from '@lesnoypudge/utils-react';
import { PopoverContext } from '../../context';



export const PopoverConsumerProxy = ContextSelectable.createConsumerProxy(
    PopoverContext,
);