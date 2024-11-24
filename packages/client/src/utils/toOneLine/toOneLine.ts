


export const toOneLine = (text: string): string => {
    return (
        text
            .split(/\r?\n/)
            .map((item) => item.trim())
            .join(' ')
            .trim()
    );
};