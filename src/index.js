import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//setup antd
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
//setup redux
import {Provider} from 'react-redux'
import { store } from './redux/configStore';
//setupscss
import './assets/scss/_styles.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
