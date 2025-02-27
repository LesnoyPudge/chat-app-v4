import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';



export const ActionMenuGroup: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    return (
        <div
            className={className}
            role='group'
        >
            {children}
        </div>
    );
};