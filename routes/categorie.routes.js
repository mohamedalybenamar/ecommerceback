const express = require('express');
const router = express.Router();
const {verifyToken} =require("../middleware/verify-token")
const {authorizeRoles}=require("../middleware/authorizeRoles")
// Créer une instance de categorie.
const Categorie = require('../models/categorie');
const categorie = require('../models/categorie');
// afficher la liste des categories triee
router.get('/', verifyToken ,authorizeRoles("admin","user","visiteur"), async (req, res, )=> {
   try{ const cat=await Categorie.find({}, null, {sort: {'_id': -1}})
    res.status(200).json(cat)
   } catch(error){
    res.status(400).json({message:error.message})
   }
});
// créer une nouvelle catégorie
router.post('/', async (req, res) => {
    const { nomcategorie, imagecategorie} = req.body;
    const newCategorie = new Categorie({nomcategorie:nomcategorie,
    imagecategorie:imagecategorie})
    try {
    await newCategorie.save();
    res.status(200).json(newCategorie );
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

// chercher une catégorie
router.get('/:Id',async(req, res)=>{
    try{
       const cat=await Categorie.findById(req.params.Id);
        res.status(200).json({cat});
        }
        catch (error) {
            res.status(404).json({ message:error.message});
            }
});

// modifier une catégorie
router.put('/:categorieId', async (req, res)=> { try {
const cat1 = await Categorie.findByIdAndUpdate(
req.params.categorieId,
{ $set: req.body },
{ new: true }
);
res.status(200).json(cat1);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// Supprimer une catégorie
router.delete('/:id', async (req, res)=> {
    try{
    await Categorie.findByIdAndDelete(req.params.id);
    res.json({ message: "categorie deleted successfully." });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
        }
});
module.exports = router;
