import { autoBind, combinedFunction, ListenerStore } from '@lesnoypudge/utils';
import { Types } from '../../types';



export class AnimateTransitionInstance {
    private outerState: boolean;
    private isPresent: boolean;
    private progress: Types.Options['progress'];
    private listenerStore: ListenerStore<null, [boolean]>;
    private onExitEndListeners: ListenerStore<null, void[]>;
    private status: 'entering' | 'exiting' | 'idle';
    private cleanupCallback: VoidFunction | undefined;

    constructor(options: Pick<Types.Options, 'isExist' | 'progress'>) {
        this.outerState = options.isExist;
        this.isPresent = options.isExist;
        this.progress = options.progress;
        this.listenerStore = new ListenerStore();
        this.onExitEndListeners = new ListenerStore();
        this.status = 'idle';

        autoBind(this);
    }

    onChange(listener: VoidFunction) {
        return this.listenerStore.add(null, listener);
    }

    onExitEnd(listener: VoidFunction) {
        return this.onExitEndListeners.add(null, listener);
    }

    getIsPresent() {
        return this.isPresent;
    }

    private setIsPresent(value: boolean) {
        this.isPresent = value;
        this.listenerStore.triggerAll(value);

        return value;
    }

    private handleTransitionEnd() {
        this.cleanupCallback?.();
        this.cleanupCallback = undefined;
        this.status = 'idle';
        this.setIsPresent(this.outerState);

        if (!this.outerState) {
            this.onExitEndListeners.triggerAll();
        }
    };

    private instantTransition(nextState: boolean) {
        this.status = 'idle';
        this.setIsPresent(nextState);

        return this.isPresent;
    }

    derive({
        isExist: nextState,
        onEnter,
        onExit,
    }: Types.Options): boolean {
        const outerState = this.outerState;
        const isSameState = outerState === nextState;
        const currentState = this.isPresent;
        const progress = this.progress;

        // nothing changed
        if (isSameState) return currentState;

        this.outerState = nextState;

        // should transition to entering
        const toEnter = !outerState && nextState;

        const transitionFn = toEnter ? onEnter : onExit;

        if (!transitionFn) return this.instantTransition(nextState);

        this.cleanupCallback?.();

        // start animation
        transitionFn();

        const isAnimating = progress.isAnimating();

        // looks like attempting to transition to current motion value.
        // instant transition.
        if (!isAnimating) return this.instantTransition(nextState);

        this.cleanupCallback = combinedFunction(
            progress.on('animationCancel', this.handleTransitionEnd),
            progress.on('animationComplete', this.handleTransitionEnd),
        );

        // entering state needs to be updated immediately
        if (toEnter) {
            this.setIsPresent(true);
            this.status = 'entering';

            return true;
        }

        this.status = 'exiting';

        // exiting state needs to be deferred until animation is ended
        return true;
    }
}