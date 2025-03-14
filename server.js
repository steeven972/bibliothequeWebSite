//Utilissation de node js pour activer la bd mysql

const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path")
const bcrypt = require('bcrypt');

/*const dotnet = require('dotenv');
dotnet.config();*/
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "landig-page")));
app.use(express.static(path.join(__dirname, "./")));


//fichier .env pour les variables d'environnement
const HOST = "localhost" || process.env.HOST;
const PORT = 3000 || process.env.PORT;
const USER = "root" || process.env.USER;
const PASSWORD = "" || process.env.PASSWORD;
const DATABASE = "bibliotheque" || process.env.DATABASE;
const con = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
});

// Vérifier la connexion MySQL
con.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données:", err);
        return;
    }
    console.log("Connecté à la base de données");
});

//ajouter un livre
app.post("/add", (req, res) => {
    let {titre, auteur, annee,genre, quantity, description, lienCouverture } = req.body;

    if (!titre || !auteur || !annee || !genre || !quantity || !description || !lienCouverture) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires" });
    }
    console.log(req.body);
    const sql = "INSERT INTO livre_stock (titre, auteur, annee, description, genre, quantity, couverture) VALUES (?, ?, ?, ?, ?, ?, ?)";
    con.query(sql, [titre, auteur, Number(annee), description, genre, Number(quantity), lienCouverture], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion :", err);
            return res.status(500).json({ message: `Erreur serveur: ${err}` });
        }
        res.status(201).json({ message: "Livre ajouté avec succès", id: result.insertId });
    });
});



// récupérer les livres
/*app.get("/Livre", (req, res) => {
    const sql = "SELECT * FROM livre_stock"; 
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des livres :", err);
            res.status(500).json({ error: "Erreur serveur" });
        } else {
            res.json(result); // Envoie la liste des livres en JSON
        }
    });
});*/

const salt = 10; 
// Lors de l'ajout d'un utilisateur
app.post("/landig", async (req, res) => {
    let { name, email, password } = req.body;

    // Vérification des champs obligatoires
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires" });
    }

    try {
        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, salt);

        // Enregistrer l'utilisateur avec le mot de passe haché
        const sql = "INSERT INTO utilisateur (name, email, password) VALUES (?, ?, ?)";
        con.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Erreur lors de l'insertion :", err);
                return res.status(500).json({ message: `Erreur serveur: ${err}` });
            }
            res.status(201).json({ message: "Nouvel utilisateur créé", id: result.insertId });
        });

    } catch (error) {
        console.error("Erreur lors du hashage du mot de passe :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});


app.get("/api/livre", (req, res) =>{
    const sql = "SELECT * FROM livre_stock"; 
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération des livres :", err);
            res.status(500).json({ error: "Erreur serveur" });
        } else {
            res.json(result)// Envoie la liste des livres en JSON
            
        }
    });
})

app.get("/signup", (req, res) =>{
    const filePath = path.join(__dirname, "./struct.html");
    res.sendFile(filePath);
})

app.listen(PORT, HOST, () => {
    console.log("Serveur démarré sur http://localhost:3000");
});

