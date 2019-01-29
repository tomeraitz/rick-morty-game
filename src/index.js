import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import LaserShot from './stores/LaserShot'

const laserStore = { LaserShot }

ReactDOM.render(
    <Provider {...laserStore}>
        <App />
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
