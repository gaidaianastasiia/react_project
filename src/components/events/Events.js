import React, { Component } from "react";
import LocalTokenService from "../../services/LocalTokenService";
import AuthService from "../../services/AuthService";
import EventsService from "../../services/EventsService";
import { USER_ROLES } from "../../constants/userRoles";
import Button from "../common/button/Button";
import EventsList from "./events-list/EventsList";
import EventsModal from "./events-modal/EventsModal";
import "./Events.css";
import { INTERNAL_SERVER_ERROR } from "../../constants/apiErrMessages";
import Loader from "../common/loader/Loader";

export const EventsContext = React.createContext();

export default class Events extends Component {
  constructor() {
    super();
    this.authService = new AuthService();
    this.tokenService = new LocalTokenService();
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

  handleSaveBtnClick = event => {
    if (this.state.updetingEvent) {
      this._editEvent(event);
    }

    this._addEvent(event);
  };

  handleAddBtnClick = () => {
    this.setState({
      ...this.state,
      updetingEvent: null,
      showModal: true
    });
  };

  handleEditBtnClick = updetingEvent => {
    this.setState({
      ...this.state,
      showModal: true,
      updetingEvent
    });
  };

  handleDeleteBtnClick = id => {
    this._setLoaderState(true);

    this.eventsService
      .deleteEvent(id)
      .then(() => {
        this._setLoaderState(false);
      })
      .catch(err => {
        this._setLoaderState(false);
        this._showServerErrMessage(err);
      });
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      name: "",
      date: "",
      start_time: "",
      end_time: "",
      full_day: false,
      disabled: false,
      showModal: false
    });
  };

  _addEvent = newEvent => {
    this.setState({
      ...this.state,
      showModal: false,
      showLoader: true
    });

    this.eventsService
      .addEvent(newEvent)
      .then(() => {
        this._setLoaderState(false);
      })
      .catch(err => {
        this._setLoaderState(false);
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

    this.eventsService
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

        {this.isAdmin && <Button onClick={this.handleAddBtnClick}>Add Event</Button>}

        <div className="events__server-err-message">{serverErrMessage}</div>

        <EventsContext.Provider value={{ isAdmin: this.isAdmin, handleEditBtnClick: this.handleEditBtnClick, handleDeleteBtnClick: this.handleDeleteBtnClick }}>
          <EventsList events={events} />
        </EventsContext.Provider>

        {showModal && <EventsModal event={updetingEvent} onCloseBtnClick={this.closeModal} onSaveBtnClick={this.handleSaveBtnClick} />}
        {showLoader && <Loader />}
      </section>
    );
  }
}
