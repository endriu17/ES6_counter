"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(props) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

    _this.reset = function () {
      _this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
    };

    _this.print = function () {
      _this.innerText = _this.format(_this.times);
    };

    _this.format = function (times) {
      return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
    };

    _this.start = function () {
      if (!_this.running) {
        _this.running = true;
        _this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    };

    _this.step = function () {
      if (!_this.running) return;
      _this.calculate();
      _this.print();
    };

    _this.calculate = function () {
      _this.times.miliseconds += 1;
      if (_this.times.miliseconds >= 100) {
        _this.times.seconds += 1;
        _this.times.miliseconds = 0;
      }
      if (_this.times.seconds >= 60) {
        _this.times.minutes += 1;
        _this.times.seconds = 0;
      }
    };

    _this.stop = function () {
      _this.running = false;
      clearInterval(_this.watch);
    };

    _this.stopclear = function () {
      _this.reset();
      _this.print();
    };

    _this.running = false;
    _this.props = props;
    _this.reset();
    _this.print(_this.times);
    return _this;
  }

  _createClass(Stopwatch, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "nav",
          { className: "controls" },
          React.createElement(
            "a",
            { className: "button", id: "start", onClick: this.start },
            "Start"
          ),
          React.createElement(
            "a",
            { className: "button", id: "stop", onClick: this.stop },
            "Stop"
          )
        ),
        React.createElement("div", { className: "stopwatch" }),
        React.createElement(
          "a",
          { className: "button", id: "reset", onClick: this.stopclear },
          "Reset"
        ),
        React.createElement("ul", { className: "results" })
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

var pad0 = function pad0(value) {
  var result = value.toString();
  return result.length < 2 ? result = "0" + result : result;
};

// const stopwatch = new Stopwatch(document.querySelector(".stopwatch"));

// let startButton = document.getElementById("start");
// startButton.addEventListener("click", () => stopwatch.start());

// let stopButton = document.getElementById("stop");
// stopButton.addEventListener("click", () => stopwatch.stop());

// let resetButton = document.getElementById("reset");
// resetButton.addEventListener("click", () => stopwatch.stopclear());

var result = document.querySelector(".result");
var resultButton = document.getElementById("result");

var stopwatch = React.createElement(Stopwatch);
ReactDOM.render(stopwatch, document.getElementById("app"));
