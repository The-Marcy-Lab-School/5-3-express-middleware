/////////////////////
// Imports
/////////////////////

const express = require('express');
const gifs = require('./gifs.json');

/////////////////////
// Constants
/////////////////////

const app = express();
const users = [
  { name: "Carmen", id: 123 },
  { name: "Reuben", id: 456 },
  { name: "Maya", id: 789 },
]

/////////////////////
// Middleware
/////////////////////


/////////////////////
// Controllers
/////////////////////

const serveUsers = (req, res, next) => {
  res.send(users);
}

const serveHello = (req, res, next) => {
  const name = req.query.name || "stranger";
  res.send({ message: `hello ${name}` });
}

// TODO: Add a serverUser controller

// TODO: Add a serveGifs controller

const serve404 = (req, res, next) => {
  res.status(404).send({ error: `Not found: ${req.originalUrl}` });
}

/////////////////////
// Endpoints
/////////////////////

app.get('/api/hello', serveHello);
app.get('/api/users', serveUsers);

// TODO: Add an /api/users/:id endpoint to serve a single user

// TODO: Add an /api/gifs endpoint to serve the gifs JSON

app.use(serve404); // captures ALL unhandled requests

/////////////////////
// Listen
/////////////////////

const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});
