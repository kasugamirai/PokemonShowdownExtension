var btnClick = document.getElementById('btnClick');

btnClick.addEventListener('click', function() {
    // Send a message to the content script to toggle translation
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleTranslation"});
    });

    // Toggle button text
    if (btnClick.innerText === "Toggle Translation") {
        btnClick.innerText = "Translation is OFF";
    } else {
        btnClick.innerText = "Toggle Translation";
    }
});
