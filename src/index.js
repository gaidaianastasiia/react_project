import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";
import FakeAPI from "./fake-api/fakeAPI";

const app = (
  <Router>
    <App/>
  </Router>
);

window.fakeApi = FakeAPI;

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();


