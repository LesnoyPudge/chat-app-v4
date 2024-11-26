import { Heading, VisuallyHidden } from '@lesnoypudge/utils-react';
import { env } from '@vars';
import { FC } from 'react';



export const Root: FC = () => {
    return (
        <Heading.Provider>
            <VisuallyHidden>
                <Heading.Node>
                    {env._PUBLIC_APP_NAME}
                </Heading.Node>
            </VisuallyHidden>
        </Heading.Provider>
    );
};