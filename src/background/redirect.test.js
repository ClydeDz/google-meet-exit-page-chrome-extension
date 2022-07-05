import * as redirectModule from "./redirect";
    
describe("redirect → redirectToOptionsPage", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe("when chrome extension install event is triggered", () => {
        it("chrome runtime openOptionsPage() is called", () => {
            const mockOpenOptionsPage = jest.fn();
            const mockObject = {
                reason: 'chrome.runtime.OnInstalledReason.INSTALL',
            };
            const mockChrome = {
                runtime: {
                    OnInstalledReason: {
                        INSTALL: 'chrome.runtime.OnInstalledReason.INSTALL',
                    },
                    openOptionsPage: mockOpenOptionsPage
                }
            };
    
            redirectModule.redirectToOptionsPage(mockObject, mockChrome);
    
            expect(mockOpenOptionsPage).toHaveBeenCalled();
        });
    
        it("chrome tabs create() is called", () => {
            const mockTabsCreate = jest.fn();
            const mockGetURL = jest.fn();
            mockGetURL.mockReturnValue("test.com");
            const mockObject = {
                reason: 'chrome.runtime.OnInstalledReason.INSTALL',
            };
            const mockChrome = {
                runtime: {
                    OnInstalledReason: {
                        INSTALL: 'chrome.runtime.OnInstalledReason.INSTALL',
                    },
                    getURL: mockGetURL
                },
                tabs: {
                    create: mockTabsCreate
                }
            };
    
            redirectModule.redirectToOptionsPage(mockObject, mockChrome);
    
            expect(mockTabsCreate).toHaveBeenCalledWith({ url: "test.com"});
            expect(mockGetURL).toHaveBeenCalledWith("options.html");
        });
    });

    describe("when chrome extension install event is not triggered", () => {
        it("neither chrome runtime openOptionsPage() nor chrome tabs create() is called", () => {
            const mockOpenOptionsPage = jest.fn();
            const mockTabsCreate = jest.fn();
            const mockGetURL = jest.fn();
            mockGetURL.mockReturnValue("test.com");
            const mockObject = {
                reason: 'chrome.runtime.randomReason',
            };
            const mockChrome = {
                runtime: {
                    OnInstalledReason: {
                        INSTALL: 'chrome.runtime.OnInstalledReason.INSTALL',
                    },
                    getURL: mockGetURL,
                    openOptionsPage: mockOpenOptionsPage
                },
                tabs: {
                    create: mockTabsCreate
                }
            };
    
            redirectModule.redirectToOptionsPage(mockObject, mockChrome);
    
            expect(mockOpenOptionsPage).not.toHaveBeenCalled();
            expect(mockTabsCreate).not.toHaveBeenCalled();
            expect(mockGetURL).not.toHaveBeenCalledWith("options.html");
        });
    });
});