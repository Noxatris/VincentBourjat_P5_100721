let panier = JSON.parse(localStorage.getItem("panier"));
let panierForm = [];
let reponseCommande;
let prixTotale = 0;
let tabProduit= [];

// Objet contact envoyé a l'API via le formulaire
class Contact{
    constructor(nom, prenom, ville, adresse, email){
        this.firstName = prenom;
        this.lastName = nom;
        this.address = adresse;
        this.city = ville;
        this.email = email;
    }
}

// Actualise le panier en appelant 3 sous fonction
actualisationPanier();


async function actualisationPanier(){
    viderPanier();
    await ajoutPanier(panier);
    await affichagePrixTotale();

}

// Appel la fonction creationElement pour chaque produit dans le panier
async function ajoutPanier(listeProduit){
    for (let i=0; i<listeProduit.length; i++){
        console.log("Valeur de listeProduit id : " + listeProduit[i].id);
        const valeur = await fetch("http://localhost:3000/api/teddies/" + listeProduit[i].id);
        const valeurDeux = await valeur.json();
        creationElement(valeurDeux, listeProduit[i].color);
    }
}

// Vide la panier
function viderPanier(){
    let lePanier = document.getElementById("liste_panier");
    while(lePanier.firstChild){
        lePanier.removeChild(lePanier.firstChild);
    }
}


// Créé une ligne <li> avec les information qui lui sont passer et l'affiche
function creationElement(value, color){
    let tabProduit = [];

    // Création d'une nouvelle ligne
    tabProduit[0] = document.createElement("li");

    // Création des élément nom | couleur | prix
    tabProduit[1] = document.createElement("p");
    tabProduit[2] = document.createElement("p");
    tabProduit[3] = document.createElement("p");

    // Ajout des élément en tant qu'enfant de la nouvelle ligne
    tabProduit[0].appendChild(tabProduit[1]);
    tabProduit[0].appendChild(tabProduit[2]);
    tabProduit[0].appendChild(tabProduit[3]);

    // Assignation des valeurs
    tabProduit[1].innerHTML = value["name"];
    tabProduit[2].innerHTML = color;
    tabProduit[3].innerHTML = (value["price"] / 100) + ".00€";

    prixTotale += value["price"];
    console.log("Valeur de prixTotal : " + prixTotale);

    panierForm.push(value["_id"]);

    // Ajout de la nouvelle ligne à la page
    document.getElementById("liste_panier").appendChild(tabProduit[0]);
}

// Ajoute une ligne <li> comportant le prix total de la commande
async function affichagePrixTotale(){
    let total = document.createElement("p");   
    total.innerText = "Prix totale TTC : " + (prixTotale / 100) + ".00€";
    let newLi = document.createElement("li");
    newLi.appendChild(total);
    newLi.classList.add("prix_totale");
    document.getElementById("liste_panier").appendChild(newLi);
}

// Formulaire 
// Vérification Nom
document.getElementById("lastName").addEventListener("change", function(e){
    chkForm()
});

// Vérification Prénom
document.getElementById("firstName").addEventListener("change", function(e){
    chkForm()
});

// Vérification Ville
document.getElementById("city").addEventListener("change", function(e){
    chkForm()
});

// Vérification Adresse
document.getElementById("address").addEventListener("change", function(e){
    chkForm()
});

// Vérification email
document.getElementById("email").addEventListener("change", function(e){
    chkForm()
});

document.getElementById("button_form").addEventListener("click", function(e){
    envoiFormulaire();
});


// Fonction permettant de de vérifié si les valeurs rentré sont correct et d'activer ou non le bouton en conséquence
function chkForm(){
    let nom = document.getElementById("lastName");
    let prenom = document.getElementById("firstName");
    let ville = document.getElementById("city");
    let adresse = document.getElementById("address");
    let email = document.getElementById("email")

    if(nom.validity.valid && prenom.validity.valid && ville.validity.valid && adresse.validity.valid && email.validity.valid){
        document.getElementById("button_form").disabled = false;
    } else {
        document.getElementById("button_form").disabled = true;
    }
}

// Envoie les informations a l'API attend la réponse pour la stocker dans un localStorage via sauvegardeDonnée puis redirige l'utilisateur
function envoiFormulaire(){
    let nom = document.getElementById("lastName").value;
    let prenom = document.getElementById("firstName").value;
    let ville = document.getElementById("city").value;
    let adresse = document.getElementById("address").value;
    let email = document.getElementById("email").value;

    console.log("Valeur récupéré avant création objet contact : " + nom + " " + prenom + " " + ville + " " + adresse + " " + email)

    let donnee = {
        contact: new Contact(nom, prenom, ville, adresse, email),
        products: panierForm
    }

    console.log("Valeur de donnée avant envoie a l'API : " + donnee);

    // Envoi requête POST http => Contact + produits
    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(donnee)
    })
    .then(function(res){
        if(res.ok){
            console.log("Requète bien reçu");
            return res.json();            
        }
    })
    .then(function(value){
        reponseCommande = value;
        console.log("Donnée renvoyé par l'API : " + value["orderId"]);
    })
    .then(function(){
        sauvegardeDonnee();
        document.location.href="confirmation.html";
    })
    .catch(function(err){
        console.log(err);
    });

}

// Sauvegarde les données envoyé par l'API dans un localStorage
function sauvegardeDonnee(){
    localStorage.setItem("commande", JSON.stringify(reponseCommande));
}

