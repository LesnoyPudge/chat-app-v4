import { FC, PropsWithChildren } from 'react';
import { ParamsContext } from '../../context';
import { Types } from '../../types/types';
import { useParams } from 'react-router';



export const ParamsContextProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const params = useParams();

    const value: Types.ParamsContext = {
        params,
    };

    return (
        <ParamsContext.Provider value={value}>
            {children}
        </ParamsContext.Provider>
    );
};