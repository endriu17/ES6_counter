class Stopwatch extends React.Component {
  constructor() {
    super();
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    };
  }

  reset = () => {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  };

  format = times => {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
      Math.floor(times.miliseconds)
    )}`;
  };

  start = () => {
    if (!this.state.running) {
      this.setState({
        running: true
      });
      this.watch = setInterval(() => this.step(), 10);
    }
  };

  step = () => {
    if (!this.state.running) return;
    this.calculate();
  };
  calculate = () => {
    const { times } = this.state;

    times.miliseconds += 1;

    if (times.miliseconds >= 100) {
      times.seconds += 1;
      times.miliseconds = 0;
    }
    if (times.seconds >= 60) {
      times.minutes += 1;
      times.seconds = 0;
    }

    this.setState({
      times
    });
  };

  stop = () => {
    this.setState({
      running: false
    });
    clearInterval(this.watch);
  };

  stopClear = () => {
    this.reset();
  };

  render() {
    return (
      <div>
        <div className={"stopwatch"}>{this.format(this.state.times)}</div>
        <nav className={"controls"}>
          <a className={"button"} id={"start"} onClick={this.start}>
            Start
          </a>
          <a className={"button"} id={"stop"} onClick={this.stop}>
            Stop
          </a>
          <a className={"button"} id={"reset"} onClick={this.stopClear}>
          Reset
        </a>
        </nav>
      </div>
    );
  }
}
const pad0 = value => {
  let result = value.toString();
  return result.length < 2 ? (result = "0" + result) : result;
};

let stopwatch = React.createElement(Stopwatch);
ReactDOM.render(stopwatch, document.getElementById("app"));
