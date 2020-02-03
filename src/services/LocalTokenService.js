const TOKEN_KEY = "TOKEN_KEY";

export default class LocalTokenService {
  saveToken = token => {
    localStorage.setItem(TOKEN_KEY, token);
  };

  getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  };
}
