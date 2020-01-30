import React, { Component } from "react";
import "./Profile.css";
import ProfileService from "../../services/ProfileService";
import ProfileModal from "./profile-modal/ProfileModal";
import Loader from "../common/loader/Loader";
import {
  INTERNAL_SERVER_ERROR,
  PROFILE_SERVER_ERR_MESSAGES
} from "../../constants/apiErrMessages";
import ProfileDetails from "./profile-details/ProfileDetails";
import AuthService from "../../services/AuthService";

export default class Profile extends Component {
  constructor() {
    super();
    this.profileService = new ProfileService();
    this.authService = new AuthService();
    this.currentUser = this.authService.getCurrentUser();
    this.firstName = this.profileService.first_name;
  }

  state = {
    showModal: false,
    showLoader: false,
    serverErrMessage: ""
  };

  handleChangeNameCurrentUSer = () => {
    console.log(this.currentUser.role, this.firstName);
  };

  handleChangePassBtnClick = () => {
    this._setModalState(true);
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

  // _setUserState = () => {
  //   this.setState({
  //     ...this.state,
  //     firstName: 'Ivan',
  //     lastName: 'Ivanov',
  //   })
  // }

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
          handleChangePassBtnClick={this.handleChangePassBtnClick}
          handleChangeNameCurrentUSer={this.handleChangeNameCurrentUSer}
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
