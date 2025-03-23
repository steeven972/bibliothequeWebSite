
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

class Admin extends Utilisateur{
    constructor(username, email, password){
        this.username = username; 
        this.email = email;
        this.password = password
        this.livresEmprunter = [];
        this.livresRendu = [];

    }

    addLivre(livre){
        this.livresEmprunter.push(livre);
    }
    emprunt(){
        this.addLivre;
    }
}

const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", async function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs du formulaire
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
   
    // Envoyer les données avec fetch()
    try {
        const response = await fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, 
                email,
                password
            })
        });

        const result = await response.json();
        alert(result.message); 
        //redirection
        if (response.ok){
            window.location.href = "./landig-page/bibliotheque-landig.html";
        }

    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
    }
});

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;
   
    // Envoyer les données avec fetch()
    try {
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const result = await response.json();
        alert(result.message); 
        //redirection
        if(response.ok){
            window.location.href = "http://localhost:4000/landig-page/bibliotheque-landig.html";
        }
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

const switchBtn = document.querySelector("#switch-btn")
const signupDiv = document.querySelector("#signupId")
const loginDiv = document.querySelector("#loginId")

switchBtn.addEventListener("click", ()=>{
    if (signupDiv.style.visibility === "hidden" || loginDiv.style.visibility !== "hidden"){
    signupDiv.style.visibility = "visible";
    loginDiv.style.visibility = "hidden";
    switchBtn.innerHTML = "Login";
}
    else if (signupDiv.style.visibility !== "hidden" || loginDiv.style.visibility === "hidden"){
        signupDiv.style.visibility = "hidden";
        loginDiv.style.visibility = "visible";
        switchBtn.innerHTML = "Signup";
    }
    
})





