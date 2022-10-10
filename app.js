const express = require('express');
const { data } = require('./data.json');
const { projects } = data;
const app = express();

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
	const err = new Error('Page Not Found');
	err.status = 404;
	err.message = 'Oh no, the route could not be found';
	console.log(err.message, err.status);
	next(err);
});


// LOCALHOST 3000
app.listen(3000, () => {
	console.log('The application is running on port 3000');
});