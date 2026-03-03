/////////////////////
// Imports
/////////////////////

const express = require('express');

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

app.get('/api/hello', serveHello);
app.get('/api/users', serveUsers);

// TODO: Add an /api/users/:id endpoint to serve a single user

/////////////////////
// Listen
/////////////////////

const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});
