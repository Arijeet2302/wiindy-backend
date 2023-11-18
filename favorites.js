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
        const { uid } = req.body;
        const documents = await userFavs.find({ uid : { $eq : uid}});
        return res.send(documents); 
    }catch(err){
        console.error("Error retrieving favs", err);
    }
}

router.post("/add", addToFav);
router.delete("/delete/:id", deleteFromFav);
router.post("/favorites", showfavs);
module.exports = router;