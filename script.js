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

    alert("Added to cart 🛒");
}
