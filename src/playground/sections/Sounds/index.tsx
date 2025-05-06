import { Iterate, useBoolean } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { soundManager } from '@/features';
import { ASSETS } from '@/generated/ASSETS';



export const Sounds: FC = () => {
    const state = useBoolean(false);

    return (
        <div className='flex h-dvh flex-col gap-4'>
            <div>{Math.random() + 3}</div>

            <button onClick={() => {
                state.toggle();

                (
                    state.value
                        ? soundManager.play(ASSETS.SOUNDS.DISCORD_MUTE)
                        : soundManager.play(ASSETS.SOUNDS.DISCORD_UNMUTE)
                );
            }}>
                <>toggle {String(state.value)}</>
            </button>



            <Iterate
                items={Object.keys<typeof ASSETS.SOUNDS>(ASSETS.SOUNDS)}
                getKey={(v) => v}
            >
                {(name) => (
                    <div
                        className='flex flex-col gap-2 outline-dashed outline-red-900'
                    >
                        <button
                            onClick={() => {
                                soundManager.play(ASSETS.SOUNDS[name]);
                            }}
                        >
                            <>sound on: {name}</>
                        </button>

                        <button
                            onClick={() => {
                                soundManager.stop(ASSETS.SOUNDS[name]);
                            }}
                        >
                            <>sound off: {name}</>
                        </button>
                    </div>
                )}
            </Iterate>

        </div>
    );
};