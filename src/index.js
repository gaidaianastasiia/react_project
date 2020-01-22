import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";
import FakeAPI from "./fake-api/fakeAPI";

const app = (
    <Router>
        <App/>
    </Router>
);

//сохранение в глобальном контексте window FakeAPI, который везде будет достпен через вызов window.fakeApi.ваш_метод
window.fakeApi = FakeAPI;

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();


