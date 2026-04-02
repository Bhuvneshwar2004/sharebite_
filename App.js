const apiUrl = 'http://localhost:5000/api/food';

// Fetch and display available food
async function loadFood() {
    try {
        const response = await fetch(apiUrl);
        const foods = await response.json();
        const foodList = document.getElementById('food-list');
        foodList.innerHTML = '';

        if(foods.length === 0) {
            foodList.innerHTML = `
                <div class="empty-state">
                    <h3>No food available right now.</h3>
                    <p>Check back later or be the first to donate!</p>
                </div>`;
            return;
        }

        foods.forEach(food => {
            const card = document.createElement('div');
            card.className = 'food-card fade-in'; // Added animation class
            
            // Updated HTML structure for the new premium design
            card.innerHTML = `
                <div class="food-info">
                    <h3>🍱 ${food.foodItem}</h3>
                    <p><strong>📦 Quantity:</strong> ${food.quantity}</p>
                    <p><strong>🏪 Donor:</strong> ${food.donorName}</p>
                    <p><strong>📍 Pickup:</strong> ${food.pickupLocation}</p>
                </div>
                <button class="claim-btn" onclick="claimFood('${food._id}')">Claim Food</button>
            `;
            foodList.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading food:", error);
    }
}

// Submit a new donation
document.getElementById('donation-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Change button text to show it's working
    const submitBtn = document.querySelector('.btn-primary');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Posting...';
    
    const newFood = {
        donorName: document.getElementById('donorName').value,
        foodItem: document.getElementById('foodItem').value,
        quantity: document.getElementById('quantity').value,
        pickupLocation: document.getElementById('pickupLocation').value
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFood)
        });

        if (response.ok) {
            document.getElementById('donation-form').reset();
            loadFood(); // Reload dashboard
        }
    } catch (error) {
        console.error("Error submitting donation:", error);
    } finally {
        // Reset button text
        submitBtn.innerText = originalText;
    }
});

// Claim food function
async function claimFood(id) {
    // Confirm before claiming
    if(!confirm("Are you sure you want to claim this food for pickup?")) return;

    try {
        const response = await fetch(`${apiUrl}/${id}/claim`, { method: 'PUT' });
        if (response.ok) {
            loadFood(); // Refresh list to remove the claimed item
        }
    } catch (error) {
        console.error("Error claiming food:", error);
    }
}

// Initial load
loadFood();