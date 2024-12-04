import { createContextConsumerProxy } from '@lesnoypudge/utils-react';
import { PopoverContext } from '../../context';



export const PopoverConsumerProxy = createContextConsumerProxy(
    PopoverContext,
);