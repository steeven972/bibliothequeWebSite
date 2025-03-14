class Livre{
    constructor(isbn, titre,auteur, date, description, exemplaire,genre, couverture){
        this.isbn = isbn;
        this.titre = titre;
        this.auteur = auteur;
        this.date = date;
        this.description = description;
        this.exemplaire = exemplaire;
        this.disponible = true;
        this.genre = genre;
        this.couverture = couverture;
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
            span.innerHTML = "en stock";
        }
    }
    emprunter(quantity, disponible){
        let titreContent = this.titre;
        if (this.exemplaire > 0){
            this.exemplaire--;
            this.afficherDispo(disponible);
            quantity.innerHTML = `${this.exemplaire} en stock !`;
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
    quantity.innerHTML = `${livre.exemplaire} en stock !`;

    let disponible = document.createElement("span");
    disponible.classList.add("disponibleSpan");
    livre.afficherDispo(disponible);

    let couverture = document.createElement("div");
    couverture.classList.add("couverture")
    couverture.style.background = `url("${livre.couverture})`;
    couverture.style.backgroundSize = `cover`;
    couverture.style.backgroundPosition = `center`;
    

    livreDiv.appendChild(couverture);
    livreDiv.appendChild(titre);
    livreDiv.appendChild(auteur);
    //livreDiv.appendChild(description);
    livreDiv.appendChild(button);
    livreDiv.appendChild(quantity);
    //livreDiv.appendChild(disponible);
    

    document.querySelector(".catalogue").appendChild(livreDiv);
}


fetch("http://localhost:3000/api/livre")
        .then(response => response.json())
        .then(datas => {
            datas.forEach(data => {
                createLivre(new Livre(data.id, data.titre, data.auteur,data.annee, data.description,  data.quantity, data.genre, data.couverture))
            }); // Affiche la liste des livres dans la console
        })
        .catch(error => console.error("Erreur:", error));


//TODO add into db mysql

let roman1 = new Livre(154, 
    "Les miserable", 
    "victor Hugo", 
    "1862",  
    "Un roman sur la rédemption...",
    4,
    "roman",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA6T8sVzJVBPbCD0zTn9AOwwdEZ34iCdMnkg&s"
    
)

let manga1 = new Livre(583,
        "One Punch Man",
        "ONE",
        
        "2012",
        "Un super-héros qui bat ses ennemis...",
        2,
        "manga",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCIURk5-1VGhfxnAMWk645IviXB-ATBqEjTg&s"
    );
let roman2 = new Livre(25649,
        "1984",
        "George Orwell",
        "1949",
        "Un monde totalitaire sous surveillance...",
        0,
        "roman",
        "https://cdn1.booknode.com/book_cover/1216/full/1984-1215978.jpg"
        
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


