import { joinBlocks } from './joinBlocks';
import { joinLines } from './joinLines';



export const createTsData = (blocks: string[]) => {
    return joinBlocks([
        joinLines([
            '/* eslint-disable */',
        ]),

        ...blocks,
    ]);
};