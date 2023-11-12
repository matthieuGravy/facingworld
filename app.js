const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");

//import le message h2
const bienvenueModule = require("./bienvenueModule");

const app = express();
const port = process.env.PORT || 3064;
console.log(port);

// Configurer body-parser pour analyser les données JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configuration taiwind
app.use("/assets", express.static("assets"));

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

app.get("/contact", (req, res) => {
  res.render("formulaire");
});

// Autres routes ici
app.post("/check-form", (req, res) => {
  const nom = req.body.nom;
  const prenom = req.body.prenom;

  const resultat = { nom, prenom };

  res.render("resultat", { resultat });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
