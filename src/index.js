import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'

import './index.css';

import ClientManager from './stores/ClientManager'
import Features from './stores/Features'

const stores = { ClientManager, Features }
ReactDOM.render(<Provider {...stores}>
    <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
