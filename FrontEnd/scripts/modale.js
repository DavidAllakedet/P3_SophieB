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
    updateHomePageWorks()
  }
  updateHomePageWorks()
});

//Recupere le bouton de croix pour fermer la modale
const closeButton = document.getElementById('close');
const closeButton2 = document.getElementById('close2') 

// on ecoute le click sur la croix pour fermer la modale 1
closeButton.addEventListener('click', () => {
  // Fermerle dialogue
  firstStepModal.close();

  window.location.reload();
});

// on ecoute le click sur la croix pour fermer la modale 2
closeButton2.addEventListener('click', () => {
  // Fermer le dialogue
  secondStepModal.close();
});




 // Fonction pour afficher les works dans la section "gallery"
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
    
    // Efface le contenu actuel pour éviter les duplications
    console.log(lesProjets)
    lesProjets.innerHTML = ""; 
  
    for (const article of works) {
      const workElement = document.createElement("article");
      workElement.classList.add("card")
      const divBouton = document.createElement("div")
      divBouton.classList.add("bouton-contener-card")

      const boutonDelete = document.createElement("button");
      boutonDelete.id = Number.isInteger(article.id) ? article.id : article.id.toString();

      boutonDelete.classList.add("bouton-S")
      



   // Fonction pour mettre à jour la liste des works sur la page d'accueil
   async function updateAccueilWorks() {
    try {
      // Effectuez un appel AJAX pour récupérer la liste des works
      const response = await fetch('http://localhost:5678/api/works');
  
      if (response.ok) {
        const updatedWorksList = await response.json();
  
        // Mettez à jour l'interface utilisateur avec la nouvelle liste des works
        displayWorks(updatedWorksList);
      } else {
        throw new Error('Erreur lors de la récupération des works');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la liste des works sur la page d\'accueil', error);
    }
  }

     // Supprimer un élément de la galerie par son ID
    function removeWorkById(workId) {
      const gallery = document.querySelector(".gallery");
      const imageToDelete = gallery.querySelector(`[data-id="${workId}"]`);
      
      if (imageToDelete) {
        imageToDelete.remove();
      }
    }

// Fonction pour supprimer un work
async function supprimerWork(workId) {
  try {
    const token = localStorage.getItem("mon_token");
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        'Accept': '*/*',
        "Authorization": "Bearer " + token
      }
    });

    if (response.ok) {
      // Afficher une alerte pour indiquer que la suppression a réussi
      alert(`Le work a été supprimé avec succès.`);

      // Supprimer l'élément de la galerie sans fermer la modale
      removeWorkById(workId);

      // Mise à jour de la liste des images dans la page d'accueil
      await callApi();

      // Appelez la fonction pour mettre à jour la liste des works sur la page d'accueil
      updateAccueilWorks();
    } else {
      console.error("Erreur lors de la suppression du work");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du work", error);
  }
}

// Écouteur d'événement pour le bouton de suppression dans la modale
boutonDelete.addEventListener("click", function () {
  const workId = Number.isInteger(article.id) ? article.id : article.id.toString();
  supprimerWork(workId);
});


      // Fonction pour mettre à jour la liste des works sur la page d'accueil
    
   
// *************** .      ****************
      const boutonItrash = document.createElement("i")
      boutonItrash.classList.add("fa-solid") 
      boutonItrash.classList.add("fa-trash-can")

      // const boutonDeplacement = document.createElement("button")
      // boutonDeplacement.classList.add("bouton-D")
       
      // const boutonImove = document.createElement("i")
      // boutonImove.classList.add("fa-solid") 
      // // boutonImove.classList.add("fa-up-down-left-right")

      const imageElement = document.createElement("img");
      imageElement.src = article.imageUrl;
  
      // const nomElement = document.createElement("figcaption");
      // // nomElement.innerText = "editer"
  
      workElement.appendChild(divBouton)
      divBouton.appendChild(boutonDelete)
      // divBouton.appendChild(boutonDeplacement)
      workElement.appendChild(imageElement);
      // workElement.appendChild(nomElement);
      boutonDelete.appendChild(boutonItrash)
      // boutonDeplacement.appendChild(boutonImove)

      lesProjets.appendChild(workElement);
    }
  }




  //********* Partie de code pour poster les nouveaux works *********

// Sélectionner le formulaire et ajouter un écouteur d'événements pour la soumission
const form = document.getElementById('FormAjoutWork');
const BtnValider = document.getElementById('valider');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupérer les valeurs des champs du formulaire
    const titre = document.getElementById('titre').value;
    const categorie = document.getElementById('categorie').value;
    const image = document.getElementById('btn-Ajout').files[0];

    // Validation des champs
    if (!titre || !categorie || !image) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return; // Arrêter la soumission si des champs sont manquants
    }

    // Créez un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append('title', titre);
    formData.append('category', categorie);
    formData.append('image', image);

    // Récupère le token
    const mon_token = localStorage.getItem('mon_token');
    
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
        // Traiter la réponse du serveur ici (par exemple, afficher un message de succès)
        console.log(data);
        alert('Work ajouté avec succès');

        // Appeler la fonction pour ajouter le nouveau travail à la galerie
        addWorkToGallery(data);

        // Fermer la modale "secondStepModal"
        secondStepModal.close();

        // Ouvrir la modale "firstStepModal"
        firstStepModal.showModal();

        callApi()
        // Réinitialiser le formulaire
        form.reset();

        // Réinitialiser l'aperçu de l'image et cacher l'élément d'image
        document.getElementById('image-preview').src = '';
        imageP.style.display = 'none';

        // Afficher la div qui contient l'image
        const imagePreview = document.getElementById('image-preview');
        imagePreview.style.display = 'block';

         // Actualise la page d'accueil
         closeButton.addEventListener('click', () => {
         // Actualise la page d'accueil
         window.location.reload();
         });
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des données au serveur:', error);
        alert('Une erreur s\'est produite lors de la soumission du formulaire.');
    });
});

function addWorkToGallery(data) {
  // Créez un nouvel élément HTML pour représenter le work sur la page d'accueil
  const newWorkElement = document.createElement("article");
  newWorkElement.classList.add("card");

  // Stockez l'ID dans un attribut de données personnalisé
  newWorkElement.dataset.id = data.id; // Assurez-vous que data.id contient l'ID du work

  const divBouton = document.createElement("div");
  divBouton.classList.add("bouton-contener-card");

  const imageElement = document.createElement("img");
  imageElement.src = data.imageUrl;

  // Créez un élément pour le titre
  const titleElement = document.createElement("p");
  titleElement.textContent = data.title;

  // Créez un élément pour la catégorie
  const categoryElement = document.createElement("p");
  categoryElement.textContent = data.category;

  // Ajoutez le nouvel élément à la liste des works sur la page d'accueil
  newWorkElement.appendChild(divBouton);
  newWorkElement.appendChild(imageElement);
  newWorkElement.appendChild(titleElement); // Ajoutez le titre
  newWorkElement.appendChild(categoryElement); // Ajoutez la catégorie

  const gallery = document.querySelector(".gallery");
  // Ajoutez le nouvel élément à la liste existante
  gallery.appendChild(newWorkElement); // Ajoutez le nouvel élément à la liste existante
}

// function removeWorkById(workId) {
//   const gallery = document.querySelector(".gallery");
//   const workToRemove = gallery.querySelector(`[data-id="${workId}"]`);
  
//   if (workToRemove) {
//       workToRemove.remove(); // Supprime l'élément de la galerie
//   }
// }




//         // Fermerla modale "secondStepModal"
//         secondStepModal.close();

//         // Ouvrerla modale "firstStepModal"
//         firstStepModal.showModal();

//         callApi()

//          // Réinitialise le formulaire
//          form.reset();
//         // Réinitialiserl'aperçu de l'image et Cache l'élément d'image
//         document.getElementById('image-preview');
//         imageP.style.display = 'none'; 

//         //Montre la div qui contient l'image
//         const imagePreview = document.getElementById('image-preview');
//         imagePreview.style.display = 'block';

//         // Actualise la page d'accueil
//         closeButton.addEventListener('click', () => {
//           // Actualise la page d'accueil
//           window.location.reload();
//       });
//     })
//     .catch(error => {
//         console.error('Erreur lors de l\'envoi des données au serveur:', error);
//         alert('Une erreur s\'est produite lors de la soumission du formulaire.');
//     });
//     callApi()
// });


// ****** Partie de code pour previsualisation de li'image ********

const fileInput = document.getElementById('btn-Ajout');
const titreInput = document.getElementById('titre');
const categorieInput = document.getElementById('categorie');
const imageP = document.getElementById('imageP'); // Sélectionnerl'élément img pour prévisualiser l'image

fileInput.addEventListener('change', function () {
    const file = fileInput.files[0]; // Obtener le fichier sélectionné

    if (file) {
        // Créer un objet URL pour le fichier
        const imageURL = URL.createObjectURL(file);

        // Afficher l'image prévisualisée dans l'élément img du bouton
        imageP.src = imageURL;
        imageP.style.display = 'block'; 

        // Cacherla div image-preview
        const imagePreview = document.getElementById('image-preview');
        imagePreview.style.display = 'none';
    } else {
        // Cacher l'élément d'image s'il n'y a pas de fichier sélectionné
        imagePreview.style.display = 'none';

        // Afficher à nouveau la div image-preview
        const imagePreview = document.getElementById('image-preview');
        imagePreview.style.display = 'block';
    }
});


// *************** verification des champs du formulaire d'ajout work

const imageInput = document.getElementById('btn-Ajout')

// Ajouterdes écouteurs d'événements pour les champs du formulaire
titreInput.addEventListener('input', checkFormFields);
categorieInput.addEventListener('input', checkFormFields);
imageInput.addEventListener('change', checkFormFields);

function checkFormFields() {
  const titre = titreInput.value;
  const categorie = categorieInput.value;
  const image = imageInput.files[0]; 

  if (titre && categorie && image) {
    // Si tous les champs sont remplis, activer le bouton Valider (passer en vert)
    envoyerButton.style.backgroundColor = '#1D6154';
    envoyerButton.style.color = 'white';
    envoyerButton.disabled = false;
  } else {
    // Si un champ est manquant, désactiver le bouton Valider (passer en gris)
    envoyerButton.style.backgroundColor = '#A7A7A7';
    envoyerButton.style.color = 'white'; 
    // envoyerButton.disabled = true;
  }
}

// Sélectionnerle bouton "Envoyer" par son ID
const envoyerButton = document.getElementById('envoyer');

// Ajouterun écouteur d'événements "click" sur le bouton
envoyerButton.addEventListener('click', function () {

  console.log('Bouton "Envoyer" cliqué.'); // Ajouterce log pour vérifier si l'événement est déclenché
  // Récupérerles valeurs des champs du formulaire
  const titre = document.getElementById('titre').value;
  const categorie = document.getElementById('categorie').value;
  const image = document.getElementById('btn-Ajout').files[0];

  // Vérifiersi l'un des champs est vide
  if (!titre || !categorie || !image) {
    // Afficherune alerte indiquant que tous les champs doivent être remplis
    alert('Veuillez remplir tous les champs du formulaire.');
  } else {
    envoyerButton.style.backgroundColor = '#A7A7A7';
    envoyerButton.style.color = 'white';
  }
});

// Appelerla fonction initiale pour vérifier l'état initial du formulaire
checkFormFields();



// ********** Authenfication pour acceder aux modales **********


// Vérification côté client pour l'authentification
const isAuthenticated = localStorage.getItem("mon_token") !== null;

// Sélectionnerle bouton "Modifier"
const modifierButton = document.getElementById("firstStepModalBtn");

// Ajouterun écouteur d'événements au bouton "Modifier"
modifierButton.addEventListener('click', function () {
  if (!isAuthenticated) {
    // Afficher une alerte avec un emoji sourire
    alert('Cliquez sur ok pour vous connecter afin d\'accéder à cette fonctionnalité 😊.')
    // Si l'utilisateur n'est pas authentifié, redirigé vers la page de connexion
    window.location.href = "/login.html"; 
  } else {
    // Si l'utilisateur est authentifié la modal s'ouvre.
    const firstStepModal = document.getElementById('firstStepModal');
    firstStepModal.showModal();
  }
});




