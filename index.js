// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())
const port = 3000;

// Dummy data
const dummyData = [
  { id: 1, name: 'John Doe', age: 25 },
  { id: 2, name: 'Jane Doe', age: 30 },
  { id: 3, name: 'Bob Smith', age: 22 },
];

// Endpoint to get dummy data
app.get('/api/dummy', (req, res) => {
  res.json(dummyData);
});

// Endpoint to get dummy data of specified id
app.get('/api/dummy/:id', (req, res) => {
    const userId = req.params.id;
    const user = dummyData.find(item => (item.id == userId))
    if (!user){
        return res.status(404).json({ error: "This user does not exist"})
    }
    res.json(user);
  });

  // Endpoint to add a new user
app.post('/api/adduser', (req, res) => {
    const { name, age } = req.body;
  
    if (!name || !age) {
      return res.status(400).json({ error: 'Name and age are required' });
    }
  
    const newUser = {
      id: dummyData.length + 1,
      name,
      age,
    };
  
    dummyData.push(newUser);
  
    res.json(newUser);
  });

app.delete('/api/deleteuser/:id',(req,res) => {
    const userId = req.params.id;
    const index = dummyData.findIndex(item => (item.id == userId));
    if (index == -1){
        return res.status(404).json({error:"User does not exist"});
    }
    const removedUser = dummyData.splice(index,1)[0];
    res.json({message: "User removed successfuly", user: removedUser})
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
