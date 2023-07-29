import { translateElement } from './translate';

(function () {
    'use strict';
    console.log('Plugin started'); // 添加此行来确认插件代码被执行
    const roomElement = document.getElementById('room-');
    if (roomElement) {
        console.log('Found room element:', roomElement); // 添加此行来确认roomElement是否找到
        translateElement(roomElement);
    }
    document.addEventListener('DOMNodeInserted', function (e) {
        const targetElement = e.target as HTMLElement;
        if (targetElement) {
            console.log('New node inserted:', targetElement); // 添加此行来确认新节点是否被正确处理
            translateElement(targetElement);
        }
    });
})();
