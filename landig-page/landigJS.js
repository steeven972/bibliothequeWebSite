class Livre{
    constructor(isbn, titre,auteur, date, description, exemplaire,genre ){
        this.isbn = isbn;
        this.titre = titre;
        this.auteur = auteur;
        this.date = date;
        this.description = description;
        this.exemplaire = exemplaire;
        this.disponible = true;
        this.genre = genre;
    }
    getDisponible(){
        if (this.exemplaire > 0 ){
            this.disponible = true;
            return this.disponible;
        }else{
            return false;
        }
    }
    afficherDispo(span){
        if(this.exemplaire <= 0){
            span.innerHTML = "Pas disponible !";
            
        }else{
            span.innerHTML = "Disponible";
        }
    }
    emprunter(quantity, disponible){
        let titreContent = this.titre;
        if (this.exemplaire > 0){
            this.exemplaire--;
            this.afficherDispo(disponible);
            quantity.innerHTML = this.exemplaire;
            console.log(titreContent + " a été emprunté !!");
        }else{
            console.log(titreContent + "n'est plus disponible !!")
        }
        
    }
}
    
class Roman extends Livre{
    constructor(isbn, titre,auteur, date, description, exemplaire, nombreChapitre ){
        super(isbn, titre, auteur, date, description, exemplaire);
        this.nombreChapitre = nombreChapitre;
    }
}
class RomanPolicier extends Roman{

}
class Manga extends Livre{
    constructor(isbn, titre,auteur,dessinateur, date, description, exemplaire,genre ){
        super(isbn, titre, auteur, date, description, exemplaire);
        this.genre = genre;
        this.dessinateur = dessinateur;
        
    }
}
class BD extends Livre{
    constructor(isbn, titre,auteur,illustrateur, date, description, exemplaire,collection ){
        super(isbn, titre, auteur, date, description, exemplaire);
        this.illustrateur = illustrateur;
        this.collection = collection;
        
    }
}   


function createLivre(livre) {
    let livreDiv = document.createElement("div");
    livreDiv.classList.add("livreDiv");

    
    livreDiv.dataset.titre = livre.titre.toLowerCase();
    livreDiv.dataset.auteur = livre.auteur.toLowerCase();
    livreDiv.dataset.genre = livre.genre.toLowerCase(); 

    let titre = document.createElement("p");
    titre.classList.add("titre");
    titre.innerHTML = `${livre.titre} <span>${livre.date}</span>`;

    let auteur = document.createElement("p");
    auteur.innerText = livre.auteur;

    let description = document.createElement("p");
    description.classList.add("description");
    description.innerText = livre.description;

    let button = document.createElement("button");
    button.classList.add("emprunter-btn");
    button.innerText = "Emprunter";
    button.onclick = function () {
        if (livre.getDisponible()) {
            livre.emprunter(quantity, disponible);
        }
    };

    let quantity = document.createElement("span");
    quantity.classList.add("quantity");
    quantity.innerHTML = livre.exemplaire;

    let disponible = document.createElement("span");
    disponible.classList.add("disponibleSpan");
    livre.afficherDispo(disponible);

    livreDiv.appendChild(titre);
    livreDiv.appendChild(auteur);
    livreDiv.appendChild(description);
    livreDiv.appendChild(button);
    livreDiv.appendChild(quantity);
    livreDiv.appendChild(disponible);

    document.querySelector(".catalogue").appendChild(livreDiv);
}


//TODO add into db mysql
let roman1 = new Livre(154, 
    "Les miserable", 
    "victor Hugo", 
    "1862",  
    "Un roman sur la rédemption...",
    4,
    "roman"
    
)

let manga1 = new Livre(583,
        "One Punch Man",
        "ONE",
        
        "2012",
        "Un super-héros qui bat ses ennemis...",
        2,
        "manga"
        
    );
let roman2 = new Livre(25649,
        "1984",
        "George Orwell",
        "1949",
        "Un monde totalitaire sous surveillance...",
        0,
        "roman"
        
    ); 
let list = [roman1, manga1, roman2];

for(livreElement of list){
    createLivre(livreElement);
}



function search() {
    const livresDivs = document.querySelectorAll(".livreDiv");
    const rechercheLower = document.getElementById("search-bar").value.toLowerCase(); 

    livresDivs.forEach((livreDiv) => {
        const titre = livreDiv.dataset.titre.toLowerCase();
        const auteur = livreDiv.dataset.auteur.toLowerCase();
        const genre = livreDiv.dataset.genre.toLowerCase();

       
        if (titre.includes(rechercheLower) || auteur.includes(rechercheLower) || genre.includes(rechercheLower)) {
            livreDiv.style.display = "flex"; 
            livreDiv.scrollIntoView();
        } else {
            livreDiv.style.display = "none"; 
        }
    });
}


