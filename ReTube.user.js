// ==UserScript==
// @name         ReTube
// @namespace    http://tampermonkey.net/
// @version      2.4
// @description ReTube
// @author       Eject
// @match        *://*.youtube.com/*
// @icon         https://github.com/Eject37/ReTube/raw/main/yt-favicon2.ico
// @grant        none
// ==/UserScript==

//FixSubscriptions() // Можно нажимать на кнопку подписок
CustomIcon() // Синяя иконка ютуба
//DateTimeCreated() // Дата и время создания видео в конце названия
Colors() // Все цвета и украшения
RemoveNotificationNumber() // Убирает в заголовке страницы количество уведомлений
FocusAndScrollFix() // При наведении на видео, берёт на себя фокус

function FixSubscriptions() {
	window.onload = (event) => {
  const subButton = document.querySelectorAll('#guide-section-title')[1]

		subButton.onclick = () => { open('feed/subscriptions') }
		subButton.onmouseover = () => {
                subButton.style.cursor = 'pointer'
                subButton.style.textDecoration = 'underline'
            }
		subButton.onmouseleave = () => { subButton.style.textDecoration = '' }
		subButton.style.maxWidth = '40px'
}
}

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

Dynamic()
//document.addEventListener('yt-navigate-finish', Dynamic);

function Dynamic() {
if (!window.location.href.includes('watch')) { return }

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
var player_background_fullScreen = document.head.appendChild(document.createElement('style'))
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
var videoContextMenuFixCheckbox = document.head.appendChild(document.createElement('style'))
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
var buttonKeyboardSearch = document.head.appendChild(document.createElement('style'))
var buttonAutoPlay = document.head.appendChild(document.createElement('style'))
var buttonTranslationTV = document.head.appendChild(document.createElement('style'))
var buttonMiniPlayer = document.head.appendChild(document.createElement('style'))
var buttonBuyPremium = document.head.appendChild(document.createElement('style'))
var buttonsInAccount = document.head.appendChild(document.createElement('style'))
var shortsIcon = document.head.appendChild(document.createElement('style'))
var searchboxText = document.head.appendChild(document.createElement('style'))


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
yt_logo_icon.innerHTML = 'svg.external-icon > svg > g > path:nth-child(1) {fill: rgb(60, 65, 70)}' // Иконка ютуба
yt_logo_icon2.innerHTML = '#logo-icon > svg > g > g:nth-child(1) > path:nth-child(1) {fill: rgb(60, 65, 70)}' // Иконка ютуба (старый дизайн)
voice_search_button.innerHTML = '#voice-search-button {display: none}' // Кнопка голосового поиска
yt_logo_text.innerHTML = 'html[dark], [dark] {--yt-spec-wordmark-text: rgb(200, 200, 200)}' // Надпись возле иконки ютуба
player_background.innerHTML = '.html5-video-player {background: rgb(17, 22, 28)}' // Цвет фона плеера
player_background_fullScreen.innerHTML = '.html5-video-player[aria-label*="в "] {background: rgb(0, 0, 0)}' // Цвет фона плеера в полном экране
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
videoContextMenuFixCheckbox.innerHTML = '.ytp-contextmenu .ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox {background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgdmVyc2lvbj0iMS4xIj48cGF0aCBkPSJNOSAxNi4yTDQuOCAxMmwtMS40IDEuNEw5IDE5IDIxIDdsLTEuNC0xLjRMOSAxNi4yeiIgZmlsbD0iI2ZmZiIgLz48L3N2Zz4=) !important;}' // Фикс отображения чекбокса
panelComments.innerHTML = 'html[dark], [dark] {--yt-spec-outline: rgb(48, 58, 68)}' // Панель упорядочить в комментариях
removals.innerHTML = '#footer, #items > ytd-guide-entry-renderer:nth-child(4), #items > ytd-guide-entry-renderer:nth-child(3), #items > ytd-guide-entry-renderer:nth-child(2) {display: none}' // Убирает лишние элементы с левой панели
backNextButtons.innerHTML = 'a.ytp-next-button.ytp-button, a.ytp-prev-button.ytp-button {display: none}' // Убирает кнопку вперёд и назад в плеере
videoPlayProgressBar.innerHTML = '.ytp-swatch-background-color {background: rgb(87, 133, 186) !important}' // Полоска прогресса видео filter: drop-shadow(0 0 7px rgba(87,133,186,0.7));
liveMarker.innerHTML = '.ytp-live-badge[disabled]:before {background: rgb(87, 133, 186) !important}' // Круглый значок 'В эфире'
annotationChannel.innerHTML = '.annotation.annotation-type-custom.iv-branding {display: none}' // Аннотация канала в конце видео
reactionControlPanel.innerHTML = '#reaction-control-panel {display: none}' // Панель реакция на трансляции в чате
searchADS.innerHTML = '.sbfl_a {display: none}' // Надпись пожаловаться на поисковые подсказки
inLiveOverlay.innerHTML = 'html[dark], [dark] {--yt-spec-static-overlay-background-brand: rgb(75, 93, 127)}' // Кнопка/надпись на главной странице В эфире под видео
buttonWatchLater.innerHTML = 'html[dark], [dark] {--yt-spec-static-overlay-background-heavy: rgb(9, 20, 32, 0.4)}' // Кнопка на видео добавить в смотреть позже
buttonAddWatchList.innerHTML = '[role="button"][aria-label="Добавить в очередь"] {display: none}' // Кнопка на видео добавить в очередь
buttonKeyboardSearch.innerHTML = '.gsst_a {display: none !important}' // Кнопка клавиатуры при поиске видео
buttonAutoPlay.innerHTML = 'button[title*="Автовоспроизведение"] {display: none !important}' // Кнопка автовоспроизвидения в плеере
buttonTranslationTV.innerHTML = '.ytp-button.ytp-remote-button {display: none !important}' // Кнопка трансляции на телевизор в плеере
buttonMiniPlayer.innerHTML = '.ytp-button.ytp-miniplayer-button {display: none !important}' // Кнопка мини-плеера в плеере
buttonBuyPremium.innerHTML = '#premium-upsell-link, .ytd-guide-renderer.style-scope:nth-of-type(4) {display: none}' // Кнопка оформить youtube premium
buttonsInAccount.innerHTML = 'yt-multi-page-menu-section-renderer:nth-child(5) {display: none}' // Кнопки справка и отправить отзыв в меню аккаунта
shortsIcon.innerHTML = '#icon > yt-icon-shape > icon-shape > div > svg > g > path {fill: #50505f}' // Иконка YouTube Shorts при поиске видео
searchboxText.innerHTML = 'html[dark], [dark] {--ytd-searchbox-text-color: rgb(201, 208, 211)}' // Цвет текста в поисковой строке


var font = document.head.appendChild(document.createElement('style'))
var font2 = document.head.appendChild(document.createElement('style'))
var font3 = document.head.appendChild(document.createElement('style'))
var font4 = document.head.appendChild(document.createElement('style'))
var font5 = document.head.appendChild(document.createElement('style'))
var font6 = document.head.appendChild(document.createElement('style'))
var font7 = document.head.appendChild(document.createElement('style'))
var font8 = document.head.appendChild(document.createElement('style'))

font.innerHTML = '@import url(https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap);'
font2.innerHTML = 'yt-formatted-string.style-scope.ytd-rich-grid-media, span.style-scope.ytd-video-meta-block {font-family: Ubuntu !important; font-weight: 400 !important; font-style: normal !important;}'
font3.innerHTML = 'span.style-scope.ytd-compact-radio-renderer {font-family: Ubuntu !important; font-weight: 700 !important; font-style: normal !important;}'
font4.innerHTML = 'ytd-rich-grid-renderer.style-scope.ytd-two-column-browse-results-renderer, ytd-guide-section-renderer.style-scope.ytd-guide-renderer {font-family: Ubuntu !important;}'
font5.innerHTML = 'div.style-scope.ytd-rich-grid-row {font-weight: 400 !important;}'
font6.innerHTML = 'span.style-scope.ytd-comment-renderer {font-family: Ubuntu !important; font-weight: 500 !important;}'
font7.innerHTML = 'yt-formatted-string.style-scope.ytd-toggle-button-renderer.style-default-active {font-family: Ubuntu !important; font-weight: 700 !important;}'

font8.innerHTML = 'a.yt-simple-endpoint.style-scope.yt-formatted-string, tp-yt-paper-item.style-scope.ytd-guide-entry-renderer, iron-selector.style-scope.ytd-feed-filter-chip-bar-renderer, ' +
	'yt-formatted-string.title.style-scope.ytd-guide-entry-renderer, span.style-scope.ytd-rich-grid-slim-media, yt-formatted-string.style-scope.ytd-video-primary-info-renderer, div.style-scope.ytd-video-primary-info-renderer, ' +
	'div.top-level-buttons.style-scope.ytd-menu-renderer, div.style-scope.ytd-expander, a.yt-simple-endpoint.style-scope.ytd-rich-metadata-renderer, div.style-scope.ytd-rich-metadata-renderer, ' +
	'yt-formatted-string.less-button.style-scope.ytd-video-secondary-info-renderer, span.style-scope.yt-formatted-string, div.style-scope.yt-dropdown-menu, yt-formatted-string.style-scope.ytd-subscribe-button-renderer, ' +
	'yt-formatted-string.style-scope.ytd-button-renderer.style-suggestive.size-default, span.style-scope.ytd-compact-video-renderer, yt-formatted-string.style-scope.ytd-channel-name, ' +
	'yt-formatted-string.style-scope.ytd-button-renderer.style-default.size-default, yt-formatted-string.style-scope.ytd-toggle-button-renderer.style-text, yt-formatted-string.style-scope.yt-chip-cloud-chip-renderer, ' +
	'span.style-scope.ytd-compact-playlist-renderer, yt-formatted-string.message.style-scope.ytd-notification-renderer, yt-formatted-string.style-scope.ytd-simple-menu-header-renderer, ' +
	'yt-formatted-string.style-scope.ytd-compact-link-renderer, yt-formatted-string.style-scope.ytd-c4-tabbed-header-renderer, yt-formatted-string.title.style-scope.ytd-recognition-shelf-renderer, ' +
	'yt-formatted-string.subtitle.style-scope.ytd-recognition-shelf-renderer, span.style-scope.ytd-shelf-renderer, yt-formatted-string.style-scope.ytd-button-renderer.style-text.size-default, ' +
	'a.yt-simple-endpoint.style-scope.ytd-grid-video-renderer, yt-formatted-string.can-be-empty.style-scope.ytd-shelf-renderer, span.style-scope.ytd-grid-video-renderer, span.style-scope.ytd-badge-supported-renderer' +
	'yt-formatted-string.style-scope.ytd-channel-renderer, span.style-scope.ytd-channel-renderer, div.tab-content.style-scope.tp-yt-paper-tab, yt-formatted-string.style-scope.ytd-channel-about-metadata-renderer, ' +
	'yt-formatted-string.subheadline.style-scope.ytd-channel-about-metadata-renderer, div.style-scope.ytd-c4-tabbed-header-renderer, div.banner-visible-area.style-scope.ytd-c4-tabbed-header-renderer, ' +
	'ytd-browse.style-scope.ytd-page-manager, #search-input input, span.style-scope.ytd-rich-shelf-renderer, div span b, div div b, div.sbsb_a, span.sbpqs_a, li.sbsb_c.gsfs, ' +
	'yt-formatted-string.style-scope.ytd-reel-player-header-renderer, yt-formatted-string.style-scope.ytd-button-renderer, yt-formatted-string.style-scope.ytd-comment-renderer, div.style-scope.yt-formatted-string, ' +
	'div.style-scope.ytd-watch-flexy, yt-formatted-string.more-button.style-scope.ytd-video-secondary-info-renderer, yt-formatted-string.style-scope.ytd-sponsorships-tier-renderer, ' +
	'yt-formatted-string.style-scope.ytd-sponsorships-offer-renderer, div.scrollable.style-scope.tp-yt-paper-dialog-scrollable, yt-formatted-string.style-scope.ytd-sponsorships-perk-renderer, ' +
	'div.header.style-scope.ytd-playlist-panel-renderer, yt-formatted-string.title.style-scope.ytd-playlist-panel-renderer, yt-formatted-string.publisher.style-scope.ytd-playlist-panel-renderer, ' +
	'span.style-scope.ytd-playlist-panel-video-renderer, button.style-scope.yt-icon-button, yt-formatted-string.style-scope.ytd-button-renderer.style-primary.size-default, span.view-count.style-scope.ytd-video-view-count-renderer, ' +
	'yt-formatted-string.style-scope.ytd-video-owner-renderer, button.ytp-button.ytp-settings-button.ytp-hd-quality-badge, div.ytp-bezel-text-wrapper, span.ytp-time-duration, span.ytp-time-current, span.ytp-time-remaining-duration, ' +
	'div.ytp-left-controls, span.ytp-time-separator, a.yt-simple-endpoint.style-scope.ytd-playlist-video-renderer, div.ytp-chapter-title-content, span.ytp-time-display.notranslate, a.yt-simple-endpoint.style-scope.ytd-video-renderer, ' +
	'yt-formatted-string.style-scope.ytd-video-renderer, a.yt-simple-endpoint.style-scope.ytd-grid-playlist-renderer, span.ytp-caption-segment, a.ytp-title-link.yt-uix-sessionlink.ytp-title-fullerscreen-link, div.ytp-menuitem-label ' +
	'{font-family: Ubuntu !important; font-weight: 400 !important;}'

setInterval(function() {
    try { document.querySelectorAll('#top-level-buttons-computed > ytd-button-renderer > yt-button-shape > button').forEach(x => { if (x.ariaLabel.includes('Поделиться')) x.parentElement.parentElement.style.display = 'none'}) } catch { }
    try { document.querySelectorAll('#top-level-buttons-computed > ytd-button-renderer > yt-button-shape > button').forEach(x => { if (x.ariaLabel.includes('Поділитися')) x.parentElement.parentElement.style.display = 'none'}) } catch { }
    try { document.querySelector('#flexible-item-buttons > ytd-download-button-renderer > ytd-button-renderer').parentElement.style.display = 'none' } catch { }
    try { document.querySelectorAll('#flexible-item-buttons > ytd-button-renderer > yt-button-shape > button').forEach(x => { if (x.ariaLabel.includes('Спасибо')) x.parentElement.parentElement.style.display = 'none'}) } catch { }
    try { document.querySelectorAll('#flexible-item-buttons > ytd-button-renderer > yt-button-shape > button').forEach(x => { if (x.ariaLabel.includes('Дякую')) x.parentElement.parentElement.style.display = 'none'}) } catch { }
    try { document.querySelectorAll('.yt-spec-button-shape-next--icon-leading').forEach(x => {if (x.ariaLabel.includes('клип') || x.ariaLabel.includes('Поделиться')) { x.parentElement.parentElement.style.display = 'none' }}) } catch { }
    try { document.querySelectorAll('.yt-spec-button-shape-next--icon-leading').forEach(x => {if (x.ariaLabel.includes('кліп') || x.ariaLabel.includes('Поділитися')) { x.parentElement.parentElement.style.display = 'none' }}) } catch { }
	try { document.querySelector('.searchbox').textContent = document.querySelector('.searchbox').textContent.replace('webkit-input-placeholder{color:#888}', 'webkit-input-placeholder{color:rgb(151, 158, 161)}') } catch { }
}, 250)

//document.querySelectorAll('#top-level-buttons-computed > ytd-button-renderer > yt-button-shape > button').forEach(x => { if (x.ariaLabel.includes('Поделиться')) x.parentElement.parentElement.style.display = 'none'})
//await new Promise(resolve => setTimeout(resolve, 5))
}

function getProp(param, after = null, prop) {
    return after == null ? window.getComputedStyle(param).getPropertyValue(prop) :
    window.getComputedStyle(param, after).getPropertyValue(prop)
}