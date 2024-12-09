import { Button, Form, Overlay } from '@components';
import { CheckBoxIndicatorSlideOld } from '@components/form/Form/inputs/CheckBox/components';
import { noop } from '@lesnoypudge/utils';
import { ContextConsumerProxy, useBoolean, useContextProxy } from '@lesnoypudge/utils-react';
import { AnimatePresence, m } from 'motion/react';
import { FC, PropsWithChildren, useEffect, useState } from 'react';



export const Playground: FC = () => {
    const { value, toggle } = useBoolean(false);

    return (
        <>
            <button onClick={toggle}>
                {String(value)}
            </button>

            <Form.Inputs.CheckBox.NodePure
                className='flex gap-2'
                checked={value}
                label=''
                name=''
                onBlur={noop}
                onChange={noop}
            >
                <div className='mr-auto font-medium'>
                    <>Не отображать канал в поиске, вход только по приглашениям.</>
                </div>

                <Form.Inputs.CheckBox.IndicatorSlide
                    checked={value}
                />

                <CheckBoxIndicatorSlideOld checked={value}/>
            </Form.Inputs.CheckBox.NodePure>
        </>
    );
};