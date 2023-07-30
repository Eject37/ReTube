// ==UserScript==
// @name         ReTube
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description ReTube
// @author       Eject
// @match        *://*.youtube.com/*
// @icon          https://github.com/Eject37/ReTube/raw/main/yt-favicon2.ico
// @grant        none
// ==/UserScript==

ReTube() // Начало скрипта (не трогать)

if (localStorage.getItem('rt-makeSubscriptionsClickable') == 'true') {
	FixSubscriptions() // Можно нажимать на кнопку подписок
}
if (localStorage.getItem('rt-customTitleIcon') == 'true') {
	CustomIcon() // Синяя иконка ютуба
}
if (localStorage.getItem('rt-notificationsRemove') == 'true') {
	RemoveNotificationNumber() // Убирает в заголовке страницы количество уведомлений
}
if (localStorage.getItem('rt-focusFix') == 'true') {
	FocusAndScrollFix() // При наведении на видео, берёт на себя фокус
}
if (localStorage.getItem('rt-videoDateCreated') == 'true') {
	document.addEventListener('yt-navigate-finish', function () {
		DateTimeCreated() // Дата и время создания видео в конце названия
	})
}

function FixSubscriptions() {
	wait('#guide-section-title').then(() => {
		const subButton = document.querySelectorAll('#guide-section-title')[1]

		subButton.onclick = () => { open('feed/subscriptions') }
		subButton.onmouseover = () => {
			subButton.style.cursor = 'pointer'
			subButton.style.textDecoration = 'underline'
		}
		subButton.onmouseleave = () => { subButton.style.textDecoration = '' }
		subButton.style.maxWidth = '40px'
	})
}

function CustomIcon() {
	const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
	link.rel = 'icon';
	link.href = 'https://github.com/Eject37/ReTube/raw/main/yt-favicon2.ico';
	document.querySelector('head').prepend(link);
}

function DateTimeCreated() {
	if (!window.location.href.includes('watch')) return

	document.querySelector('.video-date')?.remove()

	function getVideoId() {
		return new URL(window.location.href).searchParams.get("v")
	}

	const api = 'AIzaSyDlRKyiwxqBIU8Yt2k6x7WlKQQJiz9YsnE'
	fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${getVideoId()}&key=${api}`)
		.then(response => response.json())
		.then(json => {
			const dateCreated = new Date(json.items[0].snippet.publishedAt).toLocaleString('ru-RU', {
				day: 'numeric',
				month: 'numeric',
				year: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric',
				hour12: false,
			}).replace(',', '')

			wait('yt-formatted-string.style-scope.ytd-watch-metadata').then(() => {
				const metadataElement = document.querySelectorAll('yt-formatted-string.style-scope.ytd-watch-metadata')[0]
				if (!metadataElement.textContent.includes(dateCreated)) {
					const newElement = document.createElement('span')
					newElement.textContent = ` • ${dateCreated}`
					newElement.classList.add('video-date')
					metadataElement.appendChild(newElement)
				}
			})
		})
		.catch(() => { })
}

function RemoveNotificationNumber() {
	new MutationObserver((e) => {
		if (e[0].addedNodes[0].data != e[0].removedNodes[0].data) {
			document.title = document.title.replace(/^(\(\d*\))\s*/, "");
		}
	}).observe(document.querySelector("title"), { childList: true, characterDataOldValue: true });
}

function FocusAndScrollFix() {
	const player = document.querySelector('video.video-stream.html5-main-video')
	if (!player) return

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
}

function ReTube() {
	const styles = document.head.appendChild(document.createElement('style'));
	styles.innerHTML = '@import url(https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap);' // Импорт шрифта (не трогать)
		
	if (localStorage.getItem('rt-colors') == 'true') {
		styles.innerHTML +=
			'html[dark], [dark] {--yt-spec-base-background: #1b222a}' + // Цвет фона всего ютуба
			'html[darker-dark-theme][dark], [darker-dark-theme] [dark] {--yt-spec-text-primary: rgb(201 208 211)}' + // Цвет текста всего ютуба
			'html[dark], [dark] {--yt-spec-menu-background: #272f38c2}' + // Цвет фона панели уведомлений
			'html[dark], [dark] {--yt-spec-raised-background: #272f38}' + // Цвет фона добавления в плейлист
			'html[dark], [dark] {--yt-spec-brand-background-primary: #222b35; --yt-spec-general-background-a: #1b222a}' + // Задние цвета активного плейлиста
			'html[dark], [dark] {--yt-spec-badge-chip-background: #222b35; --yt-spec-button-chip-background-hover: #262f39}' + // Цвет фона описания видео
			'html[dark] {--yt-spec-mono-tonal-hover: #2d3742}' + // Цвет фона лайков и прочих кнопок при наведении
			'ytd-playlist-panel-renderer[use-color-palette][is-dark-theme] {--yt-active-playlist-panel-background-color: #262f39}' + // Цвет фона текущего видео в плейлисте
			'html[dark], [dark] {--yt-spec-call-to-action: #7daae9}' + // Цвет ссылок
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
			'#ytp-id-18, #ytp-id-19 {background: rgba(27, 34, 42, 0.85); backdrop-filter: blur(5px)}' + // Цвет фона настроек видео
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
			'html[dark], [dark] {--yt-spec-additive-background: #46546469}' // Цвет наведения на элементы в поиске

		// Красим цвет текста окна поиска
		wait('.searchbox').then(() => {
			try { document.querySelector('.searchbox').textContent = document.querySelector('.searchbox').textContent.replace('webkit-input-placeholder{color:#888}', 'webkit-input-placeholder{color:rgb(151, 158, 161)}') } catch { }
		})
	}

	if (localStorage.getItem('rt-hideAllTrash') == 'true') {
		styles.innerHTML +=
			'#voice-search-button {display: none}' + // Кнопка голосового поиска
			'#country-code {display: none}' + // Старна возле иконки
			'#footer, #items > ytd-guide-entry-renderer:nth-child(4), #items > ytd-guide-entry-renderer:nth-child(3), #items > ytd-guide-entry-renderer:nth-child(2) {display: none}' + // Убирает лишние элементы с левой панели
			'a.ytp-next-button.ytp-button, a.ytp-prev-button.ytp-button {display: none}' + // Убирает кнопку вперёд и назад в плеере
			'.annotation.annotation-type-custom.iv-branding {display: none}' + // Аннотация канала в конце видео
			'#reaction-control-panel {display: none}' + // Панель реакция на трансляции в чате
			'.sbfl_a {display: none}' + // Надпись пожаловаться на поисковые подсказки
			'[role="button"][aria-label="Добавить в очередь"] {display: none}' + // Кнопка на видео добавить в очередь
			'.gsst_a {display: none !important}' + // Кнопка клавиатуры при поиске видео
			'button[title*="Авто"] {display: none !important}' + // Кнопка автовоспроизвидения в плеере
			'.ytp-button.ytp-remote-button {display: none !important}' + // Кнопка трансляции на телевизор в плеере
			'.ytp-button.ytp-miniplayer-button {display: none !important}' + // Кнопка мини-плеера в плеере
			'#premium-upsell-link, .ytd-guide-renderer.style-scope:nth-of-type(4) {display: none}' + // Кнопка оформить youtube premium
			'yt-multi-page-menu-section-renderer:nth-child(5) {display: none}' // Кнопки справка и отправить отзыв в меню аккаунта
	
		// Скрываем кнопки под видео
		wait('div#menu-container').then(() => {
			const buttonNames = ['Поделиться', 'Создать клип', 'Спасибо', 'Поділитися', 'Створити кліп', 'Дякую']
			document.querySelector('ytd-download-button-renderer')?.setAttribute('hidden', '')
	
			document.querySelectorAll('ytd-button-renderer').forEach(button => {
				if (!button.id.includes('submit-button') && buttonNames.some(name => button.innerHTML.includes(name))) {
					button.setAttribute('hidden', '')
				}
			})
		})
	}

	if (localStorage.getItem('rt-betterFont') == 'true') {
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

	if (localStorage.getItem('rt-watchedVideo') == 'true' && !window.location.href.includes('feed/history')) {
		styles.innerHTML +=
			'#progress.ytd-thumbnail-overlay-resume-playback-renderer:after {content: " " !important;top: -114px !important;position: absolute !important;background-color: hsla(0, 0%, 100%, 0.5) !important;padding: 7px !important; width: 196px;height: 100px;}' +
			'#progress.ytd-thumbnail-overlay-resume-playback-renderer:before {content: "ПРОСМОТРЕНО"; top: -112px;font-size: 12px;color: white;position: absolute;z-index: 1;left: 0; margin: 8px;background-color: rgba(0 0 0 / 50%);opacity: 0.5;padding: 4px 5px; border-radius: 2px;letter-spacing: .5px;font-weight: 500;line-height: 1.2rem; backdrop-filter: blur(4px);}' +
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
			'.ytd-playlist-panel-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before {top: -52px; font-size: 9px; line-height: 1rem; margin: 4px; padding: 4px;}' +
			'.ytd-playlist-panel-video-renderer:hover .ytd-playlist-panel-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before, .ytd-playlist-panel-video-renderer:hover .ytd-playlist-panel-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {display: none;}' +
			'.ytd-rich-grid-media #progress.ytd-thumbnail-overlay-resume-playback-renderer::before, .ytd-search ytd-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before {content: "ПРОСМОТРЕНО"; top: -10vw;font-size: 14px;color: white; position: absolute;z-index: 1;left: 2px;background-color: rgba(0 0 0 / 50%); opacity: 1; letter-spacing: 0.5px;font-weight: 500; line-height: 1.5rem; margin: 10px ;padding: 4px 5px; border-radius: 2px; backdrop-filter: blur(4px);}' +
			'.ytd-rich-grid-media #progress.ytd-thumbnail-overlay-resume-playback-renderer::after, .ytd-search #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {width: 100%;height: 30vh; content: " " !important;top: -30vh !important;position: absolute !important;background-color: rgba(255, 255, 255, 0.5) !important;padding: 7px !important;}' +
			'.ytd-rich-grid-media:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer::before, .ytd-rich-grid-media:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {display: none;}'
	}
}

document.addEventListener('keyup', function (e) {
	if (e.key == 'F2') {
		const retubeMenuStyle = document.querySelector('#retube-menu-style')

		if (retubeMenuStyle) {
			retubeMenuStyle?.remove()
			document.querySelector('#retube-menu')?.remove()
			return
		}

		document.querySelector('#buttons').insertAdjacentHTML('afterbegin', '<div id="retube-menu"></div>')
		
		document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<label class="retube-label"><input type="checkbox" id="rt-checkboxMain"></input>Перекрасить YouTube</label>')
		document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<br/><label class="retube-label"><input type="checkbox" id="rt-checkbox0"></input>Скрыть много ненужных кнопок, надписей..</label>')
		document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<br/><label class="retube-label"><input type="checkbox" id="rt-checkbox1">Помечать просмотренные видео</input></label>')
		document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<br/><label class="retube-label"><input type="checkbox" id="rt-checkbox2">Изменить шрифт на Ubuntu</input></label>')
		document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<br/><label class="retube-label"><input type="checkbox" id="rt-checkbox3"></input>Показывать дату и время загрузки видео в названии</label>')
		document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<br/><label class="retube-label"><input type="checkbox" id="rt-checkbox4"></input>Сфокусироваться на видео при наведении</label>')
		document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<br/><label class="retube-label"><input type="checkbox" id="rt-checkbox5"></input>Удалить с заголовка страницы количество уведомлений</label>')
		document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<br/><label class="retube-label"><input type="checkbox" id="rt-checkbox6"></input>Синяя иконка в заголовке страницы</label>')
		document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<br/><label class="retube-label"><input type="checkbox" id="rt-checkbox7"></input>Возможность перейти в подписки кликом</label>')

		document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<br/><br/><button class="retube-button retube-button-save">Сохранить и перезагрузить страницу</button>')
		document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<br/><br/><div class="retube-label" style="text-align: center;">Разработчик скрипта: Сергей (Eject)</div>')
		document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<button style="margin-top: 5px" class="retube-button retube-button-discord" onclick="window.open(`https://discord.gg/NG6ZxXCXeU`)">Мой Discord сервер</button>')

		const checkboxMain = document.querySelector('#rt-checkboxMain')
		const checkbox0 = document.querySelector('#rt-checkbox0')
		const checkbox1 = document.querySelector('#rt-checkbox1')
		const checkbox2 = document.querySelector('#rt-checkbox2')
		const checkbox3 = document.querySelector('#rt-checkbox3')
		const checkbox4 = document.querySelector('#rt-checkbox4')
		const checkbox5 = document.querySelector('#rt-checkbox5')
		const checkbox6 = document.querySelector('#rt-checkbox6')
		const checkbox7 = document.querySelector('#rt-checkbox7')

		checkboxMain.checked = localStorage.getItem('rt-colors') == 'true'
		checkbox0.checked = localStorage.getItem('rt-hideAllTrash') == 'true'
		checkbox1.checked = localStorage.getItem('rt-watchedVideo') == 'true'
		checkbox2.checked = localStorage.getItem('rt-betterFont') == 'true'
		checkbox3.checked = localStorage.getItem('rt-videoDateCreated') == 'true'
		checkbox4.checked = localStorage.getItem('rt-focusFix') == 'true'
		checkbox5.checked = localStorage.getItem('rt-notificationsRemove') == 'true'
		checkbox6.checked = localStorage.getItem('rt-customTitleIcon') == 'true'
		checkbox7.checked = localStorage.getItem('rt-makeSubscriptionsClickable') == 'true'

		document.querySelector('.retube-button-save').addEventListener('click', function () {
			localStorage.setItem('rt-colors', checkboxMain.checked ? 'true' : 'false')
			localStorage.setItem('rt-hideAllTrash', checkbox0.checked ? 'true' : 'false')
			localStorage.setItem('rt-watchedVideo', checkbox1.checked ? 'true' : 'false')
			localStorage.setItem('rt-betterFont', checkbox2.checked ? 'true' : 'false')
			localStorage.setItem('rt-videoDateCreated', checkbox3.checked ? 'true' : 'false')
			localStorage.setItem('rt-focusFix', checkbox4.checked ? 'true' : 'false')
			localStorage.setItem('rt-notificationsRemove', checkbox5.checked ? 'true' : 'false')
			localStorage.setItem('rt-customTitleIcon', checkbox6.checked ? 'true' : 'false')
			localStorage.setItem('rt-makeSubscriptionsClickable', checkbox7.checked ? 'true' : 'false')

			location.reload();
		})

		const retubeMenu = document.querySelector('#retube-menu')

		const styleElement = document.createElement('style')
		styleElement.id = 'retube-menu-style'
		styleElement.innerHTML =
			`#retube-menu {background-color: rgb(37 37 45 / 36%); margin-top: 220px; backdrop-filter: blur(10px); filter: drop-shadow(0 0 3px rgba(100,110,115,0.6)); border-radius: 7px}` +
			'.retube-label {font-size: 14px; color: rgb(201 208 211); font-family: "Ubuntu Light"}' +
			'.retube-button {background: rgb(96 100 110 / 37%); color: rgb(201 208 211); border-radius: 5px; border-color: rgb(72 75 91); border-style: solid; margin: auto; display: flex; font-family: "Ubuntu Light"; cursor: pointer} .retube-button:hover {background: rgb(96 100 110 / 60%)}'

		document.head.appendChild(styleElement)
	}
})

function wait(selector) {
	return new Promise(resolve => {
		const divObserver = new MutationObserver((_, observer) => {
			const menuDiv = document.querySelector(selector)
			if (menuDiv !== null) {
				observer.disconnect()
				resolve(true);
			}
		})
		divObserver.observe(document, {
			subtree: true,
			childList: true
		})
	})
}

//await new Promise(resolve => setTimeout(resolve, 5))