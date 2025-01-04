// Abre o modal com base no ID
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    document.getElementById(modalId + "Overlay").style.display = "block";
}

// Fecha o modal com base no ID
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.getElementById(modalId + "Overlay").style.display = "none";
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById("clock").innerText = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000); // Atualiza a cada segundo
updateClock(); // Atualiza imediatamente na carga da página


function showNotification() {
    const notification = document.getElementById("notification");
    notification.classList.remove("hidden");
    setTimeout(() => notification.classList.add("hidden"), 2000);
}

function validateForm() 
{
    let message = document.getElementById("message").value;
    if (message.length < 10) {
        alert("The message must be at least 10 characters long.");
        return false;
    }
    return true;
}


/*Products Page*/
document.addEventListener("DOMContentLoaded", () => {
    // Buttons for navigation
    const buttons = document.querySelectorAll(".section-button");

    // Add event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const href = button.getAttribute("href");
            if (href) {
                window.location.href = href; // Redirect to the specified href
            }
        });
    });

    // Display clock dynamically
    const clockElement = document.getElementById("clock");
    setInterval(() => {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString();
    }, 1000);
});

/* Cart Functions*/

document.addEventListener("DOMContentLoaded", () => {
    // Handle "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".section-button");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Product added to cart!");
            // Add cart logic here, e.g., updating localStorage or a backend API
        });
    });

    // Display clock dynamically
    const clockElement = document.getElementById("clock");
    setInterval(() => {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString();
    }, 1000);
});

document.getElementById('video1').addEventListener('pause', function () {
    this.play();
});