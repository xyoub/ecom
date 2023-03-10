let productsList = document.querySelector("section");
let asideListProds = document.querySelector("aside > div");
let totale = 0;
let tableProdsPanier = new Array();




function updateList(products) {
    console.log("je suis dans 1");
    //Mettre à jour la liste des produit
    productsList.innerHTML = "";
    products.forEach((element) => {
        productsList.innerHTML +=
            `
        <div>
            <div id="${element.id}" class = "add">+</div>
            <img src="${element.path}" alt=""/>
            <div class= "nameandprice">
                <h4>${element.name}</h4>
                <h4> ${element.price} DH</h4>
            </div>
        </div>
        `
    })
    document.querySelectorAll(".add").forEach(element => {
        element.addEventListener("click", () => {
            addProd(element)
        });
    });

}
updateList(products);





function addProd(e) {
    console.log("je suis dans 2");
    // Ajout d'un produit au panier (e : event object)
    totale += products[e.id].price;
    if (tableProdsPanier.includes(products[e.id])) {
        products[e.id].qtt++;
    } else {

        tableProdsPanier.push(products[e.id]);
        products[e.id].qtt++;
    }
    updateChart();
}




function delProd(e) {
    console.log("je suis dans 3");
    // Suppression d'un produit du panier (e : event object);
    totale -= products[e.id].price * (products[e.id].qtt);
    products[e.id].qtt = 0;
    tableProdsPanier = tableProdsPanier.filter(element =>
        element.id != e.id
    )
    updateChart();
}


function updateChart() {
    console.log("je suis dans 4");
    // fonction pour mettre à jour le panier 
    asideListProds.innerHTML = `    <h4>totale : ${totale} Dh</h4>`;
    tableProdsPanier.forEach((e) => {
        asideListProds.innerHTML +=
            `
            <div>
                <img src="${e.path}" width="20px" height="20px" alt=""/>
                <h4>${e.name}</h4>
                <h4>${e.qtt }</h4>
                <div id ="${e.id}" class="remove"><img src="imgs/del.png"/></div>
            </div>
        `
    })
    document.querySelectorAll(".remove").forEach(element => {
        element.addEventListener("click", () => {
            delProd(element);
        });
    });
    updateList(products);
}




function searchfun() {
    console.log("je suis dans 5");
    // recherche des des produits contenant le texte saisie dans la zone recherche
    let tempProds = new Array();
    document.querySelector("input").addEventListener("input", () => {
        tempProds = products.filter(a =>
            a.name.includes(document.querySelector("input").value)
        );
        updateList(tempProds);
    });
}
searchfun();