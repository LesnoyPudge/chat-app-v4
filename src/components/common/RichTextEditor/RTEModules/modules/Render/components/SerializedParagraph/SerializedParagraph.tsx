import { FC, PropsWithChildren } from 'react';



export namespace SerializedParagraph {
    export type Props = PropsWithChildren;
}

export const SerializedParagraph: FC<SerializedParagraph.Props> = ({
    children,
}) => {
    return (
        <span>
            {children}

            <br/>
        </span>
    );
};