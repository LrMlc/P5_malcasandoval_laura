//Récuparation de l'ID//
let url = new URLSearchParams(window.location.search);
let camera = null;
const productId = url.get("id");
console.log(productId);

const getProduct = async function () {
    const response = await fetch("http://localhost:3000/api/cameras/" + productId);
    return await response.json();
    console.log(product);
}

// Affichage HTML (avec les détails) du produit selectionné préalablement //
async function selectionProduct() {
    let selectionProduct = document.getElementById("SelectionProduct");
    camera = await getProduct();

    let lensesHtml = "";
    for (const lense of camera.lenses) {
        lensesHtml += "<option>" + lense + "</option>"
    }
    let html = `
    <img src="${camera.imageUrl}" alt="">
    <h2 class="tittle">${camera.name}</h2>
    <label for="lenses">Choose your lenses:</label><br />
    <select name="lenses" id="lenses">${lensesHtml}</select>
    <div id="DescriptionProduct">${camera.description}</div>
    <h3 class="price">${displayPrice(camera.price)}$</h3>`;
    selectionProduct.innerHTML = html;
}

selectionProduct();

// Ajout du produit dans le panier via le button //
function addToBasketClic() {
    const bouton = document.getElementById("ButtonBasket");
    bouton.addEventListener("click", async function () {
        addToBasket(camera);
        alert("The item has been added to your basket.")
        location.reload();
    });
};
addToBasketClic();






