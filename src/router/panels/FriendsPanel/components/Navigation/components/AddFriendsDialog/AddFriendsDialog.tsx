import { Button, DialogBlocks, SearchBar } from '@/components';
import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';
import { decorate } from '@lesnoypudge/macro';
import {
    createWithDecorator,
    useDebounce,
    withDisplayName,
} from '@lesnoypudge/utils-react';
import { ListPlaceholder, UserList } from './components';
import { Store } from '@/features';
import { useEffect } from 'react';



const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.Base.Provider
            label={t('AddFriendsDialog.label')}
            controls={controls}
        >
            <DialogBlocks.Base.Wrapper>
                {children}
            </DialogBlocks.Base.Wrapper>
        </DialogBlocks.Base.Provider>
    );
});

const styles = createStyles({
    resultWrapper: `
        mt-4    
        flex 
        h-[250px] 
        w-full 
        items-center 
        justify-center
    `,
});

decorate(withDisplayName, 'AddFriendsDialog', decorate.target);

export const AddFriendsDialog = withDecorator(() => {
    const { t } = useTrans();
    const { closeOverlay } = DialogBlocks.useContextProxy();
    const search = SearchBar.useControls('');
    const { debounce, isDebouncing } = useDebounce();

    const [
        getUsersTrigger,
        {
            data: users = [],
            isFetching,
        },
    ] = Store.Users.Api.useLazyUserGetPossibleFriendsByNameQuery();

    useEffect(() => {
        if (!search.value) return;

        debounce(() => {
            void getUsersTrigger({
                name: search.value,
            });
        }, 1_000)();
    }, [debounce, getUsersTrigger, search.value]);

    const userIds = users.map((v) => v.id);

    const isLoading = isFetching || isDebouncing;
    const shouldShowEmptySearch = !search.value;
    const shouldShowList = (
        !isLoading
        && !!search.value
        && !!userIds.length
    );
    const shouldShowNotFound = (
        !isLoading
        && !!search.value
        && !userIds.length
    );
    const shouldShowPlaceholder = (
        isLoading
        && !userIds.length
        && !!search.value
    );

    return (
        <DialogBlocks.Base.Inner>
            <DialogBlocks.Base.Header>
                <DialogBlocks.Base.Title>
                    {t('AddFriendsDialog.title')}
                </DialogBlocks.Base.Title>

                <DialogBlocks.Base.Subtitle>
                    {t('AddFriendsDialog.subtitle')}
                </DialogBlocks.Base.Subtitle>
            </DialogBlocks.Base.Header>

            <DialogBlocks.Base.Content>
                <SearchBar.Node
                    placeholder={t('AddFriendsDialog.searchPlaceholder')}
                    label={t('AddFriendsDialog.searchLabel')}
                    {...search}
                />

                <div className={styles.resultWrapper}>
                    <If condition={shouldShowList}>
                        <UserList userIds={userIds}/>
                    </If>

                    <If condition={shouldShowNotFound}>
                        <div>
                            {t('AddFriendsDialog.notFound')}
                        </div>
                    </If>

                    <If condition={shouldShowEmptySearch}>
                        <div>
                            {t('AddFriendsDialog.emptySearch')}
                        </div>
                    </If>

                    <If condition={shouldShowPlaceholder}>
                        <ListPlaceholder/>
                    </If>
                </div>
            </DialogBlocks.Base.Content>

            <DialogBlocks.Base.Footer>
                <Button
                    stylingPreset='lite'
                    size='medium'
                    onLeftClick={closeOverlay}
                >
                    {t('COMMON.Close')}
                </Button>
            </DialogBlocks.Base.Footer>
        </DialogBlocks.Base.Inner>
    );
});