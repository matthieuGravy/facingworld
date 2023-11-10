const express = require("express");
const errorHandler = require("errorhandler");

const app = express();
const port = process.env.PORT || 3064;
console.log(port);

// Configuration du moteur de modèle Pug
app.set("view engine", "pug");
app.set("views", __dirname + "/views"); // Créez un dossier 'views' pour vos fichiers Pug

// Middleware pour gérer les erreurs en développement
if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
} else {
  // Middleware pour gérer les erreurs en production
  app.use((err, req, res, next) => {
    const code = err.code || 500;
    res.status(code).json({
      code: code,
      message: code === 500 ? null : err.message,
    });
  });
}

// Middleware pour servir les fichiers statiques depuis le dossier 'public'
app.use(express.static("public"));

// Route pour la page d'accueil rendue avec Pug
app.get("/", (req, res) => {
  res.render("index");
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
