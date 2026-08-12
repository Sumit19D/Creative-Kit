// ==========================================
// RESIN ART PRODUCTS
// ==========================================

const products = [

    {
        id: 1,
        name: "Resin Mini Rakhi",
        price: 80,
        image: "images/rakhi.jpg",
        description: "Beautiful handmade resin rakhi with name initial."
    },

    {
        id: 2,
        name: "Resin Rakhi",
        price: 99,
        image: "images/WhatsApp Image 2026-08-10 at 11.30.55 PM.jpeg",
        description: "Beautiful handmade resin rakhi with full name."
    },

    {
        id: 3,
        name: "Resin Rakhi With Keychain",
        price: 120,
        image: "images/WhatsApp Image 2026-08-10 at 11.30.54 PM.jpeg",
        description: "A beautiful Rakhi today, a keepsake keychain tomorrow."
    },

    {
        id: 4,
        name: "Resin Keychain",
        price: 149,
        image: "images/WhatsApp Image 2026-08-10 at 11.15.09 PM.jpeg",
        description: "Personalized handmade resin keychain."
    },

    {
        id: 5,
        name: "Resin Name Stand",
        price: 999,
        image: "images/WhatsApp Image 2026-08-10 at 11.15.09 PM (1).jpeg",
        description: "Your name, beautifully crafted into a little piece of art."
    },

    {
        id: 6,
        name: "Engagement Platter",
        price: 1499,
        image: "images/Engagement Platter.jpeg",
        description: "A beautiful way to present your rings today and cherish the memories forever."
    },

    {
        id: 7,
        name: "Resin Bracelete",
        price: 120,
        image: "images/Bracelate.jpeg",
        description: "Wear a little piece of art wherever you go."
    }

];


// ==========================================
// CART
// ==========================================

let cart = [];


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts() {

    const container =
        document.getElementById("product-container");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `

            <div class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="product-description">
                        ${product.description}
                    </p>

                    <div class="product-bottom">

                        <span class="price">
                            <strong>₹${product.price}</strong>
                            <small>+ delivery charges</small>
                        </span>

                        <button
                            class="add-button"
                            onclick="addToCart(${product.id})"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);

    const existingProduct =
        cart.find(item => item.id === productId);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    updateCart();

    alert(`${product.name} added to cart!`);

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    const cartContainer =
        document.getElementById("cart-items");

    cartContainer.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;

        cartContainer.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-details">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ₹${item.price}
                    </p>

                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                    <div
                        class="remove-item"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </div>

                </div>

            </div>

        `;

    });


    document.getElementById("cart-total")
        .innerText = total;

    document.getElementById("cart-count")
        .innerText = count;

}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(productId, change) {

    const item =
        cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== productId);

    }

    updateCart();

}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeFromCart(productId) {

    cart =
        cart.filter(item => item.id !== productId);

    updateCart();

}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    document.getElementById("cart-overlay")
        .style.display = "flex";

}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

    document.getElementById("cart-overlay")
        .style.display = "none";

}


// ==========================================
// OPEN CHECKOUT
// ==========================================

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    closeCart();

    document.getElementById("checkout-overlay")
        .style.display = "flex";

}


// ==========================================
// CLOSE CHECKOUT
// ==========================================

function closeCheckout() {

    document.getElementById("checkout-overlay")
        .style.display = "none";

}


// ==========================================
// WHATSAPP ORDER
// ==========================================

document
    .getElementById("order-form")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("customer-name").value;

        const phone =
            document.getElementById("customer-phone").value;

        const address =
            document.getElementById("customer-address").value;

        const note =
            document.getElementById("customer-note").value;


        let orderMessage =

            `Hello CreativeKit.!!! 👋 %0A%0A` +

            `I would like to place an order.%0A%0A` +

            `*Customer Details*%0A` +

            `Name: ${name}%0A` +

            `Phone: ${phone}%0A%0A` +

            `*Order Details*%0A`;


        let total = 0;


        cart.forEach(item => {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;

            orderMessage +=

                `%0A${item.name}` +

                ` x ${item.quantity}` +

                ` = ₹${itemTotal}`;

        });


        orderMessage +=

            `%0A%0A*Total: ₹${total}*` +

            `%0A%0A*Delivery Address*%0A` +

            `${address}`;


        if (note.trim() !== "") {

            orderMessage +=

                `%0A%0A*Customization / Note*%0A` +

                `${note}`;

        }


        // ==================================
        // CHANGE THIS NUMBER
        // ==================================

        const whatsappNumber =
            "8928061107";


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${orderMessage}`;


        window.open(
            whatsappURL,
            "_blank"
        );

    });


// ==========================================
// START WEBSITE
// ==========================================

displayProducts();

updateCart();
