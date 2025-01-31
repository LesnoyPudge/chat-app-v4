import { ContextSelectable } from '@lesnoypudge/utils-react';
import { OverlayContext } from '../../context';


export const OverlayConsumerProxy = ContextSelectable.createConsumerProxy(
    OverlayContext,
);