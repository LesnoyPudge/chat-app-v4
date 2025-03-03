import { SPRITE_SHEET } from '@/generated/SPRITE_SHEET';
import { Hidden } from '@lesnoypudge/utils-react';
import { FC } from 'react';



const html = {
    __html: SPRITE_SHEET,
};

export const SpriteSheet: FC = () => {
    return (
        <Hidden>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                dangerouslySetInnerHTML={html}
            />
        </Hidden>
    );
};