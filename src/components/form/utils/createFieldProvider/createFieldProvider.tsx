import { createWithDecorator } from '@lesnoypudge/utils-react';
import { FormTypes } from '../../types';
import { FieldProvider } from '../../components';



export const {
    withDecorator: createFieldProvider,
} = createWithDecorator<FormTypes.createFieldProvider.DecoratorProps>(({
    children,
    required = false,
    ...rest
}) => {
    return (
        <FieldProvider
            required={required}
            {...rest}
        >
            {children}
        </FieldProvider>
    );
});