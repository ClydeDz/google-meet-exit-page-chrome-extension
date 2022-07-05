import * as eventsModule from "./events";
import * as documentModule from "../common/document"
import * as settingsModule from "../common/settings";
import * as storageModule from "../common/storage";

const getElementByIdSpy = jest.spyOn(documentModule, "getElementById")
    .mockImplementation(jest.fn());

const setStorageSpy = jest.spyOn(storageModule, "setStorage")
    .mockImplementation(jest.fn());

describe("events → loadConfiguration", () => {
    const mockConfiguration = { ...settingsModule.PRESET_CONFIGURATION };
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it.each([
        mockConfiguration, undefined
    ])("both elements are assigned with configuration values", (suppliedConfiguration) => {
        getElementByIdSpy
            .mockImplementationOnce(() => {
                return {
                    value: "https://www.google.com"
                };
            })
            .mockImplementationOnce(() => {
                return {
                    checked: true
                };
            });

        eventsModule.loadConfiguration(suppliedConfiguration);
        
        expect(getElementByIdSpy).toHaveBeenCalledWith("GoogleMeetRedirectWebpage");
        expect(getElementByIdSpy).toHaveBeenCalledWith("GoogleMeetOpenInNewTab");
    });
});

describe("events → initializeEventListenersForOptions", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("initializes the correct listener with the correct method", () => {
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

    it("saves updated configuration", () => {
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
