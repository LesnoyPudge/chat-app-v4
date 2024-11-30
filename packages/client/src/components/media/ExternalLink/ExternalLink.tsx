import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { cn, createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    base: 'inline-block',
});

const giveUpUrl = 'https://www.youtube.com/watch?v=xvFZjo5PgG0';

export namespace ExternalLink {
    type StableProps = {
        label?: string;
    };

    type ConditionalProps = (
        {
            href: string;
            giveUp?: false;
        }
        | {
            href?: never;
            giveUp: true;
        }
    );

    export type Props = (
        RT.PropsWithChildrenAndClassName
        & StableProps
        & ConditionalProps
    );
}

export const ExternalLink: FC<ExternalLink.Props> = ({
    className = '',
    href,
    label,
    giveUp,
    children,
}) => {
    const _href = giveUp ? giveUpUrl : href;

    return (
        <a
            className={cn(styles.base, className)}
            href={_href}
            rel='noopener noreferrer'
            target='_blank'
            aria-label={label}
        >
            {children}
        </a>
    );
};