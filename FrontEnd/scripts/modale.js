// recuperer les modales
const modal = document.getElementById("myModal");

//recuperer les boutons qui ouvrent les modales
const btn = document.getElementById("myBtn");

// recuperer les elements <span> qui ouvrent les modales
const span = document.getElementsByClassName("close")[0];

// Quand l'utilisateur click sur lr bouton ,le modale s'ouvre

btn.onclick = function() {
    callApi()
  modal.style.display = "block";
}

// Quand l'utilisateur click sur le span ,la modale se ferme 
span.onclick = function() {
  modal.style.display = "none";
}

//Quand l'utilisateur clique n'importe ou en dehors de la modale ca ferme la modale
window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
    }
}

/******************  modale2  ****** **********/
// recuperer la modale
var modal2 = document.getElementById("myModal2");

//recuperer le bouton qui ouvre la modale
var btnAjout = document.getElementById("btn-Ajout");

// recuperer l'element du span qui ferme la modale
var span2 = document.getElementsByClassName("close2")[0];

// Quand l'utilisateur clique sur le bouton ca ouvre la modale 
btnAjout.onclick = function() {
  modal2.style.display = "block";
}

// Quand l'utilisateur clique sur sapn, ca ferme la modale
span2.onclick = function() {
  modal2.style.display = "none";
}

//Quand l'utilisateur clique n'importe ou en dehors de la modale ca ferme la modale
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

/******************  modale3  ****** **********/
// recuperer la modale 3
var modal3 = document.getElementById("myModal3");

//recuperer le bouton qui ouvre la modale
var btnValider = document.getElementById("valider");

// recuperer l'element du span qui ferme la modale
var span3 = document.getElementsByClassName("close3")[1];

// Quand l'utilisateur clique sur le bouton ca ouvre la modale 
btnValider.onclick = function() {
  modal3.style.display = "block";
}

// Quand l'utilisateur clique sur sapn, ca ferme la modale
span3.onclick = function() {
  modal3.style.display = "none";
}

//Quand l'utilisateur clique n'importe ou en dehors de la modale ca ferme la modale
window.onclick = function(event) {
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
}

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

//   // ****** Ajouter un nouveau work *******

//     document.getElementById("FormAjoutWork").addEventListener("submit", function (e) {
//     e.preventDefault(); // Empêche le comportement par défaut du formulaire

//     const formData = new FormData(document.getElementById("FormAjoutWork"));
//     const token = localStorage.getItem("mon_token");

//     fetch("http://localhost:5678/api/works", {
//         method: "POST",
//         headers: {
//             "Authorization": "Bearer " + token
//         },
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Traiter la réponse du serveur ici
//         console.log(data);
//     })
//     .catch(error => {
//         console.error("Erreur lors de l'envoi de la requête POST : ", error);
//     });
// });

// // Sélectionnez l'élément d'entrée de fichier et l'élément de prévisualisation d'image
// const fileInput = document.getElementById('btn-Ajout');
// const imagePreview = document.getElementById('image-preview');

// // Écoutez l'événement de changement de fichier sur l'élément d'entrée de fichier
// fileInput.addEventListener('change', function () {
//     const file = fileInput.files[0]; // Obtenez le fichier sélectionné

//     if (file) {
//         // Créez un objet URL pour le fichier
//         const imageURL = URL.createObjectURL(file);

//         // Affichez l'image prévisualisée dans l'élément img
//         imagePreview.src = imageURL;
//         imagePreview.style.display = 'block'; // Montrez l'élément d'image
//     } else {
//         // Cachez l'élément d'image s'il n'y a pas de fichier sélectionné
//         imagePreview.style.display = 'none';
//     }
// });
document.getElementById("FormAjoutWork").addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche le comportement par défaut du formulaire

  const formData = new FormData(document.getElementById("FormAjoutWork"));
  const token = localStorage.getItem("mon_token");

  // Récupérez le fichier sélectionné par l'utilisateur
  const file = formData.get("image");

  // Vérifiez si un fichier a été sélectionné
  if (file) {
      // Créez un objet URL pour le fichier
      const imageURL = URL.createObjectURL(file);

      // Affichez l'image prévisualisée dans l'élément img
      const imagePreview = document.getElementById('image-preview');
      imagePreview.src = imageURL;
      imagePreview.style.display = 'block'; // Montrez l'élément d'image

      // Envoyez le formulaire avec l'image
      fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
              "Authorization": "Bearer " + token
          },
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          // Traitez la réponse du serveur ici
          console.log(data);
      })
      .catch(error => {
          console.error("Erreur lors de l'envoi de la requête POST : ", error);
      });
  } else {
      // Gérez le cas où aucun fichier n'a été sélectionné
      console.error("Aucun fichier sélectionné.");
  }
});


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

  
 
 
