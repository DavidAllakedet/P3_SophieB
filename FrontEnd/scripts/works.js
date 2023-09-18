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
  