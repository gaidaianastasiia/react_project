import React, {Component} from 'react';
import './NewsListItem.css';
import Button from "../../common/button/Button";
import {NewsContext} from "../News";

export default class NewsListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NewsContext.Consumer>
                {({isAdmin, toggleModal, removeNewsById}) => (
                    <div className="news-item">
                        {isAdmin && (
                            <div className="actions-bar">
                                <Button type="button" onClick={() => {removeNewsById(this.props.newsItem)}} children="REMOVE" />
                                <Button type="button" onClick={() => {toggleModal(this.props.newsItem)}} children="UPDATE" />
                            </div>
                        )}
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
                    </div>
                )}
            </NewsContext.Consumer>
        );
    }
}
