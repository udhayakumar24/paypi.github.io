// Simulated Pi Wallet Balance and User Data
let piBalance = 0.00;
let transactions = [];
let isAccountLinked = false;
let piUsername = "Not Linked";

// Update Wallet Balance
function updateWalletBalance() {
    document.getElementById("pi-balance").textContent = `${piBalance.toFixed(2)} π`;
    if (isAccountLinked) {
        document.getElementById("profile-balance").textContent = `${piBalance.toFixed(2)} π`;
        document.getElementById("link-pi-profile-btn").classList.add("hidden");
        document.getElementById("unlink-pi-profile-btn").classList.remove("hidden");
    } else {
        document.getElementById("link-pi-profile-btn").classList.remove("hidden");
        document.getElementById("unlink-pi-profile-btn").classList.add("hidden");
    }
    document.getElementById("profile-username").textContent = piUsername;
}
updateWalletBalance();

// QR Code Functions
function scanQR() {
    if (!isAccountLinked) {
        alert("Please link your Pi account first in the Profile section!");
        return;
    }
    const amount = prompt("Enter amount to pay (π):", "5.00");
    if (amount && !isNaN(amount) && piBalance >= parseFloat(amount)) {
        piBalance -= parseFloat(amount);
        addTransaction(`Paid ${amount} π via QR to Vendor`, -parseFloat(amount));
        updateWalletBalance();
        alert(`Successfully paid ${amount} π!`);
    } else {
        alert("Invalid amount or insufficient balance!");
    }
}

function generateQR() {
    if (!isAccountLinked) {
        alert("Please link your Pi account first in the Profile section!");
        return;
    }
    const qrDisplay = document.getElementById("qr-display");
    qrDisplay.style.display = "block";
    qrDisplay.innerHTML = `<p>Your QR Code for ${piUsername}</p><div style='width: 100px; height: 100px; background: #ccc; margin: 0 auto;'></div>`;
    setTimeout(() => {
        qrDisplay.style.display = "none";
    }, 5000); // Hide after 5 seconds
}

// Payment Functions
function sendPi() {
    if (!isAccountLinked) {
        alert("Please link your Pi account first in the Profile section!");
        return;
    }
    const recipient = prompt("Enter recipient Pi username:", "friend123");
    const amount = prompt("Enter amount to send (π):", "10.00");
    if (recipient && amount && !isNaN(amount) && piBalance >= parseFloat(amount)) {
        piBalance -= parseFloat(amount);
        addTransaction(`Sent ${amount} π to ${recipient}`, -parseFloat(amount));
        updateWalletBalance();
        alert(`Successfully sent ${amount} π to ${recipient}!`);
    } else {
        alert("Invalid input or insufficient balance!");
    }
}

function receivePi() {
    if (!isAccountLinked) {
        alert("Please link your Pi account first in the Profile section!");
        return;
    }
    const amount = prompt("Enter amount to receive (π):", "15.00");
    if (amount && !isNaN(amount)) {
        piBalance += parseFloat(amount);
        addTransaction(`Received ${amount} π from Friend`, parseFloat(amount));
        updateWalletBalance();
        alert(`Successfully received ${amount} π!`);
    } else {
        alert("Invalid amount!");
    }
}

function payBills() {
    if (!isAccountLinked) {
        alert("Please link your Pi account first in the Profile section!");
        return;
    }
    const billType = prompt("Enter bill type (e.g., Electricity, Water):", "Electricity");
    const amount = prompt("Enter bill amount (π):", "20.00");
    if (billType && amount && !isNaN(amount) && piBalance >= parseFloat(amount)) {
        piBalance -= parseFloat(amount);
        addTransaction(`Paid ${amount} π for ${billType}`, -parseFloat(amount));
        updateWalletBalance();
        alert(`Bill for ${billType} paid successfully!`);
    } else {
        alert("Invalid input or insufficient balance!");
    }
}

function buyGoods() {
    if (!isAccountLinked) {
        alert("Please link your Pi account first in the Profile section!");
        return;
    }
    const item = prompt("Enter item (e.g., Vegetables, Stationery):", "Vegetables");
    const amount = prompt("Enter amount (π):", "5.00");
    if (item && amount && !isNaN(amount) && piBalance >= parseFloat(amount)) {
        piBalance -= parseFloat(amount);
        addTransaction(`Bought ${item} for ${amount} π`, -parseFloat(amount));
        updateWalletBalance();
        alert(`Successfully bought ${item} for ${amount} π!`);
    } else {
        alert("Invalid input or insufficient balance!");
    }
}

// Mobile Recharge
function mobileRecharge() {
    if (!isAccountLinked) {
        alert("Please link your Pi account first in the Profile section!");
        return;
    }
    document.getElementById("recharge-form").classList.remove("hidden");
}

function submitRecharge() {
    const number = document.getElementById("recharge-number").value;
    const operator = document.getElementById("recharge-operator").value;
    const amount = document.getElementById("recharge-amount").value;
    if (number.length === 10 && operator && amount && !isNaN(amount) && piBalance >= parseFloat(amount)) {
        piBalance -= parseFloat(amount);
        addTransaction(`Recharged ${number} (${operator}) for ${amount} π`, -parseFloat(amount));
        updateWalletBalance();
        document.getElementById("recharge-form").classList.add("hidden");
        alert(`Recharge successful for ${number}!`);
    } else {
        alert("Invalid details or insufficient balance!");
    }
}

function cancelRecharge() {
    document.getElementById("recharge-form").classList.add("hidden");
    document.getElementById("recharge-number").value = "";
    document.getElementById("recharge-operator").value = "";
    document.getElementById("recharge-amount").value = "";
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
    document.getElementById("profile-section").classList.add("hidden");
    document.querySelector("main").style.display = "block";
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    document.querySelector(".nav-item:nth-child(1)").classList.add("active");
}

function showHistory() {
    if (!isAccountLinked) {
        alert("Please link your Pi account first in the Profile section!");
        return;
    }
    alert("Showing recent transactions in the main view!");
    document.getElementById("profile-section").classList.add("hidden");
    document.querySelector("main").style.display = "block";
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    document.querySelector(".nav-item:nth-child(2)").classList.add("active");
}

function showProfile() {
    document.querySelector("main").style.display = "none";
    const profileSection = document.getElementById("profile-section");
    profileSection.classList.remove("hidden");
    updateWalletBalance();
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    document.querySelector(".nav-item:nth-child(3)").classList.add("active");
}

function closeProfile() {
    document.getElementById("profile-section").classList.add("hidden");
    document.querySelector("main").style.display = "block";
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    document.querySelector(".nav-item:nth-child(1)").classList.add("active");
}

// Pi Account Linking
function showLinkModal() {
    document.getElementById("pi-modal").classList.remove("hidden");
}

function linkPiAccount() {
    const username = document.getElementById("pi-username").value.trim();
    const password = document.getElementById("pi-password").value.trim();
    if (username && password) {
        piUsername = username;
        isAccountLinked = true;
        piBalance = 100.00; // Simulated starting balance
        updateWalletBalance();
        alert(`Pi account linked successfully for ${username}! You now have 100 π to start.`);
        closeModal();
    } else {
        alert("Please enter a valid username and password!");
    }
}

function unlinkPiAccount() {
    if (confirm("Are you sure you want to unlink your Pi account?")) {
        isAccountLinked = false;
        piUsername = "Not Linked";
        piBalance = 0.00;
        transactions = [];
        updateWalletBalance();
        document.getElementById("profile-username").textContent = "Not Linked";
        document.getElementById("transaction-list").innerHTML = '<li class="transaction-item placeholder">No transactions yet</li>';
        alert("Pi account unlinked successfully!");
    }
}

function closeModal() {
    const modal = document.getElementById("pi-modal");
    modal.classList.add("hidden");
    document.getElementById("pi-username").value = "";
    document.getElementById("pi-password").value = "";
}
