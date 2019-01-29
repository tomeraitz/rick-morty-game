import React, { Component } from 'react';

class SignUp extends Component {
    render() {
        return (
            <div id="sign-up">
                <div id="sign-up-input" >
                    <input placeholder="Username" />
                    <input placeholder="Password" />
                </div>

                <button>Sign up</button>
            </div>
        );
    }
}

export default SignUp;
