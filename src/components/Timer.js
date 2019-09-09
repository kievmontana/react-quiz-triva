import React, {Component} from 'react';
import {timeFormat} from "../helpers/Helpers";


class Timer extends Component {
    state = {
        time: 0
    };

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                time: this.state.time + 1
            });

        }, 1000);
    }

    componentWillUnmount() {
        this.props.clearTimer(this.state.time);
        clearInterval(this.timer);
    }

    render() {
        return <p className="timer">Hey! The time is running {timeFormat(this.state.time)}</p>
    }
}

export default Timer;
