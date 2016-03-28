(function() { 
    function searchDefinition(word) {
        var query = word.selectionText;
        
        chrome.tabs.create({
            url: "http://www.wolframalpha.com/input/?i=" + query
        });
    };
    
    chrome.contextMenus.create({
        title: "Rech",
        contexts: ["page"],
        onclick: searchDefinition
    });

})();
