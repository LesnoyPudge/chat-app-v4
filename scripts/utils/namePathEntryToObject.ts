


export const namePathEntryToObject = (
    arr: [string, string][],
): Record<string, Record<'NAME' | 'PATH', string>> => {
    return arr.reduce((acc, [key, value]) => {
        acc[key] = {
            NAME: key,
            PATH: value,
        };

        return acc;
    }, {});
};