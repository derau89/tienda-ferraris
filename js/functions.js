console.log("JS cargado");

// =======================
// 1. ESTADO
// =======================
let cart = [];

// =======================
// 2. SELECTORES
// =======================
const productsContainer = document.querySelector(".products");
const cartItemsContainer = document.querySelector(".cart-items");
const closeCartBtn = document.querySelector(".cart-x");
const cartElement = document.querySelector(".cart");
const cartIcon = document.querySelector("header").lastElementChild;
const cartCount = document.getElementById("cart-count");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.querySelector(".cart__checkout");



// =======================
// 3. EVENTOS GLOBALES
// =======================
cartIcon.addEventListener("click", toggleCart);
closeCartBtn.addEventListener("click", () => cartElement.classList.remove("show"));
cartItemsContainer.addEventListener("click", handleQuantityClick);
clearCartBtn.addEventListener("click", clearCart);
checkoutBtn.addEventListener("click", handleCheckout);


// =======================
// 4. INICIALIZACIÓN
// =======================
initProductButtons();

// =======================
// 5. FUNCIONES
// =======================

function initProductButtons() {
  const buttons = document.querySelectorAll(".products button.add");

  console.log("Botones encontrados:", buttons.length);

  buttons.forEach(button => {
    button.innerText = "Añadir al carrito";

    button.addEventListener("click", () => {
      const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: Number(button.dataset.price),
        quantity: 1
      };

      addToCart(product);
    });
  });
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push(product);
    updateCartCount();
  }

  renderCart();
}

function renderCart() {
  const container = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Carrito vacío</p>";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <div class="cart__item-info">
        <p><strong>${item.name}</strong></p>
        <span>$${item.price.toLocaleString()}</span>
      </div>

  <div class="quantity-controls">
    <button class="qty-btn minus" data-id="${item.id}">−</button>
    <span class="qty">${item.quantity}</span>
    <button class="qty-btn plus" data-id="${item.id}">+</button>
  </div>


<button class="cart__remove" data-id="${item.id}">
    🗑
  </button>
`;

    cartItemsContainer.appendChild(div);
  });
}






function handleQuantityClick(e) {
  const btn = e.target;

  if (!btn.classList.contains("qty-btn")) return;

  const id = btn.dataset.id;
  const item = cart.find(p => p.id === id);
  if (!item) return;

  if (btn.classList.contains("plus")) {
    item.quantity++;
  }

  if (btn.classList.contains("minus")) {
    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter(p => p.id !== id);
    }
  }

  
  renderCart();
  updateCartCount();
}


function updateCartCount() {
  if (!cartCount) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? "block" : "none";
}

function toggleCart() {
  cartElement.classList.toggle("show");
}


document.querySelector(".cart-items")
  .addEventListener("click", e => {

    if (e.target.classList.contains("cart__remove")) {
      const id = e.target.dataset.id;
      removeFromCart(id);
    }

  });


  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
    updateCartCount();
  }


  function clearCart() {
    if (cart.length === 0) return;

    cart = [];
    renderCart();
    updateCartCount();
  }

  function handleCheckout(){

 if(cart.length === 0){
   alert("Tu carrito está vacío 😢");
   return;
 }

 alert("Gracias por su compra 🚗🔥");

 cart = [];

 renderCart();
 updateCartCount();

}
