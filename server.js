// server.js
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Use the environment variable for MongoDB URI
// const mongoURI = process.env.MONGO_URI;
const mongoURI = 'mongodb+srv://freakfizaan:Onwd3UmmicAiqn1R@cluster0.ji95cbm.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// ... rest of the code remains unchanged

// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');

  // Define your API endpoints here
  app.post('/logWeight', (req, res) => {
    const weightData = req.body;

    // Assuming you have a collection named 'weights' in your database
    const collection = client.db('your_database_name').collection('weights');

    // Insert the weight data into the 'weights' collection
    collection.insertOne(weightData, (err, result) => {
      if (err) {
        console.error('Error inserting weight data:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      console.log('Weight data inserted successfully');
      res.status(200).send('Weight data logged successfully');
    });
  });

  // Other API endpoints can be added here

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
