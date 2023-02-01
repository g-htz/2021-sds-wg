import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Signin";
import RequestProject from "./components/RequestProject";
import SignUp from "./components/Signup";
import SignupStaff from "./components/SignupStaff";
import utslogo from './sds-logo-april-2021.png';
import LoginStaff from "./components/loginStaff";
import ForgetPass from './components/ForgetPass';
import Home from './components/Home';
import AdminSignIn from './components/AdminSignin';
import AdminHome from './components/AdminHome';
import StaffHome from './components/StaffHome';
import ClientDetails from './components/ClientDetails';

// "build": "react-scripts build"
function App() {
  // if (window.location.href.indexOf("/admin") > -1 || window.location.href.indexOf("/admin-home") > -1 ) {
  // }
  return (<Router>
    <div className="App">
      <nav className=" col-12 navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div class=""> 
              {(() => {
                // if (window.location.href.indexOf("/admin") > -1 || window.location.href.indexOf("/admin-home") > -1) {
                if (window.location.href.indexOf("admin") > -1) {
                  return (
                    <a href="/admin-home" class="">
                      <div className="">
                        <img src={utslogo} alt="UTSLogo" width="200" height="100" />
                      </div>
                    </a>
                  )
                } else if (window.location.href.indexOf("uts") > -1 || window.location.href.indexOf("login-staff") > -1 || window.location.href.indexOf("sign-up-staff") > -1 || window.location.href.indexOf("client-info") > -1 ) {
                  return (
                    <a href="/login-staff" class="">
                      <div className="">
                        <img src={utslogo} alt="UTSLogo" width="200" height="100" />
                      </div>
                    </a>
                  )
                } else if (window.location.href.indexOf("request-project") > -1 || window.location.href.indexOf("home") > -1) {
                  return (
                    <a href="/home" class="">
                      <div className="">
                        <img src={utslogo} alt="UTSLogo" width="200" height="100" />
                      </div>
                    </a>
                  )
                } else {
                  return (
                    <a href="/sign-in" class="">
                      <div className="">
                        <img src={utslogo} alt="UTSLogo" width="200" height="100" />
                      </div>
                    </a>
                  )
                }
              })()}
          </div>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {(() => {
                if (window.location.href.indexOf("/") > -1 || window.location.href.indexOf("sign-in") > -1 || window.location.href.indexOf("login-staff") > -1 || window.location.href.indexOf("sign-up-staff") > -1) {
                  return (
                      <li className="nav-item">
                        <div className="nav-link" to={"/sign-in"}><b>Log In</b></div>
                      </li>
                  )
                }
                else if (window.location.href.indexOf("home") > -1 )  {
                  return (
                    <li className="nav-item">    
                      <div className="nav-link" to={"/"} onAction={localStorage.clear()}><b>Log Out</b></div>
                    </li>
                  )
                }
              })()}
            </ul>
          </div>
        </div>
      </nav>

      <div className="mt-5 pt-5">
        <div className="auth-wrapper mt-5 pt-5">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/login-staff" component={LoginStaff} />
              <Route path="/admin" component={AdminSignIn} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/sign-up-staff" component={SignupStaff} />
              <Route path="/forgot-pass" component={ForgetPass} />
              <Route path="/home" component={Home} />
              <Route path="/admin-home" component={AdminHome} />
							<Route path="/request-project" component={RequestProject} />
							<Route path="/uts" component={StaffHome} />
							<Route path="/client-info" component={ClientDetails} />
            </Switch>
        </div>
      </div>
      

      <div className="pt-5 text-center">
        <p><b>Powered By SkyWalker</b></p>
        
      </div>
    </div>
  </Router>
  );
}

export default App;
