
const fs = require('fs');
const sauce= require('../models/sauce');

// ajout de nouvelle sauce
exports.createSauce = (req,res,next)=>{
    const sauceObject = json.parse(req.body.sauce);

    //supp l'id car mongoose génère automatique Id
    delete sauceObject._id;
    const sauce= new Sauce ({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
};
sauce.save()
.then(()=> res.status(201).json({message:'sauce enregistrée!' }))
.catch(error=>res.status(400).json({error}));

// modifier une sauce
exports.modifySauce=(req,res,next)=>{}
exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => {
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'sauce supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };