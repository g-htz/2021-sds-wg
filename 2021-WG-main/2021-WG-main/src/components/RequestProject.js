import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com'
import { send } from 'emailjs-com';
import { useState } from "react";

// const recaptchaRef = React.createRef();

// onSubmit = () => {
//     const recaptchaValue = recaptchaRef.current.getValue();
//     this.props.onSubmit(recaptchaValue);
// }
const today = new Date()
const todayVal = today.toLocaleDateString()
const timeVal = today.toLocaleTimeString('en-US');
const pendingVal = "Pending"
const yesterday = new Date(todayVal)
yesterday.setDate(yesterday.getDate() - 1)


export default class RequestProject extends Component {


    state = {
      clientID: '',
      projectName: '',
      projectDescription: '',
      // password: '',
      startDate: '',
      endDate: '',
      emailAddress: '',
      submissionDate: todayVal,
      submissionTime: timeVal,
      approval: pendingVal, 
      resource: '',
      resourceDescription: '',
      skill: '',
      skillLevel: '',
      tool: '',
      toolDescription: '',
      clientIDStatus: 0,
      projectNameStatus: 0,
      descriptionStatus: 0,
      startDateStatus: 0,
      endDateStatus: 0,
      emailAddressStatus: 0,
      submissionDateStatus: 0,
      submissionTimeStatus: 0,
      resourceStatus: 0,
      resourceDescriptionStatus: 0,
      skillStatus: 0,
      skillLevelStatus: 0,
      toolStatus: 0,
      toolDescriptionStatus: 0,
      resources: [],
      skills: [],
      tools : []
      // passwordStatus: 0,
    }

    onInputChange = (key, event) => {
      const value = event.target.value;
      this.setState(prevState => {
        return {
          ...prevState,
          [key]: value
        }
      }, () => {
        this.checkAllStatus([key]);
      });
    }

    addResource = () => {
      this.setState({resources: [...this.state.resources, ""]}
      )
    }

    returnHome = () => {
      this.props.history.replace('/home');
  }

    checkAllStatus = (fields = ["clientID", "projectName", "projectDescription", "emailAddress", "startDate", "endDate", "resource", "resourceDescription", "skill", "skillLevel", "tool", "toolDescription"]) => {
      let isValid = true;
      const { clientID, projectName, projectDescription, startDate, endDate, emailAddress, submissionDate, submissionTime, approval, resource, resourceDescription, skill, skillLevel, tool, toolDescription} = this.state;

      
      if (fields.includes("clientID")) {
        if (clientID.trim() === '' || clientID.length > 8 || isNaN(clientID)) {
          this.setState({ clientIDStatus: 1 });
          isValid = false;
        } else {
          this.setState({ clientIDStatus: 0 });
        }
      }

      if (fields.includes("projectName")) {
        if (projectName.trim() === '' || projectName.length > 30) {
          this.setState({ projectNameStatus: 1 });
          isValid = false;
        } else {
          this.setState({ projectNameStatus: 0 });
        }
      }

      if (fields.includes("projectDescription")) {
        if (projectDescription.trim() === '' || projectDescription.length > 500) {
          this.setState({ descriptionStatus: 1 });
          isValid = false;
        } else {
          this.setState({ descriptionStatus: 0 });
        }
      }
      if (fields.includes("startDate")) {
        if (fields.includes("emailAddress")) {
          if (emailAddress.trim() === '' || emailAddress.length > 500) {
            this.setState({ emailAddressStatus: 1 });
            isValid = false;
          } else {
            this.setState({ emailAddressStatus: 0 });
          }
        }
        if (startDate.trim == null) {
          this.setState({ startDateStatus: 1 });
          isValid = false;
        } else {
          this.setState({ startDateStatus: 0 });
        }
      }
      if (fields.includes("endDate")) {
        if (endDate.trim == null) {
          this.setState({ endDateStatus: 1 });
          isValid = false;
        } else {
          this.setState({ endDateStatus: 0 });
        }
      }
      this.setState({ submissionDateStatus: 0 });
      this.setState({ submissionTimeStatus: 0 });
      this.setState({ projectIDStatus: 0 });
      this.setState({ approvalStatus: 0 });
      this.setState({ resourceStatus: 0 });
      this.setState({ resourceDescriptionStatus: 0 });
      this.setState({ skillStatus: 0 });
      this.setState({ skillLevelStatus: 0 });
      this.setState({ toolStatus: 0 });
      this.setState({ toolDescriptionStatus: 0 });
      return isValid;
    }

    submitRequest = () => {
      if (this.checkAllStatus()) {
        const { clientID, projectName, projectDescription, startDate, endDate, emailAddress, submissionDate, submissionTime, resource, resourceDescription, skill, skillLevel, tool, toolDescription, approval} = this.state;
        const project = {
          client_id: clientID,
          project_name: projectName,
          project_description: projectDescription,
          user_email: emailAddress,
          project_start_date: startDate,
          project_end_date: endDate,
          submission_date_time: submissionDate,
          submission_time: submissionTime,
          resource_name: resource,
          resource_description: resourceDescription,
          skill_name: skill,
          skill_level: skillLevel,
          tool_name: tool,
          tool_description: toolDescription,
          project_status: approval
        }
        fetch('http://localhost:8080/user/add_project', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(project)
        })
          .then(response => {
            // alert(response.status)
            if (response.status === 201) {
              alert('Project request has been sent')
              this.props.history.replace('/home');
            } else {
              alert('There has been an error! Please save your information and try again')
            }
          });
          // alert(JSON.stringify(project))
      } else {
        alert("Please fill in all fields and try again")
      }

    }

    render() {
      function sendEmail(e) {
        e.preventDefault();
        // alert("dis works");
  
        // emailjs.sendForm('gmail', 'template_thy6ex5', e.target, 'user_4Q3BZse0lFfSpIW6s3vRl',{
        //   subject: "hi",
        //   email: "georgestavros2@gmail.com",
        //   messsage: "Hi there, your project request has been submitted",
        // })
        emailjs.sendForm('gmail', 'template_thy6ex5', e.target, 'user_4Q3BZse0lFfSpIW6s3vRl')
            .then((result) => {
                // alert("itWork");
                console.log(result.text);
                // alert("email sent!");
              }, (error) => {
                // alert("noWork");
                console.log(error.text);
            });
      }
      const { clientID, projectName, projectDescription, startDate, endDate, emailAddress, submissionDate, submissionTime, approval, resource, resourceDescription, skill, skillLevel, tool, toolDescription, projectNameStatus, clientIDStatus, descriptionStatus, startDateStatus, endDateStatus, emailAddressStatus, submissionDateStatus, submissonTimeStatus, approvalStatus, resourceStatus, resourceDescriptionStatus, skillStatus, skillLevelStatus, toolStatus, toolDescriptionStatus} = this.state;
      
        return (
          
          <div className="auth-inner">
            <h3>UTS Request a Project</h3>
            <form className="contact-form" onSubmit={sendEmail}>
                <div className="form-group">
                    <label>Client ID</label>
                    <input type="number" className="form-control" placeholder="Enter Client ID"
                           value={clientID}
                           onChange={(event) => this.onInputChange('clientID', event)}/>
                  {
                    clientIDStatus === 1 ? <span className="help-block">Please enter your provided UTS Client ID number. UTS Client ID numbers are between 7 and 8 digits </span> : null
                  }
                </div>

                <div className="form-group">
                    <label>Project Name</label>
                    <input type="text" className="form-control" placeholder="Project Name"
                           value={projectName}
                           onChange={(event) => this.onInputChange('projectName', event)} />
                  {
                    projectNameStatus === 1 ? <span className="help-block">Please enter a Project Name between 1 and 30 characters</span> : null
                  }
                </div>

                <div className="form-group">
                    <label>Project Description</label>
                    <input type="text" className="form-control" placeholder="Project Description"
                           value={projectDescription}
                           onChange={(event) => this.onInputChange('projectDescription', event)}/>
                  {
                    descriptionStatus === 1 ? <span className="help-block">Please enter a description between 1 and 500 characters</span> : null
                  }
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="text" className="form-control" placeholder="Email Address"
                           value={emailAddress}
                           onChange={(event) => this.onInputChange('emailAddress', event)}/>
                  {
                    emailAddressStatus === 1 ? <span className="help-block">Please enter an email address</span> : null
                  }
                </div>
                <div className="form-group">
                    <label>Start Date </label>
                    <input type="date" className="form-control" placeholder="Start Date"
                           value={startDate}
                           onChange={(event) => this.onInputChange('startDate', event)}/>
                  {
                    startDateStatus === 1 ? <span className="help-block">Please enter a date after { yesterday.toDateString() }</span> : null
                  }
                </div>
                  
                <div className="form-group">
                    <label>End Date </label>
                    <input type="date" className="form-control" placeholder="End Date"
                           value={endDate}
                           onChange={(event) => this.onInputChange('endDate', event)}/> 
                  {
                    endDateStatus === 1 ? <span className="help-block">Please enter a date after { startDate.toDateString() }</span> : null
                  }
               </div> 
               <h4 class="mt-5 text-center">Resources</h4>
                <div className="form-group">
                    <label>Resources Required</label>
                    <input type="text" className="form-control" placeholder="Enter Resources"
                           value={resource}
                           onChange={(event) => this.onInputChange('resource', event)}/>
                {
                  resourceStatus === 1 ? <span className="help-block">Please enter a Resource Name or type "N/A"</span> : null
                }
                </div>
                
                <div className="form-group">
                    <label>Resources Description</label>
                    <input type="text" className="form-control" placeholder="Please describe your resources"
                           value={resourceDescription}
                           onChange={(event) => this.onInputChange('resourceDescription', event)}/>
                {
                  resourceDescriptionStatus === 1 ? <span className="help-block">Please enter a Resource Description or type "N/A"</span> : null
                }
               </div>
               <h4 class="mt-5 text-center">Skills</h4>
                <div className="form-group">
                    <label>Skills Required</label>
                    <input type="text" className="form-control" placeholder="Enter Skills"
                           value={skill}
                           onChange={(event) => this.onInputChange('skill', event)} />
                {
                  skillStatus === 1 ? <span className="help-block">Please enter a Skill Name or type "N/A"</span> : null
                }
                </div>
                
                <div className="form-group">
                    <label>Skill Level</label>
                    <input type="text" className="form-control" placeholder="Please enter the necessary skill level"
                           value={skillLevel}
                           onChange={(event) => this.onInputChange('skillLevel', event)} />
                {
                  skillLevelStatus === 1 ? <span className="help-block">Please enter a Skill Level or type "N/A"</span> : null
                }
                </div>
               <h4 class="mt-5 text-center">Tools</h4>
                <div className="form-group">
                    <label>Tools Required</label>
                    <input type="text" className="form-control" placeholder="Enter Tools"
                           value={tool}
                           onChange={(event) => this.onInputChange('tool', event)} />
                {
                  toolStatus === 1 ? <span className="help-block">Please enter a Tool Name or type "N/A"</span> : null
                }
                </div>
                
                <div className="form-group">
                    <label>Tools Description</label>
                    <input type="text" className="form-control" placeholder="Please describe your tools"
                           value={toolDescription}
                           onChange={(event) => this.onInputChange('toolDescription', event)} />
                {
                  toolDescriptionStatus === 1 ? <span className="help-block">Please enter a Tool Description or type "N/A"</span> : null
                }
                </div>
                <div class="mt-5 pt-5">
                  <button type='button' className="btn btn-primary btn-block" onClick={this.submitRequest}>Send Request</button>
                </div>
                <div class="mt-2">
                  <button type='button' className="btn btn-primary btn-block" onClick={this.returnHome}>Cancel</button>
                </div>
                

            </form>
          </div>
        );
    }

    // handleChange(event) {
    //   this.setState({feedback: event.target.value})
    // }
  
    // handleSubmit(event) {
    //   const templateId = 'template_id';

    //   this.sendFeedback(templateId, {message_html: this.state.feedback, from_name: this.state.name, reply_to: this.state.email})
    // }

    // sendFeedback (templateId, variables) {
    //   window.emailjs.send(
    //   'gmail', templateId,
    //   variables
    //   ).then(res => {
    //       console.log('Email successfully sent!')
    //   })
    //   // Handle errors here however you like, or use a React error boundary
    //       .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
      
    // }
    /*
        render() {
         return (
             <form onSubmit={this.onSubmit}>
                 <ReCAPTCHA
                   ref={recaptchaRef}
                   sitekey="6LftmpYaAAAAAK52HxPQ3V_0biioVdlJDu1XR6Ut"
                   onChange={onChange}
                 />
             </form>
         )
        }
    */
}
