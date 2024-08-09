// ==UserScript==
// @name         ReTube
// @namespace    http://tampermonkey.net/
// @version      4.3.0
// @description ReTube
// @author       Eject
// @match        *://www.youtube.com/*
// @match        *://music.youtube.com/*
// @icon          https://github.com/Eject37/ReTube/raw/main/yt-favicon2.ico
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_listValues
// @grant GM_deleteValue
// @grant GM_info
// @grant GM_openInTab
// @run-at document-start
// ==/UserScript==

(async () => {
	//#region Параметры
	let RTfirstLaunch = await GM_getValue('rt-firstLaunch')
	let RTcolors = await getSavedSetting('rt-colors')
	let RTanimateLoad = await getSavedSetting('rt-animateLoad')
	let RThideAllTrash = await getSavedSetting('rt-hideAllTrash')
	let RTwatchedVideo = await getSavedSetting('rt-watchedVideo')
	let RTbetterFont = await getSavedSetting('rt-betterFont')
	let RTvideoDateCreated = await getSavedSetting('rt-videoDateCreated')
	let RTfocusFix = await getSavedSetting('rt-focusFix')
	let RTnotificationsRemove = await getSavedSetting('rt-notificationsRemove')
	let RTcustomTitleIcon = await getSavedSetting('rt-customTitleIcon')
	let RTreturnDislikes = await getSavedSetting('rt-returnDislikes')
	let RTfullVideoNames = await getSavedSetting('rt-fullVideoNames')
	let RTstopChannelTrailer = await getSavedSetting('rt-stopChannelTrailer')
	let RTremainingTime = await getSavedSetting('rt-remainingTime')
	let RTrememberTime = await getSavedSetting('rt-rememberTime')
	let RTvideoQuality = await getSavedSetting('rt-videoQuality')
	let RTfixChannelLinks = await getSavedSetting('rt-fixChannelLinks')
	let RTshowTranslationTime = await getSavedSetting('rt-showTranslationTime')
	let RTdisablePlayerSleep = await getSavedSetting('rt-disablePlayerSleep')
	let RTshowVideoCountOnChannel = await getSavedSetting('rt-showVideoCountOnChannel')
	let RThotkeysAlwaysActive = await getSavedSetting('rt-hotkeysAlwaysActive')
	let RTscrollVolume = await getSavedSetting('rt-scrollVolume')
	let RTmiddleClickSearch = await getSavedSetting('rt-middleClickSearch')
	let RTtranslateCommentButton = await getSavedSetting('rt-translateCommentButton')
	let RTscrollSpeed = await getSavedSetting('rt-scrollSpeed')
	let RTDefaultVolume = await getSavedSetting('rt-defaultVolume')

	let RTSettingsDateOnVideoBackgroundChange = await getSavedSetting('rt-settings-dateOnVideoBackgroundChange')
	let RTColorWatchedLabelBackground = await GM_getValue('rt-color-watchedLabelBackground') ?? '#343a41'
	let RTColorWatchedBackground = await GM_getValue('rt-color-watchedBackground') ?? '#bdbdbd'

	let RTColorYTMain = await GM_getValue('rt-color-YTMain') ?? '#1b222a'
	let RTColorYTAdditional = await GM_getValue('rt-color-YTAdditional') ?? '#222b35'
	let RTColorYTPlayer = await GM_getValue('rt-color-YTPlayer') ?? '#11161c'
	let RTColorYTText = await GM_getValue('rt-color-YTText') ?? '#c9d0d3'
	let RTColorYTLink = await GM_getValue('rt-color-YTLink') ?? '#a1bad7'
	let RTColorYTVideoProgress = await GM_getValue('rt-color-YTVideoProgress') ?? '#5785ba'

	let RTSelectYTColors = await GM_getValue('rt-select-YTColors') ?? 'default'
	let RTSelectVideoQuality = await GM_getValue('rt-select-videoQuality') ?? 'hd1440'
	let RTSelectTitleIconColor = await GM_getValue('rt-select-title-icon-color') ?? 'blue'
	let RTDefaultVolumeLevel = await GM_getValue('rt-select-defaultVolumeLevel') ?? '30'

	let RTHeadTop = await GM_getValue('rt-head-top') ?? '100px'
	let RTHeadLeft = await GM_getValue('rt-head-left') ?? '100px'

	let RTUpdateCheck = await getSavedSetting('rt-updateCheck') ? true : await GM_getValue('rt-updateCheck') === undefined
	//#endregion
	//#region Переменные
	const api = 'AIzaSyBYoUuFiFjwRsvqPEbEIdGngobbeL9xs9o'
	let playerHoverHandler, isScrolling = false, wheel = false
	//#endregion

	// Обходим внедрение HTML кода
	trustedTypes.createPolicy('default', { createHTML: (input) => input });

	if (RTanimateLoad) {
		waitSelector('head').then(() => {
			pushCSS('body, ytd-app, #background.ytd-masthead, #container.ytd-searchbox, #chips-wrapper.ytd-feed-filter-chip-bar-renderer, yt-chip-cloud-chip-renderer[chip-style=STYLE_HOME_FILTER], yt-chip-cloud-chip-renderer[chip-style=STYLE_REFRESH_TO_NOVEL_CHIP], #guide-content.ytd-app, ytd-mini-guide-renderer, ytd-mini-guide-entry-renderer, #description.ytd-watch-metadata, .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal, yt-chip-cloud-chip-renderer[chip-style=STYLE_DEFAULT], .ytp-swatch-background-color, .header.ytd-playlist-panel-renderer, .badge-style-type-medium-grey.ytd-badge-supported-renderer, .playlist-items.ytd-playlist-panel-renderer, ytd-playlist-panel-video-renderer[selected][use-color-palette], tp-yt-app-toolbar.ytd-c4-tabbed-header-renderer, #channel-container.ytd-c4-tabbed-header-renderer, #background, #primary, #container, #contentContainer' +
				'{transition: background 1s cubic-bezier(.21,.98,1,1); animation: 1s show cubic-bezier(0, 0, 0.5, 1)} @keyframes show { 0% { opacity: 0; } 50% { opacity: 0; } 95% { opacity: 0.95; } 100% { opacity: 1; } }', 'rtAnim')
			pushCSS('ytd-video-renderer, ytd-channel-renderer, ytd-rich-item-renderer, ytd-playlist-video-renderer, ytd-playlist-renderer, .ytd-grid-renderer:is(ytd-grid-video-renderer, ytd-grid-playlist-renderer, ytd-grid-show-renderer, ytd-grid-channel-renderer, ytd-vertical-product-card-renderer), .ytd-item-section-renderer:is(ytd-radio-renderer, ytd-playlist-renderer, ytd-compact-video-renderer, ytd-compact-playlist-renderer, ytd-compact-radio-renderer, ytd-backstage-post-thread-renderer, ytd-channel-about-metadata-renderer, ytd-channel-video-player-renderer, ytd-message-renderer, ytd-background-promo-renderer), #body.ytd-comment-renderer, #description.ytd-watch-metadata, ytd-metadata-row-container-renderer, #description.ytd-video-secondary-info-renderer, ytd-video-primary-info-renderer, .arrow.yt-horizontal-list-renderer {animation: cubic-bezier(0.4, 0, 0.2, 1) fadeInUp .8s} @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px);}to {opacity: 1;transform: translateY(0px);}}', 'rtAnimFadeInUp')
			pushCSS('.ytd-recognition-shelf-renderer:is(#avatars-container, #action-button), .ytd-channel-sub-menu-renderer:is(#sort-menu, ytd-menu-renderer), #subscribe-button.ytd-shelf-renderer, #menu:is(.ytd-watch-metadata, .ytd-rich-shelf-renderer, .ytd-shelf-renderer), #sort-filter.ytd-horizontal-card-list-renderer, ytd-menu-renderer.ytd-reel-shelf-renderer {animation: cubic-bezier(0.4, 0, 0.2, 1) fadeInLeft .8s} @keyframes fadeInLeft {from {opacity: 0;transform: translateX(20px);}to {opacity: 1;transform: translateX(0px);}}', 'rtAnimFadeInLeft')
			pushCSS('#text-container.ytd-recognition-shelf-renderer, #items:is(.yt-horizontal-list-renderer, .ytd-horizontal-card-list-renderer), h2:is(.ytd-rich-shelf-renderer, .ytd-shelf-renderer), #subtitle.ytd-shelf-renderer, #primary-items.ytd-channel-sub-menu-renderer, .ytd-watch-metadata:is(h1, ytd-badge-supported-renderer, #owner), .thumbnail-and-metadata-wrapper.ytd-playlist-header-renderer, h3.ytd-channel-featured-content-renderer, .ytd-horizontal-card-list-renderer:is(#header, #header-button), h2.ytd-reel-shelf-renderer {animation: cubic-bezier(0.4, 0, 0.2, 1) fadeInRight .8s;} @keyframes fadeInRight {from {opacity: 0;transform: translateX(-20px);}to {opacity: 1;transform: translateX(0px);}}', 'rtAnimFadeInLeft')
		})
	}
	if (RTDefaultVolume) ForceDefaultVideoVolume(true)
	if (RThideAllTrash) HideTrash(true)
	if (RTvideoDateCreated) finishEvent(() => DateTimeCreated(true, RTSettingsDateOnVideoBackgroundChange))
	if (RTstopChannelTrailer) StopChannelTrailer()
	if (RTvideoQuality) VideoQuality()
	if (RTshowVideoCountOnChannel) runOnPageInitOrTransition(() => ShowVideoCountOnChannel())

	if (document.readyState !== 'loading') ReTube(); else document.addEventListener('DOMContentLoaded', ReTube)

	async function ReTube() {
		if (!RTfirstLaunch && currentPage() != 'embed') {
			await Delay(1500)
			alert('ReTube.\nЧтобы открыть меню настроек, нажмите F2, находясь на сайте ютуба.')
			GM_setValue('rt-firstLaunch', 'yes')
		}

		if (RTcustomTitleIcon) CustomIcon(true, RTSelectTitleIconColor)
		if (RTfullVideoNames) FullVideoNames(true)
		if (RTnotificationsRemove) RemoveNotificationNumber()
		if (RTfocusFix) FocusAndScrollFix(true)
		if (RTremainingTime) RemainingTime()
		if (RTrememberTime) RememberTime()
		if (RTfixChannelLinks) FixChannelLinks()
		if (RTshowTranslationTime) ShowTranslationTime()
		if (RTdisablePlayerSleep) DisableSleep()
		if (RThotkeysAlwaysActive) HotkeysAlwaysActive()
		if (RTscrollVolume) ScrollVolume()
		if (RTmiddleClickSearch) MiddleClickSearch()
		if (RTtranslateCommentButton) TranslateCommentButton()
		if (RTscrollSpeed) ScrollSpeed()

		if (RTcolors) PaintYouTube(true)
		if (RTbetterFont) ImproveFont(true)
		if (RTwatchedVideo && !window.location.href.includes('feed/history')) MarkWatchedVideos(true)
		if (RTreturnDislikes) ReturnDislikes()

		await Delay(3000)
		document.querySelector('#rtAnim')?.remove()

		if (RTUpdateCheck && currentPage() != 'embed') {
			await Delay(5000)

			fetch('https://api.github.com/repos/Eject37/ReTube/releases/latest').then(response => response.json()).then(data => {
				const localVersion = GM_info.script.version;
				const onlineVersion = data.tag_name.replace('v', '');
				const changeLog = data.body;

				if (onlineVersion > localVersion) {
					if (confirm(`ReTube.\nДоступно обновление (${localVersion} > ${onlineVersion})\n\nСписок изменений:\n${changeLog}\n\nОбновить сейчас?`)) {
						GM_openInTab('https://github.com/Eject37/ReTube/raw/main/ReTube.user.js')
					}
				}
			}).catch()
		}
	}

	document.addEventListener('keyup', function (e) {
		if (e.key == 'F2' && currentPage() != 'embed') {
			const retubeMenuStyle = document.querySelector('#retube-menu-style')
			if (retubeMenuStyle) {
				document.querySelector('#retube-menu')?.toggleAttribute('hidden')
				return
			}

			//#region Стили
			pushCSS(`#retube-menu {animation: 0.3s show ease; background-color: rgb(37 37 45 / 36%); position: fixed; z-index: 999999; backdrop-filter: blur(10px); filter: drop-shadow(0 0 3px rgba(100,110,115,0.6)); border-radius: 7px} @keyframes show { from { opacity: 0; } to { opacity: 1; } }` +
				'.retube-label {font-size: 18px; color: rgb(201 208 211); font-family: "YouTube Sans"; padding-right: 4px; -webkit-user-select: none;} .retube-label:not(.info):hover {background: rgba(120 125 130 / 15%); border-radius: 6px}' +
				'.retube-additionalDiv:not(.color) {margin-left: 18px}' +
				'input[type="color"] {background: transparent; border: none; width: 25px; height: 25px}' +
				'[retube-tooltip] {position: relative} [retube-tooltip]::after {content: attr(retube-tooltip); position: absolute; white-space: pre; left: 0; top: 0; background: rgb(58, 67, 77); color: #fff; font-weight: 500; font-family: "YouTube Sans"; font-size: 18px; padding: 0.5em; box-shadow: 0 0 10px rgba(0, 0, 0 / 50%); pointer-events: none; opacity: 0; transition: 0.4s; border-radius: 13px; z-index: 999} [retube-tooltip]:hover::after {transition-delay: 0.8s; opacity: 1; top: 1.7em}' +
				'.retube-button {background: rgb(96 100 110 / 37%); color: rgb(201 208 211); border-radius: 5px; border-color: rgb(72 75 91); border-style: solid; margin: auto; display: flex; font-family: "YouTube Sans"; font-size: 16px; cursor: pointer} .retube-button:hover {background: rgb(96 100 110 / 60%)} .retube-button:not(.retube-button-reset) {margin-bottom: 5px}' +
				'.retube-button-reset {display: inline; width: 32px; height: 23px; margin-left: 5px}' +
				'.retube-button-hardReset {background: rgb(139 88 107 / 37%); border-color: rgb(91 69 85)} .retube-button-hardReset:hover {background: rgb(180 114 139 / 37%)}' +
				'.retube-label-additional {padding-left: 8px}' +
				'#rt-tabs {margin-bottom: 3px}' +
				'.rt-button-tab {background: transparent; border: none; border-radius: 10px; margin: 0px 2px; transition: background 0.3s ease, width 0.3s ease; width: 74px} .rt-button-tab.active {background: #8f9fb61f; width: 100px !important} .rt-button-tab:not(.active):hover {background: #96989b12} .rt-button-tab:focus {outline: none} .rt-button-settings-tab.active { width: 85px !important }' +
				'.rt-label-tabs {display: flex; flex-direction: column; font-size: 18px; color: rgb(201 208 211); font-family: "YouTube Sans";}' +
				'.rt-label-settings-tabs {display: flex; flex-direction: column; font-size: 15px; color: rgb(201 208 211); font-family: "YouTube Sans";}' +
				'.img-tab-icon {width: 30px; pointer-events: none}' +
				'.fade-in {opacity: 1; transition: opacity 0.3s ease} .fade-out {opacity: 0; max-height: 0; pointer-events: none}' +
				'.rt-title {margin-left: 4px; font-size: 22px; font-weight: bold}' +
				'.rt-select {border-color: rgb(72 75 91); border-radius: 10px; color: rgb(201 208 211); background: rgb(96 100 110 / 37%); height: 18px; margin-left: 3px;} .rt-select:focus {outline: none}' +
				'option {border-color: rgb(72 75 91); border-radius: 10px; background: rgb(96 100 110)}' +
				'.rt-label-head {font-weight: bold; margin-left: 6px; font-size: 20px; pointer-events: none} #rt-head {background: linear-gradient(rgb(67 77 105 / 37%), transparent); border-radius: 20px; display: flex; justify-content: space-between}' +
				'#rt-close-head {margin-left: auto}' +
				'.retube-label > input {accent-color: #9ba8c2} .retube-label > .important {accent-color: #7fa682}'
				, 'retube-menu-style')
			//#endregion

			//#region Основа меню

			document.querySelector('body').insertAdjacentHTML('beforeend', '<div id="retube-menu"></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div id="rt-head"><span class="retube-label rt-label-head">ReTube</span><span id="rt-close-head"><img src="https://i.imgur.com/ibUUDqp.png" style="width: 21px; margin-right: 4px" id="rt-closeImg-head" /></span></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div id="rt-tabs"><button class="rt-button-tab" data-tab="1"><img src="https://i.imgur.com/UW7uxaH.png" class="img-tab-icon" style="width: 27px; height: 27px;" /><span class="rt-label-tabs">Главная</span></button><button class="rt-button-tab" data-tab="2"><img src="https://i.imgur.com/PQ9b4Ke.png" class="img-tab-icon" /><span class="rt-label-tabs">Цвета</span></button><button class="rt-button-tab" data-tab="3"><img src="https://i.imgur.com/fKkwgP1.png" class="img-tab-icon" /><span class="rt-label-tabs">Инфо</span></button></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div id="retube-tab1"></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div id="retube-tab2"></div>')
			document.querySelector('#retube-menu').insertAdjacentHTML('beforeend', '<div id="retube-tab3"></div>')
			//#endregion

			//#region Таб Главная
			document.querySelector('#retube-tab1').insertAdjacentHTML('beforeend', '<div id="rt-settings-tabs"><button class="rt-button-tab rt-button-settings-tab" data-settingsTab="1"><img src="https://i.imgur.com/l8f9xhj.png" class="img-tab-icon" style="width: 22px; height: 22px;" /><span class="rt-label-settings-tabs">Основные</span></button><button class="rt-button-tab rt-button-settings-tab" data-settingsTab="2"><img src="https://i.imgur.com/jCyfm4a.png" class="img-tab-icon" style="width: 22px; height: 22px;" /><span class="rt-label-settings-tabs">Другие</span></button></div>')
			document.querySelector('#retube-tab1').insertAdjacentHTML('beforeend', '<div id="retube-settings-tab1"></div>')
			document.querySelector('#retube-tab1').insertAdjacentHTML('beforeend', '<div id="retube-settings-tab2"></div>')
			document.querySelector('#retube-tab1').insertAdjacentHTML('beforeend', '<div id="retube-settings-tab3"></div>')

			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkboxAnimateLoad"></input>Плавные анимации страницы</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Будут скрыты:||• Кнопка голосового поиска||• Страна возле иконки||• Элементы с левой панели (копирайты и прочее)||• Кнопки в плеере (перемотка, вперед и назад,||автовоспроизвидение, трансляция, мини-плеер)||• Аннотация канала в конце видео||• Панель реакций в чате||• Надпись в поиске `Пожаловаться на поисковые||подсказки`||• Кнопка клавиатуры в строке поиска||• Кнопка `Добавить в очередь` при наведении на видео||на главной странице||• Кнопки `Справка` и `Отправить отзыв` в меню аккаунта||• Кнопки под видео `Поделиться`, `Создать клип`,||`Скачать`, `Спасибо`"><input type="checkbox" id="rt-checkbox0"></input>Скрыть много ненужных кнопок, надписей</label></div>')

			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/rqgywVe.png"><input type="checkbox" id="rt-checkbox1">Помечать просмотренные видео</input></label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Дополнительно желательно отключить ClearType||в браузере"><input type="checkbox" id="rt-checkbox2">Изменить шрифт на Ubuntu</input></label></div>')

			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/ZQ3CFlm.png"><input type="checkbox" id="rt-checkbox3"></input>Показывать дату и время загрузки видео в названии</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', `<div class="rt-settingsDateOnVideoBackgroundDiv retube-additionalDiv"${RTvideoDateCreated ? '' : ' hidden'}><label class="retube-label" retube-tooltip="https://i.imgur.com/8NzFBsS.png"><input type="checkbox" id="rt-checkboxSettingsDateOnVideoBackground"></input>Обводка вместо заливки</label></div>`)

			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox4"></input>Сфокусироваться на видео при наведении</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox5"></input>Удалить с заголовка страницы количество уведомлений</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', `<div><label class="retube-label"><input type="checkbox" id="rt-checkbox6"></input>Синяя иконка в заголовке страницы</label><select id="rt-selectTitleIconColor" class="rt-select" ${RTcustomTitleIcon ? '' : ' hidden'}><option value="blue">Синяя</option><option value="gray">Серая</option></select></div>`)
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox7"></input>Вернуть дизлайки</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox8"></input>Показывать целиком заголовки видео</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox9"></input>Запретить автовоспроизведение трейлера канала</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox10"></input>Показывать оставшееся время видео</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label"><input type="checkbox" id="rt-checkbox11"></input>Сохранение прогресса видео при перезагрузке страницы</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', `<div><label class="retube-label"><input type="checkbox" id="rt-checkbox12"></input>Принудительное качество видео</label><select id="rt-selectVideoQuality" class="rt-select" ${RTvideoQuality ? '' : ' hidden'}><option value="highres">8K/4320p</option><option value="hd2160">4K/2160p</option><option value="hd1440">QHD/1440p</option><option value="hd1080">FHD/1080p</option><option value="hd720">720p</option><option value="large">480p</option><option value="medium">360p</option><option value="small">240p</option><option value="tiny">144p</option></select></div>`)
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/bVYoFaS.png"><input type="checkbox" id="rt-checkbox13"></input>Исправить ссылки на канал в боковой панели</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/kICYHsq.png"><input type="checkbox" id="rt-checkbox14"></input>Показывать время трансляции</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Может быть полезно, если вы хотите слушать||музыку на фоне. Запрещает паузу видео при||отсутствии активности"><input type="checkbox" id="rt-checkbox15"></input>Отключить засыпание плеера</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/9V8WYnf.png"><input type="checkbox" id="rt-checkbox16"></input>Показывать количество видео на канале</label></div>')
			document.querySelector('#retube-settings-tab1').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Клавиши перемотки видео,||регулировки звука."><input type="checkbox" id="rt-checkbox17"></input>Горячие клавиши плеера всегда активны</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/SRYep7k.png"><input type="checkbox" id="rt-checkbox18"></input>Изменение громкости видео на 1% (Shift + колесо)</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/YNFVrke.png"><input type="checkbox" id="rt-checkbox19"></input>Открывать результаты поиска в новой вкладке (СКМ)</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="https://i.imgur.com/PyJ1GvF.png"><input type="checkbox" id="rt-checkbox20"></input>Добавить кнопку перевода комментариев</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<div><label class="retube-label" retube-tooltip="Правый клик: стандартная скорость||Колесо: регулировка скорости на 0.1x"><input type="checkbox" id="rt-checkbox21"></input>Изменение скорости видео на кнопке \'Настройки\'</label></div>')
			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', `<div><label class="retube-label"><input type="checkbox" id="rt-checkbox23"></input>Принудительная громкость видео при запуске</label><select id="rt-selectDefaultVolume" class="rt-select" ${RTDefaultVolume ? '' : ' hidden'}><option value="100">100%</option><option value="80">80%</option><option value="70">70%</option><option value="60">60%</option><option value="50">50%</option><option value="40">40%</option><option value="30">30%</option><option value="20">20%</option><option value="10">10%</option><option value="5">5%</option><option value="1">1%</option><option value="0">0%</option></select></div>`)

			document.querySelector('#retube-settings-tab2').insertAdjacentHTML('beforeend', '<br/><div><label class="retube-label"><input type="checkbox" id="rt-checkbox22" class="important"></input>Автоматическая проверка обновлений скрипта</label></div>')

			document.querySelector('#retube-tab1').insertAdjacentHTML('beforeend', '<br/><button class="retube-button retube-button-save">Сохранить</button>')
			//#endregion
			//#region Таб Цвета
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div><label class="retube-label" retube-tooltip="Для корректной работы, тема||ютуба должна быть тёмной"><input type="checkbox" id="rt-checkboxMain"></input>Перекрасить YouTube</label><select id="rt-selectRTColors" class="rt-select"${RTcolors ? '' : ' hidden'}><option value="default">ReTube</option><option value="defaultDark">ReTube Dark</option><option value="dark">Тёмный</option><option value="purple">Пурпурный</option><option value="green">Зелёный</option><option value="custom">Свои цвета</option></select></div>`)
			//document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorYTMain retube-additionalDiv color"${RTcolors ? '' : ' hidden'} style="margin-bottom: 5px; margin-top: 5px"><span class="retube-label info rt-title">YouTube</span><select id="rt-selectRTColors" class="rt-select"><option value="default">ReTube</option><option value="defaultDark">ReTube Dark</option><option value="purple">Пурпурный</option><option value="green">Зелёный</option><option value="custom">Свои цвета</option></select></div>`)

			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorYT retube-additionalDiv color"${RTcolors ? '' : ' hidden'}><label class="retube-label retube-label-additional">Основной<input type="color" id="rt-colorYTMain"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-colorYTMain'); colorInput.value = '#1b222a'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorYT retube-additionalDiv color"${RTcolors ? '' : ' hidden'}><label class="retube-label retube-label-additional">Дополнительный<input type="color" id="rt-colorYTAdditional"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-colorYTAdditional'); colorInput.value = '#222b35'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorYT retube-additionalDiv color"${RTcolors ? '' : ' hidden'}><label class="retube-label retube-label-additional">Плеер<input type="color" id="rt-colorYTPlayer"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-colorYTPlayer'); colorInput.value = '#11161c'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorYT retube-additionalDiv color"${RTcolors ? '' : ' hidden'}><label class="retube-label retube-label-additional">Текст<input type="color" id="rt-colorYTText"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-colorYTText'); colorInput.value = '#c9d0d3'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorYT retube-additionalDiv color"${RTcolors ? '' : ' hidden'}><label class="retube-label retube-label-additional">Ссылки<input type="color" id="rt-colorYTLink"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-colorYTLink'); colorInput.value = '#a1bad7'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorYT retube-additionalDiv color"${RTcolors ? '' : ' hidden'}><label class="retube-label retube-label-additional">Полоска прогресса<input type="color" id="rt-colorYTVideoProgress"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-colorYTVideoProgress'); colorInput.value = '#5785ba'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)

			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorWatched retube-additionalDiv color"${RTwatchedVideo ? '' : ' hidden'} style="margin-bottom: 5px; margin-top: 5px"><span class="retube-label info rt-title">Просмотрено</span></div>`)
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorWatched retube-additionalDiv color"${RTwatchedVideo ? '' : ' hidden'}><label class="retube-label retube-label-additional">Задний цвет надписи<input type="color" id="rt-color1"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-color1'); colorInput.value = '#343a41'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)
			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', `<div class="rt-colorWatched retube-additionalDiv color"${RTwatchedVideo ? '' : ' hidden'}><label class="retube-label retube-label-additional">Задний цвет<input type="color" id="rt-color2"></input></label><button class="retube-button retube-button-reset" onclick="const colorInput = document.querySelector('#rt-color2'); colorInput.value = '#ffffff'; colorInput.dispatchEvent(new Event('input', { bubbles: true }))"></button></div>`)

			document.querySelector('#retube-tab2').insertAdjacentHTML('beforeend', '<br/><button class="retube-button retube-button-save">Сохранить</button>')
			//#endregion
			//#region Таб Инфо
			document.querySelector('#retube-tab3').insertAdjacentHTML('beforeend', `<br/><div class="retube-label info" style="text-align: center; font-size: 24px; font-weight: bold">ReTube v${GM_info.script.version}</div>`)
			document.querySelector('#retube-tab3').insertAdjacentHTML('beforeend', '<div class="retube-label info" style="text-align: center;">Разработчик скрипта: Сергей (Eject)</div>')
			document.querySelector('#retube-tab3').insertAdjacentHTML('beforeend', '<div><br/><button class="retube-button retube-button-discord" onclick="window.open(`https://github.com/Eject37`)">Мои работы</button></div>')
			document.querySelector('#retube-tab3').insertAdjacentHTML('beforeend', '<div><button class="retube-button retube-button-github" onclick="window.open(`https://discord.gg/8baJSRxXSm`)">Мой Discord сервер</button></div>')
			document.querySelector('#retube-tab3').insertAdjacentHTML('beforeend', '<div><br/><button class="retube-button retube-button-hardReset">Сбросить ВСЕ настройки ReTube</button></div>')
			//#endregion

			//#region Переключение табов
			document.querySelectorAll('button[data-tab]').forEach(button => {
				button.addEventListener('click', function () {
					const tabId = button.getAttribute('data-tab');
					document.querySelectorAll('div[id^="retube-tab"]').forEach(el => {
						el.classList.remove('fade-in')
						el.classList.add('fade-out')
					})
					document.querySelector(`#retube-tab${tabId}`).classList.remove('fade-out')
					document.querySelector(`#retube-tab${tabId}`).classList.add('fade-in')
					document.querySelectorAll('button[data-tab]').forEach(x => x.classList.remove('active'))
					button.classList.add('active')
				})
			})

			document.querySelector('button[data-tab="1"]').dispatchEvent(new Event('click', { bubbles: true }))

			document.querySelectorAll('button[data-settingsTab]').forEach(button => {
				button.addEventListener('click', function () {
					const tabId = button.getAttribute('data-settingsTab');
					document.querySelectorAll('div[id^="retube-settings-tab"]').forEach(el => {
						el.classList.remove('fade-in')
						el.classList.add('fade-out')
					})
					document.querySelector(`#retube-settings-tab${tabId}`).classList.remove('fade-out')
					document.querySelector(`#retube-settings-tab${tabId}`).classList.add('fade-in')
					document.querySelectorAll('button[data-settingsTab]').forEach(x => x.classList.remove('active'))
					button.classList.add('active')
				})
			})

			document.querySelector('button[data-settingsTab="1"]').dispatchEvent(new Event('click', { bubbles: true }))
			//#endregion

			//#region Настройки и сохранение
			document.querySelector('#retube-menu').style.top = RTHeadTop
			document.querySelector('#retube-menu').style.left = RTHeadLeft

			const checkboxMain = document.querySelector('#rt-checkboxMain')
			const checkboxAnimateLoad = document.querySelector('#rt-checkboxAnimateLoad')
			const checkbox0 = document.querySelector('#rt-checkbox0')
			const checkbox1 = document.querySelector('#rt-checkbox1')
			const checkbox2 = document.querySelector('#rt-checkbox2')
			const checkbox3 = document.querySelector('#rt-checkbox3')
			const checkbox4 = document.querySelector('#rt-checkbox4')
			const checkbox5 = document.querySelector('#rt-checkbox5')
			const checkbox6 = document.querySelector('#rt-checkbox6')
			const checkbox7 = document.querySelector('#rt-checkbox7')
			const checkbox8 = document.querySelector('#rt-checkbox8')
			const checkbox9 = document.querySelector('#rt-checkbox9')
			const checkbox10 = document.querySelector('#rt-checkbox10')
			const checkbox11 = document.querySelector('#rt-checkbox11')
			const checkbox12 = document.querySelector('#rt-checkbox12')
			const checkbox13 = document.querySelector('#rt-checkbox13')
			const checkbox14 = document.querySelector('#rt-checkbox14')
			const checkbox15 = document.querySelector('#rt-checkbox15')
			const checkbox16 = document.querySelector('#rt-checkbox16')
			const checkbox17 = document.querySelector('#rt-checkbox17')
			const checkbox18 = document.querySelector('#rt-checkbox18')
			const checkbox19 = document.querySelector('#rt-checkbox19')
			const checkbox20 = document.querySelector('#rt-checkbox20')
			const checkbox21 = document.querySelector('#rt-checkbox21')
			const checkbox22 = document.querySelector('#rt-checkbox22')
			const checkbox23 = document.querySelector('#rt-checkbox23')
			const checkboxSettings1 = document.querySelector('#rt-checkboxSettingsDateOnVideoBackground')
			const color1 = document.querySelector('#rt-color1')
			const color2 = document.querySelector('#rt-color2')

			const colorMain = document.querySelector('#rt-colorYTMain')
			const colorAdditional = document.querySelector('#rt-colorYTAdditional')
			const colorPlayer = document.querySelector('#rt-colorYTPlayer')
			const colorText = document.querySelector('#rt-colorYTText')
			const colorLink = document.querySelector('#rt-colorYTLink')
			const colorVideoProgress = document.querySelector('#rt-colorYTVideoProgress')

			const selectYTColors = document.querySelector('#rt-selectRTColors')
			const selectVideoQuality = document.querySelector('#rt-selectVideoQuality')
			const selectTitleIconColor = document.querySelector('#rt-selectTitleIconColor')
			const selectDefaultVolume = document.querySelector('#rt-selectDefaultVolume')

			checkboxMain.checked = RTcolors
			checkboxAnimateLoad.checked = RTanimateLoad
			checkbox0.checked = RThideAllTrash
			checkbox1.checked = RTwatchedVideo
			checkbox2.checked = RTbetterFont
			checkbox3.checked = RTvideoDateCreated
			checkbox4.checked = RTfocusFix
			checkbox5.checked = RTnotificationsRemove
			checkbox6.checked = RTcustomTitleIcon
			checkbox7.checked = RTreturnDislikes
			checkbox8.checked = RTfullVideoNames
			checkbox9.checked = RTstopChannelTrailer
			checkbox10.checked = RTremainingTime
			checkbox11.checked = RTrememberTime
			checkbox12.checked = RTvideoQuality
			checkbox13.checked = RTfixChannelLinks
			checkbox14.checked = RTshowTranslationTime
			checkbox15.checked = RTdisablePlayerSleep
			checkbox16.checked = RTshowVideoCountOnChannel
			checkbox17.checked = RThotkeysAlwaysActive
			checkbox18.checked = RTscrollVolume
			checkbox19.checked = RTmiddleClickSearch
			checkbox20.checked = RTtranslateCommentButton
			checkbox21.checked = RTscrollSpeed
			checkbox22.checked = RTUpdateCheck
			checkbox23.checked = RTDefaultVolume
			checkboxSettings1.checked = RTSettingsDateOnVideoBackgroundChange
			color1.value = RTColorWatchedLabelBackground
			color2.value = RTColorWatchedBackground

			colorMain.value = RTColorYTMain
			colorAdditional.value = RTColorYTAdditional
			colorPlayer.value = RTColorYTPlayer
			colorText.value = RTColorYTText
			colorLink.value = RTColorYTLink
			colorVideoProgress.value = RTColorYTVideoProgress

			selectYTColors.value = RTSelectYTColors
			selectVideoQuality.value = RTSelectVideoQuality
			selectTitleIconColor.value = RTSelectTitleIconColor
			selectDefaultVolume.value = RTDefaultVolumeLevel

			document.querySelectorAll('.retube-button-save').forEach(x => x.addEventListener('click', function () {
				GM_setValue('rt-colors', checkboxMain.checked ? 'true' : 'false')
				GM_setValue('rt-animateLoad', checkboxAnimateLoad.checked ? 'true' : 'false')
				GM_setValue('rt-hideAllTrash', checkbox0.checked ? 'true' : 'false')
				GM_setValue('rt-watchedVideo', checkbox1.checked ? 'true' : 'false')
				GM_setValue('rt-betterFont', checkbox2.checked ? 'true' : 'false')
				GM_setValue('rt-videoDateCreated', checkbox3.checked ? 'true' : 'false')
				GM_setValue('rt-focusFix', checkbox4.checked ? 'true' : 'false')
				GM_setValue('rt-notificationsRemove', checkbox5.checked ? 'true' : 'false')
				GM_setValue('rt-customTitleIcon', checkbox6.checked ? 'true' : 'false')
				GM_setValue('rt-returnDislikes', checkbox7.checked ? 'true' : 'false')
				GM_setValue('rt-fullVideoNames', checkbox8.checked ? 'true' : 'false')
				GM_setValue('rt-stopChannelTrailer', checkbox9.checked ? 'true' : 'false')
				GM_setValue('rt-remainingTime', checkbox10.checked ? 'true' : 'false')
				GM_setValue('rt-rememberTime', checkbox11.checked ? 'true' : 'false')
				GM_setValue('rt-videoQuality', checkbox12.checked ? 'true' : 'false')
				GM_setValue('rt-fixChannelLinks', checkbox13.checked ? 'true' : 'false')
				GM_setValue('rt-showTranslationTime', checkbox14.checked ? 'true' : 'false')
				GM_setValue('rt-disablePlayerSleep', checkbox15.checked ? 'true' : 'false')
				GM_setValue('rt-showVideoCountOnChannel', checkbox16.checked ? 'true' : 'false')
				GM_setValue('rt-hotkeysAlwaysActive', checkbox17.checked ? 'true' : 'false')
				GM_setValue('rt-scrollVolume', checkbox18.checked ? 'true' : 'false')
				GM_setValue('rt-middleClickSearch', checkbox19.checked ? 'true' : 'false')
				GM_setValue('rt-translateCommentButton', checkbox20.checked ? 'true' : 'false')
				GM_setValue('rt-scrollSpeed', checkbox21.checked ? 'true' : 'false')
				GM_setValue('rt-defaultVolume', checkbox23.checked ? 'true' : 'false')

				GM_setValue('rt-updateCheck', checkbox22.checked ? 'true' : 'false')

				GM_setValue('rt-settings-dateOnVideoBackgroundChange', checkboxSettings1.checked ? 'true' : 'false')
				GM_setValue('rt-color-watchedLabelBackground', color1.value)
				GM_setValue('rt-color-watchedBackground', color2.value)

				GM_setValue('rt-color-YTMain', colorMain.value)
				GM_setValue('rt-color-YTAdditional', colorAdditional.value)
				GM_setValue('rt-color-YTPlayer', colorPlayer.value)
				GM_setValue('rt-color-YTText', colorText.value)
				GM_setValue('rt-color-YTLink', colorLink.value)
				GM_setValue('rt-color-YTVideoProgress', colorVideoProgress.value)

				GM_setValue('rt-select-YTColors', selectYTColors.value)
				GM_setValue('rt-select-videoQuality', selectVideoQuality.value)
				GM_setValue('rt-select-title-icon-color', selectTitleIconColor.value)
				GM_setValue('rt-select-defaultVolumeLevel', selectDefaultVolume.value)

				GM_setValue('rt-head-top', document.querySelector('#retube-menu').style.top)
				GM_setValue('rt-head-left', document.querySelector('#retube-menu').style.left)

				x.textContent = 'Успешно сохранено'
				setTimeout(() => x.textContent = 'Сохранить', 1000)
			}))
			//#endregion

			//#region Функциональность всех кнопок|панелей|колорпикеров
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

			colorMain.addEventListener('input', debounce(e => document.documentElement.style.setProperty('--YT-main-color', e.target.value), 20))
			colorAdditional.addEventListener('input', debounce(e => {
				document.documentElement.style.setProperty('--YT-additional-color', e.target.value)
				document.documentElement.style.setProperty('--YT-hover-and-dateVideoLoad-color', ModifyColor(e.target.value, 4, 4, 4))
				document.documentElement.style.setProperty('--YT-hoverVideoButton-color', ModifyColor(e.target.value, 11, 12, 13))
				document.documentElement.style.setProperty('--YT-overlayMenu-color', ModifyColor(e.target.value, 5, 4, 3) + 'ba')
				document.documentElement.style.setProperty('--YT-hoverAndPanels2-color', ModifyColor(e.target.value, 14, 15, 15))
				document.documentElement.style.setProperty('--YT-searchBorder-color', ModifyColor(e.target.value, 62, 60, 70) + '42')
				document.documentElement.style.setProperty('--YT-searchBorderHover-color', ModifyColor(e.target.value, 92, 90, 100) + '42')
				document.documentElement.style.setProperty('--YT-icon-color', ModifyColor(e.target.value, 26, 22, 17))
				document.documentElement.style.setProperty('--YT-videoTime-color', ModifyColor(e.target.value, 11, 13, 15) + 'ba')
			}, 20))
			colorPlayer.addEventListener('input', debounce(e => document.documentElement.style.setProperty('--YT-player-color', e.target.value), 20))
			colorText.addEventListener('input', debounce(e => {
				document.documentElement.style.setProperty('--YT-text-color', e.target.value)
				document.documentElement.style.setProperty('--YT-icon-inactive', ModifyColor(e.target.value, -25, -23, -15))
				document.documentElement.style.setProperty('--YT-iconText-color', ModifyColor(e.target.value, -1, -8, -11))
				document.documentElement.style.setProperty('--YT-searchBoxPlaceholder-color', ModifyColor(e.target.value, -50, -50, -50))
			}, 20))
			colorLink.addEventListener('input', debounce(e => {
				document.documentElement.style.setProperty('--YT-link-color', e.target.value)
				document.documentElement.style.setProperty('--YT-notificationsBadge-color', ModifyColor(e.target.value, -95, -78, -58))
				document.documentElement.style.setProperty('--YT-panelActiveButton-color', ModifyColor(e.target.value, -56, -46, -20))
				document.documentElement.style.setProperty('--YT-HD4KBadge-color', ModifyColor(e.target.value, -97, -94, -78))
			}, 20))
			colorVideoProgress.addEventListener('input', debounce(e => document.documentElement.style.setProperty('--YT-videoProgress-color', e.target.value), 20))

			checkboxMain.addEventListener('change', e => {
				document.querySelectorAll(".rt-colorYT").forEach(x => x.toggleAttribute('hidden', !e.target.checked || selectYTColors.value != 'custom'))
				document.querySelector("#rt-selectRTColors").toggleAttribute('hidden', !e.target.checked)
				pushCSS('body, ytd-app, #background.ytd-masthead, #container.ytd-searchbox, #chips-wrapper.ytd-feed-filter-chip-bar-renderer, yt-chip-cloud-chip-renderer[chip-style=STYLE_HOME_FILTER], yt-chip-cloud-chip-renderer[chip-style=STYLE_REFRESH_TO_NOVEL_CHIP], #guide-content.ytd-app, ytd-mini-guide-renderer, ytd-mini-guide-entry-renderer, #description.ytd-watch-metadata, .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal, yt-chip-cloud-chip-renderer[chip-style=STYLE_DEFAULT], .ytp-swatch-background-color, .header.ytd-playlist-panel-renderer, .badge-style-type-medium-grey.ytd-badge-supported-renderer, .playlist-items.ytd-playlist-panel-renderer, ytd-playlist-panel-video-renderer[selected][use-color-palette], tp-yt-app-toolbar.ytd-c4-tabbed-header-renderer, #channel-container.ytd-c4-tabbed-header-renderer, #background, #primary, #container, #contentContainer' +
					'{transition: background 1s ease !important}', 'rtChangeAnimation')
				PaintYouTube(e.target.checked)
				setTimeout(() => document.querySelector('#rtChangeAnimation')?.remove(), 1100)
			})
			checkbox0.addEventListener('change', e => HideTrash(e.target.checked))
			checkbox1.addEventListener('change', e => MarkWatchedVideos(e.target.checked))
			checkbox2.addEventListener('change', e => ImproveFont(e.target.checked))
			checkbox3.addEventListener('change', e => DateTimeCreated(e.target.checked, document.querySelector('#rt-checkboxSettingsDateOnVideoBackground').checked))
			checkboxSettings1.addEventListener('change', e => DateTimeCreated(document.querySelector('#rt-checkbox3').checked, e.target.checked))
			checkbox4.addEventListener('change', e => FocusAndScrollFix(e.target.checked))
			checkbox6.addEventListener('change', e => selectTitleIconColor.toggleAttribute('hidden', !e.target.checked) & CustomIcon(e.target.checked, selectTitleIconColor.value))
			checkbox7.addEventListener('change', e => { if (e.target.checked) ReturnDislikes() })
			checkbox8.addEventListener('change', e => FullVideoNames(e.target.checked))
			checkbox9.addEventListener('change', e => { if (e.target.checked) StopChannelTrailer() })
			checkbox10.addEventListener('change', e => { if (e.target.checked) RemainingTime() })
			checkbox11.addEventListener('change', e => { if (e.target.checked) RememberTime() })
			checkbox12.addEventListener('change', e => selectVideoQuality.toggleAttribute('hidden', !e.target.checked))
			checkbox13.addEventListener('change', e => { if (e.target.checked) FixChannelLinks() })
			checkbox15.addEventListener('change', e => { if (e.target.checked) DisableSleep() })
			checkbox16.addEventListener('change', e => { if (e.target.checked) runOnPageInitOrTransition(() => ShowVideoCountOnChannel()) })
			checkbox17.addEventListener('change', e => { if (e.target.checked) HotkeysAlwaysActive() })
			checkbox18.addEventListener('change', e => { if (e.target.checked) ScrollVolume() })
			checkbox21.addEventListener('change', e => { if (e.target.checked) ScrollSpeed() })
			checkbox23.addEventListener('change', e => (RTDefaultVolume = e.target.checked, ForceDefaultVideoVolume(e.target.checked), selectDefaultVolume.toggleAttribute('hidden', !e.target.checked)));
			checkbox1.addEventListener('change', e => document.querySelectorAll(".rt-colorWatched").forEach(x => x.toggleAttribute('hidden', !e.target.checked)))
			checkbox3.addEventListener('change', e => document.querySelector(".rt-settingsDateOnVideoBackgroundDiv").toggleAttribute('hidden', !e.target.checked))

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
			document.querySelector('.retube-button-hardReset').addEventListener('click', () => {
				if (!confirm('Вы уверены что хотите сбросить все настройки ReTube?')) return

				GM_listValues().forEach(x => GM_deleteValue(x))
				location.reload()
			})

			if (!checkboxMain.checked || selectYTColors.value != 'custom') document.querySelectorAll(".rt-colorYT").forEach(x => x.toggleAttribute('hidden', true))
			selectYTColors.addEventListener("change", e => {
				HideColors(true)
				pushCSS('body, ytd-app, #background.ytd-masthead, #container.ytd-searchbox, #chips-wrapper.ytd-feed-filter-chip-bar-renderer, yt-chip-cloud-chip-renderer[chip-style=STYLE_HOME_FILTER], yt-chip-cloud-chip-renderer[chip-style=STYLE_REFRESH_TO_NOVEL_CHIP], #guide-content.ytd-app, ytd-mini-guide-renderer, ytd-mini-guide-entry-renderer, #description.ytd-watch-metadata, .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal, yt-chip-cloud-chip-renderer[chip-style=STYLE_DEFAULT], .ytp-swatch-background-color, .header.ytd-playlist-panel-renderer, .badge-style-type-medium-grey.ytd-badge-supported-renderer, .playlist-items.ytd-playlist-panel-renderer, ytd-playlist-panel-video-renderer[selected][use-color-palette], tp-yt-app-toolbar.ytd-c4-tabbed-header-renderer, #channel-container.ytd-c4-tabbed-header-renderer, #background, #primary, #container, #contentContainer' +
					'{transition: background 1s ease !important}', 'rtChangeAnim')

				const selected = e.target.value
				if (selected == 'default') {
					colorMain.value = '#1b222a'
					colorAdditional.value = '#222b35'
					colorPlayer.value = '#11161c'
					colorText.value = '#c9d0d3'
					colorLink.value = '#a1bad7'
					colorVideoProgress.value = '#5785ba'
				}
				else if (selected == 'defaultDark') {
					colorMain.value = '#101419'
					colorAdditional.value = '#1a2128'
					colorPlayer.value = '#0c0d0e'
					colorText.value = '#c9d0d3'
					colorLink.value = '#a1bad7'
					colorVideoProgress.value = '#5785ba'
				}
				else if (selected == 'dark') {
					colorMain.value = '#101214'
					colorAdditional.value = '#1b1e21'
					colorPlayer.value = '#080909'
					colorText.value = '#c9d0d3'
					colorLink.value = '#a1bad7'
					colorVideoProgress.value = '#5785ba'
				}
				else if (selected == 'purple') {
					colorMain.value = '#191014'
					colorAdditional.value = '#2e1f2a'
					colorPlayer.value = '#0e0c0e'
					colorText.value = '#c9d0d3'
					colorLink.value = '#d1a8b2'
					colorVideoProgress.value = '#954166'
				}
				else if (selected == 'green') {
					colorMain.value = '#101917'
					colorAdditional.value = '#1a2825'
					colorPlayer.value = '#0c0d0e'
					colorText.value = '#c9d0d3'
					colorLink.value = '#a5e4d9'
					colorVideoProgress.value = '#409c91'
				}
				else if (selected == 'custom') {
					HideColors(false)
				}
				CallColorEvent()

				setTimeout(() => document.querySelector('#rtChangeAnim')?.remove(), 1100)

				function HideColors(hide) {
					document.querySelectorAll(".rt-colorYT").forEach(x => x.toggleAttribute('hidden', hide))
				}
				function CallColorEvent() {
					colorMain.dispatchEvent(new Event('input', { bubbles: true }))
					colorAdditional.dispatchEvent(new Event('input', { bubbles: true }))
					colorPlayer.dispatchEvent(new Event('input', { bubbles: true }))
					colorText.dispatchEvent(new Event('input', { bubbles: true }))
					colorLink.dispatchEvent(new Event('input', { bubbles: true }))
					colorVideoProgress.dispatchEvent(new Event('input', { bubbles: true }))
				}
			})

			selectTitleIconColor.addEventListener("change", e => {
				const selected = e.target.value
				if (selected == 'blue') {
					CustomIcon(true, 'blue')
				}
				else if (selected == 'gray') {
					CustomIcon(true, 'gray')
				}
			})

			selectDefaultVolume.addEventListener("change", e => {
				RTDefaultVolumeLevel = e.target.value
			})

			const dragHeader = (() => {
				let isDragging = false
				let offsetX, offsetY

				const draggableWindow = document.querySelector('#retube-menu')
				const windowPadding = 10
				const snapDistance = 20

				const setPosition = (x, y) => {
					draggableWindow.style.left = x + 'px'
					draggableWindow.style.top = y + 'px'
				}

				return (e) => {
					switch (e.type) {
						case 'mousedown':
							e.preventDefault()
							isDragging = true
							const { offsetLeft, offsetTop } = draggableWindow
							offsetX = e.clientX - offsetLeft
							offsetY = e.clientY - offsetTop
							break
						case 'mousemove':
							if (!isDragging) return
							const { clientX, clientY } = e
							const x = clientX - offsetX
							const y = clientY - offsetY

							const snapXLeft = x <= snapDistance ? windowPadding : null
							const snapXRight = x >= window.innerWidth - draggableWindow.offsetWidth - (snapDistance + 10) ? window.innerWidth - draggableWindow.offsetWidth - (windowPadding + 10) : null
							const snapYTop = y <= snapDistance ? windowPadding : null
							const snapYBottom = y >= window.innerHeight - draggableWindow.offsetHeight - snapDistance ? window.innerHeight - draggableWindow.offsetHeight - windowPadding : null

							setPosition(snapXLeft !== null ? snapXLeft : snapXRight !== null ? snapXRight : x, snapYTop !== null ? snapYTop : snapYBottom !== null ? snapYBottom : y)
							break
						case 'mouseup':
							isDragging = false
							break
					}
				}
			})()
			document.querySelector('#rt-head').addEventListener('mousedown', dragHeader)
			document.addEventListener('mousemove', dragHeader)
			document.addEventListener('mouseup', dragHeader)

			document.querySelector('#rt-closeImg-head').addEventListener('click', () => document.querySelector('#retube-menu')?.toggleAttribute('hidden'))
			//#endregion
		}
	})

	//#region Основные функции
	function PaintYouTube(paint) {
		if (!paint) {
			document.querySelector('#rt-paint')?.remove()
			return
		}

		pushCSS(`:root {--YT-main-color: ${RTColorYTMain}; --YT-additional-color: ${RTColorYTAdditional}; --YT-hover-and-dateVideoLoad-color: ${ModifyColor(RTColorYTAdditional, 4, 4, 4)};` +
			`--YT-hoverVideoButton-color: ${ModifyColor(RTColorYTAdditional, 11, 12, 13)}; --YT-text-color: ${RTColorYTText}; --YT-overlayMenu-color: ${ModifyColor(RTColorYTAdditional, 5, 4, 3)}ba;` +
			`--YT-hoverAndPanels2-color: ${ModifyColor(RTColorYTAdditional, 14, 15, 15)}; --YT-link-color: ${RTColorYTLink}; --YT-icon-inactive: ${ModifyColor(RTColorYTText, -25, -23, -15)};` +
			`--YT-searchBorder-color: ${ModifyColor(RTColorYTAdditional, 62, 60, 70)}42; --YT-searchBorderHover-color: ${ModifyColor(RTColorYTAdditional, 92, 90, 100)}42;` +
			`--YT-videoProgress-color: ${RTColorYTVideoProgress}; --YT-iconText-color: ${ModifyColor(RTColorYTText, -1, -8, -11)}; --YT-icon-color: ${ModifyColor(RTColorYTAdditional, 26, 22, 17)};` +
			`--YT-player-color: ${RTColorYTPlayer}; --YT-videoTime-color: ${ModifyColor(RTColorYTAdditional, 11, 13, 15)}ba;` +
			`--YT-notificationsBadge-color: ${ModifyColor(RTColorYTLink, -95, -78, -58)}; --YT-panelActiveButton-color: ${ModifyColor(RTColorYTLink, -56, -46, -20)};` +
			`--YT-HD4KBadge-color: ${ModifyColor(RTColorYTLink, -97, -94, -78)}; --YT-searchBoxPlaceholder-color: ${ModifyColor(RTColorYTText, -50, -50, -50)} }` +

			'html[dark], [dark] {--yt-spec-base-background: var(--YT-main-color)}' + // Цвет фона всего ютуба
			'html[darker-dark-theme][dark], [darker-dark-theme] [dark] {--yt-spec-text-primary: var(--YT-text-color)}' + // Цвет текста всего ютуба
			'html[dark], [dark] {--yt-spec-menu-background: var(--YT-overlayMenu-color)} ytd-simple-menu-header-renderer {background-color: transparent}' + // Цвет фона панели уведомлений
			'html[dark], [dark] {--yt-spec-raised-background: var(--YT-overlayMenu-color)}' + // Цвет элементов при поиске видео + цвет фона добавления в плейлист
			'html[dark], [dark] {--yt-spec-brand-background-primary: var(--YT-additional-color); --yt-spec-general-background-a: var(--YT-main-color)}' + // Задние цвета активного плейлиста
			'html[dark], [dark] {--yt-spec-badge-chip-background: var(--YT-additional-color); --yt-spec-button-chip-background-hover: var(--YT-hover-and-dateVideoLoad-color)}' + // Цвет фона описания видео
			'.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal:hover, .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--filled:hover {background-color: var(--YT-hoverVideoButton-color)}' + // Цвет фона лайков и прочих кнопок при наведении
			'ytd-playlist-panel-renderer[use-color-palette][is-dark-theme] {--yt-active-playlist-panel-background-color: var(--YT-hover-and-dateVideoLoad-color)}' + // Цвет фона текущего видео в плейлисте
			'html[dark], [dark] {--yt-spec-call-to-action: var(--YT-link-color); --yt-spec-themed-blue: var(--YT-link-color)} .yt-core-attributed-string__link--call-to-action-color {color: var(--yt-spec-call-to-action) !important} .yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--text {color: var(--yt-spec-call-to-action)} .yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--text:hover {background-color: var(--YT-additional-color)}' + // Цвет ссылок
			'html[dark], [dark] {--ytd-searchbox-background: var(--YT-main-color)}' + // Задний цвет окна поиска
			'html[dark] {--yt-live-chat-background-color: var(--YT-main-color)}' +
			'ytd-playlist-panel-renderer#playlist {--yt-lightsource-secondary-title-color: var(--YT-text-color) !important; --yt-lightsource-primary-title-color: var(--YT-text-color) !important}' + // Цвет текста активного видео в плейлисте (название + канал)
			'html[system-icons][dark], html[system-icons] [dark] {--yt-spec-brand-icon-inactive: var(--YT-icon-inactive)}' +
			'html[dark] {--yt-spec-icon-active-other: var(--YT-icon-inactive)}' +
			'html[dark] {--yt-spec-brand-icon-active: var(--YT-icon-inactive)}' +
			'html[dark], [dark] {--ytd-searchbox-legacy-button-hover-border-color: var(--YT-searchBorderHover-color)}' +
			'html[dark], [dark] {--ytd-searchbox-legacy-border-color: var(--YT-searchBorder-color)}' +
			'html[dark], [dark] {--ytd-searchbox-legacy-button-border-color: var(--YT-searchBorder-color)}' +
			'html[dark], [dark] {--yt-spec-static-brand-red: var(--YT-videoProgress-color)}' + // Цвет прогресса просмотренных видео
			'.ytp-swatch-background-color {background: var(--YT-videoProgress-color) !important} .ytp-load-progress {transition: transform 1.5s ease-in-out}' + // Полоска прогресса видео + плавная прогрузка
			'.ytp-live-badge[disabled]:before {background: var(--YT-videoProgress-color) !important}' + // Круглый значок 'В эфире'
			'#ytp-id-17, #ytp-id-18, #ytp-id-19, .ytp-popup {background: var(--YT-overlayMenu-color) !important; backdrop-filter: blur(15px)}' + // Цвет фона настроек видео
			'html[dark], [dark] {--yt-spec-wordmark-text: var(--YT-iconText-color)}' + // Надпись возле иконки ютуба
			'svg.external-icon > svg > g > path:nth-child(1), #card svg g g path:nth-child(1) {fill: var(--YT-icon-color)}' + // Иконка ютуба
			'#logo-icon > svg > g > g:nth-child(1) > path:nth-child(1) {fill: var(--YT-icon-color)}' + // Иконка ютуба (старый дизайн)
			'.html5-video-player {background: var(--YT-player-color)}' + // Цвет фона плеера
			'#time-status.ytd-thumbnail-overlay-time-status-renderer, .badge-shape-wiz--default.badge-shape-wiz--overlay {background: var(--YT-videoTime-color); backdrop-filter: blur(10px)}' + // Фон рамки с длительносьтю видео
			'.badge-shape-wiz--live.badge-shape-wiz--overlay {background: var(--YT-HD4KBadge-color); backdrop-filter: blur(10px)}' + // Фон рамки 'В эфире'
			'.yt-spec-icon-badge-shape--type-notification .yt-spec-icon-badge-shape__badge {background-color: var(--YT-notificationsBadge-color)}' + // Цвет бэйджа количества уведомлений
			'sup.ytp-swatch-color-white {color: var(--YT-link-color)}' + // Цвет надписей HD в выборе качества
			'.ytp-chrome-controls .ytp-button[aria-pressed]:after {background-color: var(--YT-panelActiveButton-color) !important}' + // Цвет полоски снизу включённых субтитров

			'.ytp-button.ytp-settings-button.ytp-hd-quality-badge:after, .ytp-button.ytp-settings-button.ytp-4k-quality-badge:after, .ytp-button.ytp-settings-button.ytp-8k-quality-badge:after {background-color: var(--YT-HD4KBadge-color); border-radius: 3px}' + // Надписи HD, 4K, 8K
			'.ytp-big-mode .ytp-settings-button.ytp-hd-quality-badge:after, .ytp-big-mode .ytp-settings-button.ytp-4k-quality-badge:after, .ytp-big-mode .ytp-settings-button.ytp-8k-quality-badge:after {border-radius: 6px !important}' + // Надписи HD, 4K, 8K в полном экране

			'.ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox {background: var(--YT-notificationsBadge-color) !important}' + // Задний цвет тугл кнопок в настройках видео
			'.ytp-popup.ytp-contextmenu {background: var(--YT-overlayMenu-color); border-radius: 10px; backdrop-filter: blur(10px)}' + // Задний цвет и закругление панели ПКМ по видео
			'html[dark], [dark] {--yt-spec-additive-background: var(--YT-searchBorderHover-color)}' + // Цвет наведения на элементы в поиске
			'.ytp-contextmenu .ytp-menuitem[aria-checked=true] .ytp-menuitem-toggle-checkbox {background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgdmVyc2lvbj0iMS4xIj48cGF0aCBkPSJNOSAxNi4yTDQuOCAxMmwtMS40IDEuNEw5IDE5IDIxIDdsLTEuNC0xLjRMOSAxNi4yeiIgZmlsbD0iI2ZmZiIgLz48L3N2Zz4=) !important;}' + // Фикс отображения чекбокса
			'html[dark], [dark] {--yt-spec-static-overlay-background-heavy: var(--YT-videoTime-color); --yt-spec-static-overlay-background-solid: var(--YT-videoTime-color)}' + // Кнопка на видео добавить в смотреть позже + при наведении
			'html[dark], [dark] {--yt-spec-static-overlay-background-brand: var(--YT-notificationsBadge-color)}' + // Кнопка/надпись на главной странице В эфире под видео
			'#icon.ytd-reel-shelf-renderer path, #icon.ytd-rich-shelf-renderer path {fill: var( --YT-icon-color)}' + // Иконка YouTube Shorts на главной странице и в сайдбаре
			'.tp-yt-paper-tooltip[style-target=tooltip], .ytp-tooltip-text {background-color: var(--YT-videoTime-color) !important; backdrop-filter: blur(10px)}' + // Задний цвет всплывающих подсказок (Нравится, Не нравится..)
			'html[dark] {--yt-live-chat-banner-gradient-scrim: linear-gradient(var(--YT-hover-and-dateVideoLoad-color), transparent )}' + // Градиент в чате ютуба закрепленного сообщения
			'#top-level-buttons-computed #segmented-dislike-button ytd-toggle-button-renderer *[aria-pressed="true"] yt-icon {color: rgb(249 137 137) !important}' + // Цвет кнопки дизлайка (нажатой)
			'.html5-video-player[aria-label*="в "] {background: rgb(0, 0, 0)}' + // Цвет фона плеера в полном экране
			'html[dark], [dark] {--yt-spec-outline: var(--YT-hoverAndPanels2-color)}' + // Панель упорядочить в комментариях + разные разделители
			'.ytp-bezel-text {border-radius: 20px !important; font-weight: bold; backdrop-filter: blur(4px); }' + // Параметры всплывашки регулировки звука
			'html[dark], [dark] {--ytd-searchbox-text-color: var(--YT-text-color)} #container.ytd-searchbox input.ytd-searchbox::placeholder, #container.ytd-searchbox>[slot=search-input] input::placeholder {color: var(--YT-searchBoxPlaceholder-color) !important}' + // Цвет текста в поисковой строке
			'html[dark] .sbsb_a {backdrop-filter: blur(15px)}' + // Размытие элементов при поиске видео
			'.ytp-doubletap-static-circle {background-color: rgba(0 0 0 / 50%) !important; backdrop-filter: blur(4px);} .ytp-doubletap-tooltip-label { font-size: 15px !important; font-weight: bold !important; margin-left: 8px;}' + // Параметры всплывашки перемотки видео
			'ytd-searchbox[has-focus] #container.ytd-searchbox {border: 1px solid var(--ytd-searchbox-legacy-border-color)}' + // Обводка активной панели поиска
			'#card.yt-live-chat-viewer-engagement-message-renderer, #contents.yt-live-chat-mode-change-message-renderer {background-color: var(--YT-additional-color)}' + // В чате ютуба плашка, добро пожаловать в чат
			'tp-yt-paper-dialog {backdrop-filter: blur(17px); background-color: var(--YT-overlayMenu-color)}' + // Окно добавления видео в плейлист
			'#subscribe-button-shape > button {background-color: var(--YT-additional-color); color: var(--YT-text-color)} #subscribe-button-shape > button:hover {background-color: var(--YT-hoverVideoButton-color)}' + // Кнопка Подписаться
			'span.yt-core-attributed-string--link-inherit-color { color: var(--YT-text-color) !important }' + // Цвет текста описания видео
			'.ytp-tooltip.ytp-preview .ytp-tooltip-text, .ytp-tooltip-text, .tp-yt-paper-tooltip[style-target=tooltip] { border-radius: 12px !important }' + // Закругление всплывающих подсказок
			'html[dark], [dark] { --yt-spec-static-brand-white: var(--YT-text-color) }' +  // Цвет текста в чате на стриме
			'.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal, .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--filled { background-color: var(--YT-additional-color) }' + // Цвет фона лайков и прочих кнопок
			'html[dark] ::selection { background: var(--YT-hoverAndPanels2-color) !important; }' + // Цвет выделения текста
			'::-webkit-scrollbar {width: 9px; height: 9px; background-color: var(--YT-main-color);}' + // Скроллбар
			'.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--tonal, .yt-spec-button-shape-next--mono.yt-spec-button-shape-next--filled {color: var(--YT-text-color)}' + // Цвет текста кнопок (лайк, дизлайк, сохранить)
			'#cinematics-container {display: none}' + // Отключаем профессиональное освещение
			'#button.ytd-topbar-menu-button-renderer {color: #fff !important}' + // Цвет иконки 'Создать видео'

			// Красим всплывающую подсказку слева снизу (например при добавлении видео в смотреть позже)
			'yt-notification-action-renderer[darker-dark-theme] tp-yt-paper-toast.yt-notification-action-renderer {background-color: var(--YT-additional-color); box-shadow: 0 0 10px var(--YT-additional-color)}' +
			'yt-notification-action-renderer[ui-refresh] #text.yt-notification-action-renderer, yt-notification-action-renderer[ui-refresh] #sub-text.yt-notification-action-renderer {color: var(--YT-text-color)}' +
			'.yt-spec-button-shape-next--call-to-action-inverse.yt-spec-button-shape-next--text {color: var(--YT-link-color)}' +

			// Красим панель 'До начала трансляции'
			'.ytp-offline-slate-bar {background: rgba(0, 0, 0, 0.4) !important; backdrop-filter: blur(15px) !important} .ytp-offline-slate-button {background: var(--YT-searchBorderHover-color) !important; border-radius: 15px !important}'
			, 'rt-paint')

		// --yt-spec-text-secondary: #aaa
	}

	function HideTrash(hide) {
		if (!hide) {
			document.querySelector('#rt-hideTrashStyle')?.remove()
			return
		}

		pushCSS('#voice-search-button {display: none}' + // Кнопка голосового поиска
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
			'button[title="Автовоспроизведение выключено"], button[title="Автоматичне відтворення вимкнено"] {display: none !important}' + // Кнопка выключенного автовоспроизвидения в плеере
			'button[title="Субтитры недоступны"], button[title="Субтитри недоступні"] {display: none !important}' + // Кнопка субтитров если они не доступны в плеере
			'.ytp-button.ytp-remote-button {display: none !important}' + // Кнопка трансляции на телевизор в плеере
			'.ytp-button.ytp-miniplayer-button {display: none !important}' + // Кнопка мини-плеера в плеере
			'.ytp-button.ytp-miniplayer-button {display: none !important}' + // Кнопка мини-плеера в плеере
			'#premium-upsell-link, .ytd-guide-renderer.style-scope:nth-of-type(4) {display: none}' + // Кнопка оформить youtube premium + секция другие возможности в левой панели
			'yt-multi-page-menu-section-renderer:nth-child(5) {display: none}' + // Кнопки справка и отправить отзыв в меню аккаунта
			'.ytp-fullerscreen-edu-button-subtle {display: none !important}' + // Кнопка под прогрессбаром в полном экране (прокрутите для доп. информации)
			'button[id="infoButton"] {display: none !important}' + // Кнопка информационной панели от SponsorBlock (в плеере)

			'.ytp-paid-content-overlay, .iv-branding, #movie_player > [class^="ytp-ce-"], .ytp-cards-teaser-text, ytm-paid-content-overlay-renderer, ' +
			'ytd-search-pyv-renderer, [class^="ytd-promoted-"], ytd-video-renderer + ytd-shelf-renderer, ytd-video-renderer + ytd-reel-shelf-renderer, ' +
			'#clarify-box, .ytd-watch-flexy.attached-message, ytd-popup-container tp-yt-paper-dialog ytd-single-option-survey-renderer, #donation-shelf ytd-donation-unavailable-renderer, ' +
			'.sparkles-light-cta, ytd-feed-nudge-renderer, .ytp-pause-overlay-container, .ytp-settings-menu .ytp-panel-menu > .ytp-menuitem[role="menuitemcheckbox"] {display: none !important}'
			, 'rt-hideTrashStyle')

		// Скрываем кнопки под видео
		pushCSS('ytd-download-button-renderer, yt-button-view-model:has(button[aria-label="Поделиться"]), yt-button-view-model:has(button[aria-label="Создать клип"]), yt-button-view-model:has(button[aria-label="Спасибо"]), yt-button-view-model:has(button[aria-label="Показать текст видео"]), ' +
			'yt-button-view-model:has(button[aria-label="Поділитися"]), yt-button-view-model:has(button[aria-label="Створити кліп"]), yt-button-view-model:has(button[aria-label="Дякую"]), yt-button-view-model:has(button[aria-label="Показати текстову версію"])' +
			'{display: none}', 'rt-hideTrashStyle')

		// Выключаем и скрываем Профессиональное освещение (если включена покраска ютуба) в настройках видео
		// Аннотации скрываем выше в css чтобы не было бага с остановкой видео
		waitSelector('.ytp-menuitem').then(() => {
			if (RTcolors) {
				Array.from(document.querySelector('.ytp-popup.ytp-settings-menu .ytp-panel-menu').children).forEach(x => (x.innerHTML.includes('Профессиональное освещение') || x.innerHTML.includes('Кінематографічне освітлення')) && x.getAttribute('aria-checked') == "true" && x.click())
				Array.from(document.querySelector('.ytp-popup.ytp-settings-menu .ytp-panel-menu').children).forEach(x => (x.innerHTML.includes('Профессиональное освещение') || x.innerHTML.includes('Кінематографічне освітлення')) && x.remove())
			}

			// Быстро открываем и закрываем настройки видео (чтобы обновился размер элементов)
			const settings = document.querySelector('.ytp-settings-button')
			settings.click()
			settings.click()
		})
	}

	function MarkWatchedVideos(mark) {
		if (!mark) {
			document.querySelector('#rt-watchedVideoStyle')?.remove()
			return
		}

		pushCSS(`#progress.ytd-thumbnail-overlay-resume-playback-renderer {--background-color: ${RTColorWatchedBackground + '80'}}` +
			'#progress.ytd-thumbnail-overlay-resume-playback-renderer:after {content: " " !important;top: -280px !important;position: absolute !important;background-color: var(--background-color) !important;padding: 7px !important; width: 100%;height: 10000%; animation: 0.5s show ease;}' +
			`#progress.ytd-thumbnail-overlay-resume-playback-renderer {--label-color: ${RTColorWatchedLabelBackground + '80'}}` +
			'#progress.ytd-thumbnail-overlay-resume-playback-renderer:before {content: "ПРОСМОТРЕНО"; background-color: var(--label-color); top: -112px;font-size: 12px;color: white;position: absolute;z-index: 1;left: 0; margin: 8px;opacity: 1;padding: 4px 5px; border-radius: 9px;font-weight: 500;line-height: 1.2rem; backdrop-filter: blur(4px); animation: 0.5s show ease;}' +
			'ytd-thumbnail-overlay-time-status-renderer {z-index: 1}' +
			'#overlays > ytd-thumbnail-overlay-playback-status-renderer {display: none !important;}' +
			'ytd-expanded-shelf-contents-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer:after, ytd-video-renderer  #progress.ytd-thumbnail-overlay-resume-playback-renderer:after {top: -134px !important;width: 232px;height: 120px;}' +
			//'ytd-expanded-shelf-contents-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer:before, ytd-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer:before {top: -134px; font-size: 13px;}' +
			'#related #progress.ytd-thumbnail-overlay-resume-playback-renderer:after {top: -90px !important;width: 154px; height: 76px;}' +
			'#related #progress.ytd-thumbnail-overlay-resume-playback-renderer:before {top: -90px;font-size: 11px; padding: 3px 4px;}' +
			'.style-scope.ytd-grid-video-renderer:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer:before, .style-scope.ytd-grid-video-renderer:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer:after, div#dismissible.style-scope.ytd-video-renderer:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer:after, div#dismissible.style-scope.ytd-video-renderer:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer:before, div#dismissible.style-scope.ytd-compact-video-renderer:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer:after, div#dismissible.style-scope.ytd-compact-video-renderer:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer:before {display: none;}' +
			'.ytrp_rb_bg_bottom {bottom: unset !important; top: 0 !important;}' +
			'html .resume-playback-background, html  .resume-playback-progress-bar, html ytd-thumbnail-overlay-resume-playback-renderer {top: unset !important; bottom: 0 !important;}' +
			'.ytd-playlist-panel-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {width: 92px; height: 48px; top: -52px !important; padding: 4px !important;}' +
			'.ytd-playlist-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {top: -52px; padding: 4px}' +
			'.ytd-playlist-panel-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before {top: -52px; font-size: 9px; line-height: 1rem; margin: 4px; padding: 4px;}' +
			'.ytd-playlist-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before {top: -83px; font-size: 9px; line-height: 1rem; margin: 4px; padding: 4px;}' +
			'.ytd-playlist-panel-video-renderer:hover .ytd-playlist-panel-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before, .ytd-playlist-panel-video-renderer:hover .ytd-playlist-panel-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {display: none;}' +
			'.ytd-playlist-video-renderer:hover .ytd-playlist-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before, .ytd-playlist-video-renderer:hover .ytd-playlist-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {display: none;}' +
			`.ytd-rich-grid-media #progress.ytd-thumbnail-overlay-resume-playback-renderer, .ytd-search ytd-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer {--label-color: ${RTColorWatchedLabelBackground + '80'}}` +
			`.ytd-rich-grid-media #progress.ytd-thumbnail-overlay-resume-playback-renderer::before, .ytd-search ytd-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before {content: "ПРОСМОТРЕНО"; top: -95px; background-color: var(--label-color); font-size: 14px; color: white; position: absolute; z-index: 1;left: 2px; opacity: 1; font-weight: 500; line-height: 1.5rem; margin: -65px 10px; padding: 4px 5px; border-radius: 9px; backdrop-filter: blur(4px); animation: 0.5s show ease;}` +
			`.ytd-rich-grid-media #progress.ytd-thumbnail-overlay-resume-playback-renderer, .ytd-search #progress.ytd-thumbnail-overlay-resume-playback-renderer {--background-color: ${RTColorWatchedBackground + '80'}}` +
			'.ytd-rich-grid-media #progress.ytd-thumbnail-overlay-resume-playback-renderer::after, .ytd-search #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {width: 100%;height: 30vh; content: " " !important;top: -30vh !important;position: absolute !important;background-color: var(--background-color) !important;padding: 7px !important; animation: 0.5s show ease;}' +
			'.ytd-rich-grid-media:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer::before, .ytd-rich-grid-media:hover #progress.ytd-thumbnail-overlay-resume-playback-renderer::after {display: none;}' +
			'@keyframes show { from { opacity: 0; } to { opacity: 1; } }'
			, 'rt-watchedVideoStyle')
	}

	function ImproveFont(improve) {
		if (!improve) {
			document.querySelector('#rt-betterFontStyle')?.remove()
			return
		}

		pushCSS('@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"); @font-face {font-family: "Ubuntu Light Custom"; src: url("https://raw.githubusercontent.com/Eject37/ReTube/main/Ubuntu%20Light.woff2") format("woff2")}' +
			'yt-formatted-string.style-scope.ytd-rich-grid-media, span.style-scope.ytd-video-meta-block {font-family: Ubuntu !important; font-weight: 400 !important; font-style: normal !important;}' +
			'span.style-scope.ytd-compact-radio-renderer {font-family: Ubuntu !important; font-weight: 700 !important; font-style: normal !important;}' +

			'ytd-rich-grid-renderer.style-scope.ytd-two-column-browse-results-renderer, ytd-guide-section-renderer.style-scope.ytd-guide-renderer, .button.ytd-text-inline-expander, ' +
			'#title.ytd-structured-description-video-lockup-renderer, #subtitle.ytd-structured-description-video-lockup-renderer, h4.ytd-macro-markers-list-item-renderer, ' +
			'.metadata.ytd-notification-renderer, .metadata-stats.ytd-playlist-byline-renderer, .badge.ytd-badge-supported-renderer, #content-text.ytd-comment-view-model, ' +
			'.yt-content-metadata-view-model-wiz--medium-text .yt-content-metadata-view-model-wiz__metadata-text, .truncated-text-wiz--medium-text, .yt-attribution-view-model-wiz--medium-text .yt-attribution-view-model-wiz__attribution-text, ' +
			'#published-time-text.ytd-comment-view-model, #text.ytd-alert-with-button-renderer, #home-content-text.ytd-post-renderer, .badge-shape-wiz, ' +
			'tp-yt-paper-button, #index.ytd-playlist-video-renderer, .yt-lockup-metadata-view-model-wiz--compact .yt-lockup-metadata-view-model-wiz__title, ' +
			'.yt-content-metadata-view-model-wiz__metadata-text, .yt-list-item-view-model-wiz__container--compact .yt-list-item-view-model-wiz__title-wrapper, ' +
			'#channel-handle.ytd-active-account-header-renderer, ytd-active-account-header-renderer[enable-handles-account-menu-switcher] #account-name.ytd-active-account-header-renderer, ' +
			'.yt-video-attribute-view-model__subtitle, .yt-video-attribute-view-model__secondary-subtitle, .title.reel-player-header-renderer, .ytStorybookReelMultiFromatLinkViewModelLink, ' +
			'ytd-video-meta-block:not([rich-meta]) #byline-container.ytd-video-meta-block {font-family: Ubuntu !important;}' +

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
			'yt-formatted-string.style-scope.ytd-video-renderer, a.yt-simple-endpoint.style-scope.ytd-grid-playlist-renderer, span.ytp-caption-segment, a.ytp-title-link.yt-uix-sessionlink.ytp-title-fullerscreen-link, div.ytp-menuitem-label, ' +
			'#simplebox-placeholder.ytd-comment-simplebox-renderer, #label.ytd-playlist-add-to-option-renderer, .ytd-menu-title-renderer, #rt-videoCount, #content.ytd-channel-tagline-renderer, #first-link.ytd-channel-header-links-view-model, ' +
			'#more.ytd-channel-header-links-view-model, .yt-spec-button-shape-next--call-to-action-inverse.yt-spec-button-shape-next--text, .yt-attribution-view-model-wiz--medium-text .yt-attribution-view-model-wiz__suffix' +
			'{font-family: "Ubuntu" !important; font-weight: 400 !important;}' +

			'.tp-yt-paper-tooltip[style-target=tooltip] {font-size: 1.35rem !important}' +
			'.ytp-tooltip {font-size: 125% !important}' +

			'.yt-spec-button-shape-next, yt-formatted-string.ytd-menu-service-item-renderer, ytd-text-inline-expander, ytd-rich-list-header-renderer[is-modern-sd] #title.ytd-rich-list-header-renderer, ' +
			'#time.ytd-macro-markers-list-item-renderer, #title.ytd-video-description-infocards-section-renderer, #subtitle.ytd-video-description-infocards-section-renderer, ' +
			'#guide-section-title.ytd-guide-section-renderer, .title.ytd-mini-guide-entry-renderer, .ytp-tooltip, .tp-yt-paper-tooltip[style-target=tooltip], ' +
			'#message.yt-live-chat-viewer-engagement-message-renderer, html, .animated-rolling-number-wiz, #video-title.ytd-reel-item-renderer, .html5-video-player, tp-yt-paper-toast.yt-notification-action-renderer, ' +
			'.truncated-text-wiz--medium-text .truncated-text-wiz__absolute-button, yt-formatted-string.ytd-menu-service-item-download-renderer, ' +
			'.more-button.ytd-comment-view-model, .less-button.ytd-comment-view-model, .YtChipShapeChip, ytd-thumbnail-overlay-bottom-panel-renderer {font-family: "Ubuntu Light Custom" !important}' +

			'ytd-watch-metadata[title-headline-xs] h1.ytd-watch-metadata {font-family: "YouTube Sans"; font-weight: 600}'
			, 'rt-betterFontStyle')
	}

	function DateTimeCreated(date, style2) {
		if (currentPage() != 'watch') return

		// Удаление старых элементов и стилей
		['.video-date', '#dateVideoStyle', '#dateVideoStyle2'].forEach(selector => document.querySelector(selector)?.remove());

		if (!date) return

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

			waitSelector('#title > h1').then(el => {
				document.querySelector('.video-date')?.remove()

				const label = document.createElement('span')
				label.classList.add('video-date')
				label.textContent = dateCreated

				if (!document.querySelector('#dateVideoStyle')) {
					pushCSS('.video-date {border-radius: 18px; padding-inline: 7px; white-space: nowrap; margin-top: 2px; height: 23px; margin-left: 5px; font-size: 95%; display: inline-flex; align-items: center; background-color: var(--yt-spec-button-chip-background-hover); animation: 1s show ease} @keyframes show { from { opacity: 0; } to { opacity: 1; } }', 'dateVideoStyle')
					if (style2) {
						pushCSS('.video-date {background-color: var(--yt-spec-base-background); filter: drop-shadow(0 0 1px rgb(201 208 211))}', 'dateVideoStyle2')
					}
				}
				el.appendChild(label)
			})
		}).catch()
	}

	function FocusAndScrollFix(fix) {
		const playerSelector = 'video.video-stream.html5-main-video'
		if (!fix) {
			document.querySelector(playerSelector).removeEventListener('mouseenter', playerHoverHandler)
			return
		}

		playerHoverHandler = PlayerHover
		waitSelector(playerSelector).then(player => player.addEventListener('mouseenter', playerHoverHandler))

		async function PlayerHover() {
			if (isScrolling) return
			isScrolling = true
			wheel = false

			function WheelFix(e) {
				if (e.deltaY > 0) {
					wheel = true
					document.removeEventListener('wheel', WheelFix)
				}
			}
			document.addEventListener('wheel', WheelFix)

			const easingFn = t => 1 - (1 - t) * (1 - t)

			const scrollToTop = async () => {
				const scrollTop = document.documentElement.scrollTop
				if (scrollTop > 0 && !wheel) {
					const progress = scrollTop / 1000;
					const easingValue = easingFn(progress)

					const scrollDistance = easingValue * 25;
					window.scrollTo(0, scrollTop - scrollDistance)
					window.requestAnimationFrame(scrollToTop)
				}
			}
			scrollToTop()

			isScrolling = false

			while (document.documentElement.scrollTop != 0) {
				await Delay(25)
			}
			document.querySelector(playerSelector).focus()
			document.removeEventListener('wheel', WheelFix)
		}
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

	function CustomIcon(custom, color) {
		document.querySelector('#rt-titleIcon')?.remove()
		const link = document.createElement('link')
		link.rel = 'icon'

		let customIconColor = color == 'blue' ? 'https://github.com/Eject37/ReTube/raw/main/yt-favicon2.ico' : 'https://github.com/Eject37/ReTube/raw/main/Gray6.ico'
		link.href = custom ? customIconColor : 'https://www.youtube.com/s/desktop/79c80fdc/img/favicon.ico'
		if (custom) link.id = 'rt-titleIcon'
		document.querySelector('head').appendChild(link)
	}

	function ReturnDislikes() {
		const CACHE_PREFIX = 'retube-dislikes-count:', SELECTOR_ID = 'retube-dislikes-count'

		runOnPageInitOrTransition(async () => {
			if (currentPage() != 'watch') return;
			await Delay(1000);
			waitSelector('#actions dislike-button-view-model button', { stop_on_page_change: true }).then(el => setDislikeCount(el));
		})

		async function setDislikeCount(container) {
			const videoId = getVideoId();
			let dislikeCount = 0;
			if (!videoId) return console.error('return-dislike videoId: empty', videoId);

			container.style.width = 'auto'; // fix width

			if (storage = sessionStorage.getItem(CACHE_PREFIX + videoId)) { // has in cache
				insertToHTML({ 'data': JSON.parse(storage), 'container': container });
			}
			else if (data = await getDislikeCount()) {
				insertToHTML({ 'data': data, 'container': container });
			}

			//['click', 'mousedown', 'mouseup', 'mouseleave', 'focusout'].forEach(evt => {
			document.querySelectorAll('#actions dislike-button-view-model button, #actions like-button-view-model button').forEach(button => {
				button.addEventListener('focusout', async () => {
					await Delay(500);
					insertToHTML({ 'data': { dislikes: dislikeCount }, 'container': container });
				});
			})
			//});

			async function getDislikeCount() {
				const fetchAPI = () => fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`,
					{
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					}
				).then(response => response.json()).then(json => json.dislikes && ({ 'likes': json.likes, 'dislikes': json.dislikes })).catch();

				if (result = await fetchAPI()) {
					sessionStorage.setItem(CACHE_PREFIX + videoId, JSON.stringify(result));
					return result;
				}
			}

			async function insertToHTML({ data = required(), container = required() }) {
				if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);

				const dislikeCountMath = container.getAttribute("aria-pressed") == 'true' ? data.dislikes + 1 : data.dislikes; // Если стоит дизлайк то +1
				dislikeCount = data.dislikes;

				try {
					(document.getElementById(SELECTOR_ID) || (function () {
						container.insertAdjacentHTML('beforeend',
							`<span id="${SELECTOR_ID}" style="text-overflow:ellipsis; overflow:visible; white-space:nowrap; padding-left:3px;">${dislikeCountMath}</span>`);
						return document.getElementById(SELECTOR_ID);
					})())
						.textContent = dislikeCountMath;
					container.title = dislikeCountMath;
				}
				catch { }
			}
		}
	}

	function FullVideoNames(enable) {
		if (!enable) {
			document.querySelector('#rt-fullVideoNamesStyle')?.remove()
			return
		}

		pushCSS('#video-title.yt-simple-endpoint.ytd-grid-video-renderer, ' +
			'#video-title.ytd-compact-video-renderer, ' +
			'ytd-compact-video-renderer.use-ellipsis #video-title.ytd-compact-video-renderer {max-height: unset !important; -webkit-line-clamp: unset !important; word-wrap: break-word !important}' +

			'#video-title.ytd-video-renderer {max-height: unset !important; line-height: 2rem !important}' + // Страница истории
			'#metadata-line.ytd-grid-video-renderer {max-height: unset !important}' + // Чтобы полностью было видно фразу 'Трансляция закончилась N часа назад'
			'.ytp-videowall-still-info-title {max-height: unset !important}' + // Чтобы было видно весь текст на плитках в конце видео при наведении

			'.ytp-videowall-still-info-content {background-image: -moz-linear-gradient(top,rgba(12,12,12,0.8) 0,transparent 200px) !important; background-image: -ms-linear-gradient(top,rgba(12,12,12,0.8) 0,transparent 200px) !important; background-image: -o-linear-gradient(top,rgba(12,12,12,0.8) 0,transparent 200px) !important; background-image: -webkit-linear-gradient(top,rgba(12,12,12,0.8) 0,transparent 200px) !important; background-image: linear-gradient(to bottom,rgba(12,12,12,0.8) 0,transparent 200px) !important}' + // Темный фон для текста элементов плитки, которая показывается в конце видео (мы его начали показывать целиком в коде выше)
			'#video-title.ytd-playlist-panel-video-renderer {max-height: unset !important; -webkit-line-clamp: unset !important}' + // Для плейлистов
			'ytd-playlist-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before {top: -66px; font-size: 9px}' + // Для плейлистов
			'#video-title.ytd-rich-grid-video-renderer {max-height: unset !important; overflow: unset !important; -webkit-line-clamp: unset !important}' + // Для нового дизайна главной страницы
			'#video-title.ytd-rich-grid-media {-webkit-line-clamp: unset !important; max-height: unset !important}' + // Для главной страницы с рекомендациями
			'h4.ytd-macro-markers-list-item-renderer {max-height: unset !important; -webkit-line-clamp: unset !important}' // Отображение заголовка целиком в списке участков видео
			, 'rt-fullVideoNamesStyle')
	}

	function StopChannelTrailer() {
		runOnPageInitOrTransition(() => {
			waitSelector('#c4-player.playing-mode', { stop_on_page_change: true }).then(player => player.stopVideo())
		})
	}

	function RemainingTime() {
		const SELECTOR_ID = 'retube-player-time-remaining'
		waitSelector('.ytp-time-duration, ytm-time-display .time-display-content').then(container => {
			const movie_player = document.querySelector('#movie_player')
			waitSelector('video').then(video => {
				video.addEventListener('timeupdate', setRemaining.bind(video))
				video.addEventListener('ratechange', setRemaining.bind(video))
				video.addEventListener('ended', () => insertToHTML({ 'container': container }))
				document.addEventListener('yt-navigate-finish', () => insertToHTML({ 'container': container }))
			});
			function setRemaining() {
				if (isNaN(this.duration)
					|| movie_player.getVideoData().isLive
					|| (currentPage() == 'embed' && window.self.location.href.includes('live_stream'))
					|| document.visibilityState == 'hidden'
					|| movie_player.classList.contains('ytp-autohide')
				) return;
				const getProgressPt = () => {
					const floatRound = pt => (this.duration > 3600) ? pt.toFixed(2) : (this.duration > 1500) ? pt.toFixed(1) : Math.round(pt)
					return floatRound((this.currentTime / this.duration) * 100) + '%'
				}
				const getLeftTime = () => '-' + timeFormat((this.duration - this.currentTime) / this.playbackRate)

				let text = getLeftTime() + ` (${getProgressPt()})`

				if (text) {
					insertToHTML({ 'text': text, 'container': container })
				}
			}
			function insertToHTML({ text = '', container }) {
				if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);
				(document.getElementById(SELECTOR_ID) || (function () {
					container.insertAdjacentHTML('afterend', `&nbsp;<span id="${SELECTOR_ID}">${text}</span>`)
					return document.getElementById(SELECTOR_ID)
				})())
					.textContent = text
			}
		})
	}

	function RememberTime() {
		if (!navigator.cookieEnabled && currentPage() == 'embed') return;

		const getCacheName = () => `retube-resume-playback-time:${getVideoId()}`
		let cacheName

		waitSelector('video').then(video => {
			cacheName = getCacheName()
			resumePlayback.apply(video)
			video.addEventListener('loadeddata', resumePlayback.bind(video))
			video.addEventListener('timeupdate', savePlayback.bind(video))
			video.addEventListener('ended', () => sessionStorage.removeItem(cacheName))
		})
		function savePlayback() {
			const moviePlayer = document.querySelector('#movie_player');
			if (!moviePlayer || moviePlayer.classList.contains('ad-showing') || this.duration < 30) return;

			this.currentTime > 15 ? sessionStorage.setItem(cacheName, ~~this.currentTime) : sessionStorage.removeItem(cacheName);
		}
		async function resumePlayback() {
			if (new URLSearchParams(location.search).has('t')) return;

			cacheName = getCacheName()
			if ((time = +sessionStorage.getItem(cacheName)) && (time < (this.duration - 1))) {
				this.currentTime = time;
			}
		}
	}

	function VideoQuality() {
		let selectedQuality = RTSelectVideoQuality

		const qualityFormatListWidth = {
			highres: 4320,
			hd2880: 2880,
			hd2160: 2160,
			hd1440: 1440,
			hd1080: 1080,
			hd720: 720,
			large: 480,
			medium: 360,
			small: 240,
			tiny: 144,
		}

		waitSelector('#movie_player').then(movie_player => {
			// keep save manual quality in the session
			if (currentPage() == 'watch') {
				movie_player.addEventListener('onPlaybackQualityChange', quality => {
					if (document.activeElement.getAttribute('role') == 'menuitemradio' && quality !== selectedQuality) {
						console.info(`Запоминаем качество "${quality}" для текущей сессии`)
						selectedQuality = quality
					}
				})
			}
			setQuality()
			movie_player.addEventListener('onStateChange', setQuality)
		})

		async function setQuality(state) {
			if (!selectedQuality) return console.error('selectedQuality unavailable', selectedQuality);
			if ((1 == state || 3 == state) && !setQuality.quality_lock) {
				setQuality.quality_lock = true;
				let availableQualityLevels;

				await waitUntil(() => (availableQualityLevels = movie_player.getAvailableQualityLevels()) && availableQualityLevels.length, 50); // 50ms

				const maxQualityIdx = availableQualityLevels.findIndex(i => qualityFormatListWidth[i]);
				availableQualityLevels = availableQualityLevels.slice(maxQualityIdx);

				const availableQualityIdx = function () {
					let i = availableQualityLevels.indexOf(selectedQuality);
					if (i === -1) {
						const availableQuality = Object.keys(qualityFormatListWidth).filter(v => availableQualityLevels.includes(v) || (v == selectedQuality)),
							nearestQualityIdx = availableQuality.findIndex(q => q === selectedQuality) - 1
						i = availableQualityLevels[nearestQualityIdx] ? nearestQualityIdx : 0
					}
					return i
				}();

				const newQuality = availableQualityLevels[availableQualityIdx]

				if (typeof movie_player.setPlaybackQuality === 'function') {
					movie_player.setPlaybackQuality(newQuality)
				}
				if (typeof movie_player.setPlaybackQualityRange === 'function') {
					movie_player.setPlaybackQualityRange(newQuality, newQuality)
				}
			}
			else if (state <= 0) {
				setQuality.quality_lock = false
			}
		}
	}

	function FixChannelLinks() {
		document.addEventListener('click', evt => patchLink(evt), { capture: true });
		document.addEventListener('auxclick', evt => evt.button === 1 && patchLink(evt), { capture: true }); // mouse middle click

		function patchLink(evt) {
			if (evt.isTrusted && currentPage() == "watch" && evt.target.closest('#channel-name') && (link = evt.target.closest('a'))) {
				if ((data = evt.target.closest('ytd-compact-video-renderer, ytd-video-meta-block')?.data) && (res = SearchInObjectByKey({
					'obj': data,
					'keys': 'navigationEndpoint',
					'match_fn': val => {
						return val?.commandMetadata?.webCommandMetadata?.webPageType == 'WEB_PAGE_TYPE_CHANNEL';
					},
				})?.data)
				) {
					const urlOrigData = link.data, urlOrig = link.href;

					link.data = res;
					link.href = link.data.commandMetadata.webCommandMetadata.url += '/videos';

					evt.target.addEventListener('mouseout', () => {
						link.data = urlOrigData;
						link.href = urlOrig;
					}, { capture: true, once: true });
				}
			}
		}
	}

	function ShowTranslationTime() {
		waitSelector('#movie_player video').then(video => {
			video.addEventListener('canplay', function () {
				if (movie_player.getVideoData().isLive) {
					pushCSS('#movie_player .ytp-chrome-controls .ytp-time-display.ytp-live {display: flex !important}', 'rt-translationTimeStyle')
					pushCSS('#movie_player .ytp-chrome-controls .ytp-live .ytp-time-current {display: block !important; margin-right: 5px;}', 'rt-translationTimeStyle2')
				}
				else {
					document.querySelector('#rt-translationTimeStyle')?.remove()
					document.querySelector('#rt-translationTimeStyle2')?.remove()
				}
			})

		})
	}

	function DisableSleep() {
		setInterval(() => {
			if (!document.hasFocus()) {
				document.dispatchEvent(
					new KeyboardEvent(
						'keyup',
						{
							keyCode: 143,
							which: 143,
							bubbles: true,
							cancelable: true,
						}
					)
				);
			}
		}, 1000 * 60 * 5); // 5 min
	}

	function ShowVideoCountOnChannel() {
		if (currentPage() != 'watch') return;
		const CACHE_PREFIX = 'retube-channel-videos-count:', SELECTOR_ID = 'retube-video-count'
		waitSelector('#upload-info #owner-sub-count, ytm-slim-owner-renderer .subhead', { stop_on_page_change: true }).then(el => setVideoCount(el));

		async function setVideoCount(container) {
			document.querySelector('#rt-videoCount')?.remove()
			await Delay(3000)
			const channelId = getChannelId()
			if (!channelId) return console.error('setVideoCount channelId: empty', channelId);
			if (storage = sessionStorage.getItem(CACHE_PREFIX + channelId)) {
				insertToHTML({ 'text': storage, 'container': container });
			}
			else {
				fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${getChannelId()}&key=${api}`).then(response => response.json()).then(json => {
					if (videoCount = json.items[0].statistics.videoCount) {

						insertToHTML({ 'text': videoCount, 'container': container });
						sessionStorage.setItem(CACHE_PREFIX + channelId, videoCount);
					} else console.warn('API поменялось');
				}).catch()
			}
			function insertToHTML({ text = '', container = required() }) {
				if (!(container instanceof HTMLElement)) return console.error('container not HTMLElement:', container);
				(document.getElementById(SELECTOR_ID) || (function () {
					container.insertAdjacentHTML('beforeend',
						`<span class="date style-scope ytd-video-secondary-info-renderer" style="margin-right:5px;" id="rt-videoCount"> • <span id="${SELECTOR_ID}">${text}</span> видео</span>`);
					return document.getElementById(SELECTOR_ID);
				})())
					.textContent = text
				container.title = `${text} видео`
			}
		}
	}

	function HotkeysAlwaysActive() {
		let cachedMode = "";
		document.addEventListener("keydown", function onEvent(e) {
			if (currentPage() != 'watch' || e.code !== "Space" || document.querySelector('.CodeMirror-focused')) return;

			let ae = document.activeElement;
			if (ae.tagName.toLowerCase() == "input" || ae.hasAttribute("contenteditable")) return;

			let player = document.querySelector(".html5-video-player");
			if (player.classList.contains("paused-mode")) cachedMode = "paused-mode";
			if (player.classList.contains("playing-mode")) cachedMode = "playing-mode";
			if (player.classList.contains("ended-mode")) cachedMode = "ended-mode";

			setTimeout(() => {
				let player = document.querySelector(".html5-video-player");
				if (player.classList.contains(cachedMode)) {
					movie_player.focus({ preventScroll: true })
					document.querySelector("button.ytp-play-button").click();
					cachedMode = "";
				}
			}, 200);
		});

		document.addEventListener('keyup', e => currentPage() == 'watch' && setFocus(e.target))
		document.addEventListener('click', e => currentPage() == 'watch' && e.isTrusted && setFocus(e.target))
		function setFocus(target) {
			if (['input', 'textarea', 'select'].includes(target.localName) || target.isContentEditable || (target.classList.length > 0 && target.classList[0]?.includes('CodeMirror'))) return;
			movie_player.focus({ preventScroll: true })
		}
	}

	function ScrollVolume() {
		waitSelector('#movie_player video').then(() => {
			waitSelector('.html5-video-container').then(container => {
				container.addEventListener('wheel', evt => {
					if (!evt.shiftKey) return;

					const dir = (evt.deltaY > 0 ? -1 : 1) * 1
					const vol = Math.max(Math.min(Math.round(movie_player.getVolume()) + 1 * dir, 100), 0)
					vol > 0 && movie_player.isMuted() && movie_player.unMute()
					movie_player.setVolume(vol)

					let currentVideoVolume = movie_player.getVolume()
					showOSD(currentVideoVolume + '%');

					let obj = {
						"data": JSON.stringify({ "volume": currentVideoVolume, "muted": false }),
						"expiration": 17125032379999,
						"creation": Date.now()
					};

					localStorage.setItem("yt-player-volume", JSON.stringify(obj));
					sessionStorage.setItem("yt-player-volume", JSON.stringify(obj));

					evt.preventDefault();
					evt.stopImmediatePropagation();
				}, { capture: true });
			});
		})
	}

	function MiddleClickSearch() {
		const Util = {
			q(query, context = document) {
				return context.querySelector(query)
			},
			encodeURIWithPlus(string) {
				return encodeURIComponent(string).replace(/%20/gu, '+')
			}
		}

		waitSelector('#search-icon-legacy').then(btn => {
			btn.onmousedown = function (e) {
				if (e.button === 1) {
					e.preventDefault()
				}
			}
			btn.onclick = function (e) {
				e.preventDefault()
				e.stopImmediatePropagation()

				const input = Util.q('input#search').value.trim()
				if (!input) return false

				const url = `${location.origin}/results?search_query=${Util.encodeURIWithPlus(input)}`
				if (e.button === 1) {
					GM_openInTab(url, true)
				} else if (e.button === 0) {
					window.location.href = url
				}

				return false
			}
			btn.onauxclick = btn.onclick
		})

		waitSelector('.sbsb_c').then(() => {
			document.querySelectorAll('.sbsb_c').forEach(x => {
				x.onclick = function (e) {
					if (!e.target.classList.contains('sbsb_i')) {
						const search = Util.q('.sbpqs_a, .sbqs_c', x).textContent

						const url = `${location.origin}/results?search_query=${Util.encodeURIWithPlus(search)}`
						if (e.button === 1) {
							GM_openInTab(url, true)
						} else if (e.button === 0) {
							window.location.href = url
						}
					} else if (e.button === 1) {
						// Не открывать в новой вкладке при клике M3 по кнопке очистки ввода
						e.preventDefault()
						e.stopImmediatePropagation()
					}
				}
				x.onauxclick = x.onclick
			})
		})
	}

	function TranslateCommentButton() {
		function ReplaceNode(a, b) {
			a.parentNode.appendChild(b)
			a.parentNode.removeChild(a)
		}

		function TranslateButton_SetState() {
			if (this._ntext.parentNode !== null) {
				ReplaceNode(this._ntext, this._otext)
				this.innerText = TRANSLATE_TEXT;
			} else {
				ReplaceNode(this._otext, this._ntext)
				this.innerText = UNDO_TEXT;
			}
		}

		function TranslateButton_Translate() {
			this.onclick = TranslateButton_SetState
			fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${TARGET}&dt=t&q=${encodeURIComponent(this._otext.innerText)}`)
				.then(response => response.json()).then(json => {
					for (let i = 0; i < json[0].length; i++) this._ntext.innerText += json[0][i][0].replace('\n', ' ');
					this.onclick()
				})
		}

		function ResetTranslateButton(tb) {
			if (tb._ntext.parentNode !== null) ReplaceNode(tb._ntext, tb._otext);

			tb._ntext.innerText = ""
			tb.innerText = TRANSLATE_TEXT
			tb.onclick = TranslateButton_Translate
		}

		function TranslateButton(main) {
			let tb = document.createElement("a")
			tb.id = "translate-button"
			tb.style = "margin-left: 5px"
			tb.classList = "yt-simple-endpoint style-scope yt-formatted-string"

			tb._otext = main.querySelector(QS_CONTENT_TEXT)
			tb._otext.addEventListener("DOMSubtreeModified", _ => ResetTranslateButton(tb))

			tb._ntext = document.createElement("div")
			tb._ntext.style.whiteSpace = "pre-wrap"
			tb._ntext.id = "content-text"
			tb._ntext.classList = "style-scope ytd-comment-renderer translate-text yt-formatted-string"

			ResetTranslateButton(tb)
			return tb
		}

		const QS_TRANSLATE_BUTTON = "#header>#header-author>yt-formatted-string>#translate-button";
		const QS_CONTENT_TEXT = "#expander>#content>#content-text";
		const QS_BUTTON_CONTAINER = "#header>#header-author>#published-time-text";

		/* User settings */
		let TRANSLATE_TEXT = "Перевести", UNDO_TEXT = "Вернуть", TARGET = navigator.language || navigator.userLanguage;

		inject()

		function inject() {
			const observerConfig = { childList: true, subtree: true };
			const commentObserver = new MutationObserver(e => {
				for (let mut of e) {
					if (mut.target.id == "contents") {
						for (let n of mut.addedNodes) {
							let main = n.querySelector("#body>#main")
							if (!main) continue;

							let tb = main.querySelector(QS_TRANSLATE_BUTTON)
							if (tb != null) {
								ResetTranslateButton(tb)
							} else {
								main.querySelector(QS_BUTTON_CONTAINER).appendChild(TranslateButton(main))
							}
						}
					}
				}
			})

			commentObserver.observe(document, observerConfig)
		}
	}

	function AutoTranslateSubtitles() {
		const inline_script = () => {
			const tlang = navigator.language || 'ru-RU';
			const cache = { req_url: null, obj_url: null };
			const XMLHttpRequest_open = XMLHttpRequest.prototype.open;
			XMLHttpRequest.prototype.open = function () {
				const url = new URL(arguments[1], location.href);
				if (url.pathname == '/api/timedtext') {
					const lang = url.searchParams.get('lang');
					if (lang && lang != tlang) {
						const req_url = url.href;
						if (req_url == cache.req_url) {
							arguments[1] = cache.obj_url;
						} else {
							URL.revokeObjectURL(cache.obj_url);
							this.addEventListener('load', event => {
								cache.req_url = req_url;
								cache.obj_url = URL.createObjectURL(new Blob([this.responseText], { type: 'application/json' }));
							});
							url.searchParams.set('tlang', tlang);
							arguments[1] = url.href;
						}
					}
				}
				XMLHttpRequest_open.apply(this, arguments);
			};
		};

		const script = document.createElement("script");
		script.textContent = '(' + inline_script + ')();';

		if (document.head) {
			document.head.append(script);
		} else {
			new MutationObserver((mutationList, observer) => {
				document.head && (observer.disconnect(), document.head.append(script));
			}).observe(document, { subtree: true, childList: true });
		}
	}

	function ScrollSpeed() {
		waitSelector('.ytp-settings-button').then(container => {
			container.addEventListener('wheel', e => {
				try {
					e.preventDefault()
					const player = document.querySelector('.video-stream.html5-main-video')
					const currentSpeed = player.playbackRate
					const newSpeed = e.deltaY < 0 ? currentSpeed + 0.1 : currentSpeed - 0.1
					player.playbackRate = parseFloat(newSpeed.toFixed(2))
					showOSD(document.querySelector('.video-stream.html5-main-video').playbackRate + 'x')
				} catch { }
			})
			container.addEventListener('contextmenu', e => {
				try {
					e.preventDefault()
					e.stopPropagation()
					e.stopImmediatePropagation()
					document.querySelector('.video-stream.html5-main-video').playbackRate = 1
					showOSD(document.querySelector('.video-stream.html5-main-video').playbackRate + 'x')
				} catch { }
			})
		})
	}

	function ForceDefaultVideoVolume(enabled) {
		if (!enabled) {
			RTDefaultVolume = false
			return;
		}

		waitSelector('#movie_player video').then(video => {
			video.addEventListener('loadeddata', () => {
				if (RTDefaultVolume) movie_player.setVolume(RTDefaultVolumeLevel);
			}, { capture: true });
		})
	}
	//#endregion

	//#region Доп функции
	function hexToRgb(hex) {
		const bigint = parseInt(hex.slice(1), 16)
		const r = (bigint >> 16) & 255
		const g = (bigint >> 8) & 255
		const b = bigint & 255
		return [r, g, b]
	}
	function rgbToHex(rgb) {
		const r = Math.round(rgb[0])
		const g = Math.round(rgb[1])
		const b = Math.round(rgb[2])
		return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`
	}
	function ModifyColor(hex, rAmount, gAmount, bAmount) {
		const rgb = hexToRgb(hex);
		const brightenedR = Math.max(Math.min(rgb[0] + rAmount, 255), 0);
		const brightenedG = Math.max(Math.min(rgb[1] + gAmount, 255), 0);
		const brightenedB = Math.max(Math.min(rgb[2] + bAmount, 255), 0);
		return rgbToHex([brightenedR, brightenedG, brightenedB]);
	}
	function pushCSS(value, id) {
		const style = document.head.appendChild(document.createElement('style'))
		style.textContent = value
		if (id) style.id = id
	}
	function debounce(callback, delay) {
		let timeoutId

		return function () {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => {
				callback.apply(this, arguments)
			}, delay)
		}
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
	function waitUntil(condition = required(), timeout = required()) {
		if (typeof condition !== 'function') return console.error('waitUntil > condition is not fn:', typeof condition);

		return new Promise((resolve) => {
			if (result = condition()) {
				resolve(result);
			}
			else {
				const waitCondition = setInterval(() => {
					if (result = condition()) {
						clearInterval(waitCondition);
						resolve(result);
					}
				}, ~~timeout || 500);
			}
		});
	}
	function runOnPageInitOrTransition(callback, onlyEvent) {
		if (!callback || typeof callback !== 'function') {
			return console.error('runOnPageInitOrTransition > callback not function:', ...arguments);
		}
		let prevURL = location.href;
		const isURLChange = () => (prevURL === location.href) ? false : prevURL = location.href;
		if (onlyEvent) {
			isURLChange()
		}
		else {
			isURLChange() || callback()
		}
		document.addEventListener('yt-navigate-finish', () => isURLChange() && callback());
	}
	function currentPage() {
		const pathnameArray = location.pathname.split('/').filter(Boolean)
		let [page, channelTab] = [pathnameArray[0], pathnameArray.pop()]
		channelTab = ['featured', 'videos', 'shorts', 'streams', 'playlists', 'community', 'channels', 'about', 'search'].includes(channelTab) ? channelTab : false
		return (page != 'live_chat')
			&& (['channel', 'c', 'user'].includes(page)
				|| page?.startsWith('@')
				|| /[A-Z\d_]/.test(page)
				|| channelTab
			) ? 'channel' : (page == 'clip') ? 'watch' : page || 'home'
	}
	function getVideoId() {
		return new URL(window.location.href).searchParams.get("v")
	}
	function timeFormat(time_sec) {
		const ts = Math.abs(+time_sec), d = ~~(ts / 86400), h = ~~((ts % 86400) / 3600), m = ~~((ts % 3600) / 60), s = ~~(ts % 60)
		return (d ? `${d}d ` : '') + (h ? (d ? h.toString().padStart(2, '0') : h) + ':' : '') + (h ? m.toString().padStart(2, '0') : m) + ':' + s.toString().padStart(2, '0')
	}
	function getChannelId() {
		const isChannelId = id => id && /UC([a-z0-9-_]{22})$/i.test(id);
		let result = [
			document.querySelector('meta[itemprop="channelId"][content]')?.content,
			(document.body.querySelector('ytd-app')?.__data?.data?.response
				|| document.body.querySelector('ytd-app')?.data?.response
				|| window.ytInitialData
			)
				?.metadata?.channelMetadataRenderer?.externalId,
			document.querySelector('link[itemprop="url"][href]')?.href.split('/')[4],
			location.pathname.split('/')[2],
			document.body.querySelector('#video-owner a[href]')?.href.split('/')[4],
			document.body.querySelector('a.ytp-ce-channel-title[href]')?.href.split('/')[4],
			document.body.querySelector('ytd-watch-flexy')?.playerData?.videoDetails.channelId,
		].find(i => isChannelId(i));
		return result;
	}
	function finishEvent(callback) {
		document.addEventListener('yt-navigate-finish', () => callback())
	}
	function showOSD(text) {
		if (!text || (currentPage() != 'embed' && currentPage() != 'watch')) return;
		if (typeof this.fadeBezel === 'number') clearTimeout(this.fadeBezel); // reset fade

		const bezelEl = document.body.querySelector('.ytp-bezel-text');
		if (!bezelEl) return console.error(`showOSD ${text}=>${bezelEl}`);

		const bezelContainer = bezelEl.parentElement.parentElement, CLASS_VALUE = 'ytp-text-root', SELECTOR = '.' + CLASS_VALUE; // для css

		if (!this.bezel_css_inited) {
			this.bezel_css_inited = true;
			pushCSS(
				`${SELECTOR} { display: block !important; }
				  ${SELECTOR} .ytp-bezel-text-wrapper {
					 pointer-events: none;
					 z-index: 40 !important;
				  }
				  ${SELECTOR} .ytp-bezel-text { display: inline-block !important; }
				  ${SELECTOR} .ytp-bezel { display: none !important; }`);
		}

		bezelEl.textContent = text;
		bezelContainer.classList.add(CLASS_VALUE);

		let ms = 1200;
		if ((text = String(text)) && (text.endsWith('%') || text.endsWith('x'))) {
			ms = 600
		}

		this.fadeBezel = setTimeout(() => {
			bezelContainer.classList.remove(CLASS_VALUE);
			bezelEl.textContent = ''; // fix not showing bug when frequent calls
		}, ms);
	}
	async function getSavedSetting(key) {
		return await GM_getValue(key) == 'true';
	}
	function SearchInObjectByKey({ obj, keys, match_fn = data => data.constructor.name !== 'Object', multiple = false, path = '' }) {
		if (typeof obj !== 'object') {
			console.error('searchInObjectByKey > keys is not Object:', ...arguments);
			return;
		}

		const setPath = d => (path ? path + '.' : '') + d;
		let hasKey, results = [];

		for (const prop in obj) {
			if (obj.hasOwnProperty(prop) && obj[prop]) {
				hasKey = keys.constructor.name === 'String' ? (keys === prop) : keys.indexOf(prop) > -1;

				if (hasKey && (!match_fn || match_fn(obj[prop]))) {
					if (multiple) {
						results.push({
							'path': setPath(prop),
							'data': obj[prop],
						});
					} else {
						return {
							'path': setPath(prop),
							'data': obj[prop],
						};
					}
				} else {
					switch (obj[prop].constructor.name) {
						case 'Object':
							const resultObject = SearchInObjectByKey({
								obj: obj[prop],
								keys: keys,
								path: setPath(prop),
								match_fn: match_fn,
							});
							if (resultObject) {
								if (multiple) results.push(resultObject);
								else return resultObject;
							}
							break;

						case 'Array':
							for (let i = 0; i < obj[prop].length; i++) {
								const resultArray = SearchInObjectByKey({
									obj: obj[prop][i],
									keys: keys,
									path: path + `[${i}]`,
									match_fn: match_fn,
								});
								if (resultArray) {
									if (multiple) results.push(resultArray);
									else return resultArray;
								}
							}
							break;

						case 'Function':
							if (Object.keys(obj[prop]).length) {
								for (const j in obj[prop]) {
									if (typeof obj[prop][j] !== 'undefined') {
										const resultFunction = SearchInObjectByKey({
											obj: obj[prop][j],
											keys: keys,
											path: setPath(prop) + '.' + j,
											match_fn: match_fn,
										});
										if (resultFunction) {
											if (multiple) results.push(resultFunction);
											else return resultFunction;
										}
									}
								}
							}
							break;
					}
				}
			}
		}

		if (multiple) return results;
	}
	async function Delay(ms = 1000) {
		return new Promise(resolve => setTimeout(resolve, ms))
	}
	//#endregion
})()