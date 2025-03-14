
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

const formUser = document.getElementById("formUser");
formUser.addEventListener("submit", async function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs du formulaire
    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
   
    // Envoyer les données avec fetch()
    try {
        const response = await fetch("http://localhost:3000/landig", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, 
                email,
                password
            })
        });

        const result = await response.json();
        alert(result.message); // Affiche un message de confirmation

        location.href = "./landig-page/bibliotheque-landig.html"

    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
    }
});

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





