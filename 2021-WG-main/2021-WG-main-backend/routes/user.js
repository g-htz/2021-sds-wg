const express = require('express');
const router = express.Router();
const pool = require("../database");
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const connection = mysql.createConnection({
	// host: 'localhost',
    // user: 'root',
    // password: 'password',
    // database: 'nodelogin'
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	password: 'secret',
	port: 5432
});

const transporter = nodemailer.createTransport({
	service: "hotmail",
	auth: {
		user: "sds-2021@outlook.com",
		pass: "hotmail01"
	}
});

// const options = {
// 	from: "sds-2021@outlook.com",
// 	to: "georgestavros2@gmail.com",
// 	subject: "Hello hi",
// 	text: "Good morning, \n email <br> will </br> work!!"
// };

// transporter.sendMail(options, function (err, info) {
// 	if(err){
// 		console.log(err);
// 		return;
// 	}
// 	console.log("Sent: " + info.response);
// })

router.get('/client', async function(req, res, next) {
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query('select id, first_name, last_name, custom_id, email from client_user', (err, result) => {
			done();
			if (err) {
				return console.log('Query Error:', err);
			}
			res.send(result.rows);
		});
	});
});

router.post('/delete_client', async function(req, res, next) {
	const {custom_id} = req.body;
	if (!custom_id) {
		return res.status(400).send();
	}
	
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query('DELETE FROM client_user ' + ' where custom_id=$1::int', [custom_id], (err, result) => {
			done();
			if (err) {
				return console.log('Query Error:', err);
			}
			// res.send(result.rows);
			res.status(201).send();
		});
	});
});

router.post('/approve_project', async function(req, res, next) {
	const {project_id} = req.body;
	if (!project_id) {
		return res.status(400).send();
	}
	
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query('UPDATE client_project ' + 'SET project_status=$1::varchar' + ' where client_project_id=$2::int', ["Approved", project_id], (err, result) => {
			done();
			if (err) {
				return console.log('Query Error:', err);
			}
			// res.send(result.rows);
			res.status(201).send();
		});
	});
});

router.post('/decline_project', async function(req, res, next) {
	const {project_id} = req.body;
	if (!project_id) {
		return res.status(400).send();
	}
	
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query('UPDATE client_project ' + 'SET project_status=$1::varchar' + ' where client_project_id=$2::int', ["Declined", project_id], (err, result) => {
			done();
			if (err) {
				return console.log('Query Error:', err);
			}
			// res.send(result.rows);
			res.status(201).send();
		});
	});
});

router.post('/client', async function(req, res, next) {
	const { first_name, last_name, custom_id, email, password } = req.body;
	if (!first_name || !last_name || !custom_id || !email || !password) {
		return res.status(400).send();
	}
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query("INSERT INTO client_user(first_name, last_name, custom_id, email, password)" +
			"VALUES($1::varchar, $2::varchar, $3::int, $4::varchar, $5::varchar)",
			[first_name, last_name, custom_id, email, password], (err, result) => {
			done();
			if (err) {
				return console.log('Query Error:', err);
			}
			res.status(201).send();
		});
	});
});

router.post('/add_project', async function(req, res, next) {
	const { client_id, project_name, project_description, user_email, project_start_date, project_end_date, email, submission_date_time, submission_time, project_status, resource_name, resource_description, skill_name, skill_level, tool_name, tool_description } = req.body;
	// const submission = new Date();
	console.log(user_email);
	if (!client_id || !project_name, !project_description, !user_email, !project_start_date, !project_end_date, !email, !submission_date_time, !submission_time, !project_status, !resource_name, !resource_description, !skill_name, !skill_level, !tool_name, !tool_description) {
		return res.status(400).send();
	}
	console.log(client_id, project_name, project_description, user_email, project_start_date, project_end_date, email, submission_date_time, submission_time, project_status, resource_name, resource_description, skill_name, skill_level, tool_name, tool_description  )
	const options = {
		from: "sds-2021@outlook.com",
		// to: "georgestavros2@gmail.com",
		to:` "${user_email}"`,
		subject:` "SDS 2021 - ${project_name}"`,
		text: "Hi there, \n \n"
			+ "Thank you so much for applying for a Project with the University of Technology Sydney's Software Development Studio. \n \n" 
			+ "Your request is being processed by our staff and will be responded to shortly. Please confirm the following details are correct. \n \n"
			+ "Project name: " + project_name + "\n" 
			+ "Project description: " + project_description + "\n" 
			+ "Requested Start Date:" + project_start_date + "\n"
			+ "Requested End Date:" + project_end_date + "\n \n"
			+ "Please press the update button on your projects list or contact us at sds-2021@outlook.com if you have any questions."
			+ "\n \n \n Kind Regards, \n George Hetrelezis \n 14123032 \n UTS Software Development Studio"
	};
	
	transporter.sendMail(options, function (err, info) {
		if(err){
			console.log(err);
			return;
		}
		console.log("Sent: " + info.response);
	})
	pool.connect(function(err, _client, done) {
		if (err) {
			alert("connectErr")
			return console.log('Connection Error:', err);
		}
		pool.query("INSERT INTO client_project(client_id, project_name, project_description, project_start_date, project_end_date, submission_date_time, submission_time, project_status, resource_name, resource_description, skill_name, skill_level, tool_name, tool_description)" +
			"VALUES($1::int, $2::varchar, $3::varchar, $4::date, $5::date, $6::date, $7::time, $8::varchar, $9::varchar, $10::varchar, $11::varchar, $12::varchar, $13::varchar, $14::varchar)",
			[client_id, project_name, project_description, project_start_date, project_end_date, submission_date_time, submission_time, project_status, resource_name, resource_description, skill_name, skill_level, tool_name, tool_description], (err, result) => {
			
			done();
			if (err) {
				return console.log('Query Error:', err);
			}
			res.status(201).send();
		});
	});
});

router.post('/clientSignIn', async function(req, res, next) {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).send();
	}
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query('select id, first_name, last_name, custom_id, email from client_user' +
			' where email=$1::varchar and password=$2::varchar', [email, password], (err, result) => {
			done();
			if (err) {
				return console.log('Query Error:', err);
			}
			if (result.rows.length > 0) {
				res.send(result.rows[0]);
			} else {
				res.status(404).send();
			}
		});
	});
});

router.get('/uts_staff', async function(req, res, next) {
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query('select id, first_name, last_name, custom_id, email from uts_staff_user', (err, result) => {
			done();
			if (err) {
				return console.log('Query Error:', err);
			}
			res.send(result.rows);
		});
	});
});

router.post('/uts_staff', async function(req, res, next) {
	const { first_name, last_name, custom_id, email, password } = req.body;
	if (!first_name || !last_name || !custom_id || !email || !password) {
		return res.status(400).send();
	}
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query("INSERT INTO uts_staff_user(first_name, last_name, custom_id, email, password)" +
			"VALUES($1::varchar, $2::varchar, $3::int, $4::varchar, $5::varchar)",
			[first_name, last_name, custom_id, email, password], (err, result) => {
				done();
				if (err) {
					return console.log('Query Error:', err);
				}
				res.status(201).send();
			});
	});
});

router.post('/utsStaffSignIn', async function(req, res, next) {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).send();
	}
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query('select id, first_name, last_name, custom_id, email from uts_staff_user' +
			' where email=$1::varchar and password=$2::varchar', [email, password], (err, result) => {
			done();
			if (err) {
				return console.log('Query Error:', err);
			}
			if (result.rows.length > 0) {
				res.send(result.rows[0]);
			} else {
				res.status(404).send();
			}
		});
	});
});

router.post('/adminSignIn', async function(req, res, next) {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).send();
	}
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query('select id, first_name, last_name, email from admin_user' +
			' where email=$1::varchar and password=$2::varchar', [email, password], (err, result) => {
			done();
			if (err) {
				return console.log('Query Error:', err);
			}
			if (result.rows.length > 0) {
				res.send(result.rows[0]);
			} else {
				res.status(404).send();
			}
		});
	});
});

router.get('/getAllUsers', async function(req, res, next) {
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query('select id, first_name, last_name, custom_id, email from client_user', (err, result) => {
			if (err) {
				return console.log('Query Error:', err);
			}
			pool.query('select id, first_name, last_name, custom_id, email from uts_staff_user', (err1, result1) => {
				done();
				if (err1) {
					return console.log('Query Error:', err1);
				}
				res.send({
					clientUsers: result.rows,
					staffUsers: result1.rows
				});
			});
		});
	});
});

router.get('/getAllProjects', async function(req, res, next) {
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query('select client_id, project_name, project_start_date, project_end_date, project_description, submission_date_time, submission_time, project_status, client_project_id, resource_name, resource_description, skill_name, skill_level, tool_name, tool_description from client_project order by project_status desc', (err, result) => {
			if (err) {
				return console.log('Query Error:', err);
			}
			res.send({
				clientProjects: result.rows,
			});
		});
	});
});

router.get('/getMyClient', async function(req, res, next) {
	// const { clientid } = req.body;
	const { clientid } = req.body;
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query('select first_name, last_name, custom_id, email from client_user', (err, result) => {
			if (err) {
				return console.log('Query Error:', err);
			}
			res.send({
				clientValues: result.rows,
			});
		});
	});
});

router.get('/getMyProjects', async function(req, res, next) {
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query('select client_id, project_name, project_start_date, project_end_date, project_description, submission_date_time, submission_time, project_status from client_project', (err, result) => {
			if (err) {
				return console.log('Query Error:', err);
			}
			res.send({
				myProjects: result.rows,
			});
		});
	});
});

router.get('/get_project_id', async function(req, res, next) {
	pool.connect(function(err, client, done) {
		if (err) {
			return console.log('Connection Error:', err);
		}
		pool.query('select max(client_project_id) from client_project', (err, result) => {
			if (err) {
				return console.log('Query Error:', err);
			}
			res.send({
				myProjects: result.rows,
			});
		});
	});
});

module.exports = router;
