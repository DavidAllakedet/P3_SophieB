/*********
 * 
 *         *******  Recuperations de tout les works    ******
 * 
 *********                                                              */
/*
const worksGEt = await fetch("http://localhost:5678/api/works")
const works = await worksGEt.json()


for(let i = 0;i < works.length; i++) {
    const article = works[i];
    // Recuperation de l'element qui va accueillir les works
    const lesProjets = document.querySelector(".gallery");
    // creation d'une balise dediee a un work
    const workElement = document.createElement("article");
    //creation d'une balise qui va recuperer l'image d'un work
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    // recuperation du name dechaque work
    const nomElement = document.createElement("figcaption")
    nomElement.innerText = article.title

    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.category.name //?? "(aucune catégorie)";

    // rattachement de la balise article a section
    lesProjets.appendChild(workElement);
    // rattachement de l'image et nom autres 
    workElement.appendChild(imageElement);
    workElement.appendChild(nomElement);
    workElement.appendChild(categorieElement);

}
*/
/*********
 * 
 *         *******  Filtres et tries   ******
 *  
 *********                                                          */
/*
 const allFiltre = document.querySelector("div .btn-all");

 allFiltre.addEventListener("click", function(){
     const worksFiltrees = works.filter(function(works){
         return works
     })
     console.log(worksFiltrees)
 })

const appartFiltre = document.querySelector("div .btn-apparts");

appartFiltre.addEventListener("click", function(){
    const worksFiltrees = works.filter(function(works){
        return works.categoryId === 2
    })
    console.log(worksFiltrees)
})

const hotelsFiltrees = document.querySelector("div .btn-hotels");

hotelsFiltrees.addEventListener("click", function(){
    const worksFiltrees = works.filter(function(works){
        return works.categoryId === 1
    })
    console.log(worksFiltrees)
})

const objetsFiltrees = document.querySelector("div .btn-objets");

objetsFiltrees.addEventListener("click", function(){
    const worksFiltrees = works.filter(function(works){
        return works.categoryId === 3
    })
    console.log(worksFiltrees)
})

 // creation bouton filtre                                                                     
/*
 function filtresWorks(categorie) {
    if (categorie === "btn-all"){
    console.log(worksGEt)
    } 
    else {
        const worksFiltrees = works.filter(work => work.category.name === categorie);
        filtresWorks(worksFiltrees)
    }
  
 }
 filtresWorks()
 //
 const buttonsFiltrees = document.querySelectorAll(".div-filtre button");
 buttonsFiltrees.forEach(button => {
    button.addEventListener("click", (event) => {
      const categorie = event.target.dataset.category;
      filtresWorks(categorie);
    });
  });

  console.log(worksGEt)
  */

  /*

  let works; // Declare works et le rend accessible

  async function displayWorksById(filteredWorks = null) {
    const lesProjets = document.querySelector(".gallery");
    lesProjets.innerHTML = ''; // vide le contenu avant d'afficher nouvelle liste filtree
  
    const worksToDisplay = filteredWorks || works; // If filteredWorks is provided, use it; otherwise, use all works
  
    for (const article of worksToDisplay) {
      const workElement = document.createElement("projet");
      const imageElement = document.createElement("img");
      imageElement.src = article.imageUrl;
      const nomElement = document.createElement("figcaption");
      nomElement.innerText = article.title;
      const categorieElement = document.createElement("p");
      categorieElement.innerText = article.category.name;
  
      workElement.appendChild(imageElement);
      workElement.appendChild(nomElement);
      workElement.appendChild(categorieElement);
  
      lesProjets.appendChild(workElement);
    }
  }
  
  // Fetch et affiche tout les  works
  (async function () {
    const worksGEt = await fetch("http://localhost:5678/api/works");
    works = await worksGEt.json();
    displayWorksById(); // affiche tout les  works
  })();
  
  /*********
   * 
   *         *******  Filtres et tries   ******
   *  
   *********                                                          */
  /*
  const allFiltre = document.querySelector("div .btn-all");
  allFiltre.addEventListener("click", function () {
    displayWorksById(); // affiche tout les  works
  });
  
  const appartFiltre = document.querySelector("div .btn-apparts");
  appartFiltre.addEventListener("click", function () {
    const worksFiltrees = works.filter(function (work) {
      return work.categoryId === 2;
    });
    displayWorksById(worksFiltrees); //  affiche les projects filtrees par categoryId 2 (Appartements)
  });
  
  const hotelsFiltrees = document.querySelector("div .btn-hotels");
  hotelsFiltrees.addEventListener("click", function () {
    const worksFiltrees = works.filter(function (work) {
      return work.categoryId === 3;
    });
    displayWorksById(worksFiltrees); // affiche les projects filtrees par categoryId 1 (Hotels & restaurants)
  });
  
  const objetsFiltrees = document.querySelector("div .btn-objets");
  objetsFiltrees.addEventListener("click", function () {
    const worksFiltrees = works.filter(function (work) {
      return work.categoryId === 1;
    });
    displayWorksById(worksFiltrees); //  affiche les projects filtrees par categoryId  3 (Objets)
  });
  */

  // Fonction pour afficher les œuvres dans la section "gallery"
let works ;
const worksGEt = await fetch("http://localhost:5678/api/works");
works = await worksGEt.json();

function displayWorks(works) {
    const lesProjets = document.querySelector(".gallery");
    lesProjets.innerHTML = ""; // Efface le contenu actuel pour éviter les duplications
  
    for (const article of works) {
      const workElement = document.createElement("article");
      const imageElement = document.createElement("img");
      imageElement.src = article.imageUrl;
  
      const nomElement = document.createElement("figcaption");
      nomElement.innerText = article.title;
  
      const categorieElement = document.createElement("p");
      categorieElement.innerText = article.category.name;
  
      workElement.appendChild(imageElement);
      workElement.appendChild(nomElement);
      workElement.appendChild(categorieElement);
  
      lesProjets.appendChild(workElement);
    }
  }


// code Mentor

/*
async function recupererListeDesCategories() {
  const url = "http://localhost:5678/api/categories"
  const rawResponse = await fetch(url)
  const json = await rawResponse.json()
  return json
}

function categoryExists(list, id) {
  for (let category of list) {
    if (category === id) {
      return true
    }
  }
  return false
}

// on veut que la fonction nous retourne les travaux filtrés en fonction de la valeur qu'on lui donne.
// si la valeur n'existe pas ou n'est pas fournie, alors on retourne tout.
async function filterWorks(id) {
  const categories = await recupererListeDesCategories()
  if (categoryExists(categories, id)) {
    console.log(works.filter((work) => work.categoryId === id))
    return works.filter((work) => work.categoryId === id)
  } else {
    console.log(works)
    return works
  }
}
*/




  // Événements pour les filtres
  
  const allFiltre = document.querySelector("div .btn-all");
  allFiltre.addEventListener("click", function () {
    displayWorks(works); // Affiche toutes les projets
  });
  
  const appartFiltre = document.querySelector("div .btn-apparts");
  appartFiltre.addEventListener("click", function () {
    const worksFiltrees = works.filter((work) => work.categoryId === 2);
    displayWorks(worksFiltrees); // Affiche les projets avec categoryId === 2 (Appartements)
  });
  
  const hotelsFiltrees = document.querySelector("div .btn-hotels");
  hotelsFiltrees.addEventListener("click", function () {
    const worksFiltrees = works.filter((work) => work.categoryId === 3);
    displayWorks(worksFiltrees); // Affiche les projets avec categoryId === 1 (Hotels & restaurants)
  });
  
  const objetsFiltrees = document.querySelector("div .btn-objets");
  objetsFiltrees.addEventListener("click", function () {
    const worksFiltrees = works.filter((work) => work.categoryId === 1);
    displayWorks(worksFiltrees); // Affiche les projets avec categoryId === 3 (Objets)
  });
  
  // Affiche toutes les œuvres initialement
  displayWorks(works);
  