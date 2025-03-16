import { chance } from '@lesnoypudge/utils';
import { FC, useState } from 'react';
import base, { filename, extension } from 'paths.macro';
import { regexgen } from './macros';

// console.log(base, filename, extension);


// console.log(
//     'import is also brings a lot of side effects, refactor lib',
//     chance(0),
// );


const MyComp: FC<{ css: any }> = ({ css }) => {
    console.log(css);
    return (
        <div></div>
    );
};

export const Qwe = () => {
    return (
        <MyComp css={{
            background: 'red',
            color: (theme: any) => (theme === 'dark' ? 'black' : 'white'),
        }}/>
    );
};



export const Component1 = () => {
    return (
        <div style={{ color: 'red', fontSize: 14 }}>Text</div>
    );
};

export const Component = () => {
    const toBehoisted = Math.random() * 5;

    return (
        <div style={{ color: 'red', fontSize: toBehoisted }}>
            <If condition={!!Math.random()}>
                test
            </If>
        </div>
    );
};


// const doubled = [1, 2, 3].map((value) => {
//     return value * 2;
// });

// console.log(doubled);

// function counter(n: any, acc = 0): any {
//     return n === 0 ? acc : counter(n - 1, acc + 1);
// }

// console.log(counter(5));

// class Some {
//     private wow: string;

//     constructor() {
//         this.wow = 'data';
//     }

//     log() {
//         setTimeout(() => {
//             console.log(this.wow);
//         }, 500);
//     }
// }

// const someInst = new Some();
// someInst.log();

// console.log(String(1_234), [], {});
// const isAllTuples = [[1, 2], [3, 4]].every((tuple) => {
//     return tuple.every((value) => Array.isArray(value) && value.length === 2);
// });

// const foo = Math.random() >= 0.5 ? 'foo' : 'bar';
// const fooBar = foo === 'bar' ? [1, 2, 3, 4] : [1, 2, 3, 4].map((v) => v * 2);
// const test = new Map<string, string>();
// test.forEach((val) => {
//     console.log(val + '5');
// });


// function getStuff(
//     array: number[],
//     doubled = array.map((v) => v * 2),
// ) {
//     return doubled;
// }

// console.log(doubled, isAllTuples, fooBar, getStuff([1, 2]));

// const zxc = regexgen([
//     'children',
//     'dangerouslySetInnerHTML',
//     'key',
//     'ref',
//     'autoFocus',
//     'defaultValue',
// ]);

// console.log(zxc);

// const qwe = Array.from({ length: inRange(1, 5) }).map((_, i) => i).map((v) => v + 5);

const Inner: FC = () => {
    const num = 5;

    return (
        <>
            <span style={{ width: 400 }}>
                {num}
            </span>
        </>
    );
};

const useCustomState = (initialValue: any) => {
    const res = useState(initialValue);

    return res;
};

export const Root: FC = () => {
    const [state, setState] = useState(1);
    const [state2, setState2] = useCustomState({ wow: 'data' });

    console.log(state2, setState2);

    return (
        <>
            <div>
                <>wow {state}</>
            </div>

            <button
                onClick={() => setState((prev) => prev + 1)}
                className={(() => 'wow')()}
            >
                <>click</>
            </button>

            <If condition={state === 5}>
                <div>
                    <>five!</>
                </div>
            </If>

            <span>
                {(() => <div>children as fn</div>)()}
            </span>

            {[1, 2, 3].map((num) => <div key={num}>{num}</div>)}

            <Inner/>
        </>
    );
};