//Utilissation de node js pour activer la bd mysql

const mysql = require("mysql");
const express = require("express");
const app = express();
const path = require("path")
const bcrypt = require('bcrypt');
const cors = require('cors');


app.use(cors());
/*const dotnet = require('dotenv');
dotnet.config();*/
app.use(express.json());


app.use(express.static(path.join(__dirname, "landig-page")));
app.use(express.static(path.join(__dirname, "./")));
app.use(express.static(path.join(__dirname, "profil-page")));


//fichier .env pour les variables d'environnement
const HOST = "localhost" || process.env.HOST;
const PORT = 4000 || process.env.PORT;
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


// Lors de l'ajout d'un utilisateur
app.post("/signup", async (req, res) => {
    console.log(req.body);
    let { username, email, password } = req.body;

    // Vérification des champs obligatoires
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires" });
    }

    try {
        // Hashage du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Enregistrer l'utilisateur avec le mot de passe haché
        const sql = "INSERT INTO utilisateur (name, email, password) VALUES (?, ?, ?)";
        con.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Erreur lors de l'insertion :", err);
                return res.status(500).json({ message: `Erreur serveur: ${err}` });
            }
            res.status(201).json({ message: "Nouvel utilisateur créé", id: result.insertId, redirect: "/landig-page/bibliotheque-landig.html" });
        });

    } catch (error) {
        console.error("Erreur lors du hashage du mot de passe :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Route de connexion (Login)
app.post("/login", (req, res) => {
    console.log(req.body);
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Veuillez fournir un email et un mot de passe" });
    }

    const sql = "SELECT * FROM utilisateur WHERE email = ?";
    con.query(sql, [email], async (err, result) => {
        if (err) {
            console.error("Erreur lors de la recherche de l'utilisateur :", err);
            return res.status(500).json({ message: "Erreur serveur" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        const user = result[0];

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        res.status(200).json({ message: "Connexion réussie", redirect: "/landig-page/bibliotheque-landig.html" });
    });
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

app.get("/connection", (req, res) =>{
    const filePath = path.join(__dirname, "./connectionPage.html");  
    res.sendFile(filePath);
})

app.get('/home', (req, res) => {
    const filePath = path.join(__dirname, "landig-page", "bibliotheque-landig.html");
    res.sendFile(filePath);
});

app.get('/gestion-page/gestion-structure.html', (req, res) => {
    const filePath = path.join(__dirname, "gestion-page", "gestion.html");
    res.sendFile(filePath);
});
app.listen(PORT, HOST, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

