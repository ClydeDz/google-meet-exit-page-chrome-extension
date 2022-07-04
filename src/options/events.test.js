import * as eventsModule from "./events";
import * as documentModule from "../common/document"
import * as settingsModule from "../common/settings";
import * as storageModule from "../common/storage";

const getElementByIdSpy = jest.spyOn(documentModule, "getElementById")
    .mockImplementation(jest.fn());

const setStorageSpy = jest.spyOn(storageModule, "setStorage")
    .mockImplementation(jest.fn());

describe("events → startup", () => {
    const mockConfiguration = { ...settingsModule.PRESET_CONFIGURATION };
    beforeEach(() => {
        settingsModule.ROW_COUNT = 0;
        jest.resetAllMocks();
    });

    it("should execute loop when relevant configuration found", () => {
        getElementByIdSpy.mockImplementation(() => {
            return {
                value: "https://www.google.com",
                checked: true
            };
        })
        eventsModule.startup(mockConfiguration);
        
        expect(getElementByIdSpy).toHaveBeenCalledWith("GoogleMeetRedirectWebpage");
        expect(getElementByIdSpy).toHaveBeenCalledWith("GoogleMeetOpenInNewTab");
    });
});

describe("events → initializeEventListenersForOptions", () => {
    beforeEach(() => {
        settingsModule.ROW_COUNT = 0;
        jest.resetAllMocks();
    });

    it("initializes the correct listeners with the correct methods", () => {
        const mockEventListener = jest.fn();
        const mockParentDiv = { addEventListener: mockEventListener};
        getElementByIdSpy.mockReturnValue(mockParentDiv);
        
        eventsModule.initializeEventListenersForOptions();
        
        expect(getElementByIdSpy).toHaveBeenCalledWith("SaveConfiguration");
        expect(mockEventListener).toHaveBeenCalledWith("click", eventsModule.saveConfiguration);
    });
});

describe("events → saveConfiguration", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("saves empty configuration when no rows found", () => {
        getElementByIdSpy.mockReturnValueOnce({ value: "test"});
        getElementByIdSpy.mockReturnValueOnce({ checked: false});

        const updatedConfiguration = {
            redirectUrl: "test",
            redirectOpenInNewTab: false,
        };

        eventsModule.saveConfiguration();
        
        expect(setStorageSpy).toHaveBeenCalledWith(settingsModule.CHROME_SYNC_STORAGE_KEY, updatedConfiguration);        
    });
});
