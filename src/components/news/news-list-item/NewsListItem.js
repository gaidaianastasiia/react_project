import React from "react";
import "./NewsListItem.scss";
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

        <div className="news-wrapper">
          <div className="text-wrapper">
            <h3 className="title title_item">{newsItem.title}</h3>
            <div className="content">{newsItem.content}</div>
          </div>
          <div className="img-wrapper">
            <img src={newsItem.imgUrl} alt={newsItem.title} />
          </div>
        </div>
      </div>
    )}
  </NewsContext.Consumer>
);

export default NewsListItem;
