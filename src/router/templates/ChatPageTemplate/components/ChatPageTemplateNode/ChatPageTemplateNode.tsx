import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { Types } from '../../types';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { decorate } from '@lesnoypudge/macro';
import { ChatPageTemplateProvider } from '../ChatPageTemplateProvider';
import { useChatPageTemplate } from '../../hooks';



const styles = createStyles({
    wrapper: 'size-full',
    mainPanelWrapper: 'flex size-full',
    extraPanelWrapper: {
        base: 'size-full max-w-[264px] pb-5',
        wide: 'max-w-full',
    },
});

const { withDecorator } = createWithDecorator(ChatPageTemplateProvider);

decorate(withDisplayName, 'ChatPageTemplateNode', decorate.target);
decorate(withDecorator, decorate.target);

export const ChatPageTemplateNode: FC<Types.Node.Props> = ({
    header,
    extra,
    main,
}) => {
    const {
        isMobile,
        shouldShowExtraPanel,
        shouldShowMainPanel,
    } = useChatPageTemplate();

    return (
        <div className={styles.wrapper}>
            {header}

            <div className={styles.mainPanelWrapper}>
                <If condition={shouldShowMainPanel}>
                    {main}
                </If>

                <If condition={shouldShowExtraPanel}>
                    <div className={cn(
                        styles.extraPanelWrapper.base,
                        isMobile && styles.extraPanelWrapper.wide,
                    )}>
                        {extra}
                    </div>
                </If>
            </div>
        </div>
    );
};