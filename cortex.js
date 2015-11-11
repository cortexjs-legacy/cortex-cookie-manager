// console.log(document.cookie, chrome);

function dispose_cookie(key) {
  var date = new Date();
  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

  document.cookie = key + '=; path=/; expires=' + date.toGMTString();
}


function set_cookie(key, value) {
  if (typeof value === 'string') {
    value = encodeURIComponent(value);
  }
  document.cookie = key + '=' + value + '; path=/';
}

function get_cookie(sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

var handlers = {
  'mode-change': function(message) {
      var protocol = location.protocol;
      if(message.result2==true){
          set_cookie('cortex_compress', false);
      }else{
          dispose_cookie('cortex_compress');
      }
      if(message.result3==true){
          set_cookie('cortex_combo', false);
      }else{
          dispose_cookie('cortex_combo');
      }
      if(message.result1==true){
          set_cookie('cortex_path', protocol + '//localhost:9074');
      }else{
          dispose_cookie('cortex_path');
      }
      if (message.result1 || message.result2 || message.result3) {
          set_cookie('neuron', 'path=' + protocol + '//localhost:9074/mod,ext=.js');
      } else {
          dispose_cookie('neuron');
      }
      send_icon_message(message.result1 || message.result2 || message.result3);

    location.reload();
  },

  'test-activate': function(message) {
    send_icon_message(get_cookie('neuron'));
  },

    'query-status': function (message, sender, sendResponse) {
        sendResponse({
            domainpath: !!get_cookie('cortex_path'),
            compress: !!get_cookie('cortex_compress'),
            combo: !!get_cookie('cortex_combo')
        })
    }
};


function send_icon_message(active) {
  chrome.extension.sendMessage({
    event: 'set-icon',
    active: active
  });
}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  var event = message.event;

  var handler = handlers[event];

  handler && handler(message, sender, sendResponse);
});

