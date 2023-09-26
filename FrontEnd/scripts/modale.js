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
  callApi()
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

//Recupere le bouton de croix pour fermer la modale
const closeButton = document.getElementById('close');
const closeButton2 = document.getElementById('close2') 

// on ecoute le click sur la croix pour fermer la modale 1
closeButton.addEventListener('click', () => {
  // Fermez le dialogue
  firstStepModal.close();
});

// on ecoute le click sur la croix pour fermer la modale 2
closeButton2.addEventListener('click', () => {
  // Fermez le dialogue
  secondStepModal.close();
});




 // Fonction pour afficher les œuvres dans la section "gallery"
 async function callApi(){
    let list ;
    try{
    const worksGEt = await fetch("http://localhost:5678/api/works");
    list = await worksGEt.json();
    displayWorks(list) 
    } catch (error) {
    console.error("erreue lors du fetch", error);
  }   
}
// modale qui affiche la gallerie
 function displayWorks(works) {
    const lesProjets = document.querySelector(".gallery-modal");
    
    console.log(lesProjets)
    lesProjets.innerHTML = ""; // Efface le contenu actuel pour éviter les duplications
  
    for (const article of works) {
      const workElement = document.createElement("article");
      workElement.classList.add("card")
      const divBouton = document.createElement("div")
      divBouton.classList.add("bouton-contener-card")

      const boutonDelete = document.createElement("button");
      boutonDelete.id = Number.isInteger(article.id) ? article.id : article.id.toString();

      boutonDelete.classList.add("bouton-S")
      //boutonDelete.addEventListener("click", () => handleDeleteClick(article));
      boutonDelete.addEventListener("click", function () {
        async function supprimerWork () {
          const workId = article.id
          const token = localStorage.getItem("mon_token")
          console.log(token);
          const promise = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers:{
              'Accept' : "*/*",
              "Authorization" : "Bearer " + token
            }
          });
          if(promise.ok === true){
            alert(`l'article a l'id ${workId} a ete supprimer avec succes`)
          } else{
            console.log(promise.status)
            throw new Error("impossible de supprimer l'article")
          }
         for(let article in works)    {
          console.log(boutonDelete.id)
          if(boutonDelete.id === article.id){
           supprimerWork()
           }
         }
       }
       supprimerWork()
    })

// *************** .       ****************
      const boutonItrash = document.createElement("i")
      boutonItrash.classList.add("fa-solid") 
      boutonItrash.classList.add("fa-trash-can")

      const boutonDeplacement = document.createElement("button")
      boutonDeplacement.classList.add("bouton-D")
       
      const boutonImove = document.createElement("i")
      boutonImove.classList.add("fa-solid") 
      boutonImove.classList.add("fa-up-down-left-right")

      const imageElement = document.createElement("img");
      imageElement.src = article.imageUrl;
  
      const nomElement = document.createElement("figcaption");
      nomElement.innerText = "editer"
  
      workElement.appendChild(divBouton)
      divBouton.appendChild(boutonDelete)
      divBouton.appendChild(boutonDeplacement)
      workElement.appendChild(imageElement);
      workElement.appendChild(nomElement);
      boutonDelete.appendChild(boutonItrash)
      boutonDeplacement.appendChild(boutonImove)

      lesProjets.appendChild(workElement);
    }
  }

 // Sélectionnez le formulaire et ajoutez un écouteur d'événements pour la soumission
const form = document.getElementById('FormAjoutWork');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupérez les valeurs des champs du formulaire
    const titre = document.getElementById('titre').value;
    const categorie = document.getElementById('categorie').value;
    const image = document.getElementById('btn-Ajout').files[0];

    // Validation des champs
    if (!titre || !categorie || !image) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return; // Arrêtez la soumission si des champs sont manquants
    }

    // Créez un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('categorie', categorie);
    formData.append('image', image);

    // Récupérez le token
    const mon_token = localStorage.getItem('mon_token');
console.log(mon_token)
    // Envoi des données au serveur
    fetch('http://localhost:5678/api/works', {   
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${mon_token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Une erreur s\'est produite lors de la soumission du formulaire.');
        }
        return response.json();
    })
    .then(data => {
        // Traitez la réponse du serveur ici (par exemple, affichez un message de succès)
        console.log(data);
        alert('Work ajouté avec succès');
        // Réinitialisez le formulaire
        form.reset();
        // Réinitialisez l'aperçu de l'image
        document.getElementById('imageP').src = '';
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des données au serveur:', error);
        alert('Une erreur s\'est produite lors de la soumission du formulaire.');
    });
});



const fileInput = document.getElementById('btn-Ajout');
const titreInput = document.getElementById('titre');
const categorieInput = document.getElementById('categorie');
const imageP = document.getElementById('imageP'); // Sélectionnez l'élément img pour prévisualiser l'image

fileInput.addEventListener('change', function () {
    const file = fileInput.files[0]; // Obtenez le fichier sélectionné

    if (file) {
        // Créez un objet URL pour le fichier
        const imageURL = URL.createObjectURL(file);

        // Affichez l'image prévisualisée dans l'élément img du bouton
        imageP.src = imageURL;
        imageP.style.display = 'block'; // Montrez l'élément d'image

        // Cachez la div image-preview
        const imagePreview = document.getElementById('image-preview');
        imagePreview.style.display = 'none';
    } else {
        // Cachez l'élément d'image s'il n'y a pas de fichier sélectionné
        imagePreview.style.display = 'none';

        // Affichez à nouveau la div image-preview
        const imagePreview = document.getElementById('image-preview');
        imagePreview.style.display = 'block';
    }
});


