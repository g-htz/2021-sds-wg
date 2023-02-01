import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './Sigin.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            emailStatus: 0,
            passwordStatus: 0,
        }
    }

    onInputChange = (key, event) => {
        const value = event.target.value;
        this.setState(prevState => {
            return {
                ...prevState,
                [key]: value
            }
        });
    }

    checkAllStatus = (fields = ["email", "password"]) => {
        let isValid = true;
        const { email, password } = this.state;

        if (fields.includes("email")) {
            if (email.trim() === '' || email.length > 25) {
                this.setState({ emailStatus: 1 });
                isValid = false;
            } else if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
                this.setState({ emailStatus: 2 });
                isValid = false;
            } else {
                this.setState({ emailStatus: 0 });
            }
        }

        if (fields.includes("password")) {
            if (password.trim() === '' || password.length > 15) {
                this.setState({ passwordStatus: 1 });
                isValid = false;
            } else {
                this.setState({ passwordStatus: 0 });
            }
        }

        return isValid;
    }

    signInSubmit = () => {
        if (this.checkAllStatus()) {
            const { email, password } = this.state;
            const signInBody = {
                email,
                password
            }
            fetch('http://localhost:8080/user/clientSignIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(signInBody)
            })
              .then(response => {
                  if (response.status === 404) {
                      this.props.history.replace('/sign-in');
                      return alert('invalid email or password!')
                  }
                  return response.json();
              }).then(res => {
                localStorage.setItem('user', JSON.stringify(res));
                if(res != null) {
                    this.props.history.replace('/home');
                } else {
                    this.props.history.replace('/sign-in');
                }
              });
        }
    }

    loginStaff = () => {
        this.props.history.replace('/login-staff');
    }

    registerClientAccount = () => {
        this.props.history.replace('/sign-up');
    }

    forgotMyPassword = () => {
        this.props.history.replace('/forgot-pass');
    }

    render() {
        const { email, password, emailStatus, passwordStatus } = this.state;
        return (
          <div className="auth-inner">
            <form name="siginform">
                <h3>Client Login</h3>

                <div className="form-group">
                    <label>Client Email</label>
                    <input type="text" size="30" className="form-control" placeholder="Enter email"
                           value={email}
                           onChange={event => this.onInputChange('email', event)} />
                    {
                        emailStatus === 1 ? <span className="help-block">The length is between 1 and 25</span> : null
                    }
                    {
                        emailStatus === 2 ? <span className="help-block">Email is not valid</span> : null
                    }
                </div>

                <div className="form-group">
                    <label>Client Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                           value={password}
                           onChange={event => this.onInputChange('password', event)} />
                    {
                        passwordStatus === 1 ? <span className="help-block">The length is between 1 and 15</span> : null
                    }
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="button" className="btn btn-primary btn-block" onClick={this.signInSubmit}>Submit</button>
                <button type="button" className="btn btn-primary btn-block" onClick={this.registerClientAccount}>Register my account</button>
                <div class="text-center">
                    <button type="button" className="btn" onClick={this.loginStaff}>I'm a UTS Staff member</button>
                    <button type="button" className="btn" onClick={this.forgotMyPassword}>I forgot my password</button>
                 </div>
                {/* <Link className="forgot-password text-right" to={"/forgot-pass"}>Forgot password?</Link> */}

            </form>
          </div>
        );
    }
}
