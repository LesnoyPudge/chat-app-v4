import * as Nodes from './CheckBox';
import { CheckBoxIndicatorCheck, CheckBoxIndicatorSlide } from './components';



export namespace CheckBox {
    export import Node = Nodes.CheckBox;

    export import NodePure = Nodes.CheckBoxPure;

    export import IndicatorCheck = CheckBoxIndicatorCheck;

    export import IndicatorSlide = CheckBoxIndicatorSlide;
}