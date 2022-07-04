import { CONTENT_SCRIPT_INTERVAL, REDIRECT_INTERVAL } from "../common/settings";
import { PRESET_CONFIGURATION } from "../common/settings";
import { querySelectorAll} from "../common/document";

export function applyRedirect(result) {
    const savedConfiguration = result || PRESET_CONFIGURATION;
    const redirectUrl = savedConfiguration["redirectUrl"];
    const redirectOpenInNewTab = savedConfiguration["redirectOpenInNewTab"];
    console.info("Google Meet Exit Page extension will redirect you to", redirectUrl, "after you end this call.");
    
    function onLeaveCallBtnClick() {
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

    function searchAndBindLeaveCallBtn() {
        const leaveCallBtn = querySelectorAll("[aria-label='Leave call']")[0];
        if(leaveCallBtn) {
            leaveCallBtn.addEventListener('click', onLeaveCallBtnClick);
            clearInterval(myInterval);
        }
    }

    var myInterval = setInterval(searchAndBindLeaveCallBtn, CONTENT_SCRIPT_INTERVAL);
}