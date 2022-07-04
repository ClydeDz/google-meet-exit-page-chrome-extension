import * as redirectModule from "./redirect";
    
describe("redirect → redirect", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should not apply style if no jira status labels found", () => {
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

        redirectModule.redirect(mockObject, mockChrome);

        expect(mockOpenOptionsPage).toHaveBeenCalled();
    });

    it("shoffefwefuld not apply style if no jira status labels found", () => {
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

        redirectModule.redirect(mockObject, mockChrome);

        expect(mockTabsCreate).toHaveBeenCalledWith({ url: "test.com"});
        expect(mockGetURL).toHaveBeenCalledWith("options.html");
    });
});