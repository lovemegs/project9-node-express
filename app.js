const express = require('express');
const { data } = require('./data.json');
const { projects } = data;
const app = express();

// Sets the view engine to pug
app.set('view engine', 'pug');
app.use('/static', express.static('public'));



// ROUTES
app.get('/', (req, res) => {
	res.locals.projects = data.projects;
	res.render('index');
});
app.get('/about', (req, res) => {
	res.render('about')
});
app.get('/project/:id', (req, res) => {
	res.locals.projects = data.projects;
	res.render('project', { projects: projects[req.params.id]});
});


// ERROR 404
app.use((req, res, next) => {
	const err = new Error();
	err.status = 404;
	err.message = 'Oh no, the route could not be found';
	console.log(err.message, err.status);
	next(err);
});
// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
	if (err.status !== 404) {
		err.status = 500;
		err.message = 'Something went wrong on the server';
		console.log(err.message, err.status);
	}
});


// LOCALHOST 3000
app.listen(3000, () => {
	console.log('The application is running on port 3000');
});