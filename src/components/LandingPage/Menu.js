import React, { Component } from 'react';
import Login from './Login'
import SignUp from './SignUp'
class Menu extends Component {
    render() {
        return (
            <div id="menu" >
                <div id="login-or-sign-up">
                    <Login />
                    <p>or</p>
                    <SignUp />
                </div>
                <button>Play as Guest</button>
            </div>
        );
    }
}

export default Menu;
