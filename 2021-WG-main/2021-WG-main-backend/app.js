const createError = require('http-errors');
const express = require('express');
const userRouter = require('./routes/user');

const port = process.env.PORT || '8080';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs')

// cross-origin
app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});


app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
	// 	// set locals, only providing error in development
	// 	res.locals.message = err.message;
	// 	res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	// 	// render the error page
	// 	res.status(err.status || 500);
	// 	res.render('error');
	// });
	
	app.use(function(err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};
		
		// render the error page
		res.status(err.status || 500);
		res.render('error.ejs');
	});    
	
	// console.log("hi");
	
	app.listen(port,function(){
		console.log(`server is running on port ${port}`);
	 });
	
	module.exports = app;
	