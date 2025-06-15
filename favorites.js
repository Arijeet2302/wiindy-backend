const userFavs = require("./models/userModels");
const router = require('express').Router();



addToFav = async(req, res) =>{
    const {username, cityname, uid} = req.body;
    await userFavs.create({username, cityname, uid});
    return res.send({msg: "Added to favorites"});
}


deleteFromFav = async(req, res)=>{
    const item_id = req.params.id;
    try{
        const deletedDocument = await userFavs.findByIdAndRemove(item_id); 
        if (!deletedDocument) {
            return res.status(404).json({ message: 'Document not found' });
          }
      
          return res.send({ msg: 'Removed from favorites' });
        } catch (error) {
          console.error('Error deleting document:', error);
          return res.send({ msg: 'Internal server error' });
    }
}

showfavs = async(req,res)=>{
    try{
        const uid = req.query.uid;
        const documents = await userFavs.find({ uid : { $eq : uid}});
        return res.send(documents); 
    }catch(err){
        console.error("Error retrieving favs", err);
    }
}

showAllFavs = async(req, res) => {
    try {
        const documents = await userFavs.find({});
        return res.send(documents);
    }catch (err) {
        console.error("Error retrieving all favorites", err);
        return res.status(500).send({ msg: "Internal server error" });
    }
}

// Route definitions
router.post("/add", addToFav);
router.delete("/delete/:id", deleteFromFav);
router.get("/favorites", showfavs);
router.get("/all", showAllFavs);

// Export the router
module.exports = router;