// ==UserScript==
// @name         ReTube
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description ReTube
// @author       Eject
// @match        *://*.youtube.com/*
// @icon         https://github.com/Eject37/ReTube/raw/main/yt-favicon2.ico
// @grant        none
// ==/UserScript==

CustomIcon() // Синяя иконка ютуба
//DateTimeCreated() // Дата и время создания видео в конце названия
Colors() // Все цвета и украшения
RemoveNotificationNumber() // Убирает в заголовке страницы количество уведомлений
FocusAndScrollFix() // При наведении на видео, берёт на себя фокус

function CustomIcon() {
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.querySelector('head').children[0].appendChild(link);
    }
    link.href = 'https://github.com/Eject37/ReTube/raw/main/yt-favicon2.ico';
}

function DateTimeCreated() {

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
function isVideoLoaded() { return ( document.querySelector(`ytd-watch-flexy[video-id='${getVideoId()}']`) !== null ); }

var currentVideo = ''
var oldVideoDate = ''
var oldVideoName = ''
var oldWebTabName = ''
Dynamic()
//document.addEventListener('yt-navigate-finish', Dynamic);

function Dynamic() {
if (!window.location.href.includes('watch')) { return }
//if (currentVideo == getVideoId()) { return }
//currentVideo = getVideoId()

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

        /*var videoName = document.querySelectorAll('yt-formatted-string.style-scope.ytd-watch-metadata')[1]
        videoName.textContent = videoName.textContent.replace(' • ' + oldVideoDate, '')
        oldVideoDate = video_date

        //videoName.textContent = videoName.textContent + ` • ${video_date}`
        videoName.append(` • ${video_date}`)
        oldVideoName = videoName.textContent + ` • ${video_date}`
        oldWebTabName = document.title*/

            /*let i = setInterval(function() {
                if (isVideoLoaded) {
                clearInterval(i)
                //alert()
                var videoName = document.querySelectorAll('yt-formatted-string.style-scope.ytd-watch-metadata')[1]
                videoName.textContent = videoName.textContent.replace(' • ' + oldVideoDate, '')
                oldVideoDate = video_date

                videoName.textContent = videoName.textContent + ` • ${video_date}`
                oldVideoName = videoName.textContent + ` • ${video_date}`
                oldWebTabName = document.title
            }}, 100);*/

        const interval = setInterval(setText, 50)
        function setText() {
            try { if (!document.querySelectorAll('yt-formatted-string.style-scope.ytd-watch-metadata')[0].textContent.includes(video_date)) {
            document.querySelectorAll('yt-formatted-string.style-scope.ytd-watch-metadata')[0].append(` • ${video_date}`)
            clearInterval(interval)
        }} catch { } }
    })
}) } catch { }}}

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
var text = document.head.appendChild(document.createElement('style'))
var notifyBackground = document.head.appendChild(document.createElement('style'))
var playlistVideoBackground = document.head.appendChild(document.createElement('style'))
var playlistBackground = document.head.appendChild(document.createElement('style'))
var descBackground = document.head.appendChild(document.createElement('style'))
var buttonsBackgroundHover = document.head.appendChild(document.createElement('style'))
var playlistBackgroundActive = document.head.appendChild(document.createElement('style'))
var linkColor = document.head.appendChild(document.createElement('style'))
var iconInactive = document.head.appendChild(document.createElement('style'))
var searchBoxBackground = document.head.appendChild(document.createElement('style'))
var liveChatBackground = document.head.appendChild(document.createElement('style'))
var a = document.head.appendChild(document.createElement('style'))
var b = document.head.appendChild(document.createElement('style'))
var c = document.head.appendChild(document.createElement('style'))
var d = document.head.appendChild(document.createElement('style'))
var f = document.head.appendChild(document.createElement('style'))
var g = document.head.appendChild(document.createElement('style'))
var videoTimePanel = document.head.appendChild(document.createElement('style'))
var yt_logo_icon = document.head.appendChild(document.createElement('style'))
var yt_logo_icon2 = document.head.appendChild(document.createElement('style'))
var voice_search_button = document.head.appendChild(document.createElement('style'))
var yt_logo_text = document.head.appendChild(document.createElement('style'))
var player_background = document.head.appendChild(document.createElement('style'))
var settings_background_color = document.head.appendChild(document.createElement('style'))
var yt_icon_country = document.head.appendChild(document.createElement('style'))
var yt_notificationBadge_background = document.head.appendChild(document.createElement('style'))
var settings_hd_text = document.head.appendChild(document.createElement('style'))
var tooltip_background_color = document.head.appendChild(document.createElement('style'))
var tooltipVideo_background_color = document.head.appendChild(document.createElement('style'))
var hdButton = document.head.appendChild(document.createElement('style'))
var hd4kButton = document.head.appendChild(document.createElement('style'))
var checkboxBackground = document.head.appendChild(document.createElement('style'))
var subtitlesBackgroundPanelColor = document.head.appendChild(document.createElement('style'))
var playlistCurrentVideoColor = document.head.appendChild(document.createElement('style'))
var videoContextMenu = document.head.appendChild(document.createElement('style'))
var panelComments = document.head.appendChild(document.createElement('style'))
var removals = document.head.appendChild(document.createElement('style'))
var backNextButtons = document.head.appendChild(document.createElement('style'))
var videoPlayProgressBar = document.head.appendChild(document.createElement('style'))
var liveMarker = document.head.appendChild(document.createElement('style'))
var annotationChannel = document.head.appendChild(document.createElement('style'))
var reactionControlPanel = document.head.appendChild(document.createElement('style'))
var searchADS = document.head.appendChild(document.createElement('style'))
var inLiveOverlay = document.head.appendChild(document.createElement('style'))
var buttonWatchLater = document.head.appendChild(document.createElement('style'))
var buttonAddWatchList = document.head.appendChild(document.createElement('style'))


background.innerHTML = 'html[dark], [dark] {--yt-spec-base-background: #1b222a}' // Цвет фона всего ютуба
text.innerHTML = 'html[darker-dark-theme][dark], [darker-dark-theme] [dark] {--yt-spec-text-primary: rgb(201 208 211)}' // Цвет текста всего ютуба
notifyBackground.innerHTML = 'html[dark], [dark] {--yt-spec-menu-background: #272f38c2}' // Цвет фона панели уведомлений
playlistVideoBackground.innerHTML = 'html[dark], [dark] {--yt-spec-raised-background: #272f38}' // Цвет фона добавления в плейлист
playlistBackground.innerHTML = 'html[dark], [dark] {--yt-spec-brand-background-primary: #222b35; --yt-spec-general-background-a: #1b222a}' // Задние цвета активного плейлиста
descBackground.innerHTML = 'html[dark], [dark] {--yt-spec-badge-chip-background: #222b35; --yt-spec-button-chip-background-hover: #262f39}' // Цвет фона описания видео
buttonsBackgroundHover.innerHTML = 'html[dark] {--yt-spec-mono-tonal-hover: #2d3742}' // Цвет фона лайков и прочих кнопок при наведении
playlistBackgroundActive.innerHTML = 'ytd-playlist-panel-renderer[use-color-palette][is-dark-theme] {--yt-active-playlist-panel-background-color: #262f39}' // Цвет фона текущего видео в плейлисте
linkColor.innerHTML = 'html[dark], [dark] {--yt-spec-call-to-action: #7daae9}' // Цвет ссылок
iconInactive.innerHTML = 'html[system-icons][dark], html[system-icons] [dark] {--yt-spec-brand-icon-inactive: #b0b9c4}'
searchBoxBackground.innerHTML = 'html[dark], [dark] {--ytd-searchbox-background: #1b222a}'
liveChatBackground.innerHTML = 'html[dark] {--yt-live-chat-background-color: #1b222a}'
a.innerHTML = 'html[dark] {--yt-spec-icon-active-other: #d6deeb}'
b.innerHTML = 'html[dark] {--yt-spec-brand-icon-active: #b9c8e5}'
c.innerHTML = 'html[dark], [dark] {--ytd-searchbox-legacy-button-hover-border-color: #818993}'
d.innerHTML = 'html[dark], [dark] {--ytd-searchbox-legacy-border-color: #60677b42}'
f.innerHTML = 'html[dark], [dark] {--ytd-searchbox-legacy-button-border-color: #60677b42}'
g.innerHTML = 'html[dark], [dark] {--yt-spec-static-brand-red: #719dd3}' // Цвет прогресса просмотренных видео
videoTimePanel.innerHTML = 'ytd-thumbnail-overlay-time-status-renderer.style-scope.ytd-thumbnail {background: #2d3844ba}' // На главной странице в каждом видео фон рамки с длительносьтю видео
yt_logo_icon.innerHTML = 'svg.external-icon > svg > g > path:nth-child(1) {fill: rgb(60, 60, 60)}' // Иконка ютуба
yt_logo_icon2.innerHTML = '#logo-icon > svg > g > g:nth-child(1) > path:nth-child(1) {fill: rgb(60, 60, 60)}' // Иконка ютуба (старый дизайн)
voice_search_button.innerHTML = '#voice-search-button {display: none}' // Кнопка голосового поиска
yt_logo_text.innerHTML = 'html[dark], [dark] {--yt-spec-wordmark-text: rgb(200, 200, 200)}' // Надпись возле иконки ютуба
player_background.innerHTML = '.html5-video-player {background: rgb(17, 22, 28)}' // Цвет фона плеера
settings_background_color.innerHTML = '#ytp-id-18, #ytp-id-19 {background: rgba(27, 34, 42, 0.85); backdrop-filter: blur(5px)}' // Цвет фона настроек видео
yt_icon_country.innerHTML = '#country-code {display: none}' // Старна возле иконки
yt_notificationBadge_background.innerHTML = '.yt-spec-icon-badge-shape--type-notification .yt-spec-icon-badge-shape__badge {background-color: rgb(66, 108, 157)}' // Цвет бэйджа количества уведомлений
settings_hd_text.innerHTML = 'sup.ytp-swatch-color-white {color: rgb(161, 186, 215)}' // Цвет надписей HD в выборе качества
tooltip_background_color.innerHTML = '.tp-yt-paper-tooltip[style-target=tooltip] {background-color: rgba(51, 62, 74, 0.76)}' // Задний цвет всплывающих подсказок (Нравится, Не нравится..)
tooltipVideo_background_color.innerHTML = '.ytp-tooltip-text.ytp-tooltip-text-no-title {background: rgba(51, 62, 74, 0.76)}' // Задний цвет всплывающих подсказок в видео (Отключить звук и прочее)
hdButton.innerHTML = '.ytp-button.ytp-settings-button.ytp-hd-quality-badge:after {background-color: rgba(87, 138, 217, 0.53)}' // Цвет надписи HD
hd4kButton.innerHTML = '.ytp-button.ytp-settings-button.ytp-4k-quality-badge:after {background-color: rgba(87, 138, 217, 0.53)}' // Цвет надписи 4K
checkboxBackground.innerHTML = '.ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox {background: #3e6bb4 !important}' // Задний цвет тугл кнопок в настройках видео
subtitlesBackgroundPanelColor.innerHTML = '.ytp-chrome-controls .ytp-button[aria-pressed]:after {background-color: rgb(62, 107, 180) !important}' // Цвет полоски снизу включённых субтитров
playlistCurrentVideoColor.innerHTML = 'ytd-playlist-panel-renderer#playlist {--yt-lightsource-secondary-title-color: rgb(201, 208, 211) !important; --yt-lightsource-primary-title-color: rgb(201, 208, 211) !important}' // Цвет текста активного видео в плейлисте (название + канал)
videoContextMenu.innerHTML = '.ytp-popup.ytp-contextmenu {background: rgba(25, 31, 38, 0.85); border-radius: 10px; backdrop-filter: blur(5px)}' // Задний цвет и закругление панели ПКМ по видео
panelComments.innerHTML = 'html[dark], [dark] {--yt-spec-outline: rgb(48, 58, 68)}' // Панель упорядочить в комментариях
removals.innerHTML = '#footer, #items > ytd-guide-entry-renderer:nth-child(4), #items > ytd-guide-entry-renderer:nth-child(3), #items > ytd-guide-entry-renderer:nth-child(2) {display: none}' // Убирает лишние элементы с левой панели
backNextButtons.innerHTML = 'a.ytp-next-button.ytp-button, a.ytp-prev-button.ytp-button {display: none}' // Убирает кнопку вперёд и назад в плеере
videoPlayProgressBar.innerHTML = '.ytp-swatch-background-color {background: rgb(87, 133, 186) !important}' // Полоска прогресса видео
liveMarker.innerHTML = '.ytp-live-badge[disabled]:before {background: rgb(87, 133, 186) !important}' // Круглый значок 'В эфире'
annotationChannel.innerHTML = '.annotation.annotation-type-custom.iv-branding {display: none}' // Аннотация канала в конце видео
reactionControlPanel.innerHTML = '#reaction-control-panel {display: none}' // Панель реакция на трансляции в чате
searchADS.innerHTML = '.sbfl_a {display: none}' // Надпись пожаловаться на поисковые подсказки
inLiveOverlay.innerHTML = 'html[dark], [dark] {--yt-spec-static-overlay-background-brand: rgb(75, 93, 127)}' // Кнопка/надпись на главной странице В эфире под видео
buttonWatchLater.innerHTML = 'html[dark], [dark] {--yt-spec-static-overlay-background-heavy: rgb(9, 20, 32, 0.4)}' // Кнопка на видео добавить в смотреть позже
buttonAddWatchList.innerHTML = '[role="button"][aria-label="Добавить в очередь"] {display: none}' // Кнопка на видео добавить в очередь

setInterval(function() {
    try { document.querySelectorAll('#top-level-buttons-computed > ytd-button-renderer > yt-button-shape > button').forEach(x => { if (x.ariaLabel.includes('Поделиться')) x.parentElement.parentElement.style.display = 'none'}) } catch { }
    try { document.querySelectorAll('#top-level-buttons-computed > ytd-button-renderer > yt-button-shape > button').forEach(x => { if (x.ariaLabel.includes('Поділитися')) x.parentElement.parentElement.style.display = 'none'}) } catch { }
    try { document.querySelector('#flexible-item-buttons > ytd-download-button-renderer > ytd-button-renderer').parentElement.style.display = 'none' } catch { }
    try { document.querySelectorAll('#flexible-item-buttons > ytd-button-renderer > yt-button-shape > button').forEach(x => { if (x.ariaLabel.includes('Спасибо')) x.parentElement.parentElement.style.display = 'none'}) } catch { }
    try { document.querySelectorAll('#flexible-item-buttons > ytd-button-renderer > yt-button-shape > button').forEach(x => { if (x.ariaLabel.includes('Дякую')) x.parentElement.parentElement.style.display = 'none'}) } catch { }
    try { document.querySelectorAll('.yt-spec-button-shape-next--icon-leading').forEach(x => {if (x.ariaLabel.includes('клип') || x.ariaLabel.includes('Поделиться')) { x.parentElement.parentElement.style.display = 'none' }}) } catch { }
    try { document.querySelectorAll('.yt-spec-button-shape-next--icon-leading').forEach(x => {if (x.ariaLabel.includes('кліп') || x.ariaLabel.includes('Поділитися')) { x.parentElement.parentElement.style.display = 'none' }}) } catch { }
}, 250)

//document.querySelectorAll('#top-level-buttons-computed > ytd-button-renderer > yt-button-shape > button').forEach(x => { if (x.ariaLabel.includes('Поделиться')) x.parentElement.parentElement.style.display = 'none'})
//await new Promise(resolve => setTimeout(resolve, 5))
}

function getProp(param, after = null, prop) {
    return after == null ? window.getComputedStyle(param).getPropertyValue(prop) :
    window.getComputedStyle(param, after).getPropertyValue(prop)
}