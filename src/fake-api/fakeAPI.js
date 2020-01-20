const configureFakeAPI = () => {
    let realFetch = window.fetch;

    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            //логика бэкенда в соответствии с пришедшим url
        });
    };
};

export default configureFakeAPI;