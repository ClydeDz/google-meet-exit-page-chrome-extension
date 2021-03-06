import { getElementById } from "../common/document";
import { setStorage } from "../common/storage";
import { PRESET_CONFIGURATION, CHROME_SYNC_STORAGE_KEY } from "../common/settings";
import * as self from "./events";

export function saveConfiguration() {
    const updatedConfiguration = {
      redirectUrl: getElementById("GoogleMeetRedirectWebpage").value,
      redirectOpenInNewTab: getElementById("GoogleMeetOpenInNewTab").checked,
    };
    setStorage(CHROME_SYNC_STORAGE_KEY, updatedConfiguration);
}

export function initializeEventListenersForOptions() {
    getElementById("SaveConfiguration").addEventListener("click", self.saveConfiguration);
}

export function loadConfiguration(result) {
    const savedConfiguration = result || PRESET_CONFIGURATION;  
    const redirectUrl = savedConfiguration["redirectUrl"];
    const redirectOpenInNewTab = savedConfiguration["redirectOpenInNewTab"];

    getElementById("GoogleMeetRedirectWebpage").value = redirectUrl;
    getElementById("GoogleMeetOpenInNewTab").checked = redirectOpenInNewTab;
}