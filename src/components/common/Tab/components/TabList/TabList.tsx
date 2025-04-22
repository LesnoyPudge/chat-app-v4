import { KeyboardNavigation } from '@/components';
import { Types } from '../../types/types';
import { ContextSelectable, Iterate } from '@lesnoypudge/utils-react';
import { isDev } from '@/vars';
import { invariant, never } from '@lesnoypudge/utils';



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

    const index = tabNames.indexOf(initialTabName);
    const startFrom: (
        KeyboardNavigation.Types.Provider.Props['takeInitialIdFrom']
    ) = (
        index === 0
            ? 'start'
            : index === tabNames.length - 1
                ? 'end'
                : never('Initial tab name should be first or last in the list')
    );

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
                takeInitialIdFrom={startFrom}
            >
                <Iterate
                    items={tabNames}
                    getKey={(v) => v as string}
                >
                    {children}
                </Iterate>
            </KeyboardNavigation.Provider>
        </div>
    );
};