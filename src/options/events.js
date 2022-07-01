import { getElementById } from "../common/document";
import { setStorage } from "../common/storage";
import { PRESET_CONFIGURATION, CHROME_SYNC_STORAGE_KEY } from "../common/settings";
import * as self from "./events";

export function saveConfiguration() {
    const updatedConfiguration = {
      redirectUrl: getElementById("GoogleMeetRedirectWebpage").value,
    };
    setStorage(CHROME_SYNC_STORAGE_KEY, updatedConfiguration);
}

export function startup(result) {
    const savedConfiguration = result || PRESET_CONFIGURATION;        
    const redirectUrl = savedConfiguration["redirectUrl"]
    getElementById("GoogleMeetRedirectWebpage").value = redirectUrl;
}

export function initializeEventListenersForOptions() {
    getElementById("SaveConfiguration").addEventListener("click", self.saveConfiguration);
}
