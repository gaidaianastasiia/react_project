const FakeAPI = (() => {
    //пример одной из публичных функций которая будет доступна вызовом window.fakeApi.authSignin() или название вашего метода
    const authSignin = () => {};

    return {
        authSignin
    };
})();

export default FakeAPI;