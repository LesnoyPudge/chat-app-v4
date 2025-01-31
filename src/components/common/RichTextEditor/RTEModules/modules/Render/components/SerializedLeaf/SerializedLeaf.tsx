import { FC, PropsWithChildren } from 'react';



export namespace SerializedLeaf {
    export type Props = PropsWithChildren;
}

export const SerializedLeaf: FC<SerializedLeaf.Props> = ({
    children,
}) => {
    return (
        <span>
            {children}
        </span>
    );
};