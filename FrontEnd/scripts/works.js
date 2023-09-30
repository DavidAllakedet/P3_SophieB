// Fonction pour afficher les œuvres dans la section "gallery"
let works;

async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    works = await response.json();
}

async function displayWorks() {
    await fetchWorks();

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

// Fonction pour filtrer les œuvres en fonction de la catégorie
function filterWorks(category, button) {
  // Désactive la classe "active" de tous les boutons
  const buttons = document.querySelectorAll('.div-filtre button');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Active la classe "active" sur le bouton cliqué
  button.classList.add('active');

  if (category === 0) {
      // Si la catégorie est 0 (Tous), affichez toutes les œuvres
      displayWorks();
  } else {
      // filtrage en fonction de la catégorie
      const worksFiltrer = works.filter(work => work.categoryId === category);

      // appel de la fonction pour afficher les œuvres filtrées
      displayworksFiltrer(worksFiltrer);
  }
}


// Fonction pour afficher les œuvres filtrées
function displayworksFiltrer(worksFiltrer) {
    const lesProjets = document.querySelector(".gallery");
    lesProjets.innerHTML = ""; // Efface le contenu actuel pour éviter les duplications

    for (const article of worksFiltrer) {
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
const allFiltre = document.querySelector(".btn-all");
allFiltre.addEventListener("click", function () {
    filterWorks(0, allFiltre);
});

const appartFiltre = document.querySelector(".btn-apparts");
appartFiltre.addEventListener("click", function () {
    filterWorks(1, appartFiltre);
});

const hotelsFiltrees = document.querySelector(".btn-hotels");
hotelsFiltrees.addEventListener("click", function () {
    filterWorks(2, hotelsFiltrees);
});

const objetsFiltrees = document.querySelector(".btn-objets");
objetsFiltrees.addEventListener("click", function () {
    filterWorks(3, objetsFiltrees);
});

// Affiche toutes les œuvres initialement
displayWorks();
