// Récupération des id des produits et mise en relation avec le serveur//
const getProduct = async function () {
    const response = await fetch("http://localhost:3000/api/cameras/");
    console.log(response);
    const products = await response.json();
    return products;
}

// Affichage HTML de la liste des produits //
async function listProduct() {
    const cameras = await getProduct();

    let product = document.getElementById("cameras_container");

    for (const camera of cameras) {
        let html =
            `<a href="product.html?id=${camera._id}">
    <div class="product">
        <div class="buble">see product</div>
            <img src="${camera.imageUrl}" alt="">
            <div class="camera_details">
                <h2 class="tittle">${camera.name}</h2>
                <h2 class="price">${displayPrice(camera.price)}$</h2>
            </div>
            <div class="description">
                <p>camera vintage</p>
            </div>
    </div>
    </a>`;
        product.innerHTML += html;
    }
}
listProduct();



