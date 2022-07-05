export function redirectToOptionsPage(object, chrome) {
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
            return;
        }

        chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
    }
}