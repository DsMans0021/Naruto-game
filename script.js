let clicks = 0;
let clickValue = 1;
let autoClickers = [];
let stage = 1;

const shopItems = [
    { id: 1, name: 'Upgrade Clicks', cost: 10, effect: () => clickValue++ },
    { id: 2, name: 'Sakura Haruno (Auto Clicker)', cost: 50, effect: () => autoClickers.push(setInterval(() => addClicks(1), 1000)), img: 'https://example.com/sakura.png' },
    { id: 3, name: 'Open New Stage', cost: 100, effect: openNewStage }
];

const clicksDisplay = document.getElementById('clicks');
const clickButton = document.getElementById('clickButton');
const shopItemsContainer = document.getElementById('shopItems');
const newStageContainer = document.getElementById('newStageContainer');

function addClicks(amount) {
    clicks += amount;
    updateUI();
}

function updateUI() {
    clicksDisplay.textContent = clicks;
    shopItems.forEach(item => {
        const button = document.querySelector(`#shop-item-${item.id} button`);
        if (button) {
            button.disabled = clicks < item.cost;
        }
    });
}

function createShopItems() {
    shopItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'shop-item';
        div.id = `shop-item-${item.id}`;
        div.innerHTML = `
            ${item.img ? `<img src="${item.img}" alt="${item.name}">` : ''}
            <p>${item.name}</p>
            <p>Cost: ${item.cost}</p>
            <button onclick="buyItem(${item.id})" disabled>Buy</button>
        `;
        shopItemsContainer.appendChild(div);
    });
}

function buyItem(itemId) {
    const item = shopItems.find(i => i.id === itemId);
    if (item && clicks >= item.cost) {
        clicks -= item.cost;
        item.effect();
        updateUI();
    }
}

function openNewStage() {
    stage++;
    const stageDiv = document.createElement('div');
    stageDiv.className = 'new-stage';
    stageDiv.innerHTML = `<h3>Stage ${stage}</h3><p>Welcome to the new stage!</p>`;
    newStageContainer.appendChild(stageDiv);
    shopItems.push(
        { id: shopItems.length + 1, name: `Naruto Uzumaki (Auto Clicker)`, cost: 200, effect: () => autoClickers.push(setInterval(() => addClicks(2), 1000)), img: 'https://example.com/naruto.png' }
    );
    createShopItems();
}

clickButton.addEventListener('click', () => addClicks(clickValue));
createShopItems();
updateUI();
