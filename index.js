
class Utilisateur{
    constructor(username, email, password){
        this.username = username;
        this.password = password;
        this.email = email;
        this.livresEmprunter = [];
        this.livresRendu = [];
    }
    emprunt(livre){
        this.livresEmprunter.push(livre);
    }
    rendre(livre){
        this.livresRendu.push(livre);
    }
    
}


function submitForm(event){
    event.preventDefault();

    try{
        let user1 = new Utilisateur(username.value, email.value, password.value);
        console.log("New user created !");
        console.log("User name =" + user1.username);
        
        return true;
    }
    catch(e){
        console.log("Error created");
    }
    return false;
    
}





fetch("http://localhost:3000/landig")
        .then(response => response.json())
        .then(data => {
            console.log("test: " + data); // Affiche la liste des livres dans la console
        })
        .catch(error => console.error("Erreur:", error));

