import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Router, Switch, Route, Link } from 'react-router-dom'
import history from './history'
import Home from './component/Home'
import SignUp from './component/SignUp'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'


import logo from './logo.svg'
import Login from './component/Login'
import './App.css';
import reducer from './reducers'
import './axios'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/home" component={Home} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
