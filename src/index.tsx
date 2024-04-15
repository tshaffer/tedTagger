import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './models';

import App from './components/App';

import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  ));

const stringIncludesAny = (str: string, arr: string[]): boolean => {
  return arr.some(item => str.includes(item));
};

const errorTypesToDisable = [
  'Warning: Unknown event handler property',
  'Warning: React does not recognize the',
];

const errorVariableNamesInErrorMessagesToDisable = [
  'keywordsAsTree',
  'keywordNodesByNodeId',
  'onUpdateKeywordAssignedToSelectedMediaItems',
  'selectedMediaItemIds',
  'mapKeywordNodeIdToSelectedMediaItemIds',
];

// Save original console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

// Override console methods
console.error = (...args) => {

  // Check if the error message is from React
  if (args.some(arg => arg
    && typeof arg === 'string'
    // && arg.startsWith('Warning: React does not recognize the'))
    && stringIncludesAny(arg, errorTypesToDisable))
  ) {
    if (args.some(arg => arg
      && typeof arg === 'string'
      && stringIncludesAny(arg, errorVariableNamesInErrorMessagesToDisable))
    )
      // Suppress specific React warnings
      return;
  }
  // For other errors, log them normally
  originalConsoleError.apply(console, args);
};

console.warn = (...args) => {
  // Check if the warning message is from React
  // if (args.some(arg => arg && typeof arg === 'string' && arg.includes('Warning:'))) {
  //   // Suppress React warnings
  //   return;
  // }
  // For other warnings, log them normally
  originalConsoleWarn.apply(console, args);
};

const container = document.getElementById('content');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
