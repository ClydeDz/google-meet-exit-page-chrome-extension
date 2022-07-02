import { getStorage } from "../common/storage";
import { CHROME_SYNC_STORAGE_KEY, BACKGROUND_SCRIPT_INTERVAL } from "../common/settings";
import { initializeDocument } from "../common/document";
import { PRESET_CONFIGURATION } from "../common/settings";

function applyStyle(result) {
    const savedConfiguration = result || PRESET_CONFIGURATION;
    const redirectUrl = savedConfiguration["redirectUrl"];
    const redirectOpenInNewTab = savedConfiguration["redirectOpenInNewTab"];
    console.info("Extension will redirect you to", redirectUrl);
    
    const clickHandler = () => {
        console.log("Clicked");
        setTimeout(function() {
            if (redirectOpenInNewTab) {
                window.open(redirectUrl, "_blank")
                    || window.location.replace(redirectUrl);
            }
            else {
                location.replace(redirectUrl);
            }
        }, 1000);        
    };

    var myInterval = setInterval(myGreeting, 2000);   

    function myGreeting() {
        console.info("Hello again");
        const tweetBtn = document.querySelectorAll("[aria-label='Leave call']")[0];
        if(tweetBtn) {
            tweetBtn.addEventListener('click', clickHandler);
            clearInterval(myInterval);
            console.info(tweetBtn);   
        }
    }
}

window.onload = function() {
    initializeDocument(document);
    setTimeout(function() {
        getStorage(CHROME_SYNC_STORAGE_KEY, applyStyle);
    }, BACKGROUND_SCRIPT_INTERVAL);    
}
