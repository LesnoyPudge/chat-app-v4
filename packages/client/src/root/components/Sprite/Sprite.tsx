import { SPRITE } from '@generated/sprite';
import { Hidden } from '@components';
import { FC } from 'react';



const html = {
    __html: SPRITE,
};

export const Sprite: FC = () => {
    return (
        <Hidden>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                dangerouslySetInnerHTML={html}
            />
        </Hidden>
    );
};