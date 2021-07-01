// Création du glider / carrousel
var glide = new Glide('.glide', {
  type: 'carousel',
  perView: 3,
  autoplay: 5000
}).mount()

// Gestion des boutons suivant / précèdent indépendamment de la librarie glide.js
var nextButton = document.querySelector('#next');
var prevButton = document.querySelector('#prev');

nextButton.addEventListener('click', function (event) {
  event.preventDefault();

  glide.go('>');
})

prevButton.addEventListener('click', function (event) {
  event.preventDefault();

  glide.go('<');
})

glide.mount();
