// server.js (Express 4.0)
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
//app.use(express.static(__dirname + '/bethu-login'));   // set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT


var router = express.Router();

var notes = [
  {id: 1, label: 'First Note', author: 'Shyam'},
  {id: 2, label: 'Second Note', author: 'Brad'},
  {id: 3, label: 'Middle Note', author: 'Someone'},
  {id: 4, label: 'Last Note', author: 'Shyam'},
  {id: 5, label: 'Really the last Note', author: 'Shyam'}

];
var lastId = 6;

var reqs = [
 {id: 1, name: 'anvesh', location: 'hyd', number: '313'},
 {id: 2, name: 'bethu', location: 'kmm', number: '303'}
 
];
var nId = 3;

/* var requests = [
 {reqid: 1, username: 'anvesh', time: '', environment: 'QA', eligId: '00101075', batches: '22, 28, 29', note: 'Time Clock', started: 'false', done: 'false'},
 {reqid: 2, username: 'bethu', time: '3.30', environment: 'DEV', eligId: '00101750', batches: '25, 27, 28', note: 'Time Clock', started: 'false', done: 'false'}
];
*/
var requests = [
 {id: 1, environment: 'QA', eligId: '00101075', batches: '22, 28, 29', note: 'Time Clock', started: 'false', done: 'false'},
 {id: 2, environment: 'DEV', eligId: '00101750', batches: '25, 27, 28', note: 'Time Clock', started: 'false', done: 'false'}
];

var reqId = 3;


router.get('/note', function(req, res) {
  res.send(notes);
});
router.get('/reqs', function(req, res) {
  res.send(reqs);
});
router.get('/requests', function(req, res) {
  res.send(requests);
});



router.post('/note', function(req, res) {
  var note = req.body;
  note.id = lastId;
  lastId++;
  notes.push(note);
  res.send(note);
});

router.post('/reqs', function(req, res) {
  var request = req.body;
  request.id = nId;
  nId++;
  reqs.push(request);
  res.send(request);
});

router.post('/requests', function(req, res) {
  var request = req.body;
  request.id = reqId;
  reqId++;
  requests.push(request);
  res.send(request);
});


router.post('/note/:id/done', function(req, res) {
  var noteId = req.params.id;
  var note = null;
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].id == req.params.id) {
      note = notes[i];
      break;
    }
  }
  note.label = 'Done - ' + note.label;
  res.send(notes);
});

router.post('/requests/:id/done', function(req, res) {
  var noteId = req.params.id;
  var request = null;
  for (var i = 0; i < requests.length; i++) {
    if (requests[i].id == req.params.id) {
      request = requests[i];
      break;
    }
  }
  request.label = 'Done - ' + request.label;
  res.send(requests);
});


router.get('/note/:id', function(req, res) {
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].id == req.params.id) {
      res.send(notes[i]);
      break;
    }
  }
  res.send({msg: 'Note not found'}, 404);
});
router.get('/requests/:id', function(req, res) {
  for (var i = 0; i < requests.length; i++) {
    if (requests[i].id == req.params.id) {
      res.send(requests[i]);
      break;
    }
  }
  res.send({msg: 'Note not found'}, 404);
});

router.post('/note/:id', function(req, res) {
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].id == req.params.id) {
      notes[i] = req.body;
      notes[i].id = req.params.id;
      res.send(notes[i]);
      break;
    }
  }
  res.send({msg: 'Note not found'}, 404);
});
router.post('/requests/:id', function(req, res) {
  for (var i = 0; i < requests.length; i++) {
    if (requests[i].id == req.params.id) {
      requests[i] = req.body;
      requests[i].id = req.params.id;
      res.send(requests[i]);
      break;
    }
  }
  res.send({msg: 'Note not found'}, 404);
});

router.post('/login', function(req, res) {
  console.log('API LOGIN FOR ', req.body);
  res.send({msg: 'Login successful for ' + req.body.username});
});


app.use('/api', router);



app.listen(8000);
console.log('Open http://localhost:8000 to access the files now'); 			// shoutout to the user
