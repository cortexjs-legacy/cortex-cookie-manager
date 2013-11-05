
// console.log(document.cookie, chrome);

var REGEX_MATCH_NEURON = /[^;]\s*neuron\=[^;]+/;

var handlers = {
    'mode-change': function (message) {
        var cookie = document.cookie;

        if ( REGEX_MATCH_NEURON.test(cookie) ) {
            document.cookie = 'cortex_compress=';
            document.cookie = 'cortex_combo=';
            document.cookie = 'cortex_path=';
            document.cookie = 'neuron=';

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


