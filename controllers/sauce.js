const Sauce = require('../models/sauce');
const fs = require('fs');

// Création d'une nouvelle sauce (Post)
exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    // Création de l'URL de l'image : http://localhost:3000/image/nomdufichier 
    imageUrl:
   `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
   
    likes:"0",
    disLikes:"0",
    usersLiked: [],
    usersDisliked: [],
    
  });
  // Enregistrement de l'objet sauce dans la base de données
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};
// Lecture d'une sauce avec son ID (Get/:id)

exports.getOneSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce =>{ res.status(200).json(sauce); console.log(sauce)} )
    .catch(error => res.status(404).json({ error }));
};
// Logiques métiers pour les sauces
// Lecture de toutes les sauces dans la base de données (Get)
//récoupération du tableau de tout les sauces
exports.getAllSauces = (req, res,) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
  
};

// Modification d'une sauce (Update)
exports.modifySauce = (req, res) => {
  const sauceObject = req.file ?
    // Si il existe déjà une image
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  // Si il n'existe pas d'image
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

// Suppression d'une sauce (Delete)
exports.deleteSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      // Récupération du nom du fichier
      const filename = sauce.imageUrl.split('/images/')[1];
      // On efface le fichier (unlink)
      fs.unlink(`images/${filename}`, () => {
        sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// Création like ou dislike (Post/:id/like)
exports.likeDisLikeSauce = (req, res) => {
  // L'utilisateur a aimé la sauce
  // Pousser l'identifiant de l'utilisateur dans le tableau usersLikes et incrémenter les likes de 1
  if (req.body.like === 1) {
    Sauce.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: req.body.like++ },
        $push: { usersLiked: req.body.userId },
      }
    )
      .then(() => res.status(200).json({ message: "Un like de plus !" }))
      .catch((error) => res.status(400).json({ error }));
  }
  //Si l'utilisateur n'a pas aimé la sauce
  // Pousser l'identifiant de l'utilisateur dans le tableau usersDislikes et diminuer les likes de 1
  else if (req.body.like === -1) {
    Sauce.updateOne(
      { _id: req.params.id },
      {
        $inc: { dislikes: req.body.like++ * -1 },
        $push: { usersDisliked: req.body.userId },
      }
    )
      .then(() =>
        res.status(200).json({ message: "Un dislike de plus !" })
      )
      .catch((error) => res.status(400).json({ error }));
  }

  // si l utilisateur change d avis
  else {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
          )
            .then(() => {
              res.status(200).json({ message: "Un like de moins !" });
            })
            .catch((error) => res.status(400).json({ error }));
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            }
          )
            .then(() => {
              res.status(200).json({ message: "Un dislike de moins !" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
}