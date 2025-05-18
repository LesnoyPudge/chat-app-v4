import { createStyles } from '@/utils';
import { SearchBar, Separator } from '@/components';
import { useTrans } from '@/hooks';
import { ContentContextProvider, DisplayCount } from './components';
import { FriendsPanelTabs } from '../../FriendsPanel';



const styles = createStyles({
    searchBar: 'h-9 w-full',
    infoWrapper: 'px-7 pt-4',
    scrollable: 'h-full',
});

export namespace Content {
    export type Props = {
        searchValue: string;
    };
}

export const Content = () => {
    const { t } = useTrans();
    const search = SearchBar.useControls('');

    return (
        <ContentContextProvider searchValue={search.deferredValue.trim()}>
            <div className={styles.infoWrapper}>
                <SearchBar.Node
                    className={styles.searchBar}
                    label={t('FriendsPanel.Navigation.searchLabel')}
                    placeholder={t('FriendsPanel.Navigation.searchLabel')}
                    {...search}
                />

                <DisplayCount/>

                <Separator
                    spacing={12}
                    length='100%'
                    thickness={2}
                />
            </div>

            <FriendsPanelTabs.Current/>
        </ContentContextProvider>
    );
};