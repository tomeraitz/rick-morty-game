import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import Enemy from './stores/Enemies'
import LaserShot from './stores/LaserShot'

const enemies = { Enemy, LaserShot }

ReactDOM.render(
    <Provider {...enemies}>
        <App />
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
