import * as jwt from "jsonwebtoken";
import {USER_ROLES} from "../constants/userRoles";
import {INTERNAL_SERVER_ERROR, authErrors, profileErrors} from "../constants/apiErrors";

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
      title: "News 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imgUrl: "https://cdn.pixabay.com/photo/2014/08/01/15/51/manhattan-407703_960_720.jpg",
      type: "news"
    },
    {
      id: "2",
      title: "News 2",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imgUrl: "https://cdn.pixabay.com/photo/2017/01/18/16/46/hong-kong-1990268_960_720.jpg",
      type: "news"
    },
    {
      id: "3",
      title: "News 3",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imgUrl: "https://cdn.pixabay.com/photo/2016/11/14/03/29/grand-palace-1822487_960_720.jpg",
      type: "news"
    }
  ];

  let events = [
    {
      name: "Event 1",
      date: "2020-01-26",
      description: "awesome event № 1",
      start_time: "12:00",
      end_time: "18:00",
      full_day: false,
      id: "1579988115659"
    },
    {
      name: "Event 2",
      date: "2020-01-26",
      description: "awesome event № 2",
      start_time: "",
      end_time: "",
      full_day: true,
      id: "1579988210048"
    },
    {
      name: "Event 3",
      date: "2020-01-27",
      description: "awesome event № 3",
      start_time: "11:00",
      end_time: "16:00",
      full_day: false,
      id: "1579988172714"
    },
    {
      name: "Event 4",
      description: "awesome event № 4",
      date: "2020-01-28",
      start_time: "",
      end_time: "",
      full_day: true,
      id: "1580680277702"
    },
    {
      name: "Event 5",
      description: "awesome event № 5",
      date: "2020-01-29",
      start_time: "15:00",
      end_time: "19:00",
      full_day: false,
      id: "1580680289466"
    },
    {
      name: "Event 6",
      description: "awesome event № 6",
      date: "2020-01-30",
      start_time: "",
      end_time: "",
      full_day: true,
      id: "1580680316848"
    }
  ];

  //---------------- Auth Public Methods ---------------
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

  //----------------News Public Methods ---------------
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

  //---------------- Events Public Methods ---------------
  const getEvents = token => {
    return _processApiCall((resolve, reject) => {
      const isTokenValid = _checkIsTokenValid(token);

      if (isTokenValid) {
        return resolve(events);
      }

      return reject(authErrors.INVALID_TOKEN);
    });
  };

  const addEvent = (token, newEvent) => {
    return _processApiCall((resolve, reject) => {
      const isTokenValid = _checkIsTokenValid(token);

      if (isTokenValid) {
        newEvent.id = Date.now();
        events.push(newEvent);
        return resolve();
      }

      return reject(authErrors.INVALID_TOKEN);
    });
  };

  const editEvent = (token, editedEvent) => {
    return _processApiCall((resolve, reject) => {
      const isTokenValid = _checkIsTokenValid(token);

      if (isTokenValid) {
        events.forEach((event, index) => {
          if (event.id === editedEvent.id) {
            events.splice(index, 1, editedEvent);
            return resolve();
          }
        });
      }

      return reject(authErrors.INVALID_TOKEN);
    });
  };

  const deleteEvent = (token, id) => {
    return _processApiCall((resolve, reject) => {
      const isTokenValid = _checkIsTokenValid(token);

      if (isTokenValid) {
        events.forEach((event, index) => {
          if (event.id === id) {
            events.splice(index, 1);
          }
        });
        return resolve();
      }

      return reject(authErrors.INVALID_TOKEN);
    });
  };

  //---------------- Profile Public Methods ---------------
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

  /********************* Private methods ***********************************/
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
    getEvents,
    addEvent,
    editEvent,
    deleteEvent,
    updateUserData,
    changePassword
  };
})();

export default FakeAPI;
