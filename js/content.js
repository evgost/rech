let o = document.createElement('script');
chrome.storage.sync.get('config', function(data) {
        o.textContent = `const RECH_CONFIG = ${data.config}`;
    });
(document.head || document.documentElement).appendChild(k);

let s = document.createElement('script');
s.src = chrome.extension.getURL('main.js');
(document.head || document.documentElement).appendChild(s);
