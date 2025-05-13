import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { FC } from 'react';
import {
    AppSettingsDialogForm,
} from '../../../../../../../../AppSettingsDialog';



export const ColoredWrapper: FC<RT.PropsWithChildrenAndClassName> = ({
    className = '',
    children,
}) => {
    const value = AppSettingsDialogForm.useFieldValue(
        AppSettingsDialogForm.names.bannerColor,
    );

    return (
        <div
            className={className}
            style={{ backgroundColor: value }}
        >
            {children}
        </div>
    );
};