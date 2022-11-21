// ==UserScript==
// @name         ReTube
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description ReTube
// @author       Eject
// @match        *://*.youtube.com/*
// @icon         https://github.com/DaRKLoRDnote7/ReTube/raw/main/31232.ico
// @grant        none
// ==/UserScript==

CustomIcon()
DateTimeCreated()
Colors()
RemoveNotificationNumber()
FocusAndScrollFix()

function CustomIcon() {
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.querySelector('head').children[0].appendChild(link);
    }
    link.href = 'https://github.com/DaRKLoRDnote7/ReTube/raw/main/31232.ico';
}

function DateTimeCreated() {

if (!window.location.href.includes('watch')) { return }

function getVideoId() {
    const urlObject = new URL(window.location.href);
    const pathname = urlObject.pathname;
    if (pathname.startsWith("/clip")) {
        return document.querySelector("meta[itemprop='videoId']").content;
    } else {
        if (pathname.startsWith("/shorts")) {
            return pathname.slice(8);
        }
        return urlObject.searchParams.get("v");
    }
}

const api = 'AIzaSyDlRKyiwxqBIU8Yt2k6x7WlKQQJiz9YsnE'


try { fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${getVideoId()}&key=${api}`).then((response) => {
    response.json().then((json) => {
        const dateCreated = json.items[0].snippet.publishedAt
        const full = dateCreated.replace('-', '.').replace('-', '.').replace('T', ' ').replace('Z', '')
        const day = full.split('.')[2].split(' ')[0]
        const month = full.split('.')[1]
        const year = full.split('.')[0]
        const time = full.split(' ')[1].split('.')[0]
        let video_date = `${day}.${month}.${year} ${time}`

        const interval = setInterval(setText, 50)
        function setText() {
            try { if (!document.querySelectorAll('yt-formatted-string.style-scope.ytd-watch-metadata')[1].textContent.includes(video_date)) {
            document.querySelectorAll('yt-formatted-string.style-scope.ytd-watch-metadata')[1].append(` • ${video_date}`)
            clearInterval(interval)
        }} catch { } }
    })
}) } catch { }

}

function RemoveNotificationNumber () {
    new MutationObserver((e) => {
    if (e[0].addedNodes[0].data != e[0].removedNodes[0].data) {
        document.title = document.title.replace(/^(\(\d*\))\s*/, "");
    }
    }).observe(document.querySelector("title"), { childList: true, characterDataOldValue: true });
}

function FocusAndScrollFix() {
const player = document.querySelector('video.video-stream.html5-main-video')

player.onmouseenter = async () => {
    scrollTo({top: 0, behavior: 'smooth'})
    await new Promise(resolve => setTimeout(resolve, 140))
    player.focus()
}}

function Colors() {
var background = document.head.appendChild(document.createElement('style'))
background.innerHTML = 'html[dark], [dark] {--yt-spec-base-background: #1b222a}' // Цвет фона всего ютуба

var text = document.head.appendChild(document.createElement('style'))
text.innerHTML = 'html[darker-dark-theme][dark], [darker-dark-theme] [dark] {--yt-spec-text-primary: rgb(201 208 211)}' // Цвет текста всего ютуба

var notifyBackground = document.head.appendChild(document.createElement('style'))
notifyBackground.innerHTML = 'html[dark], [dark] {--yt-spec-menu-background: #272f38c2}' // Цвет фона панели уведомлений

var playlistBackground = document.head.appendChild(document.createElement('style'))
playlistBackground.innerHTML = 'html[dark], [dark] {--yt-spec-brand-background-primary: #222b35; --yt-spec-general-background-a: #1b222a}' // Задние цвета активного плейлиста

var descBackground = document.head.appendChild(document.createElement('style'))
descBackground.innerHTML = 'html[dark], [dark] {--yt-spec-badge-chip-background: #222b35; --yt-spec-button-chip-background-hover: #262f39}' // Цвет фона описания видео

var buttonsBackgroundHover = document.head.appendChild(document.createElement('style'))
buttonsBackgroundHover.innerHTML = 'html[dark] {--yt-spec-mono-tonal-hover: #2d3742}' // Цвет фона лайков и прочих кнопок при наведении

var playlistBackgroundActive = document.head.appendChild(document.createElement('style'))
playlistBackgroundActive.innerHTML = 'ytd-playlist-panel-renderer[use-color-palette][is-dark-theme] {--yt-active-playlist-panel-background-color: #262f39}' // Цвет фона текущего видео в плейлисте

var linkColor = document.head.appendChild(document.createElement('style'))
linkColor.innerHTML = 'html[dark], [dark] {--yt-spec-call-to-action: #7daae9}' // Цвет ссылок

var iconInactive = document.head.appendChild(document.createElement('style'))
iconInactive.innerHTML = 'html[system-icons][dark], html[system-icons] [dark] {--yt-spec-brand-icon-inactive: #b0b9c4}'
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

var videoTimePanel = document.head.appendChild(document.createElement('style'))
videoTimePanel.innerHTML = 'ytd-thumbnail-overlay-time-status-renderer.style-scope.ytd-thumbnail {background: #2d3844ba}' // На главное странице в каждом видео фон рамки со длительносьтю видео

setInterval(DynamicColors, 5)

function DynamicColors() {
    try { if (!getProp(document.querySelector('.html5-video-player'), null, 'background').includes('rgb(17, 22, 28)')) {
    document.querySelector('.html5-video-player').style.background = "#11161c" }} catch { } // Цвет фона плеера

    try { if (!getProp(document.querySelector('#ytp-id-18'), null, 'background').includes('rgba(27, 34, 42, 0.85)')) {
    document.querySelector('#ytp-id-18').style.background = 'rgba(27, 34, 42, 0.85)' }} catch { } // Цвет фона настроек видео

    try { if(!getProp(document.querySelector('#logo-icon').children[0].querySelector('path.style-scope'), null, 'fill').includes('rgb(60, 60, 60)')) {
    document.querySelectorAll('#logo-icon').forEach(x => {x.children[0].querySelector('path.style-scope').style.fill = "#3c3c3c"}) }} catch { } // Иконка ютуба

    try { if (!getProp(document.querySelector('#logo-icon'), null, 'fill').includes('rgb(200, 200, 200)')) {
    document.querySelectorAll('#logo-icon').forEach(x => {x.style.fill = "#c8c8c8"}) }} catch { } // Надпись возле иконки

    try { if (!getProp(document.querySelector('#country-code'), null, 'display').includes('none')) {
    document.querySelectorAll('#country-code').forEach(x => {x.style.display = "none"}) }} catch { } // Старна возле иконки

    try { if(!getProp(document.querySelector('.yt-spec-icon-badge-shape--type-notification .yt-spec-icon-badge-shape__badge'), null, 'background-color').includes('rgb(66, 108, 157)')) {
    document.querySelector('.yt-spec-icon-badge-shape--type-notification .yt-spec-icon-badge-shape__badge').style.backgroundColor = "#426c9d" }} catch { } // Задний цвет количества уведомлений

    try { if (!getProp(document.querySelector('.ytp-swatch-color'), null, 'color').includes('rgb(66, 108, 157)')) {
    document.querySelectorAll('.ytp-swatch-color').forEach(x => {x.style.color = "#426c9d"}) }} catch { } // Цвет надписей HD в выборе качества

    try { const doc = document.querySelectorAll('.tp-yt-paper-tooltip[style-target=tooltip]')
    doc.forEach(x => { if (!getProp(x, null, 'background-color').includes('rgba(51, 62, 74, 0.76)')) {
    document.querySelectorAll('.tp-yt-paper-tooltip[style-target=tooltip]').forEach(x => {x.style.backgroundColor = '#333e4ac2'}) }})} catch { } // Задний цвет всплывающих подсказок

    try { if (!getProp(document.querySelector('.ytp-tooltip-text'), null, 'background').includes('rgba(51, 62, 74, 0.76)')) {
    document.querySelector('.ytp-tooltip-text').style.background = "#333e4ac2" }} catch { } // Задний цвет всплывающих подсказок в видео (Отключить звук и прочее)

    try { if (getProp(document.querySelector('.ytp-hd-quality-badge'), ':after', 'background-color') != 'rgb(62, 107, 180)') {
    var hdButton = document.head.appendChild(document.createElement('style'))
    hdButton.innerHTML = '.ytp-settings-button.ytp-hd-quality-badge:after {background-color: #3e6bb4}' }} catch { } // Цвет надписи HD

    try { if (!getProp(document.querySelector('.ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox'), null, 'background').includes('rgb(62, 107, 180)')) {
    var checkboxBackground = document.head.appendChild(document.createElement('style'))
    checkboxBackground.innerHTML = '.ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox {background: #3e6bb4}' }} catch { } // Задний цвет тугл кнопок в настройках видео

    try { if (!getProp(document.querySelector('.ytp-chrome-controls .ytp-button[aria-pressed]'), ':after', 'background-color').includes('rgb(62, 107, 180)')) {
    var subtitlesBackgroundPanelColor = document.head.appendChild(document.createElement('style'))
    subtitlesBackgroundPanelColor.innerHTML = '.ytp-chrome-controls .ytp-button[aria-pressed]:after {background-color: rgb(62, 107, 180)}' }} catch { } // Цвет полоски снизу включённых субтитров

    try { if (!getProp(document.querySelector('ytd-playlist-panel-video-renderer[selected][use-color-palette] #video-title'), null, 'color').includes('rgb(201, 208, 211)')) {
    document.querySelector('ytd-playlist-panel-video-renderer[selected][use-color-palette] #video-title').style.color = 'rgb(201 208 211)'
    document.querySelector('ytd-playlist-panel-video-renderer[selected][use-color-palette] #byline').style.color = 'rgb(201 208 211)' }} catch { } // Цвет фона текущего видео в плейлисте

    try { if (!getProp(document.querySelector('.ytp-popup.ytp-contextmenu'), null, 'background').includes('rgba(25, 31, 38, 0.85)') || !getProp(document.querySelector('.ytp-popup.ytp-contextmenu'), null, 'border-radius').includes('10px')) {
    document.querySelector('.ytp-popup.ytp-contextmenu').style.background = 'rgba(25, 31, 38, 0.85)'
    document.querySelector('.ytp-popup.ytp-contextmenu').style.borderRadius = '10px' }} catch { } // Задний цвет и закругление панели ПКМ по видео

    try { if (!getProp(document.querySelector('tp-yt-paper-listbox.yt-dropdown-menu'), null, 'background-color').includes('rgb(39, 47, 56)')) {
    document.querySelectorAll('tp-yt-paper-listbox.yt-dropdown-menu').forEach(x => {x.style.backgroundColor = '#272f38'}) }} catch { } // Панель упорядочить в комментариях

    try { if (!getProp(document.querySelector('#footer.ytd-guide-renderer > #vat-notice, #footer.ytd-guide-renderer > #copyright'), null, 'display').includes('none')) {
    document.querySelectorAll('#footer.ytd-guide-renderer > #vat-notice, #footer.ytd-guide-renderer > #copyright').forEach(x => {x.style.setProperty('display', 'none', 'important')}) }} catch { } // Убирает копирайт с левой панели

    try { if (!getProp(document.querySelector('a.ytp-next-button.ytp-button'), null, 'display').includes('none')) {
    document.querySelectorAll('a.ytp-next-button.ytp-button').forEach(x => {x.style.setProperty('display', 'none', 'important')}) }} catch { } // Убирает кнопку вперёд в плеере

    try { const doc = document.querySelectorAll('.ytp-play-progress')
    if (!getProp(doc[doc.length - 1], null, 'background').includes('rgb(87, 133, 186)')) {
    document.querySelectorAll('.ytp-play-progress').forEach(x => {x.style.background = "#5785ba"}) }} catch { } // Полоска прогресса видео

    try { const doc = document.querySelectorAll('.ytp-swatch-background-color')
    if (!getProp(doc[doc.length - 1], null, 'background-color').includes('rgb(87, 133, 186)')) {
    document.querySelectorAll('.ytp-swatch-background-color').forEach(x => {x.style.backgroundColor = '#5785ba'}) }} catch { } // Круглая фигня прогресса видео

    //await new Promise(resolve => setTimeout(resolve, 5))
}}

function getProp(param, after = null, prop) {
    return after == null ? window.getComputedStyle(param).getPropertyValue(prop) :
    window.getComputedStyle(param, after).getPropertyValue(prop)
}