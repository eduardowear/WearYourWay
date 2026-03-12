const cards = document.getElementById("cards");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");

const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");

const cardsElements = document.querySelectorAll(".card");

cardsElements.forEach(card => {
    card.addEventListener("click", () => {
        const title = card.querySelector("h3").innerText;
        const price = card.querySelector("p").innerText;

        modalTitle.innerText = title;
        modalPrice.innerText = price;

        modal.style.display = "flex";
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Parte del carrusel
rightBtn.addEventListener("click", () => {
    cards.scrollLeft += 300;
});

leftBtn.addEventListener("click", () => {
    cards.scrollLeft -= 300;
});

// Carrito de compras
const cartIcon = document.getElementById("cart-icon");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

let total = 0;
let count = 0;

// Abre el carrito
cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

// Cierra el carrito
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// Botón comprar del modal
const buyButton = document.querySelector(".modal-content .btn-primary");

buyButton.addEventListener("click", () => {
    const title = document.getElementById("modal-title").innerText;
    const priceText = document.getElementById("modal-price").innerText;
    const price = parseInt(priceText.replace("$", ""));

    const item = document.createElement("p");
    item.innerText = `${title} - $${price} MXN`;

    cartItems.appendChild(item);

    total += price;
    count++;

    cartTotal.innerText = total;
    cartCount.innerText = count;

    modal.style.display = "none";
});

// Mostrar usuario arriba
const user = localStorage.getItem("loggedUser");

if (user) {
    const welcome = document.getElementById("welcomeUser");
    welcome.innerText = " | Hola " + user + " 👋";
}

const welcome = document.getElementById("welcomeUser");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

if (user) {
    welcome.innerText = "Hola " + user;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
}

function logout() {
    localStorage.removeItem("loggedUser");
    location.reload();
}
