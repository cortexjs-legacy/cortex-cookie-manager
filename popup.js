// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
document.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id,  {
				event: 'init'
			});
	});
	document.addEventListener('click',function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var item1;var item2;var item3;
			if(document.getElementById("domainpath").checked){item1=true;}else{item1=false;}
			if(document.getElementById("compress").checked){item2=true;}else{item2=false;}
			if(document.getElementById("combo").checked){item3=true;}else{item3=false;}
			chrome.tabs.sendMessage(tabs[0].id,  {
				event: 'mode-change',result1:item1,result2:item2,result3:item3
			});
		});
	});
	
});


