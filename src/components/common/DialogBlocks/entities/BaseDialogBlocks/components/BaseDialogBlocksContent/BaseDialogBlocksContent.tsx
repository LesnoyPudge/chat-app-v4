import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { Heading } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    base: 'flex flex-col px-4 pb-4',
});

export const BaseDialogBlocksContent: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <div className={cn(styles.base, className)}>
            <Heading.Provider>
                {children}
            </Heading.Provider>
        </div>
    );
};