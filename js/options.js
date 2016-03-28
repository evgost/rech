var key = document.getElementById('apikey').value;

function save_options(key, value) {
    chrome.storage.sync.set({
        key : value
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1500);
    });
}

function restore_options(key) {
    chrome.storage.sync.get(key, function(items) {
        document.getElementById('apikey').value = items.key;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    restore_options();

    document.getElementById('save').onclick = function() {
        save_options();
    };
});
