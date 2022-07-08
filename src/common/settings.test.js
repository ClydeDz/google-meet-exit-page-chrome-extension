import * as settingsModule from "./settings";

describe("settings", () => {
  beforeEach(() => {
      jest.resetAllMocks();
  }); 

  test("chrome storage key is set to the right value", () => {      
    expect(settingsModule.CHROME_SYNC_STORAGE_KEY).toBe("google-meet-exit-page");
  });

  test("content script interval is set to the right value", () => {      
    expect(settingsModule.CONTENT_SCRIPT_INTERVAL).toBe(2000);
  });

  test("redirect interval is set to the right value", () => {
    expect(settingsModule.REDIRECT_INTERVAL).toBe(1000);
  });

  test("has two preset configuration keys", () => {      
    const presetConfig = settingsModule.PRESET_CONFIGURATION;
    const keys = Object.keys(presetConfig);
    expect(keys.length).toBe(2);
  });
});
