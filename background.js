

function update_icon(active) {
    chrome.browserAction.setIcon({
        path: active ? 'i/icon-active-64.png' : 'i/icon-inactive-64.png'
    });
}


function test_active (tab) {
    chrome.tabs.sendMessage(tab.id, {
        event: 'test-activate'
    });
}


// on icon clicked
chrome.browserAction.onClicked.addListener(function(tab){
	chrome.tabs.sendMessage(tab.id, {
        event: 'mode-change'
    });
});


// update icon when tab switched
chrome.tabs.onActivated.addListener(function (tab) {
    test_active(tab);
});


chrome.extension.onMessage.addListener(function(message, sender, sendResponse){
    if ( message.event === 'set-icon' ) {
        update_icon(message.active);
    }
});

