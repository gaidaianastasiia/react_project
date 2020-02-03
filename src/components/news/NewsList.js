import React from "react";
import NewsListItem from "./NewsListItem";

const NewsList = ({ news }) => (
  <ul className="news__list">
    {news.map(el => <NewsListItem key={el.id} newsItem={el} />)}
  </ul>
);

export default NewsList;
