//////////////////////////////////////////
// Imports
//////////////////////////////////////////

const gifs = require('./gifs.json');
const express = require('express');

//////////////////////////////////////////
// Constants
//////////////////////////////////////////

const app = express();
const users = [
  { name: "Carmen", id: 123 },
  { name: "Reuben", id: 456 },
  { name: "Maya", id: 789 },
];

// The path module is useful for constructing relative pathToFrontends
const path = require('path');

// the pathToFrontend is to the entire assets folder
// the dist folder must be built with `npm run build`
let pathToFrontend = path.join(__dirname, '../frontend');
if (process.env.NODE_ENV === 'production') {
  pathToFrontend = path.join(__dirname, '../frontend/dist');
}

//////////////////////////////////////////
// Middleware
//////////////////////////////////////////

// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};

// generate middleware using the pathToFrontend
const serveStatic = express.static(pathToFrontend);

// Register the logRoutes middleware globally to log all requests
app.use(logRoutes);
// Register the serveStatic middleware before the remaining controllers
app.use(serveStatic);

//////////////////////////////////////////
// Controllers
//////////////////////////////////////////

const serveData = (req, res, next) => res.send(gifs);
const serveUsers = (req, res, next) => {
  res.send(users);
}
const serveHello = (req, res, next) => {
  const name = req.query.name || "stranger";
  res.send({ message: `hello ${name}` });
}
const serve404 = (req, res, next) => {
  res.status(404).send({ error: `Not found: ${req.originalUrl}` });
}

app.get('/api/users', serveUsers);
app.get('/api/hello', serveHello);
app.get('/api/data', serveData);
app.use(serve404); // captures ALL unhandled requests

//////////////////////////////////////////
// Listen
//////////////////////////////////////////

const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});