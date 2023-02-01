import '../App.css';
import react, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RequestProject from "./RequestProject";
import Login from "./Signin";


class Home extends Component {
	constructor(props) {
		super(props);

		let user = localStorage.getItem('user');
		if (user) {
			user = JSON.parse(user);
		}

		this.state = {
			user: user || {},
			projects: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:8080/user/getMyProjects')
			.then(response => {
				return response.json();
			})
			.then(res => {
				this.setState({
					projects: res
				});
			});
	}

	createNewProject = () => {
        this.props.history.replace('/request-project');
    }

	logout = () => {
		localStorage.clear();
		this.props.history.replace('/');
	}

	render() {
		const { user, projects } = this.state;

		if(!user.first_name) {
			this.props.history.replace('/sign-in');
		}

		return (<Router>
			<div class="col-9 mx-auto">
				<div>
					<div class="d-flex justify-content-center mb-4">
						<span class="welcome-user">Welcome { user.first_name } </span>
						{/* <span>Welcome { user.first_name } { user.last_name }</span> */}
					</div>
					{/* <Link className="nav-link" to={"/request-project"}><b>Request a Project</b></Link> */}
					
					<div className="admin-inner">
						<div className="auth-inner">
							<div class="d-flex">
								<div class="col-11 h4 text-center mx-auto ml-5 pl-5">My Projects</div>
								<a href="">
									<div class="col-1 text-right"><img style={{width:50}} onClick={this.createNewProject} src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/plus-512.png"></img></div>
								</a>
							</div>
							<table className="table table-bordered table-hover">
								<thead>
								<tr>
									<th>Project Name</th>
									<th>Project Description</th>
									<th>Requested Start Date</th>
									<th>Requested End Date</th>
									<th>Submission Date</th>
									<th>Submission Time</th>
									<th>Status</th>
									{/* <th class="text-center">Delete</th> */}
								</tr>
								</thead>
								<tbody>
								{
									projects.myProjects && projects.myProjects.map(u => (
										(u.client_id == user.custom_id) ? <tr key={u.client_id}>
											<td>{ u.project_name}</td>
											<td>{ u.project_description}</td>
											<td>{ new Date(u.project_start_date).toLocaleDateString()}</td>
											<td>{ new Date(u.project_end_date).toLocaleDateString()}</td>
											<td>{ new Date(u.submission_date_time).toLocaleDateString() }</td>
											<td>{ u.submission_time }</td>
											<td>{ u.project_status}</td>
											{/* <a href="">
												<td class="px-5" onClick={()=>this.deleteUser(u.custom_id)}>X</td>
											</a> */}
										</tr> : null
									)) 
								} 
								</tbody>
							</table>
						</div>
						
					</div>

					<button type="button" className="btn btn-primary btn-block w-50 mx-auto" onClick={this.createNewProject}>Request New Project </button>
					<button type="button" className="btn btn-primary btn-block mt-4 w-50 mx-auto" onClick={this.logout}>Log Out </button>
					

					
				</div>
				
				{/* <div>Hello world demo page</div> */}
				<div className="auth-wrapper">
				
			</div>
			</div>

			
			</Router>)
	}

	
}

export default Home;
