/**
 * Wraps the children of an element with a wrapper element
 * @param {HTMLElement[]|HTMLElement} parent - The parent element to have children wrapped.
 * @param {string} [wrapperClass='wrapper'] - The class to be applied to the wrapper.
 * @throws {Error} - If the element is invalid.
 */
export function wrapChildren(element, wrapperClass) {
    if ( ! element instanceof HTMLElement ) {
        throw new Error('Invalid DOM element.');
    }

    const fragment = document.createDocumentFragment();
    const wrapper = document.createElement('div');

    if (wrapperClass) {
        if ( typeof wrapperClass !== 'string' ) {
            throw new Error('Invalid class name.');
        }

        wrapper.classList.add(wrapperClass);
    }

    while (element.firstChild) {
        fragment.appendChild(element.firstChild);
    }

    wrapper.appendChild(fragment);
    element.appendChild(wrapper);
}