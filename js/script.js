// Clock Update Function
function updateClock() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });
    const clockElement = document.getElementById("clock");
    if (clockElement) {
        clockElement.innerText = formattedTime;
    }
}
setInterval(updateClock, 1000);
updateClock();

// Form Validation Function
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    clearErrorMessages();

    if (name.value.trim() === '') {
        showError(name, 'Name is required.');
        isValid = false;
    }

    if (!validateEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email.');
        isValid = false;
    }

    if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters long.');
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
    }

    return isValid;
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function showError(inputElement, message) {
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error-message');
    errorSpan.textContent = message;
    inputElement.parentNode.appendChild(errorSpan);
    inputElement.classList.add('error-border');
}

function clearErrorMessages() {
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
    document.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border'));
}

// Add to Cart Functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, productPrice, productQuantity) {
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += productQuantity;
    } else {
        cart.push({
            name: productName,
            price: parseFloat(productPrice),
            quantity: productQuantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${productQuantity} x ${productName} added to your cart!`);
}

function updateCartCount() {
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector(".cart-item-count");
    if (cartCountElement) {
        cartCountElement.textContent = cartItemCount;
    }
}

function initializeAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product-item');
            const productName = button.dataset.name;
            const productPrice = parseFloat(button.dataset.price);
            const quantityInput = product.querySelector('input[name="quantity"]');
            const productQuantity = quantityInput ? parseInt(quantityInput.value, 10) : 1;

            if (productQuantity > 0) {
                addToCart(productName, productPrice, productQuantity);
            } else {
                alert('Please select a valid quantity.');
            }
        });
    });
}

// Render Cart Items on Cart Page
function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartSummary = document.getElementById("cart-summary");

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            if (cartSummary) cartSummary.style.display = "none";
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        if (cartSummary) {
            document.getElementById("total-items").textContent = `Total Items: ${cart.length}`;
            document.getElementById("total-price").textContent = `Total Price: $${totalPrice.toFixed(2)}`;
            cartSummary.style.display = "block";
        }

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                removeFromCart(button.dataset.index);
            });
        });
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
}

// Go Back Button Functionality
function initializeGoBackButton() {
    const goBackButton = document.getElementById("goBackButton");
    if (goBackButton) {
        goBackButton.addEventListener("click", () => {
            window.history.back();
        });
    }
}

// Initialize All Event Listeners on DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    initializeAddToCartButtons();

    if (document.getElementById("cart-items")) {
        renderCartItems();
    }

    initializeGoBackButton();
});
