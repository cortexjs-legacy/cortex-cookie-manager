
// console.log(document.cookie, chrome);

var REGEX_MATCH_NEURON = /[^;]\s*neuron\=[^;]+/;

function dispose_cookie (key) {
    var date = new Date();
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

    document.cookie = key + '=; path=/; expires=' + date.toGMTString();
}

var handlers = {
    'mode-change': function (message) {
        var cookie = document.cookie;

        if ( REGEX_MATCH_NEURON.test(cookie) ) {
            dispose_cookie('cortex_compress');
            dispose_cookie('cortex_combo');
            dispose_cookie('cortex_path');
            dispose_cookie('neuron');

            send_icon_message(false);

        } else {
            document.cookie = 'cortex_compress=false';
            document.cookie = 'cortex_combo=false';
            document.cookie = 'cortex_path=http://localhost:9074';
            document.cookie = 'neuron=path=http://localhost:9074/mod';

            send_icon_message(true);
        } 

        location.reload();
    },

    'test-activate': function (message) {
        send_icon_message( REGEX_MATCH_NEURON.test(document.cookie) );
    }
};


function send_icon_message (active) {
    chrome.extension.sendMessage({
        event: 'set-icon',
        active: active
    });
}


chrome.extension.onMessage.addListener(function(message, sender, sendResponse){
    var event = message.event;

    var handler = handlers[event];

    handler && handler(message);
});


