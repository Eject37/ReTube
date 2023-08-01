// ==UserScript==
// @name         ReTube
// @namespace    http://tampermonkey.net/
// @version      3.11
// @description ReTube
// @author       Eject
// @match        *://*.youtube.com/*
// @icon          https://github.com/Eject37/ReTube/raw/main/yt-favicon2.ico
// @updateURL  https://github.com/Eject37/ReTube/raw/main/ReTube.user.js
// @downloadURL  https://github.com/Eject37/ReTube/raw/main/ReTube.user.js
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

(async () => {
	var RTfirstLaunch = await GM_getValue('rt-firstLaunch')
	var RTcolors = await GM_getValue('rt-colors') == 'true'
	var RTanimateLoad = await GM_getValue('rt-animateLoad') == 'true'
	var RThideAllTrash = await GM_getValue('rt-hideAllTrash') == 'true'
	var RTwatchedVideo = await GM_getValue('rt-watchedVideo') == 'true'
	var RTbetterFont = await GM_getValue('rt-betterFont') == 'true'
	var RTvideoDateCreated = await GM_getValue('rt-videoDateCreated') == 'true'
	var RTfocusFix = await GM_getValue('rt-focusFix') == 'true'
	var RTnotificationsRemove = await GM_getValue('rt-notificationsRemove') == 'true'
	var RTcustomTitleIcon = await GM_getValue('rt-customTitleIcon') == 'true'
	var RTSettingsDateOnVideoBackgroundChange = await GM_getValue('rt-settings-dateOnVideoBackgroundChange') == 'true'
	var RTColorWatchedLabelBackground = await GM_getValue('rt-color-watchedLabelBackground') ?? '#343a41'
	var RTColorWatchedBackground = await GM_getValue('rt-color-watchedBackground') ?? '#ffffff'

	if (RTanimateLoad) {
		const animationStyle = document.head.appendChild(document.createElement('style'))
		animationStyle.id = 'rtAnim'
		animationStyle.innerHTML += 'body, ytd-app, #background.ytd-masthead, #container.ytd-searchbox, #chips-wrapper.ytd-feed-filter-chip-bar-renderer, yt-chip-cloud-chip-renderer[chip-style=STYLE_HOME_FILTER], yt-chip-cloud-chip-renderer[chip-style=STYLE_REFRESH_TO_NOVEL_CHIP], #guide-content.ytd-app, ytd-mini-guide-renderer, ytd-mini-guide-entry-renderer, #description.ytd-watch-metadata, .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal, yt-chip-cloud-chip-renderer[chip-style=STYLE_DEFAULT], .ytp-swatch-background-color, .header.ytd-playlist-panel-renderer, .badge-style-type-medium-grey.ytd-badge-supported-renderer, .playlist-items.ytd-playlist-panel-renderer, ytd-playlist-panel-video-renderer[selected][use-color-palette]' +
			'{transition: background-color 1s cubic-bezier(.21,.98,1,1); transition-delay: 1.25s; animation: 1s show cubic-bezier(0, 0, 0.5, 1)} @keyframes show { 0% { opacity: 0; } 50% { opacity: 0; } 95% { opacity: 0.95; } 100% { opacity: 1; } }'
	}

	if (RTvideoDateCreated) { document.addEventListener('yt-navigate-finish', DateTimeCreated) }

	if (document.readyState !== 'loading') ReTube()
	else document.addEventListener('DOMContentLoaded', ReTube)

	async function ReTube() {
		if (!RTfirstLaunch) {
			alert('ReTube.\nЧто-бы открыть меню настроек, нажмите F2 находясь на сайте ютуба.')
			GM_setValue('rt-firstLaunch', 'yes')
		}

		if (RTcustomTitleIcon) CustomIcon() // Синяя иконка ютуба
		if (RTnotificationsRemove) RemoveNotificationNumber() // Убирает в заголовке страницы количество уведомлений
		if (RTfocusFix) FocusAndScrollFix() // При наведении на видео, берёт на себя фокус

		const styles = document.head.appendChild(document.createElement('style'));
		styles.innerHTML = '@import url(https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap);' // Импорт шрифта (не трогать)

		if (RTcolors) {
			styles.innerHTML +=
				'html[dark], [dark] {--yt-spec-base-background: #1b222a}' + // Цвет фона всего ютуба
				'html[darker-dark-theme][dark], [darker-dark-theme] [dark] {--yt-spec-text-primary: rgb(201 208 211)}' + // Цвет текста всего ютуба
				'html[dark], [dark] {--yt-spec-menu-background: #272f38c2}' + // Цвет фона панели уведомлений
				'html[dark], [dark] {--yt-spec-raised-background: #272f38}' + // Цвет фона добавления в плейлист
				'html[dark], [dark] {--yt-spec-brand-background-primary: #222b35; --yt-spec-general-background-a: #1b222a}' + // Задние цвета активного плейлиста
				'html[dark], [dark] {--yt-spec-badge-chip-background: #222b35; --yt-spec-button-chip-background-hover: #262f39}' + // Цвет фона описания видео
				'html[dark] {--yt-spec-mono-tonal-hover: #2d3742}' + // Цвет фона лайков и прочих кнопок при наведении
				'ytd-playlist-panel-renderer[use-color-palette][is-dark-theme] {--yt-active-playlist-panel-background-color: #262f39}' + // Цвет фона текущего видео в плейлисте
				'html[dark], [dark] {--yt-spec-call-to-action: #7daae9; --yt-spec-themed-blue: #7daae9} .yt-core-attributed-string__link--call-to-action-color {color: var(--yt-spec-call-to-action) !important}' + // Цвет ссылок
				'html[system-icons][dark], html[system-icons] [dark] {--yt-spec-brand-icon-inactive: #b0b9c4}' +
				'html[dark], [dark] {--ytd-searchbox-background: #1b222a}' +
				'html[dark] {--yt-live-chat-background-color: #1b222a}' +
				'html[dark] {--yt-spec-icon-active-other: #d6deeb}' +
				'html[dark] {--yt-spec-brand-icon-active: #b9c8e5}' +
				'html[dark], [dark] {--ytd-searchbox-legacy-button-hover-border-color: #818993}' +
				'html[dark], [dark] {--ytd-searchbox-legacy-border-color: #60677b42}' +
				'html[dark], [dark] {--ytd-searchbox-legacy-button-border-color: #60677b42}' +
				'html[dark], [dark] {--yt-spec-static-brand-red: #719dd3}' + // Цвет прогресса просмотренных видео
				'ytd-thumbnail-overlay-time-status-renderer.style-scope.ytd-thumbnail {background: #2d3844ba}' + // На главной странице в каждом видео фон рамки с длительносьтю видео
				'svg.external-icon > svg > g > path:nth-child(1) {fill: rgb(60, 65, 70)}' + // Иконка ютуба
				'#logo-icon > svg > g > g:nth-child(1) > path:nth-child(1) {fill: rgb(60, 65, 70)}' + // Иконка ютуба (старый дизайн)
				'html[dark], [dark] {--yt-spec-wordmark-text: rgb(200, 200, 200)}' + // Надпись возле иконки ютуба
				'.html5-video-player {background: rgb(17, 22, 28)}' + // Цвет фона плеера
				'.html5-video-player[aria-label*="в "] {background: rgb(0, 0, 0)}' + // Цвет фона плеера в полном экране
				'#ytp-id-17, #ytp-id-18, #ytp-id-19 {background: rgba(27, 34, 42, 0.85); backdrop-filter: blur(5px)}' + // Цвет фона настроек видео
				'.yt-spec-icon-badge-shape--type-notification .yt-spec-icon-badge-shape__badge {background-color: rgb(66, 108, 157)}' + // Цвет бэйджа количества уведомлений
				'sup.ytp-swatch-color-white {color: rgb(161, 186, 215)}' + // Цвет надписей HD в выборе качества
				'.tp-yt-paper-tooltip[style-target=tooltip] {background-color: rgba(51, 62, 74, 0.76)}' + // Задний цвет всплывающих подсказок (Нравится, Не нравится..)
				'.ytp-tooltip-text {background: rgba(51, 62, 74, 0.76) !important}' + // Задний цвет всплывающих подсказок в видео (Отключить звук и прочее)
				'.ytp-button.ytp-settings-button.ytp-hd-quality-badge:after {background-color: rgba(87, 138, 217, 0.53)}' + // Цвет надписи HD
				'.ytp-button.ytp-settings-button.ytp-4k-quality-badge:after {background-color: rgba(87, 138, 217, 0.53)}' + // Цвет надписи 4K
				'.ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox {background: #3e6bb4 !important}' + // Задний цвет тугл кнопок в настройках видео
				'.ytp-chrome-controls .ytp-button[aria-pressed]:after {background-color: rgb(62, 107, 180) !important}' + // Цвет полоски снизу включённых субтитров
				'ytd-playlist-panel-renderer#playlist {--yt-lightsource-secondary-title-color: rgb(201, 208, 211) !important; --yt-lightsource-primary-title-color: rgb(201, 208, 211) !important}' + // Цвет текста активного видео в плейлисте (название + канал)
				'.ytp-popup.ytp-contextmenu {background: rgba(25, 31, 38, 0.85); border-radius: 10px; backdrop-filter: blur(5px)}' + // Задний цвет и закругление панели ПКМ по видео
				'.ytp-contextmenu .ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox {background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgdmVyc2lvbj0iMS4xIj48cGF0aCBkPSJNOSAxNi4yTDQuOCAxMmwtMS40IDEuNEw5IDE5IDIxIDdsLTEuNC0xLjRMOSAxNi4yeiIgZmlsbD0iI2ZmZiIgLz48L3N2Zz4=) !important;}' + // Фикс отображения чекбокса
				'html[dark], [dark] {--yt-spec-outline: rgb(48, 58, 68)}' + // Панель упорядочить в комментариях
				'.ytp-swatch-background-color {background: rgb(87, 133, 186) !important}' + // Полоска прогресса видео filter: drop-shadow(0 0 7px rgba(87,133,186,0.7));
				'.ytp-live-badge[disabled]:before {background: rgb(87, 133, 186) !important}' + // Круглый значок 'В эфире'
				'html[dark], [dark] {--yt-spec-static-overlay-background-brand: rgb(75, 93, 127)}' + // Кнопка/надпись на главной странице В эфире под видео
				'html[dark], [dark] {--yt-spec-static-overlay-background-heavy: rgb(9, 20, 32, 0.4); --yt-spec-static-overlay-background-solid: rgb(19, 30, 42, 0.6)}' + // Кнопка на видео добавить в смотреть позже + при наведении
				'#icon > yt-icon-shape > icon-shape > div > svg > g > path {fill: #50505f}' + // Иконка YouTube Shorts при поиске видео
				'html[dark], [dark] {--ytd-searchbox-text-color: rgb(201, 208, 211)}' + // Цвет текста в поисковой строке
				'.ytp-bezel-text {border-radius: 20px !important; font-weight: bold; backdrop-filter: blur(4px);}' + // Параметры всплывашки регулировки звука
				'.ytp-doubletap-static-circle {background-color: rgba(0 0 0 / 50%) !important; backdrop-filter: blur(4px);} .ytp-doubletap-tooltip-label { font-size: 15px !important; font-weight: bold !important; margin-left: 8px;}' + // Параметры всплывашки перемотки видео
				'ytd-searchbox[has-focus] #container.ytd-searchbox {border: 1px solid var(--ytd-searchbox-legacy-border-color);}' + // Обводка активной панели поиска
				'html[dark], [dark] {--yt-spec-additive-background: #46546469}' + // Цвет наведения на элементы в поиске
				'#top-level-buttons-computed #segmented-dislike-button ytd-toggle-button-renderer *[aria-pressed="true"] yt-icon {color: rgb(249 137 137) !important}' // Цвет кнопки дизлайка (нажатой)

			// Красим цвет текста окна поиска
			waitSelector('#search').then(() => {
				try { document.querySelector('.searchbox').textContent = document.querySelector('.searchbox').textContent.replace('webkit-input-placeholder{color:#888}', 'webkit-input-placeholder{color:rgb(151, 158, 161)}') } catch { }
			})
		}

		if (RThideAllTrash) {
			styles.innerHTML +=
				'#voice-search-button {display: none}' + // Кнопка голосового поиска
				'#country-code {display: none}' + // Старна возле иконки

				'#footer, ytd-guide-section-renderer:nth-child(5) > div > ytd-guide-entry-renderer:nth-child(2),' +
				'ytd-guide-section-renderer:nth-child(5) > div > ytd-guide-entry-renderer:nth-child(3),' +
				'ytd-guide-section-renderer:nth-child(5) > div > ytd-guide-entry-renderer:nth-child(4),' +
				'ytd-guide-section-renderer:nth-child(3) > div > ytd-guide-entry-renderer:nth-child(2),' +
				'ytd-guide-section-renderer:nth-child(3) > div > ytd-guide-entry-renderer:nth-child(3),' +
				'ytd-guide-section-renderer:nth-child(3) > div > ytd-guide-entry-renderer:nth-child(4),' +
				'ytd-guide-section-renderer:nth-child(3) > div > ytd-guide-entry-renderer:nth-child(5),' +
				'ytd-guide-section-renderer:nth-child(3) > div > ytd-guide-entry-renderer:nth-child(6),' +
				'ytd-guide-section-renderer:nth-child(3) > div > ytd-guide-entry-renderer:nth-child(7),' +
				'ytd-guide-section-renderer:nth-child(1) > div > ytd-guide-entry-renderer:nth-child(2) {display: none}' + // Убирает лишние элементы с левой панели

				'a.ytp-next-button.ytp-button, a.ytp-prev-button.ytp-button, .ytp-jump-button {display: none !important}' + // Убирает кнопку вперёд и назад в плеере + перемотка на 10с
				'.annotation.annotation-type-custom.iv-branding {display: none}' + // Аннотация канала в конце видео
				'#reaction-control-panel {display: none}' + // Панель реакция на трансляции в чате
				'.sbfl_a {display: none}' + // Надпись пожаловаться на поисковые подсказки
				'[role="button"][aria-label="Добавить в очередь"], [role="button"][aria-label="Додати в чергу"] {display: none}' + // Кнопка на видео добавить в очередь
				'.gsst_a {display: none !important}' + // Кнопка клавиатуры при поиске видео
				'button[title*="Авто"] {display: none !important}' + // Кнопка автовоспроизвидения в плеере
				'.ytp-button.ytp-remote-button {display: none !important}' + // Кнопка трансляции на телевизор в плеере
				'.ytp-button.ytp-miniplayer-button {display: none !important}' + // Кнопка мини-плеера в плеере
				'#premium-upsell-link, .ytd-guide-renderer.style-scope:nth-of-type(4) {display: none}' + // Кнопка оформить youtube premium + секция другие возможности в левой панели
				'yt-multi-page-menu-section-renderer:nth-child(5) {display: none}' // Кнопки справка и отправить отзыв в меню аккаунта

			waitSelector('ytd-segmented-like-dislike-button-renderer').then(() => {
				const buttonNames = ['Поделиться', 'Создать клип', 'Спасибо', 'Поділитися', 'Створити кліп', 'Дякую']
				document.querySelector('ytd-download-button-renderer')?.setAttribute('hidden', '')

				document.querySelectorAll('ytd-button-renderer').forEach(button => {
					if (!button.id.includes('submit-button') && buttonNames.some(name => button.innerHTML.includes(name))) {
						button.setAttribute('hidden', '')
					}
				})
			})
		}

		if (RTbetterFont) {
			styles.innerHTML +=
				'yt-formatted-string.style-scope.ytd-rich-grid-media, span.style-scope.ytd-video-meta-block {font-family: Ubuntu !important; font-weight: 400 !important; font-style: normal !important;}' +
				'span.style-scope.ytd-compact-radio-renderer {font-family: Ubuntu !important; font-weight: 700 !important; font-style: normal !important;}' +
				'ytd-rich-grid-renderer.style-scope.ytd-two-column-browse-results-renderer, ytd-guide-section-renderer.style-scope.ytd-guide-renderer {font-family: Ubuntu !important;}' +
				'div.style-scope.ytd-rich-grid-row {font-weight: 400 !important;}' +
				'span.style-scope.ytd-comment-renderer {font-family: Ubuntu !important; font-weight: 500 !important;}' +
				'yt-formatted-string.style-scope.ytd-toggle-button-renderer.style-default-active {font-family: Ubuntu !important; font-weight: 700 !important;}' +
				'a.yt-simple-endpoint.style-scope.yt-formatted-string, tp-yt-paper-item.style-scope.ytd-guide-entry-renderer, iron-selector.style-scope.ytd-feed-filter-chip-bar-renderer, ' +
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
		}

		if (RTwatchedVideo && !window.location.href.includes('feed/history')) {
			styles.innerHTML +=
				`#progress.ytd-thumbnail-overlay-resume-playback-renderer {--background-color: ${RTColorWatchedBackground + '80'}}` +
				'#progress.ytd-thumbnail-overlay-resume-playback-renderer:after {content: " " !important;top: -114px !important;position: absolute !important;background-color: var(--background-color) !important;padding: 7px !important; width: 196px;height: 100px;}' +
				`#progress.ytd-thumbnail-overlay-resume-playback-renderer {--label-color: ${RTColorWatchedLabelBackground + '80'}}` +
				`#progress.ytd-thumbnail-overlay-resume-playback-renderer:before {content: "ПРОСМОТРЕНО"; background-color: var(--label-color); top: -112px;font-size: 12px;color: white;position: absolute;z-index: 1;left: 0; margin: 8px;opacity: 0.5;padding: 4px 5px; border-radius: 9px;letter-spacing: .5px;font-weight: 500;line-height: 1.2rem; backdrop-filter: blur(4px);}` +
				'ytd-thumbnail-overlay-time-status-renderer {z-index: 1}' +
				'#overlays > ytd-thumbnail-overlay-playback-status-renderer {display: none !important;}' +
				'ytd-expanded-shelf-contents-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer:after, ytd-video-renderer  #progress.ytd-thumbnail-overlay-resume-playback-renderer:after {top: -134px !important;width: 232px;height: 120px;}' +
				'ytd-expanded-shelf-contents-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer:before, ytd-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer:before {top: -134px; font-size: 13px;}' +
				'#related #progress.ytd-thumbnail-overlay-resume-playback-renderer:after {top: -90px !important;width: 154px; height: 76px;}' +
				'#related #progress.ytd-thumbnail-overlay-resume-playback-renderer:before {top: -90px;font-size: 11px; padding: 3px 4px;}' +
				'.style-scope.ytd-grid-video-renderer:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer:before, .style-scope.ytd-grid-video-renderer:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer:after, div#dismissable.style-scope.ytd-video-renderer:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer:after, div#dismissable.style-scope.ytd-video-renderer:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer:before, div#dismissable.style-scope.ytd-compact-video-renderer:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer:after, div#dismissable.style-scope.ytd-compact-video-renderer:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer:before {display: none;}' +
				'.ytrp_rb_bg_bottom {bottom: unset !important; top: 0 !important;}' +
				'html .resume-playback-background, html  .resume-playback-progress-bar, html ytd-thumbnail-overlay-resume-playback-renderer {top: unset !important; bottom: 0 !important;}' +
				'.ytd-playlist-panel-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {width: 92px; height: 48px; top: -52px !important; padding: 4px !important;}' +
				'.ytd-playlist-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {top: -52px; padding: 4px}' +
				'.ytd-playlist-panel-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before {top: -52px; font-size: 9px; line-height: 1rem; margin: 4px; padding: 4px;}' +
				'.ytd-playlist-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before {top: -83px; font-size: 9px; line-height: 1rem; margin: 4px; padding: 4px;}' +
				'.ytd-playlist-panel-video-renderer:hover .ytd-playlist-panel-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before, .ytd-playlist-panel-video-renderer:hover .ytd-playlist-panel-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {display: none;}' +
				'.ytd-playlist-video-renderer:hover .ytd-playlistl-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before, .ytd-playlist-video-renderer:hover .ytd-playlist-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {display: none;}' +
				`.ytd-rich-grid-media #progress.ytd-thumbnail-overlay-resume-playback-renderer, .ytd-search ytd-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer {--label-color: ${RTColorWatchedLabelBackground + '80'}}` +
				`.ytd-rich-grid-media #progress.ytd-thumbnail-overlay-resume-playback-renderer::before, .ytd-search ytd-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before {content: "ПРОСМОТРЕНО"; background-color: var(--label-color); font-size: 14px; color: white; position: absolute; z-index: 1;left: 2px; opacity: 1; letter-spacing: 0.5px;font-weight: 500; line-height: 1.5rem; margin: -65px 10px; padding: 4px 5px; border-radius: 9px; backdrop-filter: blur(4px);}` +
				`.ytd-rich-grid-media #progress.ytd-thumbnail-overlay-resume-playback-renderer, .ytd-search #progress.ytd-thumbnail-overlay-resume-playback-renderer {--background-color: ${RTColorWatchedBackground + '80'}}` +
				'.ytd-rich-grid-media #progress.ytd-thumbnail-overlay-resume-playback-renderer::after, .ytd-search #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {width: 100%;height: 30vh; content: " " !important;top: -30vh !important;position: absolute !important;background-color: var(--background-color) !important;padding: 7px !important;}' +
				'.ytd-rich-grid-media:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer::before, .ytd-rich-grid-media:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {display: none;}'
		}

		await new Promise(resolve => setTimeout(resolve, 3000))
		document.querySelector('#rtAnim')?.remove()
	}

	document.addEventListener('keyup', function (e) {
		if (e.key == 'F2') {
			const retubeMenuStyle = document.querySelector('#retube-menu-style')

			if (retubeMenuStyle) {
				retubeMenuStyle?.remove()
				document.querySelector('#retube-menu')?.remove()
				return
			}

			document.querySelector('#end').insertAdjacentHTML('afterbegin', '<div id="retube-menu"></div>')
			// ОСНОВНОЕ
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkboxMain"></input>Перекрасить YouTube</label></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkboxAnimateLoad"></input>Плавная загрузка страницы</label></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Будут скрыты:||• Кнопка голосового поиска||• Страна возле иконки||• Элементы с левой панели (копирайты и прочее)||• Кнопки в плеере (перемотка, вперед и назад,||автовоспроизвидение, трансляция, мини-плеер)||• Аннотация канала в конце видео||• Панель реакций в чате||• Надпись в поиске `Пожаловаться на поисковые||подсказки`||• Кнопка клавиатуры в строке поиска||• Кнопка `Добавить в очередь` при наведении на видео||на главной странице||• Кнопки `Справка` и `Отправить отзыв` в меню аккаунта||• Кнопки под видео `Поделиться`, `Создать клип`,||`Скачать`, `Спасибо`"><input type="checkbox" id="rt-checkbox0"></input>Скрыть много ненужных кнопок, надписей</label></div>')

			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/rqgywVe.png"><input type="checkbox" id="rt-checkbox1">Помечать просмотренные видео</input></label></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', `<div class="rt-colorWatchedLabelBackground retube-additionalDiv"${RTwatchedVideo ? '' : ' hidden'}><label class="retube-label retube-label-additional">Задний цвет надписи 'Просмотрено'<input type="color" id="rt-color1"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-color1'); colorInput.value = '#343a41'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', `<div class="rt-colorWatchedBackground retube-additionalDiv"${RTwatchedVideo ? '' : ' hidden'}><label class="retube-label retube-label-additional">Задний цвет<input type="color" id="rt-color2"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-color2'); colorInput.value = '#ffffff'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)

			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Дополнительно, желательно отключить ClearType||в браузере"><input type="checkbox" id="rt-checkbox2">Изменить шрифт на Ubuntu</input></label></div>')

			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/ZQ3CFlm.png"><input type="checkbox" id="rt-checkbox3"></input>Показывать дату и время загрузки видео в названии</label></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', `<div class="rt-settingsDateOnVideoBackground retube-additionalDiv"${RTvideoDateCreated ? '' : ' hidden'}><label class="retube-label" retube-tooltip="https://i.imgur.com/8NzFBsS.png"><input type="checkbox" id="rt-checkboxSettingsDateOnVideoBackground"></input>Обводка вместо заливки</label></div>`)

			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox4"></input>Сфокусироваться на видео при наведении</label></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox5"></input>Удалить с заголовка страницы количество уведомлений</label></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox6"></input>Синяя иконка в заголовке страницы</label></div>')
			// ОСНОВНОЕ

			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<br/><button class="retube-button retube-button-save">Сохранить и перезагрузить страницу</button>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<br/><br/><div class="retube-label" style="text-align: center;">Разработчик скрипта: Сергей (Eject)</div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<br/><button class="retube-button retube-button-discord" onclick="window.open(`https://discord.gg/NG6ZxXCXeU`)">Мой Discord сервер</button>')

			const checkboxMain = document.querySelector('#rt-checkboxMain')
			const checkboxAnimateLoad = document.querySelector('#rt-checkboxAnimateLoad')
			const checkbox0 = document.querySelector('#rt-checkbox0')
			const checkbox1 = document.querySelector('#rt-checkbox1')
			const checkbox2 = document.querySelector('#rt-checkbox2')
			const checkbox3 = document.querySelector('#rt-checkbox3')
			const checkbox4 = document.querySelector('#rt-checkbox4')
			const checkbox5 = document.querySelector('#rt-checkbox5')
			const checkbox6 = document.querySelector('#rt-checkbox6')
			const checkboxSettings1 = document.querySelector('#rt-checkboxSettingsDateOnVideoBackground')
			const color1 = document.querySelector('#rt-color1')
			const color2 = document.querySelector('#rt-color2')

			checkboxMain.checked = RTcolors
			checkboxAnimateLoad.checked = RTanimateLoad
			checkbox0.checked = RThideAllTrash
			checkbox1.checked = RTwatchedVideo
			checkbox2.checked = RTbetterFont
			checkbox3.checked = RTvideoDateCreated
			checkbox4.checked = RTfocusFix
			checkbox5.checked = RTnotificationsRemove
			checkbox6.checked = RTcustomTitleIcon
			checkboxSettings1.checked = RTSettingsDateOnVideoBackgroundChange
			color1.value = RTColorWatchedLabelBackground
			color2.value = RTColorWatchedBackground

			document.querySelector('.retube-button-save').addEventListener('click', function () {
				GM_setValue('rt-colors', checkboxMain.checked ? 'true' : 'false')
				GM_setValue('rt-animateLoad', checkboxAnimateLoad.checked ? 'true' : 'false')
				GM_setValue('rt-hideAllTrash', checkbox0.checked ? 'true' : 'false')
				GM_setValue('rt-watchedVideo', checkbox1.checked ? 'true' : 'false')
				GM_setValue('rt-betterFont', checkbox2.checked ? 'true' : 'false')
				GM_setValue('rt-videoDateCreated', checkbox3.checked ? 'true' : 'false')
				GM_setValue('rt-focusFix', checkbox4.checked ? 'true' : 'false')
				GM_setValue('rt-notificationsRemove', checkbox5.checked ? 'true' : 'false')
				GM_setValue('rt-customTitleIcon', checkbox6.checked ? 'true' : 'false')

				GM_setValue('rt-settings-dateOnVideoBackgroundChange', checkboxSettings1.checked ? 'true' : 'false')
				GM_setValue('rt-color-watchedLabelBackground', color1.value)
				GM_setValue('rt-color-watchedBackground', color2.value)

				location.reload();
			})

			// Динамический цвет колорпикеров
			color1.addEventListener('input', function (e) {
				document.querySelectorAll('#progress.ytd-thumbnail-overlay-resume-playback-renderer').forEach(x => x.style.setProperty('--label-color', e.target.value + '80'))
				document.querySelectorAll('.ytd-rich-grid-media #progress.ytd-thumbnail-overlay-resume-playback-renderer').forEach(x => x.style.setProperty('--label-color', e.target.value + '80'))
				document.querySelectorAll('.ytd-search ytd-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer').forEach(x => x.style.setProperty('--label-color', e.target.value + '80'))
			})
			color2.addEventListener('input', function (e) {
				document.querySelectorAll('#progress.ytd-thumbnail-overlay-resume-playback-renderer').forEach(x => x.style.setProperty('--background-color', e.target.value + '80'))
				document.querySelectorAll('.ytd-rich-grid-media #progress.ytd-thumbnail-overlay-resume-playback-renderer').forEach(x => x.style.setProperty('--background-color', e.target.value + '80'))
				document.querySelectorAll('.ytd-search #progress.ytd-thumbnail-overlay-resume-playback-renderer').forEach(x => x.style.setProperty('--background-color', e.target.value + '80'))
			})

			checkbox1.addEventListener('change', function (e) {
				const div = document.querySelector(".rt-colorWatchedLabelBackground")
				const div2 = document.querySelector(".rt-colorWatchedBackground")
				if (e.target.checked) {
					div.removeAttribute('hidden')
					div2.removeAttribute('hidden')
				}
				else {
					div.setAttribute('hidden', '')
					div2.setAttribute('hidden', '')
				}
			})
			checkbox3.addEventListener('change', function (e) {
				const div = document.querySelector(".rt-settingsDateOnVideoBackground")
				if (e.target.checked) {
					div.removeAttribute('hidden')
				}
				else {
					div.setAttribute('hidden', '')
				}
			})

			document.querySelectorAll('.retube-label').forEach(label => {
				const tooltipText = label.getAttribute('retube-tooltip')
				if (tooltipText?.includes('http')) {
					const randomNumber = getRandomInt()
					label.classList.add('RT' + randomNumber)

					const tooltipStyle = document.createElement('style')
					tooltipStyle.innerHTML = `.retube-label.RT${randomNumber}::after {content: "" !important; background-image: url("${tooltipText}"); background-size: cover; width: 400px; height: 225px}`
					document.head.appendChild(tooltipStyle)
				}
				else if (tooltipText?.includes('||')) {
					const randomNumber = getRandomInt()
					label.classList.add('RT' + randomNumber)

					const tooltipStyle = document.createElement('style')
					tooltipStyle.innerHTML = `.retube-label.RT${randomNumber}::after {content: "${tooltipText.replaceAll('||', '\\a')}" !important; white-space: pre}`
					document.head.appendChild(tooltipStyle)
				}

				function getRandomInt() {
					return Math.floor(Math.random() * 100000);
				}
			})

			document.querySelectorAll('.retube-button-reset').forEach(button => {
				button.setAttribute('retube-tooltip', 'Сброс цвета')
				button.innerHTML = '<img src="https://i.imgur.com/fguClbQ.png">';
			})

			const styleElement = document.head.appendChild(document.createElement('style'))
			styleElement.id = 'retube-menu-style'
			styleElement.innerHTML =
				`#retube-menu {animation: 0.3s show ease; background-color: rgb(37 37 45 / 36%); position: fixed; top: 5px; z-index: 999; backdrop-filter: blur(10px); filter: drop-shadow(0 0 3px rgba(100,110,115,0.6)); border-radius: 7px} @keyframes show { from { opacity: 0; } to { opacity: 1; } }` +
				'.retube-label {font-size: 18px; color: rgb(201 208 211); font-family: "YouTube Sans"; padding-right: 4px} .retube-label:hover {background: rgba(120 125 130 / 15%); border-radius: 6px}' +
				'.retube-additionalDiv {margin-left: 18px}' +
				'input[type="color"] {background: transparent; border: none; width: 25px; height: 25px}' +
				'[retube-tooltip] {position: relative} [retube-tooltip]::after {content: attr(retube-tooltip); position: absolute; white-space: pre; left: 0; top: 0; background: rgb(58, 67, 77); color: #fff; font-weight: 500; font-family: "YouTube Sans"; font-size: 18px; padding: 0.5em; box-shadow: 0 0 10px rgba(0, 0, 0 / 50%); pointer-events: none; opacity: 0; transition: 0.4s; border-radius: 13px; z-index: 999} [retube-tooltip]:hover::after {transition-delay: 0.8s; opacity: 1; top: 1.7em}' +
				'.retube-button {background: rgb(96 100 110 / 37%); color: rgb(201 208 211); border-radius: 5px; border-color: rgb(72 75 91); border-style: solid; margin: auto; display: flex; font-family: "YouTube Sans"; font-size: 16px; cursor: pointer} .retube-button:hover {background: rgb(96 100 110 / 60%)}' +
				'.retube-button-reset {display: inline; width: 32px; height: 23px; margin-left: 5px}' +
				'.retube-label-additional {padding-left: 4px}'
		}
	})

	function CustomIcon() {
		const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
		link.rel = 'icon';
		link.href = 'https://github.com/Eject37/ReTube/raw/main/yt-favicon2.ico';
		document.querySelector('head').prepend(link);
	}

	function DateTimeCreated() {
		if (!window.location.href.includes('watch')) return

		function getVideoId() {
			return new URL(window.location.href).searchParams.get("v")
		}

		document.querySelector('.video-date')?.remove()

		const api = 'AIzaSyDlRKyiwxqBIU8Yt2k6x7WlKQQJiz9YsnE'
		fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${getVideoId()}&key=${api}`).then(response => response.json()).then(json => {
			const dateCreated = new Date(json.items[0].snippet.publishedAt).toLocaleString('ru-RU', {
				day: 'numeric',
				month: 'numeric',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
				hour12: false,
			}).replace(',', '')

			waitSelector('#title').then(async () => {
				await new Promise(resolve => setTimeout(resolve, 1000))
				SetText()
				async function SetText() {
					document.querySelector('.video-date')?.remove()
					const metadataElement = document.querySelectorAll('yt-formatted-string.style-scope.ytd-watch-metadata')[0]
					if (!document.querySelector('.video-date')) {
						const label = document.createElement('span')
						label.classList.add('video-date')
						label.textContent = dateCreated

						if (!document.querySelector('#dateVideoStyle')) {
							const styleElement = document.createElement('style')
							styleElement.id = 'dateVideoStyle'
							styleElement.innerHTML = '.video-date {border-radius: 18px; padding-right: 7px; padding-left: 7px; margin-left: 5px; font-size: 96%; background-color: var(--yt-spec-button-chip-background-hover); animation: 1s show ease} @keyframes show { from { opacity: 0; } to { opacity: 1; } }'
							if (RTSettingsDateOnVideoBackgroundChange) {
								styleElement.innerHTML += '.video-date {background-color: var(--yt-spec-base-background); filter: drop-shadow(0 0 1px rgb(201 208 211))}'
							}
							document.head.appendChild(styleElement)
						}

						metadataElement.appendChild(label)

						for (let i = 0; i < 2; i++) {
							await new Promise(resolve => setTimeout(resolve, 1000))
							const titleLabel = document.querySelectorAll('yt-formatted-string.style-scope.ytd-watch-metadata')[0]
							if (titleLabel.innerHTML.startsWith('<span')) {
								SetText()
							}
						}
					}
				}
			})
		}).catch()
	}

	function RemoveNotificationNumber() {
		try {
			new MutationObserver((e) => {
				if (e[0].addedNodes[0].data != e[0].removedNodes[0].data) {
					document.title = document.title.replace(/^(\(\d*\))\s*/, "");
				}
			}).observe(document.querySelector("title"), { childList: true, characterDataOldValue: true });
		} catch { }
	}

	function FocusAndScrollFix() {
		waitSelector('video.video-stream.html5-main-video').then(player => {
			let isScrolling = false // Флаг для отслеживания текущего состояния прокрутки

			player.onmouseenter = async () => {
				// Если уже выполняется анимация прокрутки, ничего не делаем
				if (isScrolling) return;

				isScrolling = true; // Устанавливаем флаг прокрутки в true

				const easingFn = t => 1 - (1 - t) * (1 - t)

				const scrollToTop = () => {
					const scrollTop = document.documentElement.scrollTop
					if (scrollTop > 0) {
						const progress = scrollTop / 1000;
						const easingValue = easingFn(progress)

						const scrollDistance = easingValue * 25; // Замедление прокрутки по мере приближения к верху
						window.scrollTo(0, scrollTop - scrollDistance)
						window.requestAnimationFrame(scrollToTop)
					} else {
						isScrolling = false // Анимация прокрутки закончилась, сбрасываем флаг
					}
				};
				scrollToTop()

				while (document.documentElement.scrollTop !== 0) {
					await new Promise(resolve => setTimeout(resolve, 25))
				}

				player.focus()
			}
		})
	}

	function waitSelector(selector, limit_data) {
		if (typeof selector !== 'string') return console.error('wait > selector:', typeof selector);
		if (limit_data?.container && !(limit_data.container instanceof HTMLElement)) return console.error('wait > container not HTMLElement:', limit_data.container);
		if (selector.includes(':has(') && !CSS.supports('selector(:has(*))')) {
			return new Promise((resolve, reject) => {
				console.warn('CSS ":has()" unsupported');
				reject('CSS ":has()" unsupported');
			});
		}
		return new Promise(resolve => {
			if (element = (limit_data?.container || document.body || document).querySelector(selector)) {
				return resolve(element);
			}
			const observer1 = new MutationObserver((mutationRecordsArray, observer) => {
				for (const record of mutationRecordsArray) {
					for (const node of record.addedNodes) {
						if (![1, 3, 8].includes(node.nodeType) || !(node instanceof HTMLElement)) continue;
						if (node.matches && node.matches(selector)) {
							observer.disconnect();
							return resolve(node);
						}
						else if (
							(parentEl = node.parentElement || node)
							&& (parentEl instanceof HTMLElement)
							&& (element = parentEl.querySelector(selector))
						) {
							observer.disconnect();
							return resolve(element);
						}
					}
				}
				if (document?.readyState != 'loading'
					&& (element = (limit_data?.container || document?.body || document).querySelector(selector))
				) {
					observer.disconnect();
					return resolve(element);
				}
			})
			observer1
				.observe(limit_data?.container || document.body || document.documentElement || document, {
					childList: true,
					subtree: true,
					attributes: true,
				});
			if (limit_data?.stop_on_page_change) {
				isURLChange();
				window.addEventListener('transitionend', ({ target }) => {
					if (isURLChange()) {
						observer1.disconnect();
					}
				});
				function isURLChange() {
					return (this.prevURL === location.href) ? false : this.prevURL = location.href;
				}
			}
		});
	}
})()
//await new Promise(resolve => setTimeout(resolve, 5))