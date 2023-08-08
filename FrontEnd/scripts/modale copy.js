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


// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
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

 // Fonction pour afficher les œuvres dans la section "gallery"
 async function callApi(){
    let list ;
    const worksGEt = await fetch("http://localhost:5678/api/works");
    list = await worksGEt.json();
    displayWorks(list) 
    
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
      boutonDelete.classList.add("bouton-S")
      // boutonDelete.addEventListener("click", function (e) {
      //   e.preventDefault()
      //   supprimerWork(e)
      // })
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
// // async function supprimerWork(e){
// //   const imgId = parseInt(e.target.id)
// //   await fetch("http://localhost:5678/api/works/${imgId}",{
// //     method: "DELETE",
// //     headers: {
// //      authorization: "bearer ${token}",
// //      accept: "application/json",
// //       },
// //   })
// //   .then((response) => {
// //     if (response.status === 200) {
// //       console.log("supprimer avec succes!")
// //     } else {
// //       console.error("Impossible de supprimer")
// //     }
// //   })
// //     .catch((error) => {
// //       console.error("erreur de l'envoie des donnees")
// //     })
// //   }
//   supprimerWork()
 
 
