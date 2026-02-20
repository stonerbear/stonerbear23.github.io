// ADD TO CART
function addToCart(name, price, image, sizeId, qtyId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const size = document.getElementById(sizeId).value;
    const quantity = parseInt(document.getElementById(qtyId).value);

    const existingItem = cart.find(item =>
        item.name === name && item.size === size
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            size: size,
            quantity: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Added to cart 🛒");
}

// UPDATE CART COUNT
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.innerText = totalItems;
    }
}

// REMOVE ITEM
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// DISPLAY CART
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let total = 0;

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" width="80">
                <div>
                    <h3>${item.name}</h3>
                    <p>Size: ${item.size}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>$${item.price * item.quantity}</p>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    document.getElementById("cart-total").innerText = "$" + total;
}

document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
    displayCart();
});
