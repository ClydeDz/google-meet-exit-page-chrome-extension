import { getStorage } from "../common/storage";
import { CHROME_SYNC_STORAGE_KEY, CONTENT_SCRIPT_INTERVAL, REDIRECT_INTERVAL } from "../common/settings";
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
                redirectUrl && (window.open(redirectUrl, "_blank")
                    || window.location.replace(redirectUrl));
            }
            else {
                redirectUrl && location.replace(redirectUrl);
            }
        }, REDIRECT_INTERVAL);        
    };

    var myInterval = setInterval(myGreeting, CONTENT_SCRIPT_INTERVAL);   

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
    }, CONTENT_SCRIPT_INTERVAL);    
}
