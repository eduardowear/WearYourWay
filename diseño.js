const designArea = document.getElementById("designArea");
const imageUpload = document.getElementById("imageUpload");

let selectedElement = null;

// CAMBIAR COLOR DE PLAYERAS Y BUSCA EN LA CARPTA IMG LA IMAGEN QUE DESCARGUES
function changeShirtColor(color) {

    const img = document.getElementById("shirtBase");

    let ruta = `img/playera-${color}.png`;

    console.log("Buscando:", ruta);

    img.src = ruta;

    // Si no existe la imagen, vuelve a blanca
    img.onerror = function () {
        console.log("No se encontró imagen, usando blanca");
        img.src = "img/frente.png";
    };
}

//  AGREGAR TEXTO
function addText() {

    const value = document.getElementById("textInput").value;
    if (!value.trim()) return;

    const box = document.createElement("div");
    box.classList.add("design-element");
    box.style.top = "50px";
    box.style.left = "50px";

    const text = document.createElement("div");
    text.innerText = value;
    text.style.fontSize = "25px";
    text.style.color = document.getElementById("textColor").value;
    text.style.pointerEvents = "none";

    box.appendChild(text);
    designArea.appendChild(box);
    addEvents(box);

    document.getElementById("textInput").value = "";
}

// SUBIR IMAGEN
imageUpload.addEventListener("change", function () {

    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const box = document.createElement("div");
        box.classList.add("design-element");
        box.style.top = "60px";
        box.style.left = "60px";

        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "120px";

        box.appendChild(img);
        designArea.appendChild(box);
        addEvents(box);
    };

    reader.readAsDataURL(file);
});

//  MOVER ELEMENTOS
function addEvents(element) {

    element.addEventListener("click", function (e) {
        e.stopPropagation();

        if (selectedElement) {
            selectedElement.classList.remove("selected");
        }

        selectedElement = element;
        element.classList.add("selected");
    });

    let offsetX, offsetY;

    element.addEventListener("pointerdown", function (e) {

        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        function move(e) {
            element.style.left = (e.clientX - offsetX) + "px";
            element.style.top = (e.clientY - offsetY) + "px";
        }

        function stop() {
            document.removeEventListener("pointermove", move);
            document.removeEventListener("pointerup", stop);
        }

        document.addEventListener("pointermove", move);
        document.addEventListener("pointerup", stop);
    });
}

// DESELECCIONAR
document.addEventListener("click", function () {
    if (selectedElement) {
        selectedElement.classList.remove("selected");
    }
    selectedElement = null;
});

// ELIMINAR
function deleteSelected() {
    if (selectedElement) {
        selectedElement.remove();
        selectedElement = null;
    }
}

// GUARDAR DISEÑO
function guardarDiseno() {

    const shirt = document.getElementById("shirt");

    html2canvas(shirt, {
        backgroundColor: "#ffffff",
        scale: 2
    }).then(function (canvas) {

        const link = document.createElement("a");
        link.download = "mi-diseno.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}