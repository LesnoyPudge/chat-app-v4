import { optimize } from 'svgo';



export const optimizeSVG = ({
    data,
    name,
}: { data: string; name: string }) => {
    let dataToModify = data;
    const optimized = optimize(dataToModify, {
        multipass: true,
        floatPrecision: 1,
        plugins: [{ name: 'cleanupIds', params: { minify: false } }],
    });

    dataToModify = optimized.data.replace('<svg', `<svg id="${name}"`);

    const xmlns = 'xmlns="http://www.w3.org/2000/svg"';
    if (!dataToModify.includes(xmlns)) {
        dataToModify = dataToModify.replace('<svg', `<svg ${xmlns}`);
    }

    return dataToModify;
};