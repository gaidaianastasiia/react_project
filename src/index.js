import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";
import configureFakeAPI from "./fake-api/fakeAPI";


const app = (
    <Router>
        <App/>
    </Router>
);

// setup fake api
configureFakeAPI();

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
