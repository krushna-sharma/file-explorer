import * as Utils from "../../utils/common";

describe("test the common utils", () => {
    it("should return a randomID", () => {
        jest.spyOn(Math, "random").mockImplementation(() => 0.1);
        expect(Utils.generateID()).toEqual("GGGGGGGG");
    });
});
