import * as a from './FileInput';
import * as b from './acceptedFileType';



export namespace FileInput {
    export import Node = a.FileInput;

    export import NodePure = a.FileInputPure;

    export const { ACCEPTED_FILE_TYPE } = b;
}