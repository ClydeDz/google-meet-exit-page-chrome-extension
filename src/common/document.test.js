import * as documentModule from "./document";
import * as documentMockModule from "./mocks/documentMock";

describe("document → getElementById", () => {
    beforeEach(() => {
        documentModule.initializeDocument(documentMockModule.document);
        jest.resetAllMocks();
    }); 

    test("calls getElementById method called with supplied element selector", () => {
        documentModule.getElementById("#test");
        expect(documentMockModule.getElementById).toHaveBeenCalledWith("#test");
    });
});

describe("document → querySelectorAll", () => {
    beforeEach(() => {
        documentModule.initializeDocument(documentMockModule.document);
        jest.resetAllMocks();
    }); 

    test("calls querySelectorAll method called with supplied element selector", () => {
        documentModule.querySelectorAll("#test");
        expect(documentMockModule.querySelectorAll).toHaveBeenCalledWith("#test");
    });
});
