import React, { Component } from "react";
import "./Profile.css";
import ProfileService from "../../services/ProfileService";
import ProfileModal from "./profile-modal/ProfileModal";
import Loader from "../common/loader/Loader";
import { INTERNAL_SERVER_ERROR, PROFILE_SERVER_ERR_MESSAGES } from "../../constants/apiErrMessages";
import ProfileDetails from "./profile-details/ProfileDetails";
import ServerErrMessage from "../common/server-err-message/ServerErrMessage";

export default class Profile extends Component {
  constructor() {
    super();
    this.profileService = new ProfileService();
  }

  state = {
    showModal: false,
    showLoader: false,
    serverErrMessage: ""
  };

  handleChangePassBtnClick = () => {
    this.setState({
      ...this.state,
      serverErrMessage: "",
      showModal: true
    });
  };

  handleCloseBtnClick = () => {
    this.setState({
      ...this.state,
      showModal: false
    });
  };

  handleUpdateSubmit = updatedData => {
    this.setState({
      ...this.state,
      serverErrMessage: "",
      showLoader: true
    });

    this._callProfileService(this.profileService.updateUserData(updatedData));
  };

  handleChangePassSubmit = (prevPass, newPass) => {
    this.setState({
      ...this.state,
      serverErrMessage: "",
      showModal: false,
      showLoader: true
    });

    this._callProfileService(this.profileService.changePass(prevPass, newPass));
  };

  _callProfileService = serviceMethod => {
    serviceMethod
      .then(() => {
        this._setLoaderState(false);
      })
      .catch(err => {
        this._setLoaderState(false);
        this._showServerErrMessage(err);
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
      case 630:
        this._setServerErrMessage(PROFILE_SERVER_ERR_MESSAGES.PREV_PASS_INVALID);
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
    const { showModal, showLoader, serverErrMessage } = this.state;

    return (
      <section className="profile">
        <h2>Profile</h2>
        <ServerErrMessage>{serverErrMessage}</ServerErrMessage>
        <ProfileDetails handleUpdateSubmit={this.handleUpdateSubmit} handleChangePassBtnClick={this.handleChangePassBtnClick} />
        {showModal && <ProfileModal handleCloseBtnClick={this.handleCloseBtnClick} handleChangePassSubmit={this.handleChangePassSubmit} />}
        {showLoader && <Loader />}
      </section>
    );
  }
}
