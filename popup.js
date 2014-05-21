var PopupController = function () {
  	this.button_add = document.getElementById('btnadd');
  	this.button_clear = document.getElementById('btnclear');
  	this.items_ = document.getElementsByName('item');
  	this.addListeners_();
};

PopupController.prototype = {
	button_add: null,
	button_clear: null,
	items_: null,

	addListeners_: function () {
    	this.button_add.addEventListener('click', this.addClick_.bind(this));
    	this.button_clear.addEventListener('click', this.clearClick_.bind(this));
  	},

  	addClick_: function () {
  		//this.button_add.setAttribute('disabled', 'disabled');
  		//this.button_clear.removeAttribute('disabled');
  		console.log("log");
  		var itemIndex=0;
  		for (var iter=0; iter<this.items_.length; ++iter){
  			var item = this.items_[iter];
  			itemIndex = itemIndex*2 + (item.checked? 1:0);  			
  		}
  		chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tabs){
     		console.log(JSON.stringify(tabs[0]));
     		console.log(tabs[0].id); 
     		chrome.tabs.sendMessage(tabs[0].id, {
        		event: 'add-cookie',
        		items: itemIndex
    		});
		}); 		
  	},

  	clearClick_: function () {
  		//this.button_clear.setAttribute('disabled', 'disabled');
  		//this.button_add.removeAttribute('disabled');
  		chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tabs){
     		console.log(JSON.stringify(tabs[0]));
     		console.log(tabs[0].id); 
     		chrome.tabs.sendMessage(tabs[0].id, {
        		event: 'clear-cookie',
    		});
		}); 
  	}

};

document.addEventListener('DOMContentLoaded', function () {
  	window.PC = new PopupController();
});