import { useFunction } from '@lesnoypudge/utils-react';
import { Form, Tab } from '@/components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useFullScreenDialogBlocksContextProxy } from '../../context';



export const useFullScreenDialogBlocksHandleTabChange = (
    form: Form.Types.FormContext,
) => {
    const {
        closeMenu,
        triggerScreenShake,
    } = useFullScreenDialogBlocksContextProxy();

    const isDirty = Form.useStore(form.api.store, (v) => v.isDirty);

    const handleTabChange: Tab.Types.OnTabChange = useFunction((prevent) => {
        if (!isDirty) return closeMenu();

        prevent();
        triggerScreenShake();
    });

    return {
        handleTabChange,
    };
};