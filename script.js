// Simulated Pi Wallet Balance
let piBalance = 0.00;
let transactions = [];

// Update Wallet Balance
function updateWalletBalance() {
    document.getElementById("pi-balance").textContent = `${piBalance.toFixed(2)} π`;
}
updateWalletBalance();

// QR Code Functions
function scanQR() {
    alert("Simulating QR scan... Integrate with a QR library or Pi API for real scanning.");
    const amount = prompt("Enter amount to pay (π):");
    if (amount && !isNaN(amount)) {
        piBalance -= parseFloat(amount);
        addTransaction(`Paid ${amount} π via QR`, -parseFloat(amount));
        updateWalletBalance();
    }
}

function generateQR() {
    const qrDisplay = document.getElementById("qr-display");
    qrDisplay.style.display = "block";
    qrDisplay.innerHTML = "<p>Your QR Code (Simulated)</p><div style='width: 100px; height: 100px; background: #ccc; margin: 0 auto;'></div>";
    alert("Generate your QR code here for receiving Pi. Use a QR library like qrcode.js.");
}

// Payment Functions
function sendPi() {
    const recipient = prompt("Enter recipient Pi username:");
    const amount = prompt("Enter amount to send (π):");
    if (recipient && amount && !isNaN(amount)) {
        piBalance -= parseFloat(amount);
        addTransaction(`Sent ${amount} π to ${recipient}`, -parseFloat(amount));
        updateWalletBalance();
    }
}

function receivePi() {
    const amount = prompt("Enter amount to receive (π):");
    if (amount && !isNaN(amount)) {
        piBalance += parseFloat(amount);
        addTransaction(`Received ${amount} π`, parseFloat(amount));
        updateWalletBalance();
    }
}

function payBills() {
    const billType = prompt("Enter bill type (e.g., Electricity, Water):");
    const amount = prompt("Enter bill amount (π):");
    if (billType && amount && !isNaN(amount)) {
        piBalance -= parseFloat(amount);
        addTransaction(`Paid ${amount} π for ${billType}`, -parseFloat(amount));
        updateWalletBalance();
    }
}

function buyGoods() {
    const item = prompt("Enter item (e.g., Vegetables, Stationery):");
    const amount = prompt("Enter amount (π):");
    if (item && amount && !isNaN(amount)) {
        piBalance -= parseFloat(amount);
        addTransaction(`Bought ${item} for ${amount} π`, -parseFloat(amount));
        updateWalletBalance();
    }
}

// Mobile Recharge
function mobileRecharge() {
    document.getElementById("recharge-form").classList.remove("hidden");
}

function submitRecharge() {
    const number = document.getElementById("recharge-number").value;
    const operator = document.getElementById("recharge-operator").value;
    const amount = document.getElementById("recharge-amount").value;
    if (number.length === 10 && operator && amount && !isNaN(amount)) {
        piBalance -= parseFloat(amount);
        addTransaction(`Recharged ${number} (${operator}) for ${amount} π`, -parseFloat(amount));
        updateWalletBalance();
        document.getElementById("recharge-form").classList.add("hidden");
    } else {
        alert("Please enter valid details.");
    }
}

// Transaction History
function addTransaction(description, amount) {
    transactions.push({ description, amount, date: new Date().toLocaleString() });
    const list = document.getElementById("transaction-list");
    const placeholder = list.querySelector(".placeholder");
    if (placeholder) placeholder.remove();
    const item = document.createElement("li");
    item.className = "transaction-item";
    item.innerHTML = `
        <span class="material-icons">${amount < 0 ? "arrow_upward" : "arrow_downward"}</span>
        <div>
            <p>${description}</p>
            <small>${new Date().toLocaleString()}</small>
        </div>
        <p class="amount" style="color: ${amount < 0 ? '#D32F2F' : '#388E3C'}">${amount.toFixed(2)} π</p>
    `;
    list.insertBefore(item, list.firstChild);
}

// Navigation
function showHome() {
    alert("Already on Home!");
}

function showHistory() {
    alert("Switch to full History view.");
}

function showProfile() {
    alert("Switch to Profile view with Pi account details.");
}

// Pi Account Linking
document.getElementById("link-pi-btn").addEventListener("click", () => {
    document.getElementById("pi-modal").classList.remove("hidden");
});

function linkPiAccount() {
    const username = document.getElementById("pi-username").value;
    const password = document.getElementById("pi-password").value;
    if (username && password) {
        alert(`Simulating Pi account linking for ${username}. Integrate Pi mainnet API here.`);
        piBalance = 50.00; // Simulated initial balance
        updateWalletBalance();
        closeModal();
    } else {
        alert("Please enter valid Pi credentials.");
    }
}

function closeModal() {
    document.getElementById("pi-modal").classList.add("hidden");
}
