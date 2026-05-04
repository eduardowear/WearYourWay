const cards = document.getElementById("cards");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");

const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");

const cardsElements = document.querySelectorAll(".card");

// ================= MODAL =================
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

// ================= CARRUSEL =================
rightBtn.addEventListener("click", () => {
    cards.scrollLeft += 300;
});

leftBtn.addEventListener("click", () => {
    cards.scrollLeft -= 300;
});

// ================= CARRITO =================
const cartIcon = document.getElementById("cart-icon");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

let total = 0;
let count = 0;

// Abrir carrito
cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

// Cerrar carrito
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// ================= AGREGAR AL CARRITO =================
const buyButton = document.querySelector(".modal-content .btn-primary");

buyButton.addEventListener("click", () => {
    const title = modalTitle.innerText;
    const priceText = modalPrice.innerText;
    const price = parseInt(priceText.replace("$", ""));

    const item = document.createElement("div");
    item.classList.add("cart-item");

    const itemText = document.createElement("span");
    itemText.innerText = `${title} - $${price} MXN`;

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "❌";
    removeBtn.style.marginLeft = "10px";

    // Eliminar producto
    removeBtn.addEventListener("click", () => {
        cartItems.removeChild(item);
        total -= price;
        count--;

        cartTotal.innerText = total;
        cartCount.innerText = count;
    });

    item.appendChild(itemText);
    item.appendChild(removeBtn);
    cartItems.appendChild(item);

    total += price;
    count++;

    cartTotal.innerText = total;
    cartCount.innerText = count;

    modal.style.display = "none";
});

// ================= VACIAR CARRITO =================
const clearCartBtn = document.createElement("button");
clearCartBtn.innerText = "Vaciar carrito";
clearCartBtn.style.marginTop = "10px";

clearCartBtn.addEventListener("click", () => {
    cartItems.innerHTML = "";
    total = 0;
    count = 0;

    cartTotal.innerText = total;
    cartCount.innerText = count;
});

cart.appendChild(clearCartBtn);

// ================= COMPRAR =================
const purchaseBtn = document.createElement("button");
purchaseBtn.innerText = "Comprar";
purchaseBtn.style.marginTop = "10px";
purchaseBtn.style.background = "green";
purchaseBtn.style.color = "white";

purchaseBtn.addEventListener("click", () => {
    if (count === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    const correo = localStorage.getItem("correoUsuario");

    if (!correo) {
        alert("Debes iniciar sesión primero");
        window.location.href = "login.html";
        return;
    }

    const pedido = {
        productos: Array.from(cartItems.querySelectorAll(".cart-item span"))
            .map(el => el.innerText),
        subtotal: total,
        correo: correo 
    };

    localStorage.setItem("pedido", JSON.stringify(pedido));

    window.location.href = "pago.html";
});

cart.appendChild(purchaseBtn);

// ================= USUARIO =================
const user = localStorage.getItem("loggedUser");

const welcome = document.getElementById("welcomeUser");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

if (user) {
    if (welcome) welcome.innerText = "Hola " + user + " 👋";
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
}

function logout() {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("correoUsuario"); 
    location.reload();
}