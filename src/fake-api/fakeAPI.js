//импорт библиотеки для работы с токеном
import * as jwt from "jsonwebtoken";
//импорт объекта с ролями пользователей
import {USER_ROLES} from "../constants/userRoles";
//импорт констант, хранящих коды ошибок сервера
import {authErrors, INTERNAL_SERVER_ERROR, newsErrors} from "../constants/apiErrors";

const FakeAPI = (() => {
    const TOKEN_SECRET_KEY = "qwerty"; // секретный ключ для генерации токена (необходим для auth раздела)

    let users = [
        {
            email: "admin@email.com",
            password: "123456",
            role: USER_ROLES.admin
        },
        {
            email: "user@email.com",
            password: "123456",
            role: USER_ROLES.user
        }
    ];

    let news = [
        {
            id: "1",
            title: "news1",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            imgUrl: "https://i.imgur.com/gdWIxn2.jpg",
            type: "news"
        },
        {
            id: "2",
            title: "news2",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            imgUrl: "https://i.imgur.com/gdWIxn2.jpg",
            type: "news"
        },
        {
            id: "3",
            title: "news3",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            imgUrl: "https://i.imgur.com/gdWIxn2.jpg",
            type: "news"
        },
        {
            id: "4",
            title: "news4",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            imgUrl: "https://i.imgur.com/gdWIxn2.jpg",
            type: "news"
        },
        {
            id: "5",
            title: "news5",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            imgUrl: "https://i.imgur.com/gdWIxn2.jpg",
            type: "news"
        },
    ];

    // let events = [];

    /************************** Публичные методы **********************************/

        //----------------Публичные методы Auth раздела---------------
    const authSignup = newUser => {
            return _processApiCall((resolve, reject) => {
                newUser.role = USER_ROLES.user;
                let isUserExist = _getExistingUser(newUser.email);

                if (isUserExist) {
                    return reject(authErrors.USER_EXIST);
                }

                users.push(newUser);
                let userForToken = {...newUser};
                delete userForToken.password;
                const token = _generateToken(userForToken);

                return resolve(token);
            });
        };

    const authSignin = user => {
        return _processApiCall((resolve, reject) => {
            const existingUser = _getExistingUser(user.email);

            if (existingUser && existingUser.password === user.password) {
                let userForToken = {...existingUser};
                delete userForToken.password;
                const token = _generateToken(userForToken);
                return resolve(token);
            }

            return reject(authErrors.WRONG_EMAIL_OR_PASSWORD);
        });
    };

    const isAuthenticated = token => {
        return _processApiCall((resolve, reject) => {
            if (!token) {
                return reject(authErrors.INVALID_TOKEN);
            }

            let decodedObj = _decodeToken(token);
            let user = _getExistingUser(decodedObj.email);

            if (user) {
                return resolve(user);
            } else {
                return reject(authErrors.INVALID_TOKEN);
            }
        });
    };

    //Публичные методы News раздела

    const getAllNews = token => {
        return _processApiCall((resolve, reject) => {
            const isTokenValid = _checkIsTokenValid(token);

            if(isTokenValid) {
                return resolve(news);
            }
            return reject(authErrors.INVALID_TOKEN);
        });
    };

    const createNews = (token, newsItem) => {
        return _processApiCall((resolve, reject) => {
            const isTokenValid = _checkIsTokenValid(token);

            if (isTokenValid) {
                const newsId = Math.floor(Math.random() * (999999999 - 100000000) + 100000000);
                const newNews = {
                    id: newsId,
                    title: newsItem.title,
                    content: newsItem.content,
                    imgUrl: newsItem.imgUrl,
                    type: "news"
                };
                news.push(newNews);
                return resolve();
                // return reject(newsErrors.ADD_INVALID);
            }
            return reject(authErrors.INVALID_TOKEN);
        });
    };

    const removeNewsById = (token, newsItem) => {
        return _processApiCall((resolve, reject) => {
            const isTokenValid = _checkIsTokenValid(token);

            if (isTokenValid) {
                news.forEach((el, index) => {
                    if (el.id === newsItem.id) {
                        news.splice(index, 1);
                        return resolve();
                    }
                });
                return reject(newsErrors.ID_INVALID);
            }
            return reject(authErrors.INVALID_TOKEN);
        });
    };

    const updateNewsById = (token, newsItem) => {
        return _processApiCall((resolve, reject) => {
            const isTokenValid = _checkIsTokenValid(token);

            if (isTokenValid) {
                news.forEach((el, index) => {
                    if (el.id === newsItem.id) {
                        news.splice(index, 1, newsItem);
                        return resolve();
                    }
                });
                return reject(newsErrors.ID_INVALID);
            }
            return reject(authErrors.INVALID_TOKEN);
        });
    };

    //Публичные методы Events раздела

    //Публичные методы Profile раздела

    /********************* Приватные методы ***********************************/

    //---------Общие приватные методы---------------

    /* _processApiCall - это универсальный метод, который нужно использовать во всех публичных методах fakeApi
     * Он принимает в себя функцию, в которой вы описываете все необходимые для вас действия.
     * Данный метод оборачивает вашу функцию в Promise, создает искусственную задержку ответа сервера
     * и имитирует случайную ошибку сервера.
     * Пример ее использования можно увидеть в публичных методах: authSignup, authSignin, isAuthenticated*/
    const _processApiCall = call => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //создаем искусственную задержку ответа сервера
                if (_isRequestFailed()) {
                    //если запрос на сервер не выполнен (не успешный) ...
                    return reject(INTERNAL_SERVER_ERROR); //Возвращаем код ошибки 500 - ВНУТРЕННЯЯ ОШИБКА СЕРВЕРА
                }

                return call(resolve, reject); //если запрос на сервер выполнен (успешный), вызываем переданную вами функцию
            }, 1000);
        });
    };

    //иммитируем результат ответа сервера, если результат Math.random() > 0.8
    // значит запрос на сервер не выполнен (не успешный)
    //Этот метод вам не нужно вызывать, так как он вспомагательная часть метода _processApiCall
    const _isRequestFailed = () => {
        return Math.random() > 0.9;
    };

    //Этот метод неоиходим для проверки валидности токена, который вы передаете при вызове fakeApi из своих сервисов
    //Если он валидный, то продолжаете выполнять необходимые в вашем методе действия
    //Если не валидный, делаете возврат ошибки return reject(authErrors.INVALID_TOKEN) которую вы берете из файла...
    //...constants/apiErrors.js
    const _checkIsTokenValid = token => {
        return _decodeToken(token) !== undefined;
    };

    const _decodeToken = token => {
        try {
            return jwt.verify(token, TOKEN_SECRET_KEY);
        } catch (err) {
            console.error(err);
        }
    };

    //-------------Приватные методы Auth раздела-----------------
    const _generateToken = obj => {
        return jwt.sign(obj, TOKEN_SECRET_KEY);
    };

    const _getExistingUser = email => {
        let existingUser = null;

        users.forEach(user => {
            if (user.email === email) {
                existingUser = user;
            }
        });

        return existingUser;
    };

    //Приватные методы News раздела

    //Приватные методы Events раздела

    //Приватные методы Profile раздела

    return {
        //возвращаем все публичные методы
        isAuthenticated,
        authSignup,
        authSignin,
        getAllNews,
        createNews,
        removeNewsById,
        updateNewsById
    };
})();

export default FakeAPI;
