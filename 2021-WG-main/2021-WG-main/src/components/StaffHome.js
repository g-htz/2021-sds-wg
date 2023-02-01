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
		fetch('http://localhost:8080/user/getAllProjects')
			.then(response => {
				return response.json();
			})
			.then(res => {
				this.setState({
					projects: res
				});
			});
	}

	approve = (projID) => {
		const approve_func = {
			project_id: projID
			// user.custom_id
		}
		// alert(projID)
		fetch('http://localhost:8080/user/approve_project', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(approve_func)
		})
		.then(response => {
			// alert(response.status)
			if (response.status === 201) {
			// alert('Client has been deleted')
			} else {
			// alert('There has been an error! Please  try again')
			}
		});
		// alert(JSON.stringify(approve_func))
	}
	decline = (projID) => {
		const decline_func = {
			project_id: projID
			// user.custom_id
		}
		// alert(projID)
		fetch('http://localhost:8080/user/decline_project', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(decline_func)
		})
		.then(response => {
			// alert(response.status)
			if (response.status === 201) {
			// alert('Client has been deleted')
			} else {
			// alert('There has been an error! Please  try again')
			}
		});
		// alert(JSON.stringify(decline_func))
	}

	details = (userValue) => {
		this.props.history.replace(`/client-info/?myparam1=${userValue}`);
	}

	logout = () => {
		localStorage.clear();
		this.props.history.replace('/');
	}

	render() {
		const { user, projects } = this.state;

		if(!user.first_name) {
			this.props.history.replace('/login-staff');
		}

		return (
			<div className="admin-wrapper">
				<div>
					<span>Hi, { user.first_name } { user.last_name }</span>
					<a style={{ marginLeft: 10 }} href="#" onClick={this.logout}>Sign Out</a>
				</div>
				<div className="admin-inner">
					<div className="auth-inner">
						<div class="h4 text-center">Projects</div>
						<table className="table table-bordered table-hover">
							<thead>
							<tr>
								<th>Client ID</th>
								<th>Project Name</th>
								<th>Project Description</th>
								<th>Requested Start Date</th>
								<th>Requested End Date</th>
								<th>Submission Date</th>
								<th>Submission Time</th>
								<th>Resource</th>
								<th>Skill</th>
								<th>Tool</th>
								<th>Status</th>
								<th>Approve/Decline</th>
								{/* <th class="text-center">Delete</th> */}
							</tr>
							</thead>
							<tbody>
							{
								projects.clientProjects && projects.clientProjects.map(u => (
									<tr key={u.project_id}>
										<td onClick={()=>this.details(u.client_id)}><a href=""> { u.client_id }</a></td>
										<td >{ u.project_name }</td>
										<td>{ u.project_description }</td>
										<td>{ new Date(u.project_start_date).toLocaleDateString() }</td>
										<td>{ new Date(u.project_end_date).toLocaleDateString() }</td>
										<td>{ new Date(u.submission_date_time).toLocaleDateString() }</td>
										<td>{ u.submission_time }</td>
										<td>{ u.resource_name }</td>
										<td>{ u.skill_name }</td>
										<td>{ u.tool_name }</td>
										<td>{ u.project_status }</td>
										<a href="">
											<td onClick={()=>this.approve(u.client_project_id)}><img style={{width:50}} src="https://img.favpng.com/18/3/0/line-angle-point-area-png-favpng-M6taAqrrsqnnDqdAr96QPfE7s_t.jpg"></img></td>
										</a>
										<a href="">
											<td onClick={()=>this.decline(u.client_project_id)}><img style={{width:50}} src="https://toppng.com/uploads/preview/red-x-red-x-11563060665ltfumg5kvi.png"></img></td>
										</a>
										{/* <td onClick={alert(u.client_project_id)}><img style={{width:50}} src="https://img.favpng.com/18/3/0/line-angle-point-area-png-favpng-M6taAqrrsqnnDqdAr96QPfE7s_t.jpg"></img></td> */}
										{/* <td onClick={()=>this.decline(u.project_id)}><img style={{width:50}} src="https://toppng.com/uploads/preview/red-x-red-x-11563060665ltfumg5kvi.png"></img></td> */}
										{/* <a href="">
											<td class="px-5" onClick={()=>this.deleteUser(u.custom_id)}>X</td>
										</a> */}
									</tr>
								)) 
							} 
							</tbody>
						</table>
					</div>
					
				</div>
			</div>

			

		)
	}

	
}

export default Home;
