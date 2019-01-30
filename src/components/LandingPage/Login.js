import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div id="login">
                <div id="login-input" >
                    <input placeholder="Username" />
                    <input placeholder="Password" />
                </div>
                <button>Login</button>
            </div>
        );
    }
}

export default Login;
