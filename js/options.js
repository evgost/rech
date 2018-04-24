const DEFAULT_CONFIG = {};

var key = document.getElementById('apikey').value;

function save_config(key, value) {
    chrome.storage.sync.set({
        config: config
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 1500);
    });
}

function restore_config(key) {
    chrome.storage.sync.get(key, function (items) {
        document.getElementById('apikey').value = items.key;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    restore_options();

    document.getElementById('save').onclick = function () {
        save_options();
    };
});

let synth = window.speechSynthesis;

let inputForm = document.querySelector('form');
let inputTxt = document.querySelector('.txt');
let voiceSelect = document.querySelector('select');

let pitch = document.querySelector('#pitch');
let pitchValue = document.querySelector('.pitch-value');
let rate = document.querySelector('#rate');
let rateValue = document.querySelector('.rate-value');
let volume = document.querySelector('#volume');
let volumeValue = document.querySelector('.volume-value');

let voices = [];

function populateVoiceList() {
    voices = synth.getVoices();

    for (i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

        if (voices[i].default) {
            option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
    }
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

inputForm.onsubmit = function (event) {
    event.preventDefault();

    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
            utterThis.voice = voices[i];
        }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    utterThis.volume = volume.value;

    synth.speak(utterThis);

    utterThis.onpause = function (event) {
        var char = event.utterance.text.charAt(event.charIndex);
        console.log('Speech paused at character ' + event.charIndex + ' of "' +
            event.utterance.text + '", which is "' + char + '".');
    };

    inputTxt.blur();
};

pitch.onchange = function () {
    pitchValue.textContent = pitch.value;
};

rate.onchange = function () {
    rateValue.textContent = rate.value;
};

volume.onchange = function () {
    volumeValue.textContent = volume.value;
};