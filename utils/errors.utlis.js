/**
 *
 * Gestion des erreurs lors de l'enregistremment
 */
module.exports.singUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo")) {
    errors.pseudo = "Pseudo incorrect ou déjà pris";
  }

  if (err.message.includes("email")) {
    errors.email = "Email incorrect ";
  }

  if (err.message.includes("password")) {
    errors.password = "le mot de pass dois faire plus de 6 caractère";
  }

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo")) {
    errors.pseudo = "Ce pseudo est déjà enregistré";
  }

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")) {
    errors.email = "Cet email est déjà enregistré";
  }

  return errors;
};

module.exports.singInErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) {
    errors.email = "Email inconnu";
  }
  if (err.message.includes("password")) {
    errors.password = "Mot de passe incorrect ";
  }

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  if (err.message.includes("Format d'image invalide")) {
    errors.format = "Format incompatible";
  }

  if (err.message.includes("capcité depasser")) {
    errors.maxSize = "Le Fichier dépasse 500ko";
  }
  return errors;
};
