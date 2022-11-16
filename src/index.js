import React from 'react';
import { Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { Provider } from 'react-redux';
import store from './Store/index';


const routs = (
  < Router >
    <div>
   
      <App />
   
    </div>
  </  Router >
);

ReactDOM.render(
  <Provider store={store}>
    {routs}
  </Provider>,
  document.getElementById('root')
);

// If you want to s tart measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
