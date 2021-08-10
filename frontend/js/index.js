let donneeApi;
let nombreProduit = 0;

// Récupération de la liste des produits
fetch("http://localhost:3000/api/teddies")
    .then(function(res){
        if(res.ok){
            return res.json();            
        }
    })
    .then(function(value){
        donneeApi = value;
        affichageProduit(value);
        console.log(value);
    })
    .catch(function(err){
        console.log(err);
    });

// Affiche tout les produits
function affichageProduit(donneeApi){
    console.log("Donnée Bien appelée, Donnée: " + donneeApi);
    for(let i=0; i<donneeApi.length; i++){
        creationProduit(donneeApi[i]);        
    }
}

// Création + mise en forme des produits
function creationProduit(value){
    let tabProduit = [];
    
    console.log("Valeur de value dans la fonction creationProduit() : " + value);
    tabProduit[0] = document.createElement("a");
    tabProduit[1] = document.createElement("div");
    tabProduit[2] = document.createElement("img");
    tabProduit[3] = document.createElement("div");
    tabProduit[4] = document.createElement("p");
    tabProduit[5] = document.createElement("p");

    // Mise en place de 2 div enfant du conteneur <a> (conteneur image) et (conteneur info)
    tabProduit[0].appendChild(tabProduit[1]);
    tabProduit[0].appendChild(tabProduit[3]);

    // Mise en place de l'enfant de la div1 (image)
    tabProduit[1].appendChild(tabProduit[2]);

    // Mise en place des enfant de la div2 (nom et prix)
    tabProduit[3].appendChild(tabProduit[4]);
    tabProduit[3].appendChild(tabProduit[5]);

    // Ajout de l'image correspondant au produit
    tabProduit[2].setAttribute("src", value["imageUrl"]);

    // Ajout du nom et du prix pour chaque produit
    tabProduit[4].innerText = value["name"];
    tabProduit[5].innerText = (value["price"] / 100) +".00€";

    // Ajout des styles
    tabProduit[0].classList.add("conteneurProduit");
    tabProduit[1].classList.add("conteneurImage");
    tabProduit[3].classList.add("conteneurInfo");
    tabProduit[4].classList.add("info_nom");
    tabProduit[5].classList.add("info_prix");

    // Ajout des event
    tabProduit[0].addEventListener("click", function(e){ // Function afin de récupérer l'id du produit
        console.log("Valeur de this : " + this.id);
        localStorage.setItem("idProduit", this.id); // Sauvegarde de l'Id du produit
    }
    );
    tabProduit[0].setAttribute("href", "frontend/html/pageProduit.html?"+ value["_id"])
    tabProduit[0].id = value["_id"];

    let conteneurProduit = document.getElementsByClassName("listeProduit");
    conteneurProduit[0].appendChild(tabProduit[0]);
}
