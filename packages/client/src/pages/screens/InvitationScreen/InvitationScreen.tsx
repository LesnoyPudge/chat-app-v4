import { Button, Image } from '@components';
import { FC } from 'react';
import { useInvitationScreen } from './useInvitationScreen';
import { getAssetUrl } from '@utils';
import { CUSTOM_STYLES } from '@vars';
import { Heading } from '@lesnoypudge/utils-react';



export namespace InvitationScreenPure {
    export type Props = ReturnType<typeof useInvitationScreen>;
}

export const InvitationScreenPure: FC<InvitationScreenPure.Props> = ({
    acceptInvitation,
    channel,
}) => {
    return (
        <div className='isolate flex h-dvh'>
            <Image
                className={CUSTOM_STYLES.IMAGE_BG_FULLSCREEN}
                src={getAssetUrl('FANCY_BG.jpg')}
            />

            <div className='max-[480px]:px-4 m-auto flex w-[480px] flex-col items-center rounded bg-primary-200 p-8 text-center shadow-elevation-high'>
                <Image
                    className='size-20 rounded-full'
                    src='https://i.pravatar.cc/80'
                />

                <div className='mt-4 flex flex-col'>
                    <Heading.Node className='text-2xl font-semibold text-color-primary'>
                        {channel.name}
                    </Heading.Node>

                    <div className='mt-2 flex flex-wrap justify-center gap-3 text-color-muted'>
                        <div className='flex items-center gap-1'>
                            <div className='h-2.5 w-2.5 rounded-full bg-positive'></div>

                            <span>
                                <>{channel.onlineCount} в сети</>
                            </span>
                        </div>

                        <div className='flex items-center gap-1'>
                            <div className='h-2.5 w-2.5 rounded-full bg-icon-200'></div>

                            <span>
                                <>{channel.membersCount} участников</>
                            </span>
                        </div>
                    </div>
                </div>

                <Button
                    className='mt-8 w-full'
                    size='big'
                    stylingPreset='brand'
                    onLeftClick={acceptInvitation}
                >
                    <>Принять приглашение</>
                </Button>
            </div>
        </div>
    );
};

export const InvitationScreen: FC = () => {
    return (
        <InvitationScreenPure {...useInvitationScreen()}/>
    );
};