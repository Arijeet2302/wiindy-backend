require('dotenv').config();
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const fav = require('./favorites');

app.use(cors({
  origin: 'https://wiindy.vercel.app', // Replace with the actual URL of your React app
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
  });

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/api/user', fav);

module.exports = app;