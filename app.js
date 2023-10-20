require('dotenv').config();
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5000;
const fav = require('./favorites');

app.use('/api/user',cors());
app.use('/app/user',(req,res)=>{
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
});
})
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