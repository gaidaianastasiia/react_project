import LocalTokenService from "./LocalTokenService";

export default class ProfileService {
  constructor() {
    this.tokenService = new LocalTokenService();
    this.token = this.tokenService.getToken();
  }
  updateUserData = newData => {
    return window.fakeApi.updateUserData(this.token, newData);
  }

  changePass = (prevPass, newPass) => {
    return window.fakeApi.changePassword(this.token, prevPass, newPass);
  };
}
