const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const salt =10;
const User = require('../models/user');

exports.signup = (req, res,) => {
    bcrypt.hash(req.body.password, salt)
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
  exports.login = (req,res) => { 
    console.log(req)
  User.findOne({  email: req.body.email })

  .then((user) => {
    if (!user) { 
    return res.status(401).json({ error:"utilisateur non trouvé!"});
  }
  console.log(user);
  bcrypt.compare(req.body.password,user.password)
  .then((valid)=>{
    if (!valid){
      return res.status(401).json({error:'mot de passe incorrect!'});
    }
    console.log(valid);
    res.status(200).json({
      userId:user._id,
      token:jwt.sign({ userId:'user._id'},
      process.env.JWPRIVATEKEY, { expiresIn:60*60}
)
    });
  })
  .catch(error =>res.status(500).json({ error}));
})
  .catch(error => res.status(500).json({error}));
};