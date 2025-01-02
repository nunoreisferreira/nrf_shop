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