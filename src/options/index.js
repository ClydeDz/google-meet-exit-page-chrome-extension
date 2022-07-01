import { initializeDocument } from "../common/document";
import { CHROME_SYNC_STORAGE_KEY } from "../common/settings";
import { getStorage } from "../common/storage";
import { initializeEventListenersForOptions, startup } from "./events";

window.onload = function() {
    initializeDocument(document);
    initializeEventListenersForOptions();
    getStorage(CHROME_SYNC_STORAGE_KEY, startup);
};
