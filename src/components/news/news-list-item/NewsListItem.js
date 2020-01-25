import React, {Component} from 'react';
import './NewsListItem.css';
import Button from "../../common/button/Button";

export default class NewsListItem extends Component {
    constructor(props) {
        super(props);
        this.removeNewsById = this.removeNewsById.bind(this);
        this.updateNewsById = this.updateNewsById.bind(this);
    }

    render() {
        return (
            <div className="news-item">
                <div className="actions-bar">
                    <Button type="button" onClick={this.removeNewsById} children="REMOVE" />
                    <Button type="button" onClick={this.updateNewsById} children="UPDATE" />
                </div>
                <a href="#" className="news-wrapper">
                    <div className="text-wrapper">
                        <div className="title">
                            {this.props.newsItem.title}
                        </div>
                        <div className="content">
                            {this.props.newsItem.content}
                        </div>
                    </div>
                    <div className="img-wrapper">
                        <img src={this.props.newsItem.imgUrl} alt= {this.props.newsItem.title} />
                    </div>
                </a>
                {
                    console.log(this.props.newsItem)
                }
            </div>
        );
    }

    removeNewsById() {
        this.props.remove(this.props.newsItem.id);
    }

    updateNewsById() {
        this.props.update(this.props.newsItem.id, this.props.newsItem);
    }
}