import { PlaceholderList } from '@/components';
import { FC } from 'react';



export const ListPlaceholder: FC = () => {
    return (
        <PlaceholderList
            count={20}
            gap={8}
            itemSize={32}
        />
    );
};