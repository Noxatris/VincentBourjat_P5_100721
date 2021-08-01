let idProduit = localStorage.getItem("idProduit");
let produit;
let panier = [];

if (localStorage.getItem("panier") != null){
    panier = JSON.parse(localStorage.getItem("panier"));
}
console.log("Valeur de panier lorsqu'il est vide : " + localStorage.getItem("panier") + "Valeur de panier actuel : " + panier)

// Objet permettant de stocker l'id et la couleur du produit choisie
class ProduitPanier{
    constructor(id, color){
        this.id = id;
        this.color = color;
    }
};

// récupération des donnée du produit sélectionner
fetch("http://localhost:3000/api/teddies/" + idProduit)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        produit = value;
        console.log(value);
        actualisationProduit(value)
    })
    .catch(function (err) {
        console.log(err);
    });

// Modifie la page afin d'afficher les informations du produit voulu
function actualisationProduit(value) {
    document.getElementById("nom_produit").innerHTML = value["name"];
    document.getElementById("prix_produit").innerHTML = (value["price"] / 100) + ".00€";
    document.getElementById("img_produit").setAttribute("src", value["imageUrl"]);
    document.getElementById("description_produit").innerHTML = value["description"];

    // Ajout des couleurs au select
    let tabColor = value["colors"];
    let select = document.getElementById("color_produit");
    console.log("Valeur de tabColor : " + tabColor)
    for (let i = 0; i < tabColor.length; i++){
        let x = new Option(tabColor[i], tabColor[i], false, false);
        select.options.add(x);
    };
}

// Event click sur le bouton "Ajouter au panier"
document.getElementById("btn_panier").addEventListener("click", function(e){
    e.preventDefault();
    ajoutPanier();
});

// Enregistre localement le produit désirer et rédirige l'utilisateur sur la page panier
function ajoutPanier(){  
    let select = document.getElementById("color_produit");
    panier.push(new ProduitPanier(idProduit, select.options[select.options.selectedIndex].text));
    console.log("Valeur de panier lors de Ajout Panier : " + panier);
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log("Donnée stockée = id: " + idProduit + " ||| couleur : " + select.options[select.options.selectedIndex].text);
    document.location.href="panier.html";
}
