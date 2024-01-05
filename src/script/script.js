import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps the children of an element with a wrapper element
 * @param {HTMLElement[]|HTMLElement} parent - The parent element to have children wrapped.
 * @param {string} [wrapperClass='wrapper'] - The class to be applied to the wrapper.
 * @throws {Error} - If element or wrapperClass are invalid.
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

/**
 * Animates a text element when it's visible in the viewport
 * @param {string} section - The selector of the section containing the title to be animated.
 * @param {string} title - The selector of the title to be animated.
 * @param {string} start - The position of the section relative to viewport when start the animation.
 * @throws {Error} - If section, title or start are invalid.
 */
export function animateSectionTitleOnEnter(section, title, start) {
    if ( typeof section !== 'string' ) {
        throw new Error('Invalid section selector.');
    }

    if ( typeof title !== 'string' ) {
        throw new Error('Invalid title selector.');
    }

    if (start) {
        if ( typeof start !== 'string' ) {
            throw new Error('Invalid start position.');
        }
    }

    const splitedTitle = new SplitType(`${section} ${title}`, { types: 'lines' });
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: start ?? '',
            toggleActions: 'play none play reset',
        }
    });

    for (const line of splitedTitle.lines) {
        wrapChildren(line, 'line-content');
    }

    timeline
        .from(`${section} ${title} .line-content`, {
            y: '100%',
            duration: 0.5,
            stagger: 0.15,
        });
}