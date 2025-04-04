import { FC, PropsWithChildren } from 'react';
import { Types } from '../../types';
import { LayoutType } from '@/components';
import { useBoolean } from '@lesnoypudge/utils-react';
import { isDev } from '@/vars';
import { never } from '@lesnoypudge/utils';
import { ChatPageTemplateContext } from '../../context';



export const ChatPageTemplateProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const { isDesktop, isMobile } = LayoutType.useLayoutType();
    const state = useBoolean(false);

    const isExtraPanelActive = state.value;
    const isMainPanelActive = !isExtraPanelActive;

    const value: Types.Context = {
        isDesktop,
        isMobile,
        shouldShowExtraPanel: isExtraPanelActive,
        shouldShowMainPanel: isDesktop || isMainPanelActive,
        toggle: state.toggle,
    };

    if (isDev) {
        const shouldThrow = (
            !value.shouldShowExtraPanel
            && !value.shouldShowMainPanel
        );

        if (shouldThrow) {
            never(JSON.stringify(value));
        }
    }

    return (
        <ChatPageTemplateContext.Provider value={value}>
            {children}
        </ChatPageTemplateContext.Provider>
    );
};