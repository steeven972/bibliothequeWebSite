
 
class Utilisateur{
    constructor(username, email, password){
        this.username = username;
        this.password = password;
        this.email = email;
        this.livresEmprunter = [];
        this.livresVente = [];
    }
    emprunt(livre){
        this.livresEmprunter.push(livre);
    }
    vend(livre){
        this.livresVente.push(livre);
    }
    
}

function submitForm(event){
    event.preventDefault();

    try{
        let user1 = new Utilisateur(username.value, email.value, password.value);
        console.log("New user created !");
        console.log("User name =" + user1.username);
        location.href = "./landig-page/bibliotheque-landig.html";
        return true;
    }
    catch(e){
        console.log("Error created");
    }
    return false;
    
}





