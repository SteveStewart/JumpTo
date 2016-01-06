chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    alert("onupdated " + tabId);
});

chrome.tabs.onCreated.addListener(function (tabId, changeInfo, tab) {
    alert("oncreated " + tabId);
});

chrome.tabs.onActivated.addListener(function (tabId, changeInfo, tab) {
    alert("onactivated " + tabId);
});
