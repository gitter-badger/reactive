import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { LOADING, SUCCESS, ERROR } from '../../consts/phaseEnums';
import { fetchChat } from '../../redux/modules/chatDuck';

import Messages from './Messages';


class ReduxChat extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: props.routeParams.name || '',
    };
  }

  componentDidMount() {
    const { routeParams } = this.props;

    if (routeParams.name) {
      this.props.fetchChat(routeParams.name);
    }
  }

  handleChange(ev) {
    this.setState({
      name: ev.target.value,
    });
  }

  handleSubmit() {
    const { name } = this.state;

    this.props.fetchChat(name);
    this.props.push(`/reduxchat/${name}`);
  }

  render() {
    const { chat } = this.props;

    return (
      <div id="Chat">
        <div className="row">
          <div className="col-lg-6">
            <h4>Welcome to your chat!</h4>
            <p>Available chats: <i>crush, doge, bob</i></p>
          </div>

          <div className="col-lg-6">
            <div className="input-group">
              <input
                type="text"
                onChange={this.handleChange}
                className="form-control"
                placeholder="Search for..."
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-default"
                  onClick={this.handleSubmit}
                >
                  Go!
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            {chat.phase === LOADING &&
              <h4>Loading...</h4>
            }

            {chat.phase === SUCCESS &&
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Chat</h3>
                </div>
                <div className="panel-body">
                  {chat.name === 'doge' &&
                    <img src="/assets/doge.jpg" alt="doge" />
                  }
                  <Messages messages={chat.messages} />
                </div>
              </div>
            }

            {chat.phase === ERROR &&
              <div className="alert alert-danger">
                <span>{chat.error}</span>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

ReduxChat.propTypes = {
  routeParams: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
  // connect
  chat: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
  push: PropTypes.func.isRequired,
  fetchChat: PropTypes.func.isRequired,
};

const actions = {
  push,
  fetchChat,
};

export default connect(state => ({
  chat: state.chat,
}), actions)(ReduxChat);
