import React, { Component } from "react";
import NewsService from "../../services/NewsService";
import AuthService from "../../services/AuthService";
import { USER_ROLES } from "../../constants/userRoles";
import ServerErrMessage from "../common/server-err-message/ServerErrMessage";
import { INTERNAL_SERVER_ERROR } from "../../constants/apiErrMessages";
import NewsList from "./news-list/NewsList";
import Button from "../common/button/Button";
import Loader from "../common/loader/Loader";
import NewsModal from "./news-modal/NewsModal";

export const NewsContext = React.createContext();

export default class News extends Component {
  constructor() {
    super();
    this.authService = new AuthService();
    this.newsService = new NewsService();
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.currentUser.role === USER_ROLES.admin;
  }

  state = {
    news: [],
    updatingNews: null,
    showModal: false,
    showLoader: false,
    serverErrMessage: ""
  };

  componentDidMount() {
    this._setLoaderState(true);

    this.newsService
      .getAllNews()
      .then(news => {
        this._setLoaderState(false);
        this._setNewsState(news);
      })
      .catch(err => {
        this._setLoaderState(false);
        this._showServerErrMessage(err);
      });
  }

  handleCloseBtnClick = () => {
    this.setState({
      ...this.state,
      showModal: false
    });
  };

  handleAddBtnClick = () => {
    this.setState({
      ...this.state,
      serverErrMessage: "",
      showModal: true,
      updatingNews: null
    });
  };

  handleEditBtnClick = updatingNews => {
    this.setState({
      ...this.state,
      serverErrMessage: "",
      showModal: true,
      updatingNews
    });
  };

  handleDeleteBtnClick = id => {
    this.setState({
      ...this.state,
      serverErrMessage: "",
      showLoader: true
    });

    this._callEventsService(this.newsService.removeNewsById(id));
  };

  handleSubmit = news => {
    if (this.state.updatingNews) {
      this._handleEditSubmit(news);
    } else {
      this._handleAddSubmit(news);
    }
  };

  _handleAddSubmit = newNews => {
    this.setState({
      ...this.state,
      showModal: false,
      showLoader: true
    });

    this._callEventsService(this.newsService.createNews(newNews));
  };

  _handleEditSubmit = updetedNews => {
    this.setState({
      ...this.state,
      showModal: false,
      showLoader: true,
      updatingNews: null
    });

    updetedNews.id = this.state.updatingNews.id;

    this._callEventsService(this.newsService.updateNewsById(updetedNews));
  };

  _callEventsService = serviceMethod => {
    serviceMethod
      .then(() => {
        this._setLoaderState(false);
      })
      .catch(err => {
        this._setLoaderState(false);
        this._showServerErrMessage(err);
      });
  };

  _setNewsState = news => {
    this.setState({
      ...this.state,
      news
    });
  };

  _setLoaderState = state => {
    this.setState({
      ...this.state,
      showLoader: state
    });
  };

  _showServerErrMessage = err => {
    switch (err) {
      case 500:
        this._setServerErrMessage(INTERNAL_SERVER_ERROR);
        break;
      default:
    }
  };

  _setServerErrMessage = errMessage => {
    this.setState({
      ...this.state,
      serverErrMessage: errMessage
    });
  };

  render() {
    const { news, updatingNews, showLoader, showModal, serverErrMessage } = this.state;

    return (
      <section className="news">
        <h2>News</h2>

        <ServerErrMessage>{serverErrMessage}</ServerErrMessage>

        {this.isAdmin && <Button onClick={this.handleAddBtnClick}>Add News</Button>}

        <NewsContext.Provider value={{ isAdmin: this.isAdmin, handleEditBtnClick: this.handleEditBtnClick, handleDeleteBtnClick: this.handleDeleteBtnClick }}>
          <NewsList news={news} />
        </NewsContext.Provider>

        {showModal && <NewsModal updatingNews={updatingNews} handleCloseBtnClick={this.handleCloseBtnClick} handleSubmit={this.handleSubmit} />}
        {showLoader && <Loader />}
      </section>
    );
  }
}
