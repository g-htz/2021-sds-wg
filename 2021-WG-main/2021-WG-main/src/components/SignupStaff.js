import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

export default class SignUpStaff extends Component {
  state = {
    firstName: '',
    lastName: '',
    clientID: '',
    email: '',
    password: '',
    firstNameStatus: 0,
    lastNameStatus: 0,
    clientIDStatus: 0,
    emailStatus: 0,
    passwordStatus: 0,
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

  checkAllStatus = (fields = ["firstName", "lastName", "clientID", "email", "password"]) => {
    let isValid = true;
    const { firstName, lastName, clientID, email, password } = this.state;

    if (fields.includes("firstName")) {
      if (firstName.trim() === '' || firstName.length > 10) {
        this.setState({ firstNameStatus: 1 });
        isValid = false;
      } else {
        this.setState({ firstNameStatus: 0 });
      }
    }

    if (fields.includes("lastName")) {
      if (lastName.trim() === '' || lastName.length > 10) {
        this.setState({ lastNameStatus: 1 });
        isValid = false;
      } else {
        this.setState({ lastNameStatus: 0 });
      }
    }

    if (fields.includes("clientID")) {
      if (clientID.trim() === '' || clientID.length > 8 || isNaN(clientID)) {
        this.setState({ clientIDStatus: 1 });
        isValid = false;
      } else {
        this.setState({ clientIDStatus: 0 });
      }
    }

    if (fields.includes("email")) {
      if (email.trim() === '' || email.length > 25) {
        this.setState({ emailStatus: 1 });
        isValid = false;
      } else if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
        this.setState({ emailStatus: 2 });
        isValid = false;
      } else if (!/^\"?[\w-_\.]*\"?@staff\.uts.edu.au$/.test(email)) {
        this.setState({ emailStatus: 2 });
        window.alert("We're sorry! Your staff email must end in @staff.uts.edu.au");
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

  submit = () => {
    if (this.checkAllStatus()) {
      const { firstName, lastName, clientID, email, password } = this.state;
      const client = {
        first_name: firstName,
        last_name: lastName,
        custom_id: clientID,
        email,
        password
      }
      fetch('http://localhost:8080/user/uts_staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(client)
      })
        .then(response => {
          if (response.status === 201) {
            alert('sign up success!')
          } else {
            alert('sign up error!') 
          }
        });
    }
  }

    render() {
      const { firstName, lastName, clientID, email, password, firstNameStatus,
        lastNameStatus, clientIDStatus, emailStatus, passwordStatus } = this.state;
        return (
          <div className="auth-inner">
            <form>
                <h3>UTS Staff Signup</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name"
                           value={firstName}
                           onChange={(event) => this.onInputChange('firstName', event)}/>
                  {
                    firstNameStatus === 1 ? <span className="help-block">The length is between 1 and 10</span> : null
                  }
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name"
                           value={lastName}
                           onChange={(event) => this.onInputChange('lastName', event)}/>
                  {
                    lastNameStatus === 1 ? <span className="help-block">The length is between 1 and 10</span> : null
                  }
                </div>

                <div className="form-group">
                    <label>UTS Staff Member ID</label>
                    <input type="number" className="form-control" placeholder="Numbers only"
                           value={clientID}
                           onChange={(event) => this.onInputChange('clientID', event)}/>
                  {
                    clientIDStatus === 1 ? <span className="help-block">The length is between 1 and 8 and must be a number</span> : null
                  }
                </div>

                <div className="form-group">
                    <label>UTS Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                           value={email}
                           onChange={(event) => this.onInputChange('email', event)}/>
                  {
                    emailStatus === 1 ? <span className="help-block">The length is between 1 and 25</span> : null
                  }
                  {
                    emailStatus === 2 ? <span className="help-block">Email is not valid</span> : null
                  }
                </div>

                <div className="form-group">
                    <label>UTS Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                           value={password}
                           onChange={(event) => this.onInputChange('password', event)}/>
                  {
                    passwordStatus === 1 ? <span className="help-block">The length is between 1 and 15</span> : null
                  }
                </div>

                <button type="button" className="btn btn-primary btn-block" onClick={this.submit}>Sign Up</button>

                <Link to="/sign-in" className="forgot-password text-right">Already registered?</Link>

            </form>
          </div>
        );
    }
}
