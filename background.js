

function update_icon(active) {
    chrome.browserAction.setIcon({
        path: active ? 'i/icon-active-64.png' : 'i/icon-inactive-64.png'
    });
}

// update icon when tab switched
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.sendMessage(activeInfo.tabId, {
        event: 'test-activate'
    });
});


chrome.extension.onMessage.addListener(function(message, sender, sendResponse){
    if ( message.event === 'set-icon' ) {
        update_icon(message.active);
    }
});

