import { useFunction } from '@lesnoypudge/utils-react';
import { Form, Tab } from '@/components';
import { useFullScreenDialogBlocksContextProxy } from '../../context';



export const useFullScreenDialogBlocksHandleTabChange = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: Form.Types.FormContext<any>,
) => {
    const {
        closeMenu,
        triggerScreenShake,
    } = useFullScreenDialogBlocksContextProxy();

    const isChanged = Form.useStore(form.api.store, (v) => !v.isDefaultValue);

    const handleTabChange: Tab.Types.OnTabChange = useFunction((prevent) => {
        if (!isChanged) return closeMenu();

        prevent();
        triggerScreenShake();
    });

    return {
        handleTabChange,
    };
};