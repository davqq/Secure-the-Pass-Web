const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

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

app.get("/:id", (req, res) => {
  const { id } = req.params
  const content = [
    { id: 1, name: 'david', logo: '💎' },
    { id: 2, name: 'jonas', logo: '🔥' },
    { id: 3, name: 'christian', logo: '🛡️' }
  ];

  let user = content.find((user) => user.id == id)

  if (!user) {
    res.status(404).send({ message: 'User not found' })
    return;
  }

  res.json({
    id: `Your id is ${user.id}`,
    name: `Your name is ${user.name}`,
    logo: `Your logo is ${user.logo}`
  });
});
