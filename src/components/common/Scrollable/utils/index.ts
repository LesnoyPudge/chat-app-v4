


export const expandElement = (element: HTMLElement) => {
    const originalMinHeight = element.style.minHeight;
    const originalMinWidth = element.style.minWidth;

    element.style.minHeight = '9999px';
    element.style.minWidth = '9999px';

    const shrink = () => {
        element.style.minHeight = originalMinHeight;
        element.style.minWidth = originalMinWidth;
    };

    return {
        shrink,
    };
};

export const mountExpander = (elementRoot: HTMLElement) => {
    const expander = document.createElement('div');

    expander.style.minHeight = '9999px';
    expander.style.minWidth = '9999px';

    elementRoot.append(expander);

    const remove = () => expander.remove();

    return {
        expander,
        remove,
    };
};

export const getElementFillableSize = (element: HTMLElement) => {
    const style = window.getComputedStyle(element) || {};
    const paddingLeft = Number.parseFloat(style.paddingLeft || '0');
    const paddingRight = Number.parseFloat(style.paddingRight || '0');
    const paddingTop = Number.parseFloat(style.paddingTop || '0');
    const paddingBottom = Number.parseFloat(style.paddingBottom || '0');

    const rect = element.getBoundingClientRect();
    const fillableHeight = rect.height - paddingTop - paddingBottom;
    const fillableWidth = rect.width - paddingLeft - paddingRight;

    return {
        fillableHeight,
        fillableWidth,
    };
};