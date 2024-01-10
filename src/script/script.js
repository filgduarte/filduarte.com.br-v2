import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
 * Lenis smooth scroll
 */
export const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add( (time) => {
    lenis.raf(time * 1000)
});

gsap.ticker.lagSmoothing(0);

// // Snap sections to top when they enter in the viewport
// document.querySelectorAll('section').forEach(section => {
// 	ScrollTrigger.create({
// 		trigger: section,
// 		start: 'top 75%',
// 		onEnter: () => lenis.scrollTo(section, {lock: true}),
// 	});
// });