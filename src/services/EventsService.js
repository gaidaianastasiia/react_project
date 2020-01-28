import LocalTokenService from "./LocalTokenService";

export default class EventsService {
  constructor() {
    this.tokenService = new LocalTokenService();
    this.token = this.tokenService.getToken();
  }

  getEvents = () => {
    return window.fakeApi.getEvents(this.token);
  };

  editEvent = editedEvent => {
    return window.fakeApi.editEvent(this.token, editedEvent);
  };

  addEvent = newEvent => {
    return window.fakeApi.addEvent(this.token, newEvent);
  }

  deleteEvent = id => {
    return window.fakeApi.deleteEvent(this.token, id);
  }
}
