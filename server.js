// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const dotenv = require('dotenv'); // development only maybe
dotenv.config();

const app = express();
const port = process.env.PORT || 5500;

app.use(express.static('.'));
app.use(bodyParser.json());

// MongoDB URI from environment variable
const mongoURI = process.env.MONGO_URI;

const client = new MongoClient(mongoURI);

// Assume the MongoDB driver handles connection internally

// Example endpoint to log weight
app.post('/logWeight', async (req, res) => {
  try {
    // Assuming 'weights' is the collection name
    const collection = await client.db('weightlogger').collection('weights');
    const weightData = req.body;
    const result = await collection.insertOne(weightData);

    console.log('Weight data inserted successfully');
    res.status(200).send('Weight data logged successfully');
  } catch (error) {
    console.error('Error inserting weight data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Example endpoint to get weight data
app.get('/getWeight', async (req, res) => {
  try {
    // Assuming 'weights' is the collection name
    // console.log("MongoDB Server is Up:- "+client.getAddress())
    const collection = await client.db('weightlogger').collection('weights');
    const weightData = await collection.find().toArray();

    console.log('Weight data retrieved successfully');
    res.status(200).json(weightData);
  } catch (error) {
    console.error('Error retrieving weight data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// app.get('/', async (req, res) => {
//   res.status(200);
//   res.body = 'ready';
// })

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
