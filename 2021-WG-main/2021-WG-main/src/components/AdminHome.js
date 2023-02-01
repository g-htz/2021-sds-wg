import react, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

class Home extends Component {
	constructor(props) {
		super(props);

		let user = localStorage.getItem('user');
		if (user) {
			user = JSON.parse(user);
		}

		this.state = {
			user: user || {},
			users: [],
			clientID: user.custom_id,
			clientIDStatus: 0
		}
	}

	deleteUser = (userID) => {
		const delete_func = {
			custom_id: userID
			// user.custom_id
		}
		alert(userID)
		fetch('http://localhost:8080/user/delete_client', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(delete_func)
		})
		.then(response => {
			alert(response.status)
			if (response.status === 201) {
			// alert('Client has been deleted')
			} else {
			// alert('There has been an error! Please  try again')
			}
		});
		alert(JSON.stringify(delete_func))
	}
	  

	componentDidMount() {
		fetch('http://localhost:8080/user/getAllUsers')
			.then(response => {
				return response.json();
			})
			.then(res => {
				this.setState({
					users: res
				});
			});
	}

	logout = () => {
		localStorage.clear();
		this.props.history.replace('/');
	}

	render() {
		const { user, users } = this.state;
		if(user.first_name != "admin") {
			this.props.history.replace('/sign-in');
		}
		return (
			<div className="admin-wrapper">
				<div>
					<span>Hi, { user.first_name } { user.last_name }</span>
					<a style={{ marginLeft: 10 }} href="#" onClick={this.logout}>Sign Out</a>
				</div>
				<div className="admin-inner">
					<div className="auth-inner">
						<div class="h4 text-center">Podium Users</div>
						<table className="table table-bordered table-hover">
							<thead>
							<tr>
								<th>User Type</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>ID</th>
								<th>Email</th>
								<th class="text-center">Delete</th>
							</tr>
							</thead>
							<tbody>
							{
								users.clientUsers && users.clientUsers.map(u => (
									<tr key={u.custom_id}>
										<td>Client</td>
										<td>{ u.first_name }</td>
										<td>{ u.last_name }</td>
										<td>{ u.custom_id }</td>
										<td>{ u.email }</td>
										<a href="">
											<td class="px-5" onClick={()=>this.deleteUser(u.custom_id)}>X</td>
										</a>
									</tr>
								)) 
							} 
							{
								users.staffUsers && users.staffUsers.map(u => (
									<tr key={u.custom_id}>
										<td>Staff</td>
										<td>{ u.first_name }</td>
										<td>{ u.last_name }</td>
										<td>{ u.custom_id }</td>
										<td>{ u.email }</td>
										<a href="">
											<td class="px-5" onClick={this.deleteUser}>X</td>
										</a>
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
