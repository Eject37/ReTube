// ==UserScript==
// @name         YouTube Fixer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description YouTube Fixer
// @author       Eject
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

FocusAndScrollFix()
Colors()

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
    await new Promise(resolve => setTimeout(resolve, 1000))
    document.querySelector('#logo-icon').children[0].querySelector('path.style-scope').style.fill = "#3c3c3c"
    document.querySelector('#logo-icon').style.fill = "#c8c8c8"

    var hdButton = document.head.appendChild(document.createElement('style'))
    hdButton.innerHTML = '.ytp-settings-button.ytp-hd-quality-badge:after {background-color: #3e6bb4}'}
}