/*
============================================================
SCRIPT.JS - NRF Shop JavaScript Functions
------------------------------------------------------------
Summary:
- Provides core JavaScript functionalities for the NRF Shop website.
- Features include:
  - Real-time clock updates.
  - Form validation for user inputs.
  - Add-to-cart functionality and cart rendering.
  - Dynamic event handling for buttons and form elements.
- Structured for maintainability and scalability.
============================================================
*/

// ========== Clock Update Function ==========
// Updates the clock displayed on the page every second.
function updateClock() {
    const now = new Date(); // Get the current date and time
    const localTime = now.toLocaleTimeString("en-US", { hour12: false }); // Format local time in HH:MM:SS (24-hour format)

    // Get UTC name and country
    const utcOptions = { timeZone: "UTC", timeZoneName: "short" };
    const utcFormatter = Intl.DateTimeFormat("en-US", utcOptions);
    const utcParts = utcFormatter.formatToParts(now);

    const utcName = utcParts.find((part) => part.type === "timeZoneName").value; // Extract UTC name
    const country = "United Kingdom"; // UTC is primarily associated with the UK

    const clockElement = document.getElementById("clock"); // Select the clock element
    if (clockElement) {
        clockElement.innerText = `Local: ${localTime} | UTC: ${utcName}, ${country}`; // Update with local time, UTC name, and country
    }
}

setInterval(updateClock, 1000); // Update the clock every second
updateClock(); // Initialize the clock immediately

// ========== Form Validation and Notification ==========
function validateForm(event) {
    if (event) {
        event.preventDefault(); // Prevent default form submission
    }

    const form = document.querySelector('form'); // Adjust selector if necessary
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    let isValid = true;

    clearErrorMessages();

    // Validate name
    if (!name.value.trim()) {
        displayError(name, "Name is required.");
        isValid = false;
    }

    // Validate email
    if (!isValidEmail(email.value.trim())) {
        displayError(email, "Please provide a valid email address.");
        isValid = false;
    }

    // Validate message length
    if (message.value.trim().length < 10) {
        displayError(message, "Message must be at least 10 characters long.");
        isValid = false;
    }

    // Show notification based on validation result
    if (isValid) {
        showToast();

        // Reset the form after validation
        if (form) {
            form.reset();
        }

        // Reload the page after a delay
        setTimeout(() => {
            location.reload();
        }, 6000); // Reload after 6 seconds
    }
}

// Toast Notification Function
function showToast() {
    const toastBox = document.getElementById('toastBox');

    // Create toast element
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `<i class="fa fa-check-circle"></i> <span>Successfully Submitted!</span>`;

    // Append toast to the toastBox
    toastBox.appendChild(toast);

    // Add hide class after a delay
    setTimeout(() => {
        toast.classList.add('hide');
    }, 4000); // Start shrinking after 4 seconds

    // Remove toast after animation ends
    setTimeout(() => {
        toast.remove();
    }, 6000); // Fully remove after 6 seconds
}
  
  // ========== Utility Functions ==========
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function displayError(field, message) {
    const errorDiv = document.getElementById("error-messages");
    errorDiv.style.display = "block";
    errorDiv.innerHTML += `<p>${message}</p>`;
    field.style.border = "2px solid red";
  }
  
  function clearErrorMessages() {
    const errorDiv = document.getElementById("error-messages");
    errorDiv.style.display = "none";
    errorDiv.innerHTML = "";
    document.querySelectorAll("input, textarea").forEach(field => {
      field.style.border = "1px solid #ccc";
    });
  }
// ========== Add to Cart Functionality ==========
/* Manages cart operations, including adding and rendering items. */
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from local storage or initialize as empty

// Add product to cart
function addToCart(productName, productPrice, productQuantity, productImage) {
    const existingItem = cart.find(item => item.name === productName); // Check if product exists in cart

    if (existingItem) {
        existingItem.quantity += productQuantity; // Update quantity if exists
    } else {
        cart.push({
            name: productName,
            price: parseFloat(productPrice),
            quantity: productQuantity,
            image: productImage || "/img/default.jpg" // Default image if none provided
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
    updateCartCount(); // Update cart count display
    alert(`${productQuantity} x ${productName} added to your cart!`); // Confirmation alert
}

// Update cart item count in the UI
function updateCartCount() {
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity
    const cartCountElement = document.querySelector(".cart-item-count"); // Select cart count element

    if (cartCountElement) {
        // Set badge text based on the count
        if (cartItemCount > 1000000) {
            cartCountElement.textContent = "1M+"; // More than 1 million
        } else if (cartItemCount > 100000) {
            cartCountElement.textContent = "100K+"; // More than 100 thousand
        } else if (cartItemCount > 10000) {
            cartCountElement.textContent = "10K+"; // More than 10 thousand
        } else if (cartItemCount > 1000) {
            cartCountElement.textContent = "1K+"; // More than 1 thousand
        } else if (cartItemCount > 100) {
            cartCountElement.textContent = "100+"; // More than 100
        } else {
            cartCountElement.textContent = cartItemCount; // Exact count for 100 or less
        }
    }
}


// Initialize add-to-cart buttons with event listeners
function initializeAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product-item'); // Get product element
            const productName = button.dataset.name; // Get product name
            const productPrice = parseFloat(button.dataset.price); // Get product price
            const quantityInput = product.querySelector('input[name="quantity"]'); // Get quantity input
            const productQuantity = quantityInput ? parseInt(quantityInput.value, 10) : 1; // Default to 1
            const productImage = product.querySelector('img')?.src; // Get product image

            if (productQuantity > 0) {
                addToCart(productName, productPrice, productQuantity, productImage); // Add to cart
            } else {
                alert('Please select a valid quantity.'); // Error for invalid quantity
            }
        });
    });
}

// ========== Cart Rendering and Management ==========
/* Displays cart items and handles cart operations */
function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items"); // Select cart items container
    const cartSummary = document.getElementById("cart-summary"); // Select cart summary section

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = ""; // Clear existing content

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>"; // Empty cart message
            if (cartSummary) cartSummary.style.display = "none"; // Hide summary
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div"); // Create cart item container
            cartItem.classList.add("cart-item"); // Add class for styling
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem); // Add to container
        });

        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0); // Calculate total price
        if (cartSummary) {
            document.getElementById("total-items").textContent = `Total Items: ${cart.length}`; // Update total items
            document.getElementById("total-price").textContent = `Total Price: $${totalPrice.toFixed(2)}`; // Update total price
            cartSummary.style.display = "block"; // Show summary
        }

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                removeFromCart(button.dataset.index); // Remove item on click
            });
        });
    }
}

// Remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item by index
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
    renderCartItems(); // Re-render cart items
    updateCartCount(); // Update cart count
}

// ========== Navigation and Go Back Button ==========
/* Handles navigation functionality */
function initializeGoBackButton() {
    const goBackButton = document.getElementById("goBackButton"); // Select go-back button
    if (goBackButton) {
        goBackButton.addEventListener("click", () => {
            window.history.back(); // Navigate back to the previous page
        });
    }
}

// ========== Initialize Event Listeners on DOM Load ==========
/* Sets up all event listeners when the page loads */
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount(); // Initialize cart count
    initializeAddToCartButtons(); // Initialize add-to-cart functionality

    if (document.getElementById("cart-items")) {
        renderCartItems(); // Render cart items if on the cart page
    }

    initializeGoBackButton(); // Initialize the go-back button
});


//zoom

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".zoomable").forEach((img) => {
      img.addEventListener("click", () => {
        if (img.style.transform === "scale(1.2)") {
          img.style.transform = "scale(1)";
        } else {
          img.style.transform = "scale(1.2)";
        }
      });
    });
  });
  
