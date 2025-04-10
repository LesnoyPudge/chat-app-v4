import { FC } from 'react';
import { cn, createStyles } from '@/utils';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Form } from '@/components';
import { useTrans } from '@/hooks';



const styles = createStyles({
    wrapper: 'relative',
    indicatorWrapper: `
        absolute 
        inset-0
        flex 
        items-center 
        justify-center 
        gap-1 
        [&>*:nth-child(2)]:animation-delay-200 
        [&>*:nth-child(3)]:animation-delay-[400ms] 
        [&>*]:h-1.5 
        [&>*]:w-1.5 
        [&>*]:animate-custom-pulse 
        [&>*]:rounded-full
        [&>*]:bg-white
    `,
    child: 'invisible',
});

export const WithLoadingIndicator: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    const { t } = useTrans();
    const { api } = Form.useFormContext();
    const isSubmitting = Form.useStore(api.store, (v) => v.isSubmitting);

    return (
        <div className={styles.wrapper}>
            <div className={cn(isSubmitting && styles.child)}>
                {children}
            </div>

            <If condition={isSubmitting}>
                <div
                    className={cn(styles.indicatorWrapper, className)}
                    aria-label={t('COMMON.Loading')}
                    title={t('COMMON.Loading')}
                >
                    <div></div>

                    <div></div>

                    <div></div>
                </div>
            </If>
        </div>
    );
};