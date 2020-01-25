import React, {Component} from 'react';
import NewsListItem from "../news-list-item/NewsListItem";

export default class NewsList extends Component {
    constructor(props) {
        super(props);
        this.removeNewsById = this.removeNewsById.bind(this);
        this.updateNewsById = this.updateNewsById.bind(this);
    }

    render() {
        return (
            <div>
                {this.props.newsList.map(el => (
                    <NewsListItem key={el.id} newsItem={el} remove={this.removeNewsById} update={this.updateNewsById} />
                ))}
            </div>
        );
    }

    removeNewsById(id) {
        this.props.remove(id);
    }

    updateNewsById(id, news) {
        this.props.update(id, news);
    }
}