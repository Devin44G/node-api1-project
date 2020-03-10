const express = require('express');
const shortid = require('shortid');

const server = express();
      server.use(express.json());

/********* ENDPOINT VARS *********/
let users = [];

/********* ENDPOINTS *********/
server.get('/api/users', (req, res) => {  // GET
  if(!req) {
    res.status(500).json({ errorMsg: "THere was an error while saving the user to the database." });
  } else {
    res.status(200).json(users);
  }
});

server.post('/api/users/', (req, res) => {
  const userInfo = req.body;
        userInfo.id = shortid.generate();
        users.push(userInfo);

  if(!req.body.name && !req.body.bio) {
    res.status(400).json({ errorMsg: "Please provide a name and bio for the users." });
  } else if(!req) {
    res.status(500).json({ errorMsg: "There was an error while saving the user to the database." });
  } else {
    res.status(201).json(userInfo);
  }
});

server.get('api/users/:id', (req, res) => {
  const userID = req.params;
  const user = users.find(user => {
    return user.id === userID.id;
  });

  if(!user) {
    res.status(404).json({ message: "The user with the specified ID does not exist." });
  } else if(!req) {
    res.status(500).json({ errorMessage: "The user information could not be retrieved." });
  } else {
    res.status(200).json(user);
  }
});

// server.delete('/api/users/:id', (req, res) => {
//
// });

const PORT = 5000;

server.listen(PORT, () =>
  console.log(`\n ** API is running on http://localhost:${PORT} ** \n`)
);
