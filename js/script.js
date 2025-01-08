// Form Validation Function
function validateForm() {
    // Get form elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
  
    // Initialize validation flag
    let isValid = true;
  
    // Clear previous error messages
    clearErrorMessages();
  
    // Validate Name
    if (name.value.trim() === '') {
      showError(name, 'Name is required.');
      isValid = false;
    }
  
    // Validate Email
    if (!validateEmail(email.value.trim())) {
      showError(email, 'Please enter a valid email.');
      isValid = false;
    }
  
    // Validate Message
    if (message.value.trim().length < 10) {
      showError(message, 'Message must be at least 10 characters long.');
      isValid = false;
    }
  
    // Display success message if valid
    if (isValid) {
      alert('Form submitted successfully!');
    }
  
    return isValid;
  }
  
  // Utility Functions
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
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((msg) => msg.remove());
  
    const errorBorders = document.querySelectorAll('.error-border');
    errorBorders.forEach((el) => el.classList.remove('error-border'));
  }

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

// Add to Cart Functionality
function addToCart(productName, productPrice) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: productName, price: parseFloat(productPrice) });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to your cart!`);
}

// Update Cart Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.querySelector(".cart-item-count");
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Add Event Listeners to "Add to Cart" Buttons
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productName = button.dataset.name;
            const productPrice = button.dataset.price;
            addToCart(productName, productPrice);
        });
    });

    // Render cart items if on the cart page
    if (document.getElementById("cart-items")) {
        renderCartItems();
    }

    // Initialize "Back to Top" button functionality
    scrollToTop();
});

// Render Cart Items on Cart Page
function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartSummary = document.getElementById("cart-summary");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

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
                </div>
                <div class="cart-item-actions">
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        const totalItems = cart.length;
        const totalPrice = cart.reduce((total, item) => total + item.price, 0);
        if (cartSummary) {
            document.getElementById("total-items").textContent = `Total Items: ${totalItems}`;
            document.getElementById("total-price").textContent = `Total Price: $${totalPrice.toFixed(2)}`;
            cartSummary.style.display = "block";
        }

        document.querySelectorAll(".remove-item").forEach((button) => {
            button.addEventListener("click", () => {
                const index = button.dataset.index;
                removeFromCart(index);
            });
        });
    }
}

// Remove Item from Cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
}

// Prevent Video Pause
document.addEventListener("DOMContentLoaded", () => {
    const videoElement = document.getElementById("video1");
    if (videoElement) {
        videoElement.addEventListener("pause", function () {
            this.play();
        });
    }
});

// Back to top button
document.addEventListener("DOMContentLoaded", () => {
    const backToTopButton = document.querySelector(".back-to-top");
    const footer = document.querySelector("footer");
    const cartTitle = document.querySelector("h2#cart-title"); // Adjust to match your specific ID or class

    let footerVisible = false;
    let timeoutId = null;

    // Function to toggle button visibility
    const toggleBackToTopButton = (visible) => {
        backToTopButton.style.display = visible ? "flex" : "none";
    };

    // IntersectionObserver to detect footer visibility
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                footerVisible = true;
                // Wait 1 second before activating the button
                timeoutId = setTimeout(() => {
                    toggleBackToTopButton(true);
                }, 1000);
            } else {
                footerVisible = false;
                clearTimeout(timeoutId); // Cancel timeout if footer is no longer visible
                toggleBackToTopButton(false);
            }
        },
        { threshold: 0.1 } // Adjust threshold for footer detection sensitivity
    );

    observer.observe(footer);

    // Hide the button when at the top of the page
    window.addEventListener("scroll", () => {
        if (window.scrollY <= 100 && !footerVisible) {
            toggleBackToTopButton(false);
        }
    });

    
    // Scroll to the cart title with added pixel adjustment
    backToTopButton.addEventListener("click", () => {
        if (cartTitle) {
            cartTitle.scrollIntoView({
                behavior: "smooth", // Smooth scrolling effect
                block: "start", // Scroll to the top of the title
            });

            // Add pixel adjustment after scrollIntoView
            setTimeout(() => {
                const offset = 50; // Adjust this value as needed
                window.scrollBy(0, -offset);
            }, 0); // Delay to allow scrollIntoView to finish
        } else {
            console.warn("Cart title element not found. Check your selector or HTML structure.");
        }
    });
});


