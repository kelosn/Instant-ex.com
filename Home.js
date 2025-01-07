let rates = {}; // Holds fetched exchange rates

// Hardcoded exchange rates between currencies
const exchangeRates = {
    PLN: { XAF: 154, GHS: 2.5, NGN: 100 },
    EUR: { XAF: 650, GHS: 10, NGN: 450 },
    USD: { XAF: 600, GHS: 9, NGN: 400 },
};

// Function to handle conversion
function updateConversion() {
    const amount = parseFloat(document.getElementById("convertAmount").value) || 0;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    // Validate input
    if (!exchangeRates[fromCurrency] || !exchangeRates[fromCurrency][toCurrency] || amount <= 0) {
        document.getElementById("result").textContent = "0.00";
        document.getElementById("conversionFee").textContent = "0.00";
        document.getElementById("totalPay").textContent = "0.00";
        return;
    }

    // Calculate conversion
    const conversionRate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = amount * conversionRate;

    // Calculate 1% fee in source currency
    const fee = amount * 0.01;
    const totalPay = amount + fee; // Total to pay in source currency

    // Update results
    document.getElementById("result").textContent = `${convertedAmount.toFixed(2)} ${toCurrency}`;
    document.getElementById("conversionFee").textContent = `${fee.toFixed(2)} ${fromCurrency}`;
    document.getElementById("totalPay").textContent = `${totalPay.toFixed(2)} ${fromCurrency}`;
}

// Event listener setup
function setupEventListeners() {
    const amountInput = document.getElementById("convertAmount");
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const convertButton = document.getElementById("convertButton");

    if (amountInput) amountInput.addEventListener("input", updateConversion);
    if (fromCurrency) fromCurrency.addEventListener("change", updateConversion);
    if (toCurrency) toCurrency.addEventListener("change", updateConversion);
    if (convertButton) convertButton.addEventListener("click", updateConversion);
}

// Cookie handling
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("policy-modal");
    const acceptBtn = document.getElementById("accept-policy");
    const privacyPolicyLink = document.getElementById("privacy-policy-link");
    const closeBtn = document.querySelector(".modal-close");

    // Show the modal on page load
    modal.style.display = "block";

    // Close the modal when "I Agree" is clicked
    acceptBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Show the modal when the "Privacy Policy" link is clicked
    if (privacyPolicyLink) {
        privacyPolicyLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior
            modal.style.display = "block";
        });
    }

    // Close the modal when the close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    // Setup event listeners for conversion
    setupEventListeners();
});
