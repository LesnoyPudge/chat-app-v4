import { Navigator } from '@entities';
import { useLocalStorage } from '@hooks';
import { Features } from '@redux/features';
import { useSliceSelector } from '@redux/hooks';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router';



export namespace OnlyUnAuthorized {
    export type Props = {
        disabled?: boolean;
    };
}

export const OnlyUnAuthorized: FC<OnlyUnAuthorized.Props> = ({
    disabled = false,
}) => {
    const {
        isAuthorized,
    } = useSliceSelector(Features.App.Slice, ({
        user,
    }) => ({
        isAuthorized: !!user,
    }));
    const { navigateTo } = Navigator.useNavigator();
    const { refreshToken } = useLocalStorage('refreshToken');

    const shouldShowOutlet = (
        disabled
        || (
            !refreshToken
            && !isAuthorized
        )
    );

    const shouldNavigateToRoot = !shouldShowOutlet;

    useEffect(() => {
        if (!shouldNavigateToRoot) return;

        void navigateTo.root({ replace: true });
    }, [navigateTo, shouldNavigateToRoot]);

    return (
        <If condition={shouldShowOutlet}>
            <Outlet/>
        </If>
    );
};