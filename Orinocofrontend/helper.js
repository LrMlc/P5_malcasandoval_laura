// Récuperation du paniers et des produits selectionnés pour la commande //
function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
    }
    else {
        return JSON.parse(basket);
    }
}

// Sauvegarder les produits dans le panier //
function saveBasket(basket) {
    let basketString = JSON.stringify(basket);
    localStorage.setItem("basket", basketString);
}
// Ajouter un produit dans le panier//
function addToBasket(productToAdd) {
    let basket = getBasket();
    let productIndex = basket.findIndex((item) => item._id === productToAdd._id);
    if (productIndex >= 0) {
        // produit trouvé on augmente sa quantité//
        // basket[productIndex].quantity = basket[productIndex].quantity +1; (c'est 3 lignes font la même chose//
        basket[productIndex].quantity += 1;
        //basket[productIndex].quantity ++;//
    }
    else {
        //produit non trouvé on l'ajoute au panier
        productToAdd.quantity = 1;
        basket.push(productToAdd);
    }

    saveBasket(basket);
}

// vider le panier //
function clearBasket() {
    localStorage.removeItem("basket");
}


// Lorsque l'on retire un produit du panier, et sauvegarder les données//
function removeFromBasket(cameraId) {
    let basketBefore = getBasket();
    let basketAfter = basketBefore.filter((item) => {
        /*   return (item._id !== cameraId); (c'est la meme chose que la suite)*/
        if (item._id != cameraId) {
            return true;
        }
        else {
            return false;
        }
    });
    saveBasket(basketAfter);
    window.location.reload();

}

// Convertion du prix pour l'affichage HTML //
function displayPrice(price) {
    let priceDollars = price / 100;
    return priceDollars.toFixed(2);
}


