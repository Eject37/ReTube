// ==UserScript==
// @name         YouTube Favicon
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  YouTube Favicon
// @author       You
// @match        *://*.youtube.com/*
// @icon         https://github.com/DaRKLoRDnote7/ReTube/raw/main/Other/123.ico
// @grant        none
// ==/UserScript==

var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.querySelector('head').children[0].appendChild(link);
    }
link.href = 'https://github.com/DaRKLoRDnote7/ReTube/raw/main/Other/123.ico';