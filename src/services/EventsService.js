import LocalTokenService from "./LocalTokenService";

export default class EventsService {
  constructor() {
    this.tokenService = new LocalTokenService();
    this.token = this.tokenService.getToken();
  }

  getEvents = () => {
    return window.fakeApi.getEvents(this.token);
  };

  addEvent = newEvent => {
    return window.fakeApi.addEvent(this.token, newEvent);
  };

  editEvent = editedEvent => {
    return window.fakeApi.editEvent(this.token, editedEvent);
  };

  deleteEvent = id => {
    return window.fakeApi.deleteEvent(this.token, id);
  };
}
