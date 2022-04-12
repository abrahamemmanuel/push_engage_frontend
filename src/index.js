import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom"
import store from "./store"
import { Provider } from "react-redux"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <Router>
    <Provider store={store}>
    <App />
    <ToastContainer />
    </Provider>
  </Router>,
  document.getElementById('root')
);
