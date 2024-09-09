document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    updateCartDisplay();
    setupOrderSummaryDialog();
    setupPaymentForm();
});
 
let cart = JSON.parse(localStorage.getItem('cart')) || [];
 
// Products to display
// Function to load products dynamically
function loadProducts() {
   
}
    const products = [
        {
            id: 1,
            name: "Produkt 1",
            price: 10.99,
            description: "Opis produktu 1",
            images: "kh1.jpg"
        },
        {
            id: 2,
            name: "Produkt 2",
            price: 100.99,
            description: "Opis produktu 2",
            images: "handy1.jpg"
        },
        {
            id: 3,
            name: "Produkt 3",
            price: 300.99,
            description: "Opis produktu 3",
            images: "Laptop.jpg"
        },
        {
            id: 4,
            name: "Produkt 4",
            price: 40.99,
            description: "Opis produktu 4",
            images: "drucker.jpg"
        },
        {
            id: 5,
            name: "Produkt 5",
            price: 25.99,
            description: "Opis produktu 5",
            images: "lampe.jpg"
        }
   
    ];
 
// Displaying products on the page
function loadProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
 
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}
 
// Adding a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}
 
// Update the display of the number of products in the cart
function updateCartDisplay() {
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}
 
// Order Summary
function setupOrderSummaryDialog() {
    const orderSummaryDialog = document.getElementById('order-summary-dialog');
    const viewOrderSummaryBtn = document.getElementById('view-order-summary');
    const closeSummaryBtn = document.getElementById('close-summary');
    const checkoutBtn = document.getElementById('checkout-btn');
 
    viewOrderSummaryBtn.addEventListener('click', () => {
        displayOrderSummary();
        orderSummaryDialog.classList.add('active');
    });
 
    closeSummaryBtn.addEventListener('click', () => {
        orderSummaryDialog.classList.remove('active');
    });
 
    checkoutBtn.addEventListener('click', () => {
        orderSummaryDialog.classList.remove('active');
        document.getElementById('payment-form-modal').classList.add('active');
    });
}
 
// Displaying cart summary
function displayOrderSummary() {
    const orderSummaryItems = document.getElementById('order-summary-items');
    const totalItemsCount = document.getElementById('total-items-count');
    const totalPriceAmount = document.getElementById('total-price-amount');
 
    orderSummaryItems.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;
 
    cart.forEach(product => {
        const li = document.createElement('li');
        li.innerText = `${product.name} (x${product.quantity}) - $${(product.price * product.quantity).toFixed(2)}`;
        orderSummaryItems.appendChild(li);
 
        totalItems += product.quantity;
        totalPrice += product.price * product.quantity;
    });
 
    totalItemsCount.innerText = totalItems;
    totalPriceAmount.innerText = totalPrice.toFixed(2);
}
 
// Payment form
function setupPaymentForm() {
    const paymentFormModal = document.getElementById('payment-form-modal');
    const cancelPaymentBtn = document.getElementById('cancel-payment');
 
    cancelPaymentBtn.addEventListener('click', () => {
        paymentFormModal.classList.remove('active');
    });
 
    document.getElementById('payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Payment processed successfully!");
        cart = [];
        localStorage.removeItem('cart');
        updateCartDisplay();
        paymentFormModal.classList.remove('active');
    });
}