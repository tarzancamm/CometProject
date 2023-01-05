//! Server Homebase

//Imports
require("dotenv").config();
const { db } = require("./util/database");
const { PORT } = process.env; //5555
const express = require("express");
const cors = require("cors"); // Client and Server can run on different ports and still share resources across 'origins'

// Stores express in variable
const server = express();

// Imports middleware functions
const {login, register} = require('./controllers/auth')

// Middleware to run on every endpoint
server.use(express.json()) // Parse requests into JSON
server.use(cors()) // Client & Server can run on seperate ports

// Endpoints
server.post('/register', register)
server.post('/login', login)

// Listening
// Sync methods to DB and have server listen. This will sync DB before server starts up
// Can use force to DROP tables while building app / making changes
// db.sync({ force: true })
db.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
});
