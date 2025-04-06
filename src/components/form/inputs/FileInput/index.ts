import * as components from './FileInput';
import * as vars from './acceptedFileType';



export namespace FileInput {
    export import Node = components.FileInput;

    export import NodePure = components.FileInputPure;

    export const { ACCEPTED_FILE_TYPE } = vars;
}