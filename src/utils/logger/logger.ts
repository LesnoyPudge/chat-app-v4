import { isProd } from '@/vars';



export const logger = {
    ...Object.keys(console).reduce<Console>((acc, cur) => {
        acc[cur as keyof Console] = (...data: unknown[]) => {
            if (isProd) return;

            // @ts-ignore
            // eslint-disable-next-line @/typescript-eslint/no-unsafe-call
            console[cur](...data);
        };

        return acc;
    }, {}),

    prod: console,
};