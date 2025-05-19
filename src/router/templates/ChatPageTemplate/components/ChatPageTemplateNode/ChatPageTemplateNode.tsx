import { cn, createStyles } from '@/utils';
import { FC, memo } from 'react';
import { Types } from '../../types';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { decorate } from '@lesnoypudge/macro';
import { ChatPageTemplateProvider } from './components';
import { useChatPageTemplate } from '../../hooks';



const styles = createStyles({
    wrapper: 'flex size-full flex-col',
    inner: 'flex size-full',
    mainPanelWrapper: 'flex size-full flex-col',
    extraPanelWrapper: {
        base: 'size-full max-w-[264px] bg-primary-300 pb-5',
        wide: 'max-w-full',
    },
});

const { withDecorator } = createWithDecorator(ChatPageTemplateProvider);

decorate(withDisplayName, 'ChatPageTemplateNode', decorate.target);
decorate(memo, decorate.target);
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

            <div className={styles.inner}>
                <If condition={shouldShowMainPanel}>
                    <div className={styles.mainPanelWrapper}>
                        {main}
                    </div>
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