const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

process.env.TOKEN_SECRET = require('crypto').randomBytes(64).toString('hex');

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})

// app.use(express.static(path.resolve(__dirname, '../client/public')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
// });

app.post("/login", (req, res) => {
  const token = generateAccessToken({ username: req.body.username });
  res.json(token);
});

app.get("/users", authenticateToken, (req, res) => {
  return res.json({ users: [{ name: 'david' }] })
})

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']
  // const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
} 

app.get("/:id", (req, res) => {
  const { id } = req.params
  const content = [
    { id: 1, name: 'david', logo: '💎' },
    { id: 2, name: 'jonas', logo: '🔥' },
    { id: 3, name: 'christian', logo: '🛡️' }
  ];

  let user = content.find((user) => user.id == id)  

  if (!user) {
    res.status(404).send('User not found')
    return;
  } 

  res.json({
    id: `Your id is ${user.id}`,
    name: `Your name is ${user.name}`,
    logo: `Your logo is ${user.logo}`
  });
});

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}