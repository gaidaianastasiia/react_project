import React, {Component} from 'react';
import NewsService from "../../services/NewsService";
import NewsList from "./news-list/NewsList";

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: []
        };
        this.removeNewsById = this.removeNewsById.bind(this);
        this.updateNewsById = this.updateNewsById.bind(this);
    }

    componentDidMount() {
        this.setState({
            newsList: NewsService.getAllNews()
        });
    }

    render() {
        return (
            <div>
                <NewsList newsList={this.state.newsList} remove={this.removeNewsById} update={this.updateNewsById} />
            </div>
        );
    }

    removeNewsById(id) {
        console.log(this.state.newsList.find(el => el.id === id));
    }

    updateNewsById(id, news) {
        console.log(this.state.newsList.find(el => el.id === id));
    }
}