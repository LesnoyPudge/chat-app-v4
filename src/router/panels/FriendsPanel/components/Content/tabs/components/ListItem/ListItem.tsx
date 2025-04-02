import { Avatar, KeyboardNavigation, Placeholder, VirtualList } from '@/components';
import { Store } from '@/features';
import { createStyles } from '@/utils';
import { decorate } from '@lesnoypudge/macro';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { useRefManager, withDisplayName } from '@lesnoypudge/utils-react';
import { FC, memo } from 'react';



const styles = createStyles({
    wrapper: `
        mt-0.5
        flex
        h-[60px]
        items-center
        gap-3
        rounded-lg
        px-2.5
        py-2
        hover-focus-within:bg-primary-hover
        ${VirtualList.Styles.resetItemMarginTop}
    `,
    avatar: 'h-8 w-8',
    infoWrapper: 'overflow-hidden',
    username: 'truncate font-semibold text-color-primary',
    extraInfo: 'truncate text-sm font-medium text-color-secondary',
    buttonsContainer: 'ml-auto flex shrink-0 gap-2.5',
});

export namespace ListItem {
    export type Props = {
        userId: string;
        renderExtraInfo?: RT.RenderFunction<[id: string]>;
        renderActionButtons: RT.RenderFunction<[id: string]>;
    };
}

decorate(withDisplayName, 'ListItem', decorate.target);
decorate(memo, decorate.target);

export const ListItem: FC<ListItem.Props> = ({
    userId,
    renderActionButtons,
    renderExtraInfo,
}) => {
    const user = Store.useSelector(Store.Users.Selectors.selectById(userId));
    const wrapperRef = useRefManager<HTMLLIElement>(null);
    const {
        tabIndex,
    } = KeyboardNavigation.useCommonItem({
        elementRef: wrapperRef,
        itemId: userId,
    });

    return (
        <li
            className={styles.wrapper}
            tabIndex={tabIndex}
            ref={wrapperRef}
        >
            <Avatar.User
                className={styles.avatar}
                avatar={user?.avatar}
                defaultAvatar={user?.defaultAvatar}
            />

            <Placeholder.With reveal={user}>
                {(user) => (
                    <>
                        <div className={styles.infoWrapper}>
                            <div className={styles.username}>
                                {user.name}
                            </div>

                            <If condition={!!renderExtraInfo}>
                                <div className={styles.extraInfo}>
                                    {renderExtraInfo?.(user.id)}
                                </div>
                            </If>
                        </div>

                        <div className={styles.buttonsContainer}>
                            {renderActionButtons(user.id)}
                        </div>
                    </>
                )}
            </Placeholder.With>
        </li>
    );
};