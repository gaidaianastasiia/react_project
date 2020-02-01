import React, { Component } from "react";
import "./Profile.css";
import ProfileModal from "./profile-modal/ProfileModal";
import Loader from "../common/loader/Loader";
import {
  INTERNAL_SERVER_ERROR,
  PROFILE_SERVER_ERR_MESSAGES
} from "../../constants/apiErrMessages";
import ProfileDetails from "./profile-details/ProfileDetails";
import ProfileService from "../../services/ProfileService";

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
    this._setModalState(true);
  };

  handleUpdateSubmit = (newData) => {
    this.setState({
      ...this.state,
      showLoader: true
    });

    this._updateUserData(newData);
  };

  closeModal = () => {
    this._setModalState(false);
  };

  handleChangePassSubmit = (prevPass, newPass) => {
    this.setState({
      ...this.state,
      showModal: false,
      showLoader: true
    });
    this._changePass(prevPass, newPass);
  };

  _updateUserData = newData => {
    this.profileService.updateUserData(newData)
    .then(() => {
      this._setLoaderState(false);
    })
    .catch(err => {
      this._setLoaderState(false);
      this._showServerErrMessage(err);
    });
  }

  _changePass = (prevPass, newPass) => {
    this.profileService
      .changePass(prevPass, newPass)
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

  _setModalState = state => {
    this.setState({
      ...this.state,
      showModal: state
    });
  };

  _showServerErrMessage = err => {
    switch (err) {
      case 500:
        this._setServerErrMessage(INTERNAL_SERVER_ERROR);
        break;
      case 630:
        this._setServerErrMessage(
          PROFILE_SERVER_ERR_MESSAGES.PREV_PASS_INVALID
        );
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
        <div className="profile__server-err-message">{serverErrMessage}</div>
        <ProfileDetails
        handleUpdateSubmit={this.handleUpdateSubmit}
          handleChangePassBtnClick={this.handleChangePassBtnClick}
        />
        {showModal && (
          <ProfileModal
            handleCloseBtnClick={this.closeModal}
            
            handleChangePassSubmit={this.handleChangePassSubmit}
          />
        )}
        {showLoader && <Loader />}
      </section>
    );
  }
}
