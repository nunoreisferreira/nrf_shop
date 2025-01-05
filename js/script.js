// Clock Update Function
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    document.getElementById("clock").innerText = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// Add to Cart Functionality
function addToCart(productName, productPrice) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: productName, price: parseFloat(productPrice) });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to your cart!`);
}

// Update Cart Count in Header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.querySelector(".cart-item-count");
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}
updateCartCount();

// Attach Event Listeners to "Add to Cart" Buttons
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productName = button.getAttribute("data-name");
            const productPrice = button.getAttribute("data-price");
            addToCart(productName, productPrice);
        });
    });
});

// Render Cart Items on Cart Page
function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartSummary = document.getElementById("cart-summary");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Clear existing content
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "";
    }

    // If cart is empty
    if (cart.length === 0) {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        }
        if (cartSummary) {
            cartSummary.style.display = "none";
        }
        return;
    }

    // Render each cart item
    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        if (cartItemsContainer) {
            cartItemsContainer.appendChild(cartItem);
        }
    });

    // Update cart summary
    const totalItems = cart.length;
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    if (cartSummary) {
        document.getElementById("total-items").textContent = `Total Items: ${totalItems}`;
        document.getElementById("total-price").textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        cartSummary.style.display = "block";
    }
}

// Remove Item from Cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove the selected item
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
}

// Initialize Cart Page
if (document.getElementById("cart-items")) {
    renderCartItems();
}

// Prevent Video Pause (if applicable)
const videoElement = document.getElementById("video1");
if (videoElement) {
    videoElement.addEventListener("pause", function () {
        this.play();
    });
}
