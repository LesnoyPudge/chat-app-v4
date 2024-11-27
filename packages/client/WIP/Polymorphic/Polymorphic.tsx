import { T } from '@lesnoypudge/types-utils-base/namespace';
import { ElementRef, forwardRef, useRef } from 'react';

// https://github.com/kripod/react-polymorphic-box/tree/main
// https://phelipetls.github.io/posts/polymorphic-components-react-typescript/


// const defaultElement = 'div';

// export namespace Polymorphic {
//     export type TagNames = React.ElementType;

//     export type ElementProps<_TagName extends TagNames> = (
//         React.ComponentProps<_TagName>
//     );

//     export type OwnProps<_TagName extends TagNames = TagNames> = {
//         as?: _TagName;
//     };

//     export type RestProps<_TagName extends TagNames> = (
//         Omit<ElementProps<_TagName>, keyof OwnProps>
//     );

//     export type Props<_TagName extends TagNames> = (
//         OwnProps<_TagName>
//         & RestProps<_TagName>
//     );

//     export type Polymorphic = <
//         _TagName extends TagNames = typeof defaultElement,
//     >(
//         props: Props<_TagName>,
//     ) => React.ReactNode;
// }

// export const Polymorphic: Polymorphic.Polymorphic = forwardRef((
//     props: Polymorphic.OwnProps,
//     ref: React.Ref<Element>,
// ) => {
//     const Tag = props.as ?? defaultElement;

//     return (
//         <Tag ref={ref} {...props}/>
//     );
// });



export namespace Polymorphic {
    export type TagNames = React.ElementType;

    type ElementProps<_TagName extends TagNames> = (
        React.ComponentProps<_TagName>
    );

    export type OwnProps<_TagName extends TagNames = TagNames> = {
        as: _TagName;
    };

    type RestProps<_TagName extends TagNames> = (
        Omit<ElementProps<_TagName>, keyof OwnProps>
    );

    export type Props<_TagName extends TagNames> = (
        OwnProps<_TagName>
        & RestProps<_TagName>
    );

    export type ExtendableProps<
        _TagName extends TagNames,
        _NewProps extends T.UnknownRecord,
    > = (
        Omit<Props<_TagName>, keyof _NewProps>
        & _NewProps
    );

    type OptionalProps<_TagName extends TagNames> = (
        Partial<OwnProps<_TagName>>
        & RestProps<_TagName>
    );

    export type ExtendableOptionalProps<
        _TagName extends TagNames,
        _NewProps extends T.UnknownRecord,
    > = (
        _NewProps
        & Omit<OptionalProps<_TagName>, keyof _NewProps>
    );

    export type Polymorphic = <
        _TagName extends TagNames,
    >(
        props: Props<_TagName>,
    ) => React.ReactNode;
}

export const Polymorphic: Polymorphic.Polymorphic = forwardRef((
    props: Polymorphic.OwnProps,
    ref: React.Ref<Element>,
) => {
    const Tag = props.as;

    return (
        <Tag ref={ref} {...props}/>
    );
});


export const Test = () => {
    const ref = useRef<ElementRef<'a'>>(null);

    return (
        <>
            <Polymorphic as='a' href='' ref={ref}/>
        </>
    );
};