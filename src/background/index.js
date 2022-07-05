import { redirectToOptionsPage } from './redirect';

chrome.runtime.onInstalled.addListener(function (object) {
    redirectToOptionsPage(object, chrome);
});