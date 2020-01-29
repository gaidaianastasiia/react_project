import LocalTokenService from "./LocalTokenService";

export default class ProfileService {
  constructor() {
    this.tokenService = new LocalTokenService();
    this.token = this.tokenService.getToken();
  }

  changePass = (prevPass, newPass) => {
    return window.fakeApi.changePassword(this.token, prevPass, newPass);
  };
}
