import * as jwt from "jsonwebtoken";
import LocalTokenService from "./LocalTokenService";

export default class AuthService {
  constructor() {
    this.tokenService = new LocalTokenService();
  }

  getCurrentUser() {
    const token = this.tokenService.getToken();
    return jwt.decode(token);
  }

  isAuthenticated() {
    const token = this.tokenService.getToken();
    return window.fakeApi.isAuthenticated(token);
  }

  signup(newUser) {
    return window.fakeApi.authSignup(newUser).then(token => {
      this.tokenService.saveToken(token);
    });
  }

  signin(user) {
    return window.fakeApi.authSignin(user).then(token => {
      this.tokenService.saveToken(token);
    });
  }

  signout() {
    return new Promise(resolve => {
      this.tokenService.removeToken();
      return resolve();
    });
  }
}
