import { T } from '@lesnoypudge/types-utils-base/namespace';
import { coinFlip, inRange, invariant } from '@lesnoypudge/utils';



const CONFIG = {
    VARIATION_SIZE: 10,
    USERNAME_WIDTH_MIN: 50,
    USERNAME_WIDTH_MAX: 150,
    LINES_MIN: 1,
    LINES_MAX: 3,
    WORDS_MIN: 3,
    WORDS_MAX: 15,
    WORD_WIDTH_MIN: 20,
    WORD_WIDTH_MAX: 120,
    ATTACHMENT_WIDTH_MIN: 150,
    ATTACHMENT_WIDTH_MAX: 300,
    ATTACHMENT_HEIGHT_MIN: 150,
    ATTACHMENT_HEIGHT_MAX: 300,
} as const;

type ValidIndex = T.IntRange<0, typeof CONFIG.VARIATION_SIZE>;

type Word = number;

type Words = Word[];

type Lines = Words[];

type PlaceholderVariation = T.Simplify<(
    {
        username: number;
        lines: Lines;
    }
    & (
        {
            withAttachment: true;
            attachmentW: number;
            attachmentH: number;
        }
        | {
            withAttachment: false;
            attachmentW: null;
            attachmentH: null;
        }
    )
)>;

const createPlaceholderVariation = () => {
    const username = inRange(
        CONFIG.USERNAME_WIDTH_MIN,
        CONFIG.USERNAME_WIDTH_MAX,
    );

    const linesCount = inRange(CONFIG.LINES_MIN, CONFIG.LINES_MAX);

    const lines: Lines = Array.from({ length: linesCount }, () => {
        const wordsCount = inRange(CONFIG.WORDS_MIN, CONFIG.WORDS_MAX);

        const words: Words = Array.from({ length: wordsCount }, () => (
            inRange(CONFIG.WORD_WIDTH_MIN, CONFIG.WORD_WIDTH_MAX)
        ));

        return words;
    });

    const withAttachment = coinFlip();

    const attachmentW = (
        withAttachment
            ? inRange(
                    CONFIG.ATTACHMENT_WIDTH_MIN,
                    CONFIG.ATTACHMENT_WIDTH_MAX,
                )
            : null
    );

    const attachmentH = (
        withAttachment
            ? inRange(
                    CONFIG.ATTACHMENT_HEIGHT_MIN,
                    CONFIG.ATTACHMENT_HEIGHT_MAX,
                )
            : null
    );

    return {
        username,
        lines,
        withAttachment,
        attachmentH,
        attachmentW,
    } as PlaceholderVariation;
};

export namespace getPlaceholderVariation {
    export type Variation = PlaceholderVariation;
}

export const getPlaceholderVariation = (() => {
    const variants = Array.from({ length: CONFIG.VARIATION_SIZE }).map(() => {
        return createPlaceholderVariation();
    });

    return (index?: ValidIndex): PlaceholderVariation => {
        index ??= inRange(
            0, CONFIG.VARIATION_SIZE - 1,
        ) as ValidIndex;

        const variant = variants[index];
        invariant(variant);

        return variant;
    };
})();