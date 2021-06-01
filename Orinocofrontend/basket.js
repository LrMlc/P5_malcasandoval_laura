// Récupération des produits selectionnés pour la commande + Affichage HTML//
let basket = getBasket();
let basketContentElt = document.getElementById('basketcontent');
for (const camera of basket) {
    let html =
        `<a href="product.html id=${camera._id}">
        <div class="camera">
            <div class="buble">voir le produit</div>
                <img src="${camera.imageUrl}" alt="">
                <div class="camera_details">
                    <h2 class="quantity">Quantity of product:${camera.quantity}</h2>
                    <h2 class="tittle">${camera.name}</h2>
                    <h2 class="price">${displayPrice(camera.price)}$</h2>
                </div>
                <div class="description">
                    <p>camera vintage</p>
                </div>
        </div>
    </a>
    <button onclick="removeFromBasket('${camera._id}');" class="btn" id="formdelete">Delete</button>`;
    basketContentElt.innerHTML += html;
}



//si le panier est vide//
if (basket.length == 0) {
    const basketEmpty =
        '<div class ="container-empty-basket"><div>Your basket is empty!</div></div>';
    basketContentElt.innerHTML = basketEmpty
}


//Affichage du montant total du panier//

const reducer = (accumulator, camera) => accumulator + camera.price * camera.quantity;
const total = basket.reduce(reducer, 0);

const displayTotalPrice = `
The total price is :${displayPrice(total)}$`;
document.getElementById('display-price').innerHTML = displayTotalPrice;

// Sauvegarde et récupération des données de l'utilisateur, si il y a une autre commande, les champs sont préremplis //
function RestoreFormData() {
    //
    let lastName = localStorage.getItem("Last name");
    if (lastName != null) {
        document.getElementById('Last-name').value = lastName;
    }
    let firstName = localStorage.getItem("First name");
    if (firstName != null) {
        document.getElementById('First-name').value = firstName;
    }
    let email = localStorage.getItem("Email");
    if (email != null) {
        document.getElementById('Email').value = email;
    }
    let address = localStorage.getItem("Address");
    if (address != null) {
        document.getElementById('Address').value = address;
    }
    let city = localStorage.getItem("City");
    if (city != null) {
        document.getElementById('City').value = city;
    }
}
RestoreFormData();

//validation du formulaire et réponse du serveur avec le numéro de commande//

document.getElementById('form').addEventListener("submit", function (e) {
    e.preventDefault();

    let lastName = document.getElementById('Last-name');
    localStorage.setItem('Last name', lastName.value);

    let firstName = document.getElementById('First-name');
    localStorage.setItem('First name', firstName.value);

    let email = document.getElementById('Email');
    localStorage.setItem('Email', email.value);

    let address = document.getElementById('Address');
    localStorage.setItem('Address', address.value);

    let city = document.getElementById('City');
    localStorage.setItem('City', city.value);

    let productsId = [];
    for (const product of basket) {
        productsId.push(product._id);
        console.log(product._id);
    }

    let data = {
        contact: {
            lastName: lastName.value,
            firstName: firstName.value,
            email: email.value,
            address: address.value,
            city: city.value,
        },
        products: productsId,
    };
    const option = {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch("http://localhost:3000/api/cameras/order", option)
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);

            console.log(responseData.orderId);

            let displayOrder = `<h3>Thanks ${responseData.contact.firstName} for your purchase! your order "${responseData.orderId}" is on its way.</h3>`

            document.querySelector("#basket").innerHTML = displayOrder;

        })

        .catch((error) => {
            alert("Error occured");
            console.log(error);
        });

    // vider le panier //
    clearBasket();

});
