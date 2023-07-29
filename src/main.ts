import { translateElement } from './translate';

(function () {
    'use strict';
    console.log('Plugin started');
    const roomElement = document.getElementById('room-');
    if (roomElement) {
        console.log('Found room element:', roomElement);
        translateElement(roomElement);
    }
    document.addEventListener('DOMNodeInserted', function (e) {
        const targetElement = e.target as HTMLElement;
        if (targetElement) {
            console.log('New node inserted:', targetElement);
            translateElement(targetElement);
        }
    });
})();
