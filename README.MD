# Rech

Chrome Extension for Speech Synthesis


### https://gist.github.com/wesbos/cd16b8b1815825f111a2
```
// paste in your console
speechSynthesis.onvoiceschanged = function() {
  var msg = new SpeechSynthesisUtterance();
  msg.voice = this.getVoices().filter(v => v.name == 'Cellos')[0];
  msg.text = Object.keys(window).join(' ');
  this.speak(msg);
};
```

```
"use strict";

(function () {
(function () {
  "use strict";
  var getGlobals = function getGlobals(callback) {
    var iframe = document.createElement("iframe");
    iframe.addEventListener("load", function () {
      var windowKeys = Object.keys(window);
      var iframeKeys = Object.keys(iframe.contentWindow);
      var uniqueKeys = windowKeys.reduce(function (memo, key) {
        if (! ~iframeKeys.indexOf(key)) {
          memo.push(key);
        }
        return memo;
      }, []);
      callback(uniqueKeys);
      iframe.remove();
    });
    iframe.src = "about:blank";
    document.body.appendChild(iframe);
  };
  var msg = new SpeechSynthesisUtterance();
  msg.voice = speechSynthesis.getVoices().filter(function (v) {
    return v.name == "Cellos";
  })[0];
  getGlobals(function (keys) {
    console.log(keys);
    msg.text = keys.join(" ");
    speechSynthesis.speak(msg);
  });
})();
```