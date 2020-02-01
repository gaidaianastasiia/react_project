import FakeAPI from "../fake-api/fakeAPI";
import LocalTokenService from "./LocalTokenService";

class NewsService {
  constructor() {
    this.tokenService = new LocalTokenService();
    this.token = this.tokenService.getToken();
  }

  getAllNews() {
    return FakeAPI.getAllNews(this.token);
  }

  createNews(news) {
    return FakeAPI.createNews(this.token, news);
  }

  removeNewsById(id) {
    return FakeAPI.removeNewsById(this.token, id);
  }

  updateNewsById(news) {
    return FakeAPI.updateNewsById(this.token, news);
  }
}

export default NewsService;
