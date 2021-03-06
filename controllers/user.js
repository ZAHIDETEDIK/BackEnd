// Chiffrer le mot de passe
const bcrypt = require('bcrypt');
const dotenv=require('dotenv');
dotenv.config();

//Package token
const jwt = require('jsonwebtoken');

// Importer l'utilisateur
const User = require('../models/User');

// Inscription de l'utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  // Connexion de l'utilisateur
  exports.login = (req, res, next) => {
    // recherche de l 'utilisateur dans la base de données
    User.findOne({ email: req.body.email })
      .then(user => {

        // Si on ne trouve pas l 'utilisateur
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        //compare le mot de passe de la requete avec celui de la base de données
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              // Création d'un token pour sécuriser le compte de l 'utilisateur
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    };