import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { createStore, applyMiddleware, compose } from 'redux';

import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './models';

import App from './components/App';

import {composeWithDevTools} from 'redux-devtools-extension';

export const store = createStore(
  rootReducer, 
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  ));

const divStyle = {
  height: '1080px',
};

const container = document.getElementById('content');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App viewMode={'main'} />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
