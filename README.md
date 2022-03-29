<<<<<<< HEAD
#  PIIQUANTE - openClassrooms
INTRODUCTION

Construisez une API sécurisée pour une application d'avis gastronomiques.
Avec ce projet nous sommes propulsées dans le Backend JS avec node.js.

Piquante est une marque de condiment à base de piment.

Le propriétaire de la marque voudrait que le projet soit une application web permettant aux utilisateurs d'ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres .

SÉCURITÉ


L'API doit respecter le RGPD et les normes OWASP.


Le mot de passe des utilisateurs doit être chiffré.

La sécurité de la base de données MongoDB (à partir d'un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l'application depuis sa machine.

L'authentification est renforcée sur les routes requises

Les mots de passe sont stockés de manière sécurisée.


Les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s'assurer de leur caractère unique et reporter des erreurs.

Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un jeton valide dans son en-tête d'autorisation).

Toutes les opérations de la base de données doivent utiliser le pack Mongoose avec des schémas de données stricts.

CONSTRUIT AVEC :


Node.js

Express

MongoDB (la connexion à mangodb se fait avec les informations indiquées dans le fichier .env)

Mongoose pour la communication ave mangoDB

Multer configuré ici de maninière à stocker les images de sauces.

MODULES DE SECURITE UTILISES :

Dotenv permet de travailler avec des variables d'environnement et de sécuriser les mots de passe.

Le casque permet à l'application de respecter les recommandations OWASP.

JWT est un module node.js qui permet de chiffrer les jetons d'authentification envoyés au client pour authentifier leur session, selon une clé définie par le développeur. Cette clé est généralement stockée dans le fichier .env.

Bcrypt permet de faire un "hash" du mot de passe du client, de manière à ce que cette chaîne de caractère ne soit pas transférée cotée serveur (mais seulement ce hash). Ainsi, lorsque l'utilisateur se connecte avec son mot de passe, ce mot de passe est de nouveau haché et comparé au hash du serveur.

POUR COMMENCER :  

Clonez le repository du Back ZAHIDETEDIK/BackEnd
npm instal si ce n'est pas déjà fait.

ainsi que des différents plugins et framework déjà énumérés si ce n'est pas déjà fait.

npm start pour lancer le server

Clonez le repository du dossier front WEB-DEVELOPERS-P6 pour accéder à l'application. 

