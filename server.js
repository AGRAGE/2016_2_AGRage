let express = require('express');
let parser = require('body-parser');
let app = express();
let technoDoc = require('techno-gendoc');
let path = require('path');

let technolibs = require('technolibs');

app.use('/game', express.static('public', {maxAge: 1}));
app.use('/chat', express.static('public', {maxAge: 1}));
app.use('/login', express.static('public', {maxAge: 1}));
app.use('/menu', express.static('public', {maxAge: 1}));
app.use('/registration', express.static('public', {maxAge: 1}));
app.use('/searchGame', express.static('public', {maxAge: 1}));
app.use('/rating', express.static('public', {maxAge: 1}));
app.use('/profile', express.static('public', {maxAge: 1}));
app.use('/config', express.static('public', {maxAge: 1}));
app.use('/', express.static('public', { maxAge: 1 }));

technoDoc.generate(require('./api'), 'public');

app.use(parser.json());
app.use('/libs', express.static('node_modules'));


app.get('/api/session', (req, res) => {
	res.send(technoDoc.mock(require('./api/scheme/Session')))
});

app.post('/api/session', (req, res) => {
	res.send(technoDoc.mock(require('./api/scheme/Session')))
});


app.post('/api/messages', (req, res) => {
	technolibs.publish(req.body).then(body => res.json(req.body));
});

app.get('/api/messages', function (req, res) {
	res.send([
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message'))
	])
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});

/*const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(3000);
/*
