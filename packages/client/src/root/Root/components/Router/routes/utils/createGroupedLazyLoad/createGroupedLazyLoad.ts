


export const createGroupedLazyLoad = () => {
    const promises: (() => Promise<unknown>)[] = [];
    let result: unknown[] = [];

    const withGroupedLazyLoad = <
        _Component,
    >(
        fn: () => Promise<_Component>,
    ) => {
        const index = promises.length;
        promises.push(fn);

        return async () => {
            if (!result.length) {
                result = await Promise.all(promises.map((fn) => fn()));
            }

            return result[index] as _Component;
        };
    };

    return {
        withGroupedLazyLoad,
    };
};