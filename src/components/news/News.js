import React, {Component} from 'react';
import NewsService from "../../services/NewsService";
import NewsList from "./news-list/NewsList";
import AuthService from "../../services/AuthService";
import LocalTokenService from "../../services/LocalTokenService";
import {USER_ROLES} from "../../constants/userRoles";
import {EVENTS_SERVER_ERR_MESSAGES, INTERNAL_SERVER_ERROR} from "../../constants/apiErrMessages";
import Button from "../common/button/Button";
import Loader from "../common/loader/Loader";
import NewsModal from "./news-modal/NewsModal";

export const NewsContext = React.createContext();

export default class News extends Component {
    constructor() {
        super();
        this.authService = new AuthService();
        this.tokenService = new LocalTokenService();
        this.newsService = new NewsService();

        this.currentUser = this.authService.getCurrentUser();

        this.isAdmin = this.currentUser.role === USER_ROLES.admin;

        this.state = {
            news: [],
            showLoader: false,
            serverErrMessage: "",

            showEditModal: false,
            showAddModal: false,
            buffNews: null
        };
    }

    componentDidMount() {
        this._setLoaderState(true);

        this.newsService.getAllNews()
            .then(news => {
                this._setLoaderState(false);
                this._setNewsState(news);
            })
            .catch(err => {
                this._setLoaderState(false);
                this._showServerErrMessage(err);
            })
    }

    _setFinishUpdateState = () => {
        this.setState({
            ...this.state,
            showLoader: false,
            buffNews: null
        });
    };

    _setLoaderState = state => {
        this.setState({
            ...this.state,
            showLoader: state
        });
    };

    _setNewsState = news => {
        this.setState({
            ...this.state,
            news
        });
    };

    _showServerErrMessage = err => {
        switch (err) {
            case 500:
                this._setServerErrMessage(INTERNAL_SERVER_ERROR);
                break;
            case 620:
                this._setServerErrMessage(EVENTS_SERVER_ERR_MESSAGES.ID_INVALID);
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

    removeNewsById = news => {
        this.setState({
            ...this.state,
            showLoader: true,
        });

        this.newsService.removeNewsById(news)
            .then(() => {
                this._setFinishUpdateState();
            })
            .catch(err => {
                this._setFinishUpdateState();
                this._showServerErrMessage(err);
            });
    };

    toggleModal = news => {
        this.setState({
            ...this.state,
            showEditModal: true,
            buffNews: news
        });
    };

    handleEditSaveBtnClick = news => {
        if (this.state.buffNews) {
            this._editNews(news);
        }
    };

    //Почему - то не включается loader!!!
    _editNews = news => {
        this.setState({
            ...this.state,
            showEditModal: false,
            showLoader: true
        });

        this.newsService
            .updateNewsById(news)
            .then(() => {
                this._setFinishUpdateState();
            })
            .catch(err => {
                this._setFinishUpdateState();
                this._showServerErrMessage(err);
            });
    };

    closeModal = () => {
        this.setState({
            ...this.state,
            showAddModal: false,
            showEditModal: false
        });
    };

    toggleAddModal = () => {
        this.setState({
            ...this.state,
            showAddModal: true,
            buffNews: {
                id: "",
                title: "",
                content: "",
                imgUrl: "https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_1280.png",
                type: "news"
            }
        })
    };

    handleAddSaveBtnClick = news => {
        if (this.state.buffNews) {
            this._addNews(news);
        }
    };

    _addNews = news => {
        this.setState({
            ...this.state,
            showAddModal: false,
            showLoader: true
        });

        this.newsService.createNews(news)
            .then(() => {
                this._setFinishUpdateState();
            })
            .catch(err => {
                this._setFinishUpdateState();
                this._showServerErrMessage(err);
            });
    };

    render() {
        return (
            <div>
                {this.isAdmin && <Button children={"ADD NEWS"} onClick={this.toggleAddModal} />}
                {this.state.showAddModal && <NewsModal buffNews={this.state.buffNews} onCloseBtnClick={this.closeModal} onSubmitBtnClick={this.handleAddSaveBtnClick} />}
                <div className="events__server-err-message">{this.state.serverErrMessage}</div>

                <NewsContext.Provider value={{isAdmin: this.isAdmin, toggleModal: this.toggleModal, removeNewsById: this.removeNewsById}} >
                    <NewsList news={this.state.news} />
                </NewsContext.Provider>

                {this.state.showEditModal && <NewsModal buffNews={this.state.buffNews} onCloseBtnClick={this.closeModal} onSubmitBtnClick={this.handleEditSaveBtnClick} />}
                {this.state.showLoader && <Loader/>}
            </div>
        );
    }
}
