//console.log(document.cookie, chrome);
var REGEX_MATCH_NEURON = /[^;]\s*neuron\=[^;]+/;

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


var handlers = {
  'add-cookie': function(message) {

    console.log(message.items);
    var cookie = document.cookie;
    if (message.items & 0x04) 
      set_cookie('cortex_path', 'http://localhost:9074');
    if (message.items & 0x02)
      set_cookie('cortex_compress', false); 
    if (message.items & 0x01)
       set_cookie('cortex_combo', false);
    if (message.items)
       set_cookie('neuron', 'path=http://localhost:9074/mod,ext=.js');
    location.reload();
  },

  'clear-cookie': function(message) {
    dispose_cookie('cortex_path');
    dispose_cookie('cortex_compress');
    dispose_cookie('cortex_combo');
    dispose_cookie('neuron');
    location.reload();
  }

};



chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
  var event = message.event;

  var handler = handlers[event];

  handler && handler(message);
});