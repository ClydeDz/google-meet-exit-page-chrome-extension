import { redirect } from './redirect';

chrome.runtime.onInstalled.addListener(function (object) {
    redirect(object, chrome);
});