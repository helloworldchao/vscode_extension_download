// ==UserScript==
// @name         Visual Studio Code Extension Download
// @namespace    https://blog.helloworldchao.tech/
// @version      2025-03-21
// @description  Download official visual studio code extension easily
// @author       helloworldchao
// @match        *://marketplace.visualstudio.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const waitElement = (el, times, waitTime) => {
        return new Promise((resolve, reject) => {
            let _id = null, _times = times || 50, _waitTime = waitTime || 100;
            _id = setInterval(() => {
                if (_times <= 0) {
                    _id && clearInterval(_id);
                    reject();
                    return;
                }
                const element = document.querySelector(el);
                if (element) {
                    _id && clearInterval(_id);
                    resolve(element);
                    return;
                }
                _times <= 0 || _times--;
            }, _waitTime);
        })
    }

    const search = window.location.search;
    if (search) {
        const searchParams = new URLSearchParams(search);
        const itemNameArr = searchParams.get('itemName').split('.');
        const author = itemNameArr[0];
        const extName = itemNameArr[1];
        console.log(author, extName, 22);

        waitElement('.version-history-table-body').then((el) => {
            for (let i = 0; i < el.childElementCount; i++) {
                const row = el.childNodes[i];
                const versionEl = row.childNodes[0];
                const version = versionEl.innerText;

                const url = `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${author}/vsextensions/${extName}/${version}/vspackage`;
                const a = document.createElement('a');
                a.innerText = 'Download';
                a.href = url;
                a.target = '_blank';
                a.style = 'margin-left: 10px;';
                versionEl.appendChild(a);
            }
        })
    }
})();