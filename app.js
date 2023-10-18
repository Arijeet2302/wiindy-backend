require('dotenv').config();
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5000;
const fav = require('./favorites');

const corsOptions = {
  origin: 'https://wiindy.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
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

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})