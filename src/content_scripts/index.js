import { getStorage } from "../common/storage";
import { CHROME_SYNC_STORAGE_KEY, CONTENT_SCRIPT_INTERVAL } from "../common/settings";
import { initializeDocument } from "../common/document";
import { applyRedirect } from "./redirect";

window.onload = function() {
    initializeDocument(document);
    setTimeout(function() {
        getStorage(CHROME_SYNC_STORAGE_KEY, applyRedirect);
    }, CONTENT_SCRIPT_INTERVAL);    
}
