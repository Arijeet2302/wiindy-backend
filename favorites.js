const userFavs = require("./models/userModels");
const router = require('express').Router();



addToFav = async(req, res) =>{
    const {username, cityname, uid} = req.body;
    await userFavs.create({username, cityname, uid});
    return res.send({msg: "Added to favorites"});
}


deleteFromFav = async(req, res)=>{
    try{
        const {username, cityname} = req.body;
        const deletedDocument = await userFavs.findOneAndDelete(
            { $and : [
                {username : { $eq : username}},
                {cityname: { $eq : cityname}}
            ]}); 
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
        const {username } = req.body;
        const documents = await userFavs.find({ username : { $eq : username}});
        return res.send(documents); 
    }catch(err){
        console.error("Error retrieving favs", err);
    }
}

router.post("/add", addToFav);
router.delete("/delete", deleteFromFav);
router.post("/favorites", showfavs);
module.exports = router;