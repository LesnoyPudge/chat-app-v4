import { createStyles } from '@/utils';
import { decorate } from '@lesnoypudge/macro';
import { withDisplayName } from '@lesnoypudge/utils-react';
import { FC, memo } from 'react';



const styles = createStyles({
    item: 'flex items-center gap-3 py-4',
    avatar: 'size-10',
    username: 'truncate text-sm font-medium text-color-primary',
    buttonArea: 'ml-auto flex gap-2',
    button: 'size-9 rounded-full bg-primary-400 fill-icon-100',
    dangerButton: 'fill-danger',
    icon: 'm-auto size-5',
});

type Props = {
    userId: string;
};

decorate(withDisplayName, 'MemberItem', decorate.target);
decorate(memo, decorate.target);

export const MemberItem: FC<Props> = ({
    userId,
}) => {
    return <div>{userId}</div>;
    // return (
    //     <div className={styles.item}>
    //         <UserAvatar
    //             className={styles.avatar}
    //             avatarId={member.avatar}
    //             username={member.name}
    //         />

    //         <div className={styles.username}>
    //             {member.name}
    //         </div>

    //         <div className={styles.buttonArea}>
    //             <Ref<HTMLButtonElement>>
    //                 {(ref) => (
    //                     <>
    //                         <OverlayContextProvider>
    //                             {({ openOverlay, isOverlayExist }) => (
    //                                 <>
    //                                     <Button
    //                                         className={twClassNames(styles.button, styles.dangerButton)}
    //                                         label='Выгнать пользователя'
    //                                         hasPopup='dialog'
    //                                         isActive={isOverlayExist}
    //                                         innerRef={ref}
    //                                         onLeftClick={openOverlay}
    //                                     >
    //                                         <SpriteImage
    //                                             className={styles.icon}
    //                                             name='DOORWAY_ICON'
    //                                         />
    //                                     </Button>

    //                                     <KickMemberModal
    //                                         channelId={values.channelId}
    //                                         memberId={member.id}
    //                                     />
    //                                 </>
    //                             )}
    //                         </OverlayContextProvider>

    //                         <Tooltip
    //                             preferredAlignment='top'
    //                             leaderElementRef={ref}
    //                         >
    //                             <>Выгнать</>
    //                         </Tooltip>
    //                     </>
    //                 )}
    //             </Ref>

    //             <Ref>
    //                 {(ref) => (
    //                     <>
    //                         <OverlayContextProvider>
    //                             {({ openOverlay, isOverlayExist }) => (
    //                                 <>
    //                                     <Button
    //                                         className={twClassNames(styles.button, styles.dangerButton)}
    //                                         label='Забанить пользователя'
    //                                         hasPopup='dialog'
    //                                         isActive={isOverlayExist}
    //                                         onLeftClick={openOverlay}
    //                                     >
    //                                         <SpriteImage
    //                                             className={styles.icon}
    //                                             name='CROSS_ICON'
    //                                         />
    //                                     </Button>

    //                                     <BanMemberModal
    //                                         channelId={values.channelId}
    //                                         memberId={member.id}
    //                                     />
    //                                 </>
    //                             )}
    //                         </OverlayContextProvider>

    //                         <Tooltip
    //                             preferredAlignment='top'
    //                             leaderElementRef={ref}
    //                         >
    //                             <>Забанить</>
    //                         </Tooltip>
    //                     </>
    //                 )}
    //             </Ref>

    //             <Ref<HTMLButtonElement>>
    //                 {(ref) => (
    //                     <>
    //                         <OverlayContextProvider>
    //                             {({ isOverlayExist, openOverlay }) => (
    //                                 <>
    //                                     <Button
    //                                         className={styles.button}
    //                                         label='Передать права на канал'
    //                                         hasPopup='dialog'
    //                                         isActive={isOverlayExist}
    //                                         onLeftClick={openOverlay}
    //                                     >
    //                                         <SpriteImage
    //                                             className={styles.icon}
    //                                             name='CROWN_ICON'
    //                                         />
    //                                     </Button>

    //                                     <ChangeChannelOwnerModal
    //                                         channelId={values.channelId}
    //                                         memberId={member.id}
    //                                     />
    //                                 </>
    //                             )}
    //                         </OverlayContextProvider>

    //                         <Tooltip
    //                             preferredAlignment='top'
    //                             leaderElementRef={ref}
    //                         >
    //                             <>Передать права на канал</>
    //                         </Tooltip>
    //                     </>
    //                 )}
    //             </Ref>
    //         </div>
    //     </div>
    // );
};