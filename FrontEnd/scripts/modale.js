// async function afficherWorksModale (){
//     const reponse = await fetch("http://localhost:5678/api/works")
//     const json = await reponse.json()
// }
// JSON.forEach(work => {
//     const worksDiv = document.querySelector(".galerie");
//     const Elementfigure = document.createElement("figure")
//     Elementfigure.classList.add("figure-modale")
//     Elementfigure.setAttribute("id", "works" + work.id)
// //
//     const Elementimg = document.createElement("img")
//     Elementimg.src = work.imageUrl
//     Elementimg.setAttribute("crossorigin", "anonymous" )
// //
//     const ElementFigcaption = document.createElement("figcaption")
//     ElementFigcaption.innerText = "editer"
// //
//     const deleteBouton = document.createElement("button")
//     deleteBouton.setAttribute("id", work.id)

//     deleteBouton.setAttribute("onclick", "deleteWorks(this.id)")
//     deleteBouton.classList.add("bouton-modale-delete")
//     const trashIcone = document.querySelector("trash-icone")
//     const iconeMove = document.querySelector(".icone-move")
    
//     worksDiv.appendChild(Elementfigure)
//     Elementfigure.appendChild(Elementimg)
//     Elementfigure.appendChild(ElementFigcaption)
//     Elementfigure.appendChild(deleteBouton)
//     deleteBouton.appendChild(trashIcone)
//     deleteBouton.appendChild(iconeMove)
// });


// recuperer les modales
const modal = document.getElementById("myModal");

//recuperer les boutons qui ouvrent les modales
const btn = document.getElementById("myBtn");

// recuperer les elements <span> qui ouvrent les modales
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

btn.onclick = function() {
    callApi()
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/****************** .   ****** **********/
// Get the modal
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btnAjout = document.getElementById("btn-Ajout");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks on the button, open the modal
btnAjout.onclick = function() {
  modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}


// /**********     modale2  ***********/

// document.addEventListener("DOMContentLoaded", function () {
//   const modal2 = document.getElementById("myModal2");
//   const btnAjout = document.getElementById("btn-ajout");
//   const span2 = document.getElementsByClassName("close2")[0];
//   const formModal2 = document.getElementById("modal2-form")

//   btnAjout.onclick = function () {
//     formModal2.style.display = "block";
//   };

//   span2.onclick = function () {
//     modal2.style.display = "none";
//   };

//   window.onclick = function (event) {
//     if (event.target == modal2) {
//       modal2.style.display = "none";
//     }
//   };
// });





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
      boutonDelete.addEventListener("click", function (e) {
        e.preventDefault()
         supprimerWork(e)
      })
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
   function supprimerWork (e) {
    const workId = parseInt(e.target.id);
    const articleRec = document.querySelector("card")
    console.log(articleRec)
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
    }).then((response) => response.json())
   }
  // async function supprimerWork(e) {
  //   const workId = parseInt(e.target.id);
  //   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"; // Replace this with the actual token if needed
  
  //   try {
  //     const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
  //       method: "DELETE",
  //       headers: {
  //         authorization: `bearer ${token}`,
  //         accept: "application/json",
  //       },
  //     });
  
  //     if (response.status === 200) {
  //       console.log("supprimer avec succes!");
  //       // Call the API again to refresh the works list after deletion
  //       callApi();
  //     } else {
  //       console.error("impossible de supprimer");
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de l'envoie des donnees:", error);
  //   }
  // }
  
  
  // The function supprimerWork() call here seems to be redundant and can be removed.
  // It should only be called when the delete button is clicked in the displayWorks function.
  
 
 
