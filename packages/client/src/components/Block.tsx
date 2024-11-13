import { T } from '@lesnoypudge/types-utils-base/namespace';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { renderFunction } from '@lesnoypudge/utils-react';
import { Dispatch, FC, SetStateAction, useState } from 'react';



type Block = (
    RT.PropsWithRenderFunctionOrNode<[
        setLog: Dispatch<SetStateAction<string[]>>,
    ]>
    & {
        title?: string;
        buttonText?: string;
        buttonAction?: (
            setLog: Dispatch<SetStateAction<string[]>>,
        ) => void;
        formatLog?: (item: string) => string;
    }
);

export const Block: FC<Block> = ({
    title = 'Untitled block',
    buttonText = 'Action button',
    buttonAction = () => console.log('action not provided'),
    formatLog = (v) => v,
    children,
}) => {
    const [log, setLog] = useState<string[]>([]);

    return (
        <section className='block'>
            <div>{title}</div>

            <div className='action'>
                <button
                    className='action__button'
                    onClick={() => buttonAction(setLog)}
                >
                    {buttonText}
                </button>

                <div className='action__log'>
                    {log.length > 0
                        ? log.map((item, i) => {
                            return (
                                <div
                                    className='log-item'
                                    key={i}
                                >
                                    {formatLog(item)}
                                </div>
                            );
                        }) : null}

                    {
                        log.length === 0 ? (
                            <div className='log-item'>
                                <>Log is empty</>
                            </div>
                        ) : null
                    }
                </div>
            </div>

            {renderFunction(children, setLog)}
        </section>
    );
};