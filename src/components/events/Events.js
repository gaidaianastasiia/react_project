import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import EventsService from "../../services/EventsService";
import { USER_ROLES } from "../../constants/userRoles";
import Button from "../common/button/Button";
import EventsList from "./events-list/EventsList";
import EventsModal from "./events-modal/EventsModal";
import "./Events.css";
import { INTERNAL_SERVER_ERROR } from "../../constants/apiErrMessages";
import Loader from "../common/loader/Loader";
import ServerErrMessage from "../common/server-err-message/ServerErrMessage";

export const EventsContext = React.createContext();

export default class Events extends Component {
  constructor() {
    super();
    this.authService = new AuthService();
    this.eventsService = new EventsService();
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.currentUser.role === USER_ROLES.admin;
  }

  state = {
    events: [],
    updetingEvent: null,
    showModal: false,
    showLoader: false,
    serverErrMessage: ""
  };

  componentDidMount() {
    this._setLoaderState(true);

    this.eventsService
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

  handleCloseBtnClick = () => {
    this.setState({
      ...this.state,
      showModal: false
    });
  };

  handleAddBtnClick = () => {
    this.setState({
      ...this.state,
      serverErrMessage: "",
      showModal: true,
      updetingEvent: null
    });
  };

  handleEditBtnClick = updetingEvent => {
    this.setState({
      ...this.state,
      serverErrMessage: "",
      showModal: true,
      updetingEvent
    });
  };

  handleDeleteBtnClick = id => {
    this.setState({
      ...this.state,
      serverErrMessage: "",
      showLoader: true
    });

    this._callEventsService(this.eventsService.deleteEvent(id));
  };

  handleSubmit = event => {
    if (this.state.updetingEvent) {
      this._handleEditSubmit(event);
    } else {
      this._handleAddSubmit(event);
    }
  };

  _handleAddSubmit = newEvent => {
    this.setState({
      ...this.state,
      showModal: false,
      showLoader: true
    });

    this._callEventsService(this.eventsService.addEvent(newEvent));
  };

  _handleEditSubmit = updetedEvent => {
    this.setState({
      ...this.state,
      showModal: false,
      showLoader: true,
      updetingEvent: null
    });

    this._callEventsService(this.eventsService.editEvent(updetedEvent));
  };

  _callEventsService = serviceMethod => {
    serviceMethod
      .then(() => {
        this._setLoaderState(false);
      })
      .catch(err => {
        this._setLoaderState(false);
        this._showServerErrMessage(err);
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
    const { events, updetingEvent, showLoader, showModal, serverErrMessage } = this.state;

    return (
      <section className="events">
        <h2 className="events__title">Events</h2>

        <ServerErrMessage>{serverErrMessage}</ServerErrMessage>

        {this.isAdmin && <Button onClick={this.handleAddBtnClick}>Add Event</Button>}

        <EventsContext.Provider value={{ isAdmin: this.isAdmin, handleEditBtnClick: this.handleEditBtnClick, handleDeleteBtnClick: this.handleDeleteBtnClick }}>
          <EventsList events={events} />
        </EventsContext.Provider>

        {showModal && <EventsModal event={updetingEvent} handleCloseBtnClick={this.handleCloseBtnClick} handleSubmit={this.handleSubmit} />}
        {showLoader && <Loader />}
      </section>
    );
  }
}
