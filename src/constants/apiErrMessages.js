//текст ошибки 500 если Math.randon fakeApi указал что запрос на сервер не прошел успешно
export const INTERNAL_SERVER_ERROR = 'Oops, Something went wrong. 500 Internal Server Error. Try again.';

export const AUTH_SERVER_ERR_MESSAGES = {
    USER_EXIST: 'That email address already exists.',
    WRONG_EMAIL_OR_PASSWORD: 'Wrong email or password.'
};

export const NEWS_SERVER_ERR_MESSAGES = {

};

export const EVENTS_SERVER_ERR_MESSAGES = {
    ID_INVALID: "Event with this id does not exist."
};

export const PROFILE_SERVER_ERR_MESSAGES = {
    PREV_PASS_INVALID: "Wrong previous password."
};
