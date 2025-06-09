const mongoose = require('mongoose');

const userFavsSchema = new mongoose.Schema({
    username : String,
    uid : String,
    cityname : String
});

const userFavs = mongoose.model('userFavs', userFavsSchema);


module.exports = userFavs;