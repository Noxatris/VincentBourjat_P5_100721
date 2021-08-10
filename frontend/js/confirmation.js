let commande = JSON.parse(localStorage.getItem("commande"));
let idCommande = commande["orderId"];

localStorage.clear();
prixFinal();

// Affiche le prix total
function prixFinal(){
    let prixTotal = 0;
    let listeProduit = commande["products"];
    console.log(listeProduit[0]["price"]);
    for(let i = 0; i<listeProduit.length; i++){
        prixTotal += listeProduit[i]["price"];
        console.log(prixTotal);
    }
    document.getElementById("montantTotal").innerHTML = (prixTotal / 100) + ".00€";
}

console.log(commande);

// Affiche l'Id de commande
document.getElementById("orderId").innerText = idCommande;