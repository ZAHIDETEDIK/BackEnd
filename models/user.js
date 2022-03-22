const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Création du model User pour stockage dans la base de données
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// UniqueValidator pour éviter que plusieur utilisateurs s'inscrivent avec le même mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);