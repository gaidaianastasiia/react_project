const TOKEN_KEY = "TOKEN_KEY";

export default class LocalTokenService {
  saveToken = token => {
    localStorage.setItem(TOKEN_KEY, token);
  };

  //метод вернет вам токен текущего пользователя,
  //который вы будете передавть как аргумент в методах своих сервисов
  getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  };
}
