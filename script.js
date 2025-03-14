document.addEventListener("DOMContentLoaded", function () {
    let count = 0;
    let clicksPerClick = 1;

    const btn = document.getElementById("btn");
    const disp = document.getElementById("display");
    const investBtn = document.getElementById("investBtn");
    const investModal = document.getElementById("investModal");
    const closeModal = document.getElementById("closeModal");
    const upgradesContainer = document.getElementById("upgradesContainer");

    // Upgrade definitions
    const upgrades = [
        { name: "Double Click Power", cost: 10, multiplier: 2 },
        { name: "Triple Click Power", cost: 50, multiplier: 3 },
        { name: "Mega Click", cost: 100, multiplier: 5 }
    ];

    // Update displayed click count
    function updateDisplay() {
        disp.textContent = count;
    }

    // Handle button click
    btn.addEventListener("click", function () {
        count += clicksPerClick;
        updateDisplay();
    });

    // Open upgrades modal
    investBtn.addEventListener("click", function () {
        renderUpgrades();
        investModal.classList.remove("hidden");
    });

    // Close modal
    closeModal.addEventListener("click", function () {
        investModal.classList.add("hidden");
    });

    // Render upgrade buttons dynamically
    function renderUpgrades() {
        upgradesContainer.innerHTML = '';
        upgrades.forEach((upgrade, index) => {
            const upgradeBtn = document.createElement('button');
            upgradeBtn.textContent = `${upgrade.name} - Cost: ${upgrade.cost}`;
            upgradeBtn.disabled = count < upgrade.cost;
            upgradeBtn.addEventListener('click', function () {
                purchaseUpgrade(index);
            });
            upgradesContainer.appendChild(upgradeBtn);
        });
    }

    // Handle purchase of upgrades
    function buyUpgrade(upgradeIndex) {
        const upgrade = upgrades[upgradeIndex];
        if (count >= upgrade.cost) {
            count -= upgrade.cost;
            clicksPerClick *= upgrade.multiplier;
            upgrade.cost = Math.floor(upgrade.cost * 2.5);
            updateDisplay();
            renderUpgrades();
        }
    }

    // Setup upgrades with initial values
    upgrades.forEach(upgrade => {
        upgrade.multiplier = 2; // Each upgrade doubles click power by default
        upgrade.cost = 10;      // Initial cost (can vary per upgrade)
    });

    // Event listener for opening the modal
    investBtn.addEventListener("click", function () {
        renderUpgrades();
        investModal.classList.remove("hidden");
    });

    // Close upgrades modal
    closeModal.addEventListener("click", function () {
        investModal.classList.add("hidden");
    });

    // Initial render
    updateDisplay();
});
