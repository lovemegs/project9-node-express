const express = require('express');
const data = require('./data.json');
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));



// ROUTES
app.get('/', (req, res) => {
	res.locals = data.projects;
	res.render('index');
});
app.get('/about', (req, res) => {
	res.render('about')
});
app.get('/project/:id', (req, res) => {
	res.locals = data.projects;
	res.render('project');
});


// ERROR 404
app.use((req, res, next) => {
	const error = new Error('Page Not Found');
	err.status = 404;
	next(error);
});
app.use((err, req, res, next) =>{
	console.log(`${err.status} ${err.message}`);
	res.locals.error = err;
	res.status(err.status);
	res.render('error');
});

// LOCALHOST 3000
app.listen(3000, () => {
	console.log('The application is running on port 3000');
});