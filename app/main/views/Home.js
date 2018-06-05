import React, { Component } from 'react';
import moment from 'moment';

import { TextField, Button } from '../../Shared/Components';
import { TimerCard } from '../components';
import { SaveTimers, ReadTimers } from '../../Shared/Utils/IPCCalls';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreate: false,
      newTimerName: '',
      timers: []
    };
  }
  componentDidMount() {
    this.ReloadTimers();
  }
  ReloadTimers() {
    let newTimers = ReadTimers();
    // Load newTimers started at times into momentjs
    newTimers = newTimers.map((timer) => {
      return {
        title: timer.title,
        minutes: timer.minutes,
        comments: timer.comments,
        startedAt: timer.startedAt ? moment.utc(timer.startedAt) : null
      }
    });
    this.setState({timers: newTimers});
    console.log('Timers Loaded: ', newTimers.length);
  }
  saveState() {
    let data;
    data = this.state.timers.map((timer) => {
      return {
        title: timer.title,
        minutes: timer.minutes,
        comments: timer.comments,
        startedAt: timer.startedAt ? timer.startedAt.utc().format() : null
      };
    });
    SaveTimers(data);
    console.log('Timers Saved: ', data.length);
  }
  toggleCreate() {
    this.setState({showCreate: !this.state.showCreate});
  }
  submitNewTimer(event) {
    event.preventDefault();
    let name = this.state.newTimerName.trim();
    if(!name) { return; }
    let newTimer = {
      title: name,
      minutes: 0,
      startedAt: null,
      comments: ''
    };
    this.setState({
      timers: this.state.timers.concat([newTimer]),
      newTimerName: '',
      showCreate: false
    }, this.saveState.bind(this));
  }
  handleValueChanged(prop, event) {
    this.setState({[prop]: event.target.value});
  }
  handleTimerAction(timerName) {
    console.log("Action: ", timerName);
    let updated;
    let times = this.state.timers.filter((timer) => {
      if(timer.title == timerName) {
        // HANDLE
        if(timer.startedAt) {
          console.log("End Timer");
          let minutesToAdd = moment().diff(timer.startedAt, 'minutes');
          if(minutesToAdd < 1) { minutesToAdd = 1 }
          updated = { title: timer.title, startedAt: null, minutes: timer.minutes+minutesToAdd };
        } else {
          console.log("Start Timer");
          updated = {...timer, startedAt: moment()}
        }
        return false;
      }
      return true;
    });
    if(updated) {
      this.setState({
        timers: times.concat([updated])
      }, this.saveState.bind(this));
    }
  }
  renderNewTimer() {
    if(this.state.showCreate) {
      return (
        <div className="ui segment">
          <form onSubmit={this.submitNewTimer.bind(this)}>
            <h4>New Timer</h4>
            <TextField title="Name" value={this.state.newTimerName} onChange={this.handleValueChanged.bind(this, 'newTimerName')} />
            <Button type="submit" title="Create" />
          </form>
        </div>
      )
    } else {
      return null;
    }
  }
  render() {
    return (
      <div className="page-wrapper">
        <br/>
        <div className="ui clearing segment">
          <div className="ui right floated header" style={styles.noMargin}>
            <div className="cursor-hover" onClick={this.toggleCreate.bind(this)}>
              <i className="small square outline plus icon"></i>
            </div>
          </div>
          <div className="ui left floated header" style={styles.noMargin}>Timers</div>
        </div>
        {this.renderNewTimer()}
        <br/>
        <br/>
        <div className="ui cards">
          {this.state.timers.map((timer, idx) => {
            return <TimerCard
                      key={idx}
                      title={timer.title}
                      totalTime={timer.minutes}
                      startedAt={timer.startedAt}
                      onAction={this.handleTimerAction.bind(this)}
                      commentValue={timer.comments}
                      onCommentChange={this.handle} />
          })}
        </div>
      </div>
    );
  }
};
// @HERE HANDLE COMMENT CHANGES
const styles = {
  noMargin: {
    margin: 0
  }
};

export default Home;