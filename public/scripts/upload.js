// Fonction qui vérifie si le champ d'upload d'image est remplit; si oui, le bouton d'envoi de requête s'active
function checkFile() {
  let image = document.getElementById("image");
  let button = document.getElementById("button");
  if (image.files.length !== 0) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", true);
  }
}
