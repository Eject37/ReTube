// ==UserScript==
// @name         YouTube Fixer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description YouTube Fixer
// @author       Eject
// @match        *://*.youtube.com/*
// @icon         https://github.com/DaRKLoRDnote7/YouTube-Fixer/raw/main/31232.ico
// @grant        none
// ==/UserScript==

CustomIcon()
Colors()
FocusAndScrollFix()

function CustomIcon() {
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.querySelector('head').children[0].appendChild(link);
    }
    link.href = 'https://github.com/DaRKLoRDnote7/YouTube-Fixer/raw/main/31232.ico';
}
function FocusAndScrollFix() {
    const player = document.querySelector('video.video-stream.html5-main-video')

    player.onmouseenter = () => {
    player.focus()
    scrollTo({top: 0, behavior: 'smooth'})}
}
async function Colors() {
var background = document.head.appendChild(document.createElement('style'))
background.innerHTML = 'html[dark], [dark] {--yt-spec-base-background: #1b222a}'
var notifyBackground = document.head.appendChild(document.createElement('style'))
notifyBackground.innerHTML = 'html[dark], [dark] {--yt-spec-menu-background: #272f38}'
var iconInactive = document.head.appendChild(document.createElement('style'))
iconInactive.innerHTML = 'html[system-icons][dark], html[system-icons] [dark] {--yt-spec-brand-icon-inactive: #b0b9c4}'
var text = document.head.appendChild(document.createElement('style'))
text.innerHTML = 'html[darker-dark-theme][dark], [darker-dark-theme] [dark] {--yt-spec-text-primary: rgb(201 208 211)}'
var searchBoxBackground = document.head.appendChild(document.createElement('style'))
searchBoxBackground.innerHTML = 'html[dark], [dark] {--ytd-searchbox-background: #1b222a}'
var liveChatBackground = document.head.appendChild(document.createElement('style'))
liveChatBackground.innerHTML = 'html[dark] {--yt-live-chat-background-color: #1b222a}'
var a = document.head.appendChild(document.createElement('style'))
a.innerHTML = 'html[dark] {--yt-spec-icon-active-other: #d6deeb}'
var b = document.head.appendChild(document.createElement('style'))
b.innerHTML = 'html[dark] {--yt-spec-brand-icon-active: #b9c8e5}'
var c = document.head.appendChild(document.createElement('style'))
c.innerHTML = 'html[dark], [dark] {--ytd-searchbox-legacy-button-hover-border-color: #818993}'
var d = document.head.appendChild(document.createElement('style'))
d.innerHTML = 'html[dark], [dark] {--ytd-searchbox-legacy-border-color: #60677b42}'
var f = document.head.appendChild(document.createElement('style'))
f.innerHTML = 'html[dark], [dark] {--ytd-searchbox-legacy-button-border-color: #60677b42}'

var g = document.head.appendChild(document.createElement('style'))
g.innerHTML = 'html[dark], [dark] {--yt-spec-static-brand-red: #719dd3}' // Цвет прогресса просмотренных видео

while (true) {
    await new Promise(resolve => setTimeout(resolve, 100))

    try { document.querySelector('.html5-video-player').style.background = "#11161c" } catch { } // Цвет фона плеера

    document.querySelectorAll('#logo-icon').forEach(x => {x.children[0].querySelector('path.style-scope').style.fill = "#3c3c3c"}) // Иконка ютуба
    document.querySelectorAll('#logo-icon').forEach(x => {x.style.fill = "#c8c8c8"}) // Надпись возле иконки
    document.querySelectorAll('#country-code').forEach(x => {x.style.display = "none"}) // Старна возле иконки

    try { document.querySelector('.yt-spec-icon-badge-shape--type-notification .yt-spec-icon-badge-shape__badge').style.backgroundColor = "#426c9d" } catch { } // Задний цвет количества уведомлений
    try { document.querySelectorAll('.ytp-swatch-color').forEach(x => {x.style.color = "#426c9d"}) } catch { } // Цвет надписи HD

    //document.querySelectorAll('.ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox').forEach(x => {x.style.background = "yellow"})
    var checkboxBackground = document.head.appendChild(document.createElement('style'))
    checkboxBackground.innerHTML = '.ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox {background: #3e6bb4}'

    document.querySelectorAll('#footer.ytd-guide-renderer > #vat-notice, #footer.ytd-guide-renderer > #copyright').forEach(x => {x.style.setProperty('display', 'none', 'important')})

    document.querySelector('.ytp-play-progress').style.background = "#5785ba"
    document.querySelectorAll('.ytp-swatch-background-color').forEach(x => {x.style.backgroundColor = '#5785ba'})

    var hdButton = document.head.appendChild(document.createElement('style'))
    hdButton.innerHTML = '.ytp-settings-button.ytp-hd-quality-badge:after {background-color: #3e6bb4}'
}}