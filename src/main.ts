import { translateElement } from './translate';

(function () {
    'use strict';
    console.log('Plugin started');

    // Translate all existing elements in the page
    const allElements = document.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
        const element = allElements[i] as HTMLElement; // Type assertion
        translateElement(element);
    }

    // Add event listener to translate all new elements added to the page
    document.addEventListener('DOMNodeInserted', function (e) {
        const targetElement = e.target as HTMLElement; // Type assertion
        if (targetElement) {
            console.log('New node inserted:', targetElement);
            translateElement(targetElement);
        }
    });
})();
