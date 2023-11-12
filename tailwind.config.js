/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.pug", // Ajoutez cette ligne pour inclure tous les fichiers Pug dans le dossier views
    "./public/**/*.html", // Ajoutez cette ligne si vous avez des fichiers HTML dans le dossier public
    "./app.js", // Ajoutez cette ligne si vous avez du code JavaScript dans le fichier app.js
    "./bienvenueModule.js", // Ajoutez d'autres chemins ou fichiers que vous souhaitez inclure ici
  ],
  theme: {
    /*
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "primary-bg": "#ffe4e6",
    },
    */
    extend: {},
  },
  plugins: [],
};
