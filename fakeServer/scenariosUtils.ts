


export const createArray = (len: number) => Array.from({ length: len });

export const extractIds = (
    items: { id: string }[],
) => items.map((item) => item.id);

export const combineToTable = <
    _Item extends { id: string },
>(items: _Item[]) => {
    return items.reduce<Record<string, _Item>>((acc, cur) => {
        acc[cur.id] = cur;

        return acc;
    }, {});
};