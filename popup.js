// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {event: 'query-status'}, function (res) {
            document.getElementById("domainpath").checked = res.domainpath;
            document.getElementById("compress").checked = res.compress;
            document.getElementById("combo").checked = res.combo;
        });
        document.addEventListener('change',function(){
            var item1;var item2;var item3;
			item1 = !!document.getElementById("domainpath").checked;
			item2 = !!document.getElementById("compress").checked;
			item3 = !!document.getElementById("combo").checked;
			chrome.tabs.sendMessage(tabs[0].id,{
                event: 'mode-change', result1:item1,result2:item2,result3:item3
            });
        });
    });
});


