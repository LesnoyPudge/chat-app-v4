import { Types } from '../../types';
import { ListVariants } from '@/components';
import { ContextSelectable } from '@lesnoypudge/utils-react';



export const TabList = <_Tabs extends Types.GenericTabs>({
    className = '',
    label,
    context,
    children,
}: Types.TabList.Props<_Tabs>) => {
    const {
        _listRef,
        orientation,
        tabNames,
        initialTabName,
    } = ContextSelectable.useProxy(context);

    return (
        <div
            className={className}
            role='tablist'
            aria-orientation={orientation}
            aria-label={label}
            ref={_listRef}
            tabIndex={0}
        >
            <ListVariants.Variant1.List
                items={tabNames}
                getId={String}
                keyboardNavigation={{
                    direction: orientation,
                    loop: false,
                    wrapperRef: _listRef,
                    initialFocusedId: String(initialTabName),
                }}
            >
                {children}
            </ListVariants.Variant1.List>
        </div>
    );
};