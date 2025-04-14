import { FC } from 'react';



const MessageNode: FC = () => {
    return <div>message</div>;
};

const MessagePlaceholder: FC = () => {
    return <div>MessagePlaceholder</div>;
};


export namespace Message {
    export const Node = MessageNode;

    export const Placeholder = MessagePlaceholder;
}