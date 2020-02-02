import React from "react";
import Button from "../common/button/Button";
import {NewsContext} from "./News";

const NewsListItem = ({newsItem}) => (
    <NewsContext.Consumer>
        {({isAdmin, handleEditBtnClick, handleDeleteBtnClick}) => (
            <li className="news__item">
                <article>
                    {isAdmin && (
                        <div className="news__bar">
                            <Button theme={"control"} size={"auto"} onClick={() => handleEditBtnClick(newsItem)}>
                                <i className="icon-edit"></i>
                            </Button>
                            <Button theme={"control"} size={"auto"} onClick={() => handleDeleteBtnClick(newsItem.id)}>
                                <i className="icon-trash"></i>
                            </Button>
                        </div>
                    )}

                    <h3 className="title title_item">{newsItem.title}</h3>

                    <div className="news__img">
                        <img src={newsItem.imgUrl} alt={newsItem.title}/>
                    </div>

                    <div className="news__text">
                        <p>{newsItem.content}</p>
                    </div>
                </article>
            </li>
        )}
    </NewsContext.Consumer>
);

export default NewsListItem;
