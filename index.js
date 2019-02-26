const PropTypes = require('prop-types');
const {Component} = require('react');

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: props.endsAt - Date.now()
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.tick();
  }

  componentDidUpdate(prevProps) {
    if (this.props.endsAt !== prevProps.endsAt) {
      this.tick();
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrame);
  }

  tick() {
    const timeRemaining = Math.max(0, this.props.endsAt - Date.now());
    this.setState({timeRemaining});
    if (!timeRemaining) {
      if (this.props.onCompleted) {
        this.props.onCompleted();
      }
      return;
    }

    this.animationFrame = requestAnimationFrame(this.tick);
  }

  render() {
    const secondsRemaining = Math.floor(this.state.timeRemaining / 1000);
    return this.props.children({
      secondsRemaining,
      msRemaining: this.state.timeRemaining - secondsRemaining * 1000
    });
  }
}

Countdown.propTypes = {
  children: PropTypes.func.isRequired,
  endsAt: PropTypes.number.isRequired,
  onCompleted: PropTypes.func
};

module.exports = Countdown;
