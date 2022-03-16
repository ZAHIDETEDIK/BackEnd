
const fs = require('fs');
const sauce = require('../models/sauce');

// Logiques métiers pour les sauces// Lecture de toutes les sauces dans la base de données (Get)
exports.getAllSauces = (req, res, next) => {
  sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
  };
  // Lecture d'une sauce avec son ID (Get/:id)
  exports.getOneSauce = (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };
  // ajout de nouvelle sauce(POST)
  exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    //supp l'id car mongoose génère automatique Id
    delete sauceObject._id;
    const sauce = new sauce({
      ...sauceObject,
      // création url de l'image
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    // enregistrement de l'objet dans la base de données
    sauce.save()
      .then(() => res.status(201).json({ message: 'sauce enregistrée!' }))
      .catch(error => res.status(400).json({ error }));
  };

  // modifier une sauce (Update)
  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      // image déjà existante
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    // si pas d'image
    sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié' }))
      .catch(error => res.status(400).json({ error }));
  }
      // suppression d'une sauce (delete)
      exports.deleteSauce = (req, res, next) => {
        Thing.findOne({ _id: req.params.id })
          .then(sauce => {
            // récupération du nom de fichier
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'sauce supprimé !' }))
                .catch(error => res.status(400).json({ error }));
            });
          })
          .catch(error => res.status(500).json({ error }));
      };
      // Création like ou dislike (Post/:id/like)
      exports.likeDislikeSauce=(req,res,next)=>
      { // Si l'utilisateur aime la sauce 
        if (req.body.like === 1) { // On ajoute 1 like et on l'envoie dans le tableau "usersLiked"
          sauce.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
            .then((sauce) => res.status(200).json({ message: 'Like ajouté !' }))
            .catch(error => res.status(400).json({ error }));
        } else if (req.body.like === -1) {
          // Si l'utilisateur n'aime pas la sauce 
          // On ajoute 1 dislike et on l'envoie dans le tableau "usersDisliked" 
          sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
            .then((sauce) => res.status(200).json({ message: 'disLike ajouté !' }))
            .catch(error => res.status(400).json({ error }));
        } else {
          sauce.findOne({ _id: req.params.id })
            .then(sauce => {
              if (sauce.usersLiked.includes(req.body.userId)) {
                sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                  .then((sauce) => res.status(200).json({ message: 'like supprimé !' })
                    .catch(error => res.status(400).json({ error })));
              } else if (sauce.usersDisliked.includes(req.body.userId)) {
                sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                  .then((sauce) => res.status(200).json({ message: 'disLike supprimé !' })
                    .catch(error => res.status(400).json({ error }))
                  )
              }
            })
            .catch(error => res.status(400).json({ error }));
        }
      }
  




