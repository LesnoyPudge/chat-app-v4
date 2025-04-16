import { cn } from '@utils';
import { FC, useContext } from 'react';
import { PropsWithClassName } from '@types';
import { Grid1, Grid2, Grid3, Grid4, Grid5, Grid6, Grid7, Grid8, Grid9 } from './components';

import { MessageContext } from '../../Message';



const styles = {
    wrapper: 'flex flex-col gap-1 max-w-[550px]',
};

export const MessageImages: FC<PropsWithClassName> = ({
    className = '',
}) => {
    const { message } = useContext(MessageContext);

    const imageCount = message.attachments.length;
    const imageList = message.attachments.map((src, index) => ({
        src,
        index,
    }));

    const grids = {
        1: <Grid1 images={imageList}/>,
        2: <Grid2 images={imageList}/>,
        3: <Grid3 images={imageList}/>,
        4: <Grid4 images={imageList}/>,
        5: <Grid5 images={imageList}/>,
        6: <Grid6 images={imageList}/>,
        7: <Grid7 images={imageList}/>,
        8: <Grid8 images={imageList}/>,
        9: <Grid9 images={imageList}/>,
    };
    
    return (
        <If condition={!!imageCount}>
            <div className={cn(styles.wrapper, className)}>
                {grids[imageCount as keyof typeof grids]}
            </div>
        </If>
    );
};