import React, { Component } from 'react';
import moment from 'moment';

import { TextField, Button, TextArea } from '../../Shared/Components';
import { SaveTimers, ReadTimers, ReadLineItems, SaveLineItems } from '../../Shared/Utils/IPCCalls';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTimerName: '',
      timers: [],
      lineItems: {},
      activeTimer: null,
      timerToDelete: null
    };
  }
  componentDidMount() {
    this.ReloadTimers();
  }
  ReloadTimers() {
    let newTimers = ReadTimers();
    let alreadyActive = null;
    // Load newTimers started at times into momentjs
    newTimers = newTimers.map((timer) => {
      if(timer.startedAt) {
        alreadyActive = timer.title;
      }
      return {
        title: timer.title,
        comments: timer.comments,
        startedAt: timer.startedAt ? moment.utc(timer.startedAt) : null
      };
    });
    // Load Line Items into data object with dates as props
    let lineItems = ReadLineItems();
    let lineItemsObj = {};
    lineItems.forEach((item) => {
      let data = {
        minutes: item.minutes,
        comments: item.comments,
        date: moment(item.date, 'MM/DD/YYYY')
      };
      lineItemsObj[item.date] = data;
    });
    this.setState({
      timers: newTimers,
      lineItems: lineItemsObj,
      activeTimer: alreadyActive
    });
    console.log('Timers Loaded: ', newTimers.length);
  }
  saveState() {
    let dataTimers;
    dataTimers = this.state.timers.map((timer) => {
      return {
        title: timer.title,
        comments: timer.comments,
        startedAt: timer.startedAt ? timer.startedAt.utc().format() : null
      };
    });
    let dataLineItems = [];
    let items = this.state.lineItems;
    for(let prop in items) {
      let item = items[prop];
      dataLineItems.push({
        minutes: item.minutes,
        comments: item.comments,
        date: item.date.format('MM/DD/YYYY')
      });
    }
    SaveTimers(dataTimers);
    console.log('Timers Saved: ', dataTimers.length);
    SaveLineItems(dataLineItems);
    console.log('Line Items Saved: ', dataLineItems.length);
  }
  deleteTimer(timerName) {
    this.setState({timers: this.state.timers.filter((item) => {return item.title != timerName})}, this.saveState.bind(this));
  }
  
  ////////////////////////////////////
  showNewTimer() {
    $('.ui.modal#new-timer-modal').modal('show');
  }
  submitNewTimer(event) {
    event.preventDefault();
    let name = this.state.newTimerName.trim();
    if(!name) { return; }
    let newTimer = {
      title: name,
      startedAt: null,
      comments: ''
    };
    this.setState({timers: this.state.timers.concat([newTimer])}, this.saveState.bind(this));
    $('.ui.modal#new-timer-modal').modal('hide');

  }
  handleValueChanged(prop, event) {
    this.setState({[prop]: event.target.value});
  }
  handleTimerAction(timerName) {
    console.log("Action: ", timerName);
    // Get timer
    let timer = this.state.timers.filter((item) => {return item.title == timerName})[0];
    if(timer.startedAt) {
      console.log("Ending timer...");
    } else {
      console.log("Starting timer...");
      timer.startedAt = moment();
    }
    this.setState({timers: this.state.timers.map((item) => {
      if(item.title == timerName) {
        return timer;
      } else {
        return item;
      }
    })}, this.saveState.bind(this));
  }
  handleCommentChanged(timerTitle, event) {
    let updated;
    let timers = this.state.timers.filter((timer) => {
      if(timer.title == timerTitle) {
        updated = { ...timer, comments: event.target.value };
        return false;
      } else {
        return true;
      }
    });
    if (updated) {
      this.setState({
        timers: timers.concat([updated])
      }, this.saveState.bind(this));
    }
  }
  handleDeleteTimer(timerName) {
    this.setState({timerToDelete: timerName});
    $('.ui.modal#delete-timer-modal').modal({
      onApprove: this.deleteTimer.bind(this, timerName)
    }).modal('show');
  }
  handleSelectTimer(timerName) {
    this.setState({activeTimer: timerName});
  }
  renderConfirmDeleteTimer() {
    return (
      <div className="ui mini modal" id="delete-timer-modal">
        <div className="header">Delete Timer</div>
        <div className="content">
          <p>Are you sure you want to delete {this.state.timerToDelete}?</p>
        </div>
        <div className="actions">
          <div className="ui approve button">Delete</div>
          <div className="ui cancel button">Cancel</div>
        </div>
      </div>
    );
  }
  renderNewTimerModal() {
    return (
      <div className="ui modal" id="new-timer-modal">
        <div className="content">
          <form onSubmit={this.submitNewTimer.bind(this)}>
            <h4>New Timer</h4>
            <TextField title="Name" value={this.state.newTimerName} onChange={this.handleValueChanged.bind(this, 'newTimerName')} />
            <Button type="submit" title="Create" />
          </form>
        </div>
      </div>
    );
  }
  renderTimerList() {
    if(this.state.timers && this.state.timers.length > 0) {
      return (
        <div>
          {this.state.timers.map((item, idx) => {
            return (
              <div key={idx} style={styles.timerLineItem}>
                {item.title}
                <div className="ui grid">
                  <div className="column eight wide">
                    <Button title="Select" onClick={this.handleSelectTimer.bind(this, item.title)} />
                  </div>
                  <div className="column eight wide">
                    <Button title="Delete" onClick={this.handleDeleteTimer.bind(this, item.title)} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
            <p style={{textAlign: 'center', marginTop: 20}}><i className="outline plus square icon" onClick={this.showNewTimer.bind(this)}></i> You don't have any timers.</p>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        {this.renderNewTimerModal()}
        {this.renderConfirmDeleteTimer()}
        <div style={styles.header}>
          <div className="ui right floated header" style={styles.noMargin}>
            <div className="cursor-hover">
              <i className="cogs icon"></i>
            </div>
          </div>
          <div className="ui left floated header" style={styles.noMargin}>Timers</div>
          <div style={{clear: 'both'}}></div>
        </div>
        <div className="page-wrapper">
          <br/>
          <br/>
          {/* Render Active Timer */}
          {this.state.activeTimer ? this.renderActiveTimer() : this.renderTimerList()}
        </div>
      </div>
    );
  }
  minutesToTime (minutes) {
      let hours = minutes / 60 | 0;
      minutes = minutes % 60 | 0;
      return moment.utc().hours(hours).minutes(minutes).format("HH:mm");
  };
  renderActiveTimer() {
    let timerData = this.state.timers.filter((item) => {return item.title == this.state.activeTimer})[0];
    let commentValue = timerData.comments,
        actionTitle= timerData.startedAt ? "Stop" : "Start",
        title=timerData.title;
    return (
        <div className="ui fluid card">
          <div className="content">
              <div className="header">{title}</div>
              <div className="ui statistic">
                  <div className="value">{/*this.minutesToTime(totalTime)*/}</div>
              </div>
              <TextArea title="Comments" onChange={this.handleCommentChanged.bind(this, title)} value={commentValue}/>
              <br/>
              <div className="ui bottom attached button" onClick={this.handleTimerAction.bind(this, title)}>{actionTitle}</div>
          </div>
      </div>
    );
  }
};

const styles = {
  noMargin: {
    margin: 0
  },
  header: {
    borderBottom: 'thin solid grey',
    padding: 20
  },
  timerLineItem: {
    border: 'thin solid grey',
    padding: '10px 10px',
    margin: 8,
    borderRadius: 3
  }
};

export default Home;