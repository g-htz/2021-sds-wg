import React, { Component } from "react";
// import bcrypt from "bcrypt";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

// const recaptchaRef = React.createRef();

// onSubmit = () => {
//     const recaptchaValue = recaptchaRef.current.getValue();
//     this.props.onSubmit(recaptchaValue);
// }
export default class SignUp extends Component {
  constructor(props) {
		super(props);

		let user = localStorage.getItem('user');
    // let user = this.props.match.params;
		if (user) {
			user = JSON.parse(user);
		}

		this.state = {
			user: user || {},
			projects: []
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

    componentDidMount() {
      fetch('http://localhost:8080/user/getMyClient')
        .then(response => {
          return response.json();
        })
        .then(res => {
          this.setState({
            projects: res
          });
        });
    }

    returnHome = () => {
      this.props.history.replace('/uts');
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
        fetch('http://localhost:8080/user/client', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(client)
        })
          .then(response => {
            alert(response.status)
            if (response.status === 201) {
              alert('sign up success!')
            } else {
              alert('sign up error!')
            }
          });
      }
    }


    render() {
      const { projects } = this.state;
      var urlComponents = window.location.href.split('http://localhost:3000/client-info/?myparam1=');
      // const { firstName, lastName, clientID, email, password, firstNameStatus,
      //   lastNameStatus, clientIDStatus, emailStatus, passwordStatus } = this.state;
        return (
          <div className="auth-inner">
            <h3>Client Details</h3>
            <div className="admin-inner">
              <div className="auth-inner">
                <div class="h4 text-center">Client No.{urlComponents}</div>
                <table className="table table-bordered table-hover">
                  <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Password</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    projects.clientValues && projects.clientValues.map(u => (
                      <tr key={u.custom_id}>
                          <td>{u.custom_id}</td>
                          <td>{urlComponents}</td>
                          <td >{ u.first_name }</td>
                          <td >{ u.last_name }</td>
                          <td>{ u.email }</td>
                          {/* <td>{ u.project_status }</td> */}
                          <td>*******</td>
                        </tr>
                    )) 
                  } 
                  </tbody>
                </table>
              </div>
					
				    </div>
                <div class="d-flex">
                  <button type='button' className="btn btn-primary btn-block mr-3" onClick={this.returnHome}>Return</button>
                  {/* <button type='button' className="btn btn-primary btn-block ml-3" onClick={this.submit}>Update Details</button> */}
                </div>

          </div>
        );
    }
}
