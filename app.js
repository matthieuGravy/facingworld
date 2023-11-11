const express = require("express");
const path = require("path");
const errorHandler = require("errorhandler");

//import le message h2
const bienvenueModule = require("./bienvenueModule");

const app = express();
const port = process.env.PORT || 3064;
console.log(port);

// Configuration du moteur de modèle Pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); // Créer un dossier 'views' pour les fichiers Pug

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
  res.render("index", {
    contentBienvenue: bienvenueModule.messageBienvenue,
  });
});

// Autres routes ici

// Route pour récupèrer data côté client
app.get("/api/data", (req, res) => {
  res.json({ message: "Données du serveur pour le client" });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
