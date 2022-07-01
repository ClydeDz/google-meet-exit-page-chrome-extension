import { getStorage } from "../common/storage";
import { CHROME_SYNC_STORAGE_KEY, BACKGROUND_SCRIPT_INTERVAL } from "../common/settings";
import { initializeDocument } from "../common/document";
import { PRESET_CONFIGURATION } from "../common/settings";

function applyStyle(result) {
    const savedConfiguration = result || PRESET_CONFIGURATION;
    const redirectUrl = savedConfiguration["redirectUrl"];
    console.info("Extension will redirect you to", redirectUrl);
    
    const clickHandler = () => {
        console.log("Clicked");
        setTimeout(function() {
            // window.open('https://support.wwf.org.uk', "_blank") 
            // || window.location.replace('https://support.wwf.org.uk');
            location.replace(redirectUrl);
        }, 1000);        
    };

    setTimeout(myGreeting, 1000);

    function myGreeting() {
        console.info("Hello again");
        const tweetBtn = document.querySelectorAll("[data-testid='SideNav_NewTweet_Button']")[0];
        tweetBtn && tweetBtn.addEventListener('click', clickHandler);
        console.info(tweetBtn);   
    }
}

window.onload = function() {
    initializeDocument(document);
    setTimeout(function() {
        getStorage(CHROME_SYNC_STORAGE_KEY, applyStyle);
    }, BACKGROUND_SCRIPT_INTERVAL);    
}
