import { Button } from '@components';
import { T } from '@lesnoypudge/types-utils-base/namespace';



export const buttonProps: T.Simplify<Pick<
    Required<Button.Props>,
    'stylingPreset'
    | 'size'
    | 'role'
>> = {
    stylingPreset: 'invisibleBrand',
    size: 'small',
    role: 'menuitem',
};