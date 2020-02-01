import React from "react";
import NewsListItem from "../news-list-item/NewsListItem";

const NewsList = ({ news }) => (
  <div>
    {news.map(el => (
      <NewsListItem key={el.id} newsItem={el} />
    ))}
  </div>
);

export default NewsList;
