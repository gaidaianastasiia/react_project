import LocalTokenService from "./LocalTokenService";

export default class ProfileService {
  constructor() {
    this.tokenService = new LocalTokenService();
    this.token = this.tokenService.getToken();
  }

  updateUserData = updatedData => {
    return window.fakeApi.updateUserData(this.token, updatedData).then(token => {
      this.tokenService.saveToken(token);
    });
  };

  changePass = (prevPass, newPass) => {
    return window.fakeApi.changePassword(this.token, prevPass, newPass);
  };
}