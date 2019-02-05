import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'


import './index.css';


// import LaserShot from './stores/LaserShot'
// import SpaceShip from './stores/SpaceShip'
// import GameManager from './stores/GameManager'
import ClientManager from './stores/ClientManager'

const stores = { ClientManager }
ReactDOM.render(<Provider {...stores}>
    <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
