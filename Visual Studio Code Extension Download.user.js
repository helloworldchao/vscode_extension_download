// ==UserScript==
// @name         Visual Studio Code Extension Download
// @name         zh-CN VSCode 插件离线下载工具
// @namespace    https://blog.helloworldchao.tech/
// @version      202503212016
// @description  Download history version of vscode extension from official website https://marketplace.visualstudio.com/ easily
// @description  zh-CN 从VSCode插件官网 https://marketplace.visualstudio.com/ 离线下载插件
// @author       helloworldchao
// @match        *://marketplace.visualstudio.com/*
// @grant        none
// @license      GPLv3
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