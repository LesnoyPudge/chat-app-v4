import { ScenarioVariants } from '@/types';
import { db } from './FakeDB';
import { logger } from '@/utils';
import { catchErrorAsync, toOneLine, unhandled } from '@lesnoypudge/utils';
import { defer } from '@lesnoypudge/utils-web';
import { populate } from './populate';
import { setupMinimalScene } from './setupMinimalScene';



export type SetupScenarioOptions = {
    myId: string;
    variant: Exclude<ScenarioVariants, 'none'>;
};

class Scenarios {
    async setup(options: SetupScenarioOptions) {
        const originalState = db.getStorageClone();

        logger.scenarios.log(
            `Current scenario: ${options.variant}`,
        );

        let setupError: unknown;
        const startTime = performance.now();

        const variant = options.variant;

        switch (variant) {
            case 'populateLarge':
            case 'populateMedium':
            case 'populateSmall': {
                if (variant === 'populateLarge') {
                    logger.scenarios.log('Long loading is expected');
                }

                const [_, error] = await catchErrorAsync(() => {
                    return defer(() => populate({
                        myId: options.myId,
                        variant,
                    }));
                });

                setupError = error;

                break;
            }

            case 'minimalScene': {
                const [_, error] = await catchErrorAsync(() => {
                    return defer(() => setupMinimalScene(options.myId));
                });

                setupError = error;

                break;
            }

            default: {
                unhandled(variant);
            }
        }

        const timeDiff = performance.now() - startTime;
        const timeMs = timeDiff.toFixed(0);
        const timeSec = (timeDiff / 1_000).toFixed(2);

        logger.scenarios.log(toOneLine(`
            Scenario setup duration: ${timeMs}ms = ${timeSec}sec`,
        ));

        if (!setupError) {
            logger.scenarios.log(`Scenario setup is successful`);
            return;
        }

        await catchErrorAsync(() => db.clearStorage());

        logger.scenarios.log('Scenario setup failed', setupError);
        logger.scenarios.log('Restoring previous state');

        await catchErrorAsync(() => db.set(originalState));
    }
}

export const scenarios = new Scenarios();