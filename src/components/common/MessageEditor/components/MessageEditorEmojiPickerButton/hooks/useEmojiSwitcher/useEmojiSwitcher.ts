import { EmojiStore } from '@/features';
import { inRange, invariant } from '@lesnoypudge/utils';
import { useFunction } from '@lesnoypudge/utils-react';
import { useRef, useState } from 'react';



export const useEmojiSwitcher = () => {
    const prevIndexRef = useRef<number | null>(null);

    const getEmojiCode = () => {
        const length = EmojiStore.emojiCodes.length;
        const rangeEnd = length - 1;
        let index = inRange(0, rangeEnd);

        if (prevIndexRef.current !== null) {
            while (index === prevIndexRef.current) {
                index = inRange(0, rangeEnd);
            }
        }

        prevIndexRef.current = index;
        const code = EmojiStore.emojiCodes[index];
        invariant(code);

        return code;
    };

    const [emojiCode, setEmojiCode] = useState(() => getEmojiCode());

    const changeEmoji = useFunction(() => {
        setEmojiCode(getEmojiCode());
    });

    return {
        emojiCode,
        changeEmoji,
    };
};