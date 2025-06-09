require('dotenv').config();
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const fav = require('./favorites');
const logger = require('./middleware/logger');
const port = process.env.PORT || 5000;

// const ReqOrigins = ['https://wiindy-ui.vercel.app','http://localhost:5173/']

// app.use(cors({
//   origin: ReqOrigins, 
//   methods: 'GET,POST,PUT,DELETE',
//   credentials: true,
// }));
app.use(cors());
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
  
app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/user', fav);

app.listen(port,()=>{console.log('this app is running on '+port)});