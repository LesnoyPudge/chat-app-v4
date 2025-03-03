


export const promiseTimeout = <_Value>(
    fn: Promise<_Value>,
    timeout: number,
) => {
    let id: number;

    return new Promise<_Value>((resolve, reject) => {
        id = setTimeout(() => {
            reject('TIMEOUT');
        }, timeout);

        void fn.then((value) => {
            clearTimeout(id);
            resolve(value);
        }).catch(() => {
            clearTimeout(id);
            reject();
        });
    });
};