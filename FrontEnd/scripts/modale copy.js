// Boutons pour ouvrir les modales
const firstStepModalBtn = document.getElementById('firstStepModalBtn');
const secondStepModalBtn = document.getElementById('secondStepModalBtn');

// Sélecteur Modales
const firstStepModal = document.getElementById('firstStepModal');
const secondStepModal = document.getElementById('secondStepModal');

// On écoute le click sur le bouton pour ouvrir la modale
firstStepModalBtn.addEventListener('click', () => {
  const firstStepModal = document.getElementById('firstStepModal');
  firstStepModal.showModal();
});

// Pour ouvrir la seconde modale on écoute le click sur le bouton de la première modale
secondStepModalBtn.addEventListener('click', () => {
  firstStepModal.close();
  secondStepModal.showModal();
});

// On écoute le click sur la fenêtre si la modale est ouverte et que l'élément cliqué est différent de la fenêtre alors on ferme la modale
window.addEventListener('click', (e) => {
  if ((e.target == firstStepModal && firstStepModal.open) || (e.target == secondStepModal && secondStepModal.open)) {
    firstStepModal.close();
    secondStepModal.close();
  }
});