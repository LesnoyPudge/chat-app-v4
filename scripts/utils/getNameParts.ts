import { invariant } from '@lesnoypudge/utils';



const toUpperSnake = (word: string) => {
    return word.toUpperCase().split('-').join('_');
};

export const getNameParts = (fileName: string) => {
    invariant(
        !fileName.includes(' '),
        `file name should not include whitespaces ${fileName}`,
    );

    const splittedName = fileName.split('.');
    invariant(splittedName.length >= 2);

    const ext = splittedName.pop();
    invariant(ext);
    const name = toUpperSnake(splittedName.join('.'));

    return {
        name,
        ext,
        fullName: `${name}.${ext}`,
    };
};