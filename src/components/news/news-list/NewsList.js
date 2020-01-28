import React, {Component} from 'react';
import NewsListItem from "../news-list-item/NewsListItem";

export default class NewsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.news.map(el => (
                    <NewsListItem key={el.id} newsItem={el} />
                ))}
            </div>
        );
    }
}
