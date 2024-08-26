const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

// Initialize an empty cart
let cart = [];

// Function to update cart items and total
function updateCartModal() {
    cartItemsContainer.innerHTML = ""; // Clear the cart items container
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        cart.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "cart-item";
            itemDiv.innerHTML = `
                <p>${item.name}</p>
                <p>${item.quantity} x R$${item.price.toFixed(2)}</p>
                <p>Total: R$${(item.quantity * item.price).toFixed(2)}</p>
            `;
            cartItemsContainer.appendChild(itemDiv);
            total += item.quantity * item.price;
        });
    }

    cartTotal.textContent = total.toFixed(2);
    cartCounter.textContent = cart.length;
    updateCheckoutButtonState();
}

// Function to add items to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    updateCartModal();
}

// Function to update the state of the checkout button
function updateCheckoutButtonState() {
    if (cart.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.classList.add("opacity-50");
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.classList.remove("opacity-50");
    }
}

// Event listeners for cart buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        addToCart(name, price);
    });
});

cartBtn.addEventListener("click", function() {
    cartModal.style.display = "flex";
    updateCartModal();
});

cartModal.addEventListener("click", function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none";
});

addressInput.addEventListener("input", function() {
    if (addressInput.value.trim() === "") {
        addressWarn.classList.remove("hidden");
    } else {
        addressWarn.classList.add("hidden");
    }
});

checkoutBtn.addEventListener("click", function() {
    if (addressInput.value.trim() === "") {
        addressWarn.classList.remove("hidden");
    } else {
        addressWarn.classList.add("hidden");
        // Prepare the order
        const order = {
            items: cart,
            total: parseFloat(cartTotal.textContent),
            address: addressInput.value.trim()
        };

        // Send the order to the server
        fetch('http://localhost:5500/orders', { // Altere para o endpoint correto
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Falha na rede: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            alert('Pedido enviado com sucesso!');
            // Clear the cart and close the modal
            cart = [];
            updateCartModal();
            cartCounter.textContent = "0";
            addressInput.value = '';
            // Redirect to the admin dashboard
            window.location.href = 'http://localhost:5500/adminDashboard.html';
        })
        .catch(error => {
            console.error('Erro ao enviar o pedido:', error);
            alert('Erro ao enviar o pedido. Por favor, tente novamente.');
        });
    }
});
