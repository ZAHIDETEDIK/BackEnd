# PIIQUANTE - openClassrooms
INTRODUCTION

Construisez une API sécurisée pour une application d'avis gastronomiques.
Avecce projet nous sommes propulsées dans le Backend JS avec node.js.

Piiquante  est une  marque de  condiment à  base de piment.

La  propriétaire  de la marque voudrait que  le projet serait une application web permettant aux utilisateurs d'ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres .

SECURITE

L'API doit respecter le RGPD et les normes OWASP.


Le mot de passe des utilisateurs doit être chiffré.

La sécurité de la base de données MongoDB (à partir d'un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l'application depuis sa machine.

L'authentification est renforcée sur les routes requises

Les mots de passe sont stockés de manière sécurisée.


Les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s'assurer de leur caractère unique et reporter des erreurs.

Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un jeton valide dans son en-tête d'autorisation).

Toutes les opérations de la base de données doivent utiliser le pack Mongoose avec des schémas de données stricts.

CONSTRUIT  AVEC  :

Node.js

Express

MongoDB  ( la  connection  à  mangodb  se fai  a  avec  les  informations  indiqués  dans le fichier  .env)

Mongoose pour  la  communication ave  mangoDB

Multer configuré ici de maninière à stocker les image de sauces.

MODULES  DE  SECURIT  UTILISE :

Dotenv  permet de travailler avec des variable d'environn  et securiser les mots de passe.

Helmet permet a l'application de respecter les recommandations OWASP.

JWT est un module node.js qui permet de crypter les tokens d'authentification envoyés au client pour authentifier leur session, selon une clé définie par le développeur. Cette clé est généralement stockée dans le fichier .env.

Bcrypt permet de faire un "hash" du mot de passe du client, de maniere a ce que cette chaine de caractère ne soit pas stockées coté serveur (mais seulement ce hash). Ainsi lorsque l'utilisateur se connecte avec son mot de passe, ce mot de passe est de nouveau haché et comparé au hash du serveur.

POUR  COMMENCER:  

Clonez  le  repository  du  Back  ZAHIDETEDIK/BackEnd
npm instal  si ce n est pas déjà  fait.

ainsi que des different  plugins  et framework  deja enumeré si ce n'est pas deja fait.

start  npm

Clonez le repository  du  dossier  front WEB-DEVELOPERS-P6 pour acceder à l'application.  
