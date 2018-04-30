"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TestTime = /** @class */ (function (_super) {
    __extends(TestTime, _super);
    function TestTime(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            time: new Date()
        };
        return _this;
    }
    TestTime.prototype.componentDidMount = function () {
        var _this = this;
        setInterval(function () {
            _this.setState({
                time: new Date()
            });
        }, 1000);
    };
    TestTime.prototype.render = function () {
        return React.createElement("div", null, this.state.time.toLocaleTimeString());
    };
    return TestTime;
}(React.Component));
exports.TestTime = TestTime;
var TestComponent = /** @class */ (function (_super) {
    __extends(TestComponent, _super);
    function TestComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestComponent.prototype.render = function () {
        var hello;
        switch (this.props.locale) {
            case "en":
                hello = "Hello";
                break;
            case "fr":
                hello = "Bonjour";
                break;
            case "en":
                hello = "Hola";
                break;
        }
        return (React.createElement("div", null, hello + "!",
            React.createElement(TestTime, null)));
    };
    TestComponent.defaultProps = {
        locale: "en"
    };
    return TestComponent;
}(React.Component));
exports.TestComponent = TestComponent;
//# sourceMappingURL=index.js.map