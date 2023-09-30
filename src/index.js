import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// Mock chrome object for development environment
if (process.env.NODE_ENV === 'development') {
  global.chrome = {
    runtime: {
      onConnect: {
        addListener: () => {},
      },
      connect: () => {
        const listeners = [];

        return {
          onMessage: {
            addListener: (listener) => {
              listeners.push(listener);
            },
          },
          postMessage: (message) => {
            listeners.forEach((listener) => {
              listener(message);
            });
          },
        };
      },
    },
    tabs: {
      query: (queryInfo, callback) => {
        // Handle tab query logic for development environment
      },
      sendMessage: (tabId, message, callback) => {
        // Handle sending messages to tabs for development environment
      },
    },
    permissions: {
      request: (permissions, callback) => {
        // Handle permissions request logic for development environment
      },
    },
  };
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
