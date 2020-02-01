import React from "react";
import "./NewsListItem.css";
import Button from "../../common/button/Button";
import { NewsContext } from "../News";

const NewsListItem = ({ newsItem }) => (
  <NewsContext.Consumer>
    {({ isAdmin, handleEditBtnClick, handleDeleteBtnClick }) => (
      <div className="news-item">
        {isAdmin && (
          <div className="actions-bar">
            <Button size={"small"} onClick={() => handleEditBtnClick(newsItem)}>
              Edit
            </Button>
            <Button size={"small"} onClick={() => handleDeleteBtnClick(newsItem.id)}>
              Delete
            </Button>
          </div>
        )}

        <a href="#" className="news-wrapper">
          <div className="text-wrapper">
            <div className="title">{newsItem.title}</div>
            <div className="content">{newsItem.content}</div>
          </div>
          <div className="img-wrapper">
            <img src={newsItem.imgUrl} alt={newsItem.title} />
          </div>
        </a>
      </div>
    )}
  </NewsContext.Consumer>
);

export default NewsListItem;
