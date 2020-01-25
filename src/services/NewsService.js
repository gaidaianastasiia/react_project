class NewsService {
    static newsList = [
        {
            id: "1",
            title: "news1",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            imgUrl: "https://i.imgur.com/gdWIxn2.jpg",
            type: "news"
        },
        {
            id: "2",
            title: "news2",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            imgUrl: "https://i.imgur.com/gdWIxn2.jpg",
            type: "news"
        },
        {
            id: "3",
            title: "news3",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            imgUrl: "https://i.imgur.com/gdWIxn2.jpg",
            type: "news"
        },
        {
            id: "4",
            title: "news4",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            imgUrl: "https://i.imgur.com/gdWIxn2.jpg",
            type: "news"
        },
        {
            id: "5",
            title: "news5",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            imgUrl: "https://i.imgur.com/gdWIxn2.jpg",
            type: "news"
        },
    ];

    constructor() {

    }

    static getAllNews() {
        return this.newsList;
    }

    static getNewsById(id) {
        return this.newsList[this.newsList.findIndex(el => el.id === id)];
    }

    static createNews(news) {
        const newId = Math.floor(Math.random() * (999999999 - 100000000) + 100000000);
        const newNews = {
            id: news.id,
            title: news.title,
            content: news.content,
            imgUrl: news.imgUrl,
            type: "news"
        };
        this.newsList.push(newNews);
        return newNews;
    }

    static removeNewsById(id) {
        const rmIndex = this.newsList.findIndex(el => el.id === id);
        const rmNews = this.newsList[rmIndex];
        this.newsList.splice(rmIndex, 1);
        return rmNews;
    }

    static updateNewsById(id, news) {
        const updIndex = this.newsList.findIndex(el => el.id === id);
        let updNews = {
            id: news.id,
            title: news.title,
            content: news.content,
            imgUrl: news.imgUrl,
            type: "news"
        };
        this.newsList[updIndex] = updNews;
        return updNews;
    }
}

export default NewsService;