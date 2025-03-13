const formBook = document.getElementById("book-form");
formBook.addEventListener("submit", async function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs du formulaire
    
    const titre = document.getElementById("titre").value;
    const auteur = document.getElementById("auteur").value;
    const annee = document.getElementById("annee").value;
    const genre = document.getElementById("genre").value;
    const quantity = document.getElementById("quantity").value;
    const lienCouverture = document.getElementById("lienCouverture").value;
    const description = document.getElementById("description").value;

    // Envoyer les données avec fetch()
    try {
        const response = await fetch("http://localhost:3000/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titre,
                auteur,
                annee,
                genre,
                quantity,
                lienCouverture,
                description
            })
        });

        const result = await response.json();
        alert(result.message); // Affiche un message de confirmation

        // Réinitialiser le formulaire après envoi
        document.getElementById("book-form").reset();

    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
    }
});
