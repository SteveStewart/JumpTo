// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Add your Analytics tracking ID here.
 */
var _AnalyticsCode = 'UA-72063012-1';

/**
 * Below is a modified version of the Google Analytics asynchronous tracking
 * code snippet.  It has been modified to pull the HTTPS version of ga.js
 * instead of the default HTTP version.  It is recommended that you use this
 * snippet instead of the standard tracking snippet provided when setting up
 * a Google Analytics account.
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();


function jump() {


    var buttonSwitch = document.getElementById('turn-the-jump-on');
    var interval = document.getElementById('interval').value;

    if (buttonSwitch.firstChild.data === "Stop refreshing") {

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { greeting: "stop-jump-to" }, function (response) {
                console.log("stop-jump-to finished " + response);

            });

            chrome.browserAction.setIcon({ path: { "19": "img/power-off-19x19.png" }, tabId: tabs[0].id });
            chrome.browserAction.setTitle({ tabId: tabs[0].id, title: "Redgate Anaylsis Graph Jump To" });
        });

        buttonSwitch.firstChild.data = "Start refreshing";

    }
    else {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { greeting: "start-jump-to", interval: interval }, function (response) {
                console.log("start-jump-to finished " + response);

            });

            chrome.browserAction.setIcon({ path: { "19": "img/power-on-19x19.png" }, tabId: tabs[0].id });
            chrome.browserAction.setTitle({ tabId: tabs[0].id, title: "Redgate Anaylsis Graph Jump To - running" });
        });

        buttonSwitch.firstChild.data = "Stop refreshing";

    }
}


document.getElementById('turn-the-jump-on').addEventListener('click', jump);

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.browserAction.getTitle({ tabId: tabs[0].id }, function (result) {
        if (result.indexOf(" running") > -1) {
            //We are running right now.
            var buttonSwitch = document.getElementById('turn-the-jump-on');
            buttonSwitch.firstChild.data = "Stop refreshing";
        }
    });
});




