import React, { Component } from "react";
import LocalTokenService from "../../services/LocalTokenService";
import AuthService from "../../services/AuthService";
import EventsService from "../../services/EventsService";
import { USER_ROLES } from "../../constants/userRoles";
import Button from "../common/button/Button";
import EventsList from "./events-list/EventsList";
import EventsModal from "./events-modal/EventsModal";
// import "./Events.css";
import {
  INTERNAL_SERVER_ERROR,
  EVENTS_SERVER_ERR_MESSAGES
} from "../../constants/apiErrMessages";
import Loader from "../common/loader/Loader";

export const EventsContext = React.createContext();

export default class Events extends Component {
  constructor() {
    super();
    this.authService = new AuthService();
    this.tokenService = new LocalTokenService();
    this.eventService = new EventsService();
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.currentUser.role === USER_ROLES.admin;
  }

  state = {
    events: [],
    updetingEvent: null,
    showModal: false,
    showLoader: false,
    serverErrMessages: ""
  };
  componentDidMount() {
    this._setLoaderState(true);

    this.eventService
      .getEvents()
      .then(events => {
        this._setLoaderState(false);
        this._setEventsState(events);
      })
      .catch(err => {
        this._setLoaderState(false);
        this._showServerErrMessage(err);
      });
  }

  handleSaveBtnClick = event => {
    if (this.state.updetingEvent) {
      this._editEvent(event);
    }

    this._addEvent(event);
  };

  handleEditBtnClick = updetingEvent => {
    this.setState({
      ...this.state,
      showModal: true,
      updetingEvent
    });
  };

  handleDeleteBtnClick = id => {
    this.setState({
      ...this.state
    });

    this.eventService
      .deleteEvent(id)
      .then(() => {
        this._setFinishUpdateState();
      })
      .catch(err => {
        this._setFinishUpdateState();
        this._showServerErrMessage(err);
      });
  };

  openModal = () => {
    this.setState({
      ...this.state,
      showModal: true
    });
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      showModal: false
    });
  };

  _addEvent = newEvent => {
    this.setState({
      ...this.state,
      showModal: false,
      showLoader: true,
    });
    this.eventService
      .addEvent(newEvent)
      .then(() => {
        this._setFinishUpdateState();
      })
      .catch(err => {
        this._setFinishUpdateState();
        this._showServerErrMessage(err);
      });
  };

  _editEvent = updetedEvent => {
    this.setState({
      ...this.state,
      showModal: false,
      showLoader: true,
      updetingEvent: null
    });
    this.eventService
      .editEvent(updetedEvent)
      .then(() => {
        this._setFinishUpdateState();
      })
      .catch(err => {
        this._setFinishUpdateState();
        this._showServerErrMessage(err);
      });
  };

  _setFinishUpdateState = () => {
    this.setState({
      ...this.state,
      showLoader: false,
      updetingEvent: null
    });
  };

  _setEventsState = events => {
    this.setState({
      ...this.state,
      events
    });
  };

  _setLoaderState = state => {
    this.setState({
      ...this.state,
      showLoader: state
    });
  };

  _showServerErrMessage = err => {
    switch (err) {
      case 500:
        this._setServerErrMessage(INTERNAL_SERVER_ERROR);
        break;
      case 620:
        this._setServerErrMessage(EVENTS_SERVER_ERR_MESSAGES.ID_INVALID);
        break;
      default:
    }
  };

  _setServerErrMessage = errMessage => {
    this.setState({
      ...this.state,
      serverErrMessage: errMessage
    });
  };

  render() {
    const {
      events,
      updetingEvent,
      showLoader,
      showModal,
      serverErrMessage
    } = this.state;
    return (
      <section className="events">
        <h2 className="events__title">Events</h2>

        {this.isAdmin && (
          <Button onClick={() => this.openModal()}>Add Event</Button>
        )}

        <div className="events__server-err-message">{serverErrMessage}</div>

        <EventsContext.Provider
          value={{
            isAdmin: this.isAdmin,
            handleEditBtnClick: this.handleEditBtnClick,
            handleDeleteBtnClick: this.handleDeleteBtnClick
          }}
        >
          <EventsList events={events} />
        </EventsContext.Provider>

        {showModal && (
          <EventsModal
            event={updetingEvent}
            onCloseBtnClick={this.closeModal}
            onSaveBtnClick={this.handleSaveBtnClick}
          />
        )}
        {showLoader && <Loader />}
      </section>
    );
  }
}
