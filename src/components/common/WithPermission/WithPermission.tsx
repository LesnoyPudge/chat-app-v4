import { capitalize } from '@lesnoypudge/utils';
import { withDisplayName } from '@lesnoypudge/utils-react';
import { ClientEntities } from '@/types';
import { FC, PropsWithChildren } from 'react';
import { Store } from '@/features';



type createPermissionProps = {
    permissionName: keyof ClientEntities.Role.Permissions;
};

const createPermissionComponent = ({
    permissionName,
}: createPermissionProps) => {
    const PermissionComponent: FC<WithPermission.Permission.Props> = ({
        serverId,
        forcedState,
        children,
    }) => {
        const permissions = Store.useSelector(
            Store.Servers.Selectors.selectMyPermissionsByServerId(serverId),
        );

        if (forcedState === true) return children;
        if (forcedState === false) return null;
        if (!permissions[permissionName]) return null;

        return children;
    };

    return withDisplayName(
        `Permission${capitalize(permissionName)}`,
        PermissionComponent,
    );
};

export namespace WithPermission {
    export namespace Permission {
        export type Props = (
            PropsWithChildren
            & {
                serverId: string;
                forcedState?: boolean;
            }
        );
    }

    export type Shape = Record<
        Capitalize<keyof ClientEntities.Role.Permissions>,
        ReturnType<typeof createPermissionComponent>
    >;
}

export const WithPermission = {
    Admin: createPermissionComponent({
        permissionName: 'admin',
    }),
    BanMember: createPermissionComponent({
        permissionName: 'banMember',
    }),
    ChannelControl: createPermissionComponent({
        permissionName: 'channelControl',
    }),
    CreateInvitation: createPermissionComponent({
        permissionName: 'createInvitation',
    }),
    KickMember: createPermissionComponent({
        permissionName: 'kickMember',
    }),
    ServerControl: createPermissionComponent({
        permissionName: 'serverControl',
    }),
} satisfies WithPermission.Shape;