import { KeyboardNavigation } from '@/components';
import { Types } from '../../types/types';
import {
    ContextSelectable,
    Iterate,
    useFunction,
} from '@lesnoypudge/utils-react';
import { isDev } from '@/vars';
import { invariant, isCallable } from '@lesnoypudge/utils';



export const TabList = <_Tabs extends Types.GenericTabs>({
    className = '',
    context,
    children,
}: Types.List.Props<_Tabs>) => {
    const {
        _listRef,
        orientation,
        tabNames,
        initialTabName,
        label,
    } = ContextSelectable.useProxy(context);

    const currentTab = ContextSelectable.useSelector(
        context, (v) => v.currentTab,
    );

    if (isDev) {
        const nonStringFound = tabNames.find((item) => {
            return typeof item !== 'string';
        });

        invariant(!nonStringFound, 'Do not use non string tabs');
        invariant(
            typeof initialTabName === 'string',
            'Use sting as initialTabName',
        );
    }

    const _children = (
        isCallable(children)
            ? (
                    <Iterate
                        items={tabNames}
                        getKey={(v) => v as string}
                    >
                        {children}
                    </Iterate>
                )
            : children
    );

    const getInitialId = useFunction(() => String(currentTab.identifier));

    return (
        <div
            className={className}
            role='tablist'
            aria-orientation={orientation}
            aria-label={label}
            ref={_listRef}
            tabIndex={0}
        >
            <KeyboardNavigation.Provider
                list={tabNames as string[]}
                wrapperRef={_listRef}
                direction={orientation}
                takeInitialIdFrom={getInitialId}
            >
                {_children}
            </KeyboardNavigation.Provider>
        </div>
    );
};