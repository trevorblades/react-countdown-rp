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
    cancelAnimationFrame(this.request);
  }

  tick() {
    const timeRemaining = Math.max(0, this.props.endsAt - Date.now());
    this.setState({timeRemaining});
    if (timeRemaining) {
      this.request = requestAnimationFrame(this.tick);
    }
  }

  render() {
    const secondsRemaining = Math.ceil(this.state.timeRemaining / 1000);
    return this.props.children({
      secondsRemaining,
      msRemaining: secondsRemaining * 1000 - this.state.timeRemaining
    });
  }
}

Countdown.propTypes = {
  children: PropTypes.func.isRequired,
  endsAt: PropTypes.number.isRequired
};

module.exports = Countdown;