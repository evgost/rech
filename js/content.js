var k = document.createElement('script');
chrome.storage.sync.get('wmApiKey', function(items) {
        k.textContent = "var WM_API = '" + items.wmApiKey + "'";
    });
(document.head || document.documentElement).appendChild(k);

var j = document.createElement('script');
j.src = chrome.extension.getURL('libs/jquery.js');
(document.head || document.documentElement).appendChild(j);

var s = document.createElement('script');
s.src = chrome.extension.getURL('main.js');
(document.head || document.documentElement).appendChild(s);
