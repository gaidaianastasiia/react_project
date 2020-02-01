import * as jwt from "jsonwebtoken";
import { USER_ROLES } from "../constants/userRoles";
import { INTERNAL_SERVER_ERROR, authErrors, profileErrors } from "../constants/apiErrors";

const FakeAPI = (() => {
    const TOKEN_SECRET_KEY = "qwerty";

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
        }
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
                const token = _generateToken(newUser);
                return resolve(token);
            });
        };

    const authSignin = user => {
        return _processApiCall((resolve, reject) => {
            const existingUser = _getExistingUser(user.email);

            if (existingUser && existingUser.password === user.password) {
                const token = _generateToken(existingUser);
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

    //----------------Публичные методы News раздела---------------
    const getAllNews = token => {
        return _processApiCall((resolve, reject) => {
            const isTokenValid = _checkIsTokenValid(token);

            if (isTokenValid) {
                return resolve(news);
            }

            return reject(authErrors.INVALID_TOKEN);
        });
    };

    const createNews = (token, newsItem) => {
        return _processApiCall((resolve, reject) => {
            const isTokenValid = _checkIsTokenValid(token);

            if (isTokenValid) {
                newsItem.id = Date.now();
                news.push(newsItem);
                return resolve();
            }

            return reject(authErrors.INVALID_TOKEN);
        });
    };

    const removeNewsById = (token, id) => {
        return _processApiCall((resolve, reject) => {
            const isTokenValid = _checkIsTokenValid(token);

            if (isTokenValid) {
                news.forEach((el, index) => {
                    if (el.id === id) {
                        news.splice(index, 1);
                        return resolve();
                    }
                });
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
            }

            return reject(authErrors.INVALID_TOKEN);
        });
    };

    //----------------Публичные методы Events раздела---------------

    //----------------Публичные методы Profile раздела--------------

    const updateUserData = (token, updatedData) => {
        return _processApiCall((resolve, reject) => {
            const isTokenValid = _checkIsTokenValid(token);

            if (isTokenValid) {
                users.forEach((user, index) => {
                    if (user.email === updatedData.email) {
                        updatedData.password = user.password;
                        users.splice(index, 1, updatedData);
                        const token = _generateToken(updatedData);
                        return resolve(token);
                    }
                });
            }

            return reject(authErrors.INVALID_TOKEN);
        });
    };

    const changePassword = (token, prevPass, newPass) => {
        return _processApiCall((resolve, reject) => {
            const currentUser = _decodeToken(token);

            if (currentUser) {
                users.forEach((user, index) => {
                    if (currentUser.email === user.email && prevPass === user.password) {
                        user.password = newPass;
                        return resolve();
                    }
                });

                return reject(profileErrors.PREV_PASS_INVALID);
            }

            return reject(authErrors.INVALID_TOKEN);
        });
    };

    /********************* Приватные методы ***********************************/

        //---------Общие приватные методы---------------

    const _processApiCall = call => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (_isRequestFailed()) {
                        return reject(INTERNAL_SERVER_ERROR);
                    }

                    return call(resolve, reject);
                }, 1000);
            });
        };

    const _isRequestFailed = () => {
        return Math.random() > 0.9;
    };

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
    const _generateToken = userDataObj => {
        let objForToken = {...userDataObj};
        delete objForToken.password;
        return jwt.sign(objForToken, TOKEN_SECRET_KEY);
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

    return {
        isAuthenticated,
        authSignup,
        authSignin,
        getAllNews,
        createNews,
        updateNewsById,
        removeNewsById,
        updateUserData,
        changePassword
    };
})();

export default FakeAPI;
