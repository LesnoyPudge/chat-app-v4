import * as components from './components';
import * as hooks from './hooks';
import * as styles from './styles';



export namespace RelativelyPositioned {
    export import Node = components.RelativelyPositionedNode;

    export import useRelativePosition = hooks.useRelativePosition;

    export const {
        styles: Styles,
    } = styles;
}