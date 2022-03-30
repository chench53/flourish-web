// import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DAppProvider, Rinkeby, Config} from '@usedapp/core'

import 'bootstrap/dist/css/bootstrap.min.css';


const config: Config = {
  networks: [
    Rinkeby
  ]
}

ReactDOM.render(
  // <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
