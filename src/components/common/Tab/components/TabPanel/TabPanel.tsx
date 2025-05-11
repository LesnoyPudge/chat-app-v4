import { Types } from '../../types/types';
import { ContextSelectable } from '@lesnoypudge/utils-react';



export const TabPanel = <_Tabs extends Types.GenericTabs>({
    className = '',
    context,
    tabName,
    children,
}: Types.Panel.Props<_Tabs>) => {
    const tabPanelProps = ContextSelectable.useSelector(context, (v) => {
        return v._tabPanelProps[tabName];
    });

    return (
        <div
            className={className}
            {...tabPanelProps}
        >
            {children}
        </div>
    );
};