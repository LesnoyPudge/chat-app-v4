import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Focus, useRefManager } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@/utils';
import { CUSTOM_STYLES } from '@/vars';
import { FC } from 'react';



const styles = createStyles({
    screen: CUSTOM_STYLES.SCREEN,
});

export const Screen: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    const screenRef = useRefManager<HTMLDivElement>(null);
    const props = Focus.useAutoFocusable(true);

    return (
        <div
            className={cn(styles.screen, className)}
            ref={screenRef}
            {...props}
        >
            {children}
        </div>
    );
};