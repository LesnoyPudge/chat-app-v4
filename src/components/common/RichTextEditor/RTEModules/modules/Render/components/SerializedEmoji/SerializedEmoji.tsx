import { FC } from 'react';
import { RTETypes } from '../../../../../RTETypes';
import { Emoji } from '@components';
import { createStyles } from '@utils';


const styles = createStyles({
    base: `
        mx-0.5
        h-[--message-emoji-wrapper-height] 
        w-[--message-emoji-wrapper-width]
    `,
});

export namespace SerializedEmoji {
    export type Props = {
        element: RTETypes.Elements.Emoji;
    };
}

export const SerializedEmoji: FC<SerializedEmoji.Props> = ({
    element,
}) => {
    return (
        <Emoji
            className={styles.base}
            code={element.code}
        />
    );
};