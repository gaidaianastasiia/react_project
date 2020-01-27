import FakeAPI from "../fake-api/fakeAPI";

class NewsService {

    constructor() {
    }

    static getAllNews() {
        return FakeAPI.getAllNews();
    }

    static getNewsById(id) {
        return FakeAPI.getNewsById(id);
    }

    static createNews(news) {
        return FakeAPI.createNews(news);
    }

    static removeNewsById(id) {
        return FakeAPI.removeNewsById(id);
    }

    static updateNewsById(id, news) {
        return FakeAPI.updateNewsById(id, news);
    }
}

export default NewsService;
