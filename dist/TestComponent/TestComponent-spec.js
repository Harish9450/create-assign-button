"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var React = require("react");
var _1 = require("./");
describe("TestComponent", function () {
    it("renders correctly", function () {
        var tree = enzyme_1.shallow(React.createElement(_1.TestComponent, null));
        expect(tree).toMatchSnapshot();
    });
    it("defaults props correctly", function () {
        expect(_1.TestComponent.defaultProps.locale).toBe("en");
    });
});
//# sourceMappingURL=TestComponent-spec.js.map