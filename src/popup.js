var btnClick = document.getElementById('btnClick');

// Get the translation status from storage and set the button text
chrome.storage.sync.get('translationActive', function(data) {
    if (data.translationActive) {
        btnClick.innerText = "Translation is ON";
    } else {
        btnClick.innerText = "Toggle Translation";
    }
});

btnClick.addEventListener('click', function() {
    // Send a message to the content script to toggle translation
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleTranslation"});
    });

    // Toggle button text and save the new translation status in storage
    chrome.storage.sync.get('translationActive', function(data) {
        var newStatus = !data.translationActive;
        chrome.storage.sync.set({translationActive: newStatus}, function() {
            if (newStatus) {
                btnClick.innerText = "Translation is ON";
            } else {
                btnClick.innerText = "Toggle Translation";
            }
        });
    });
});
