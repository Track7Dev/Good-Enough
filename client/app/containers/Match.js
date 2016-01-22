import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MatchActions from '../actions/match'
import PrivateNav from '../components/PrivateNav'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) { return response.json() }

function getMatchInfo(props) {
  var requestData = JSON.parse(window.localStorage.getItem('GoodEnough'))
  requestData.match_id = props.state.routing.location.pathname.substring(1)
  console.log('requestData: ', requestData)
  fetch('http://localhost:4000/app/matches/match', {
          method: 'POST',
          headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
      props.actions.saveMatchData(data)
      getAllMessages(props)
    }).catch(function(error) {
      console.log('Request failed', error);
    });
}

function sendMessage(props) {
  var obj = JSON.parse(window.localStorage.getItem('GoodEnough'))
  var messageData = {}
  messageData.from = obj.id;
  messageData.to = props.state.routing.location.pathname.substring(1);
  messageData.message = props.state.match.message;
  console.log('messageData: ', messageData)
  fetch('http://localhost:4000/app/messages/send', {
          method: 'POST',
          headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(messageData)
        })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
      props.actions.sendMessage(data)
    }).catch(function(error) {
      console.log('Request failed', error);
    });
}

function getAllMessages(props) {
  var requestData = JSON.parse(window.localStorage.getItem('GoodEnough'))
  requestData.match_id = props.state.routing.location.pathname.substring(1)
  console.log('requestData: ', requestData)
  fetch('http://localhost:4000/app/messages/get', {
          method: 'POST',
          headers: { 'mode': 'no-cors', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
      props.actions.sendMessage(data)
    }).catch(function(error) {
      console.log('Request failed', error);
    });
}


class MatchPicture extends Component {
  render() {
    return (
      <div className="match-info-picture">
        <span>Match Picture Goes Here</span>
      </div>
    );
  }
}

class MatchUserData extends Component {
  render() {
    return (
      <div className="match-info-userdata">
        <span>Match MatchUserData Goes Here</span>
      </div>
    );
  }
}


class MatchInfo extends Component {
  render() {
    return (
      <div className="match-info-container">
        <MatchPicture state={this.props.state} actions={this.props.actions} />
        <MatchUserData state={this.props.state} actions={this.props.actions} />
      </div>
    );
  }
}

class MatchMessageImage extends Component {
  render() {
    return (
      <div className="match-conversation-image">
        <img src='http://cdn.truthinmedia.com/wp-content/uploads/2014/11/Obama-Hand-to-Ear.jpg'/>
      </div>
    );
  }
}

class MatchMessage extends Component {
  render() {
    var username
    if (this.props.data.user === this.props.state.routing.location.pathname.substring(1)) {
      username = this.props.state.match.data.firstName + ' ' + this.props.state.match.data.lastName
    } else {
      username = this.props.state.profile.data.firstName + ' ' + this.props.state.profile.data.lastName
    }
    console.log('hank: ', this.props.state)
    return (
      <div className="match-conversation-message">
        <MatchMessageImage state={this.props.state} actions={this.props.actions} />
        <span className="match-conversation-username">{ username }</span>
        <p>{this.props.data.message}</p>
      </div>
    );
  }
}

class MatchMessageInput extends Component {

  handleKeyUp() {
    this.props.actions.saveInput(this.refs.message.value)
  }

  sendMessage() {
    sendMessage(this.props)
    this.refs.message.value = '';
  }

  render() {
    return (
      <div className="match-conversation-input">
        <input placeholder="Match Message Input goes here" ref="message" onKeyUp={() => this.handleKeyUp()}></input>
        <button onClick={() => this.sendMessage()}>Send Message</button>
      </div>
    );
  }
}


class MatchConversation extends Component {
  render() {
    console.log(this.props.state.match.conversation)
    return (
      <div className="match-conversation-container">
        {this.props.state.match.conversation.map(message =>
          <MatchMessage key={message.date} data={message} state={this.props.state} actions={this.props.actions} />
        )}
        <MatchMessageInput state={this.props.state} actions={this.props.actions} />
      </div>
    );
  }
}

class Match extends Component {

  componentWillMount() {
    getMatchInfo(this.props)
  }

  render() {
    console.log(this.props.state.routing.location.pathname.substring(1))
    return (
      <div>
        <PrivateNav state={this.props.state} actions={this.props.actions} />
        <MatchInfo state={this.props.state} actions={this.props.actions} />
        <MatchConversation state={this.props.state} actions={this.props.actions} />
      </div>
    );
  }
};

Match.PropTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    state: state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MatchActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Match)
