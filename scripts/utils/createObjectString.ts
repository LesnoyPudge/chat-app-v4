import { isPlainObject } from '@lesnoypudge/utils';
import { joinLines } from './joinLines';



const SPACES = 4;

export const createObjectString = ({
    name,
    obj,
}: { name: string; obj: Record<string, unknown> }) => {
    const loop = ({
        layer,
        nestingLevel,
    }: { layer: unknown; nestingLevel: number }): string => {
        const nestedSpacing = ' '.repeat(SPACES * nestingLevel);
        const spacing = ' '.repeat(SPACES * (nestingLevel - 1));
        const nextNesting = nestingLevel + 1;
        const comma = nestingLevel === 1 ? '' : ',';

        if (isPlainObject(layer)) {
            return joinLines([
                '{',

                ...Object.keys(layer).map((key) => {
                    return `${nestedSpacing}${key}: ${loop({
                        layer: layer[key],
                        nestingLevel: nextNesting,
                    })}`;
                }),

                `${spacing}}${comma}`,
            ]);
        }

        if (Array.isArray(layer)) {
            return joinLines([
                '[',
                ...layer.map((value) => {
                    return loop({
                        layer: value,
                        nestingLevel: nextNesting,
                    });
                }).map((v) => `${nestedSpacing}${v}`),
                `${spacing}]${comma}`,
            ]);
        }

        switch (typeof layer) {
            case 'string': {
                return `'${layer}'${comma}`;
            }

            default: {
                return `${String(layer)}${comma}`;
            }
        }
    };

    const data = loop({
        layer: obj,
        nestingLevel: 1,
    });

    const result = `export const ${name} = ${data} as const;`;

    return {
        result,
        data,
    };
};