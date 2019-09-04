import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Router, Route } from 'react-router-dom'
import history from './history'
import Home from './component/Home'
import SignUp from './component/SignUp'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import Login from './component/Login'
import './App.css';
import reducer from './reducers'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} />
      </Router>
    </Provider>
  );
}

export default App;
