// Ürünleri çeken API
const API_URL = "https://fakestoreapi.com/products";
const cart = [];
let totalPrice = 0;

const fetchProducts = async () => {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Ürünler yüklenirken hata oluştu:", error);
    }
};

const displayProducts = (products) => {
    const productContainer = document.getElementById("products");

    productContainer.innerHTML = ''; // Clear previous products
    products.forEach(product => {
        const productCard = `
        <div class="col-md-4 mb-4  p-2 px-2">
         
                <div class="card-img-top">
                <img src="${product.image}" class="card-img-top align-items-center" alt="${product.title}">
                </div>
                <div class="card-body w-75 h-full">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-success" onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
                </div>
       
        </div>
        `;
        productContainer.innerHTML += productCard;
    });
};

const addToCart = (id, title, price) => {
    cart.push({ id, title, price });
    updateCart();
};


const updateCart = () => {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    cartItems.innerHTML = "";
    totalPrice = 0;

    cart.forEach(({ title, price }) => {
        const listItem = createCartItem(title, price);
        cartItems.insertAdjacentHTML("beforeend", listItem);
        totalPrice += price;
    });

    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
    cartCount.textContent = cart.length;
};

const createCartItem = (title, price) => `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        ${title}
        <span>$${price}</span>
    </li>
`;
// Checkout işlemi
document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        const successAlert = document.getElementById("success-alert");
        successAlert.style.display = "block";
        successAlert.textContent = `Payment of $${totalPrice.toFixed(2)} successful!`;

        cart.length = 0;
        updateCart();

        const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        modal.hide();
    }
});

// Ürünleri çek
fetchProducts();
