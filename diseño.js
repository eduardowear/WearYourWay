const designArea = document.getElementById("designArea");
const imageUpload = document.getElementById("imageUpload");
const shirtColorLayer = document.getElementById("shirtColorLayer");

let selectedElement = null;

// funcion para que el coor blanco y negro no cubra por completo la imagen 
function changeShirtColor(color) {

    if (color === "white") {
        shirtColorLayer.style.background = "white";
        shirtColorLayer.style.mixBlendMode = "normal";
        shirtColorLayer.style.opacity = "0";
    }
    else if (color === "black") {
        shirtColorLayer.style.background = "black";
        shirtColorLayer.style.mixBlendMode = "normal";
        shirtColorLayer.style.opacity = "0.8";
    }
    else {
        shirtColorLayer.style.background = color;
        shirtColorLayer.style.mixBlendMode = "multiply";
        shirtColorLayer.style.opacity = "0.75";
    }
}

// TEXTO
function addText() {
    const value = document.getElementById("textInput").value;
    if (!value.trim()) return;

    const box = document.createElement("div");
    box.classList.add("design-element");
    box.style.top = "50px";
    box.style.left = "50px";
    box.style.width = "150px";
    box.style.height = "60px";

    const text = document.createElement("div");
    text.innerText = value;
    text.style.width = "100%";
    text.style.height = "100%";
    text.style.display = "flex";
    text.style.alignItems = "center";
    text.style.justifyContent = "center";
    text.style.fontSize = "30px";
    text.style.fontFamily = document.getElementById("fontFamily").value;
    text.style.color = document.getElementById("textColor").value;
    text.style.pointerEvents = "none";

    box.appendChild(text);
    designArea.appendChild(box);
    addEvents(box);

    box.addEventListener("dblclick", () => {
        const nuevo = prompt("Editar texto:", text.innerText);
        if (nuevo !== null) text.innerText = nuevo;
    });

    document.getElementById("textInput").value = "";
}

// IMAGEN
imageUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        const box = document.createElement("div");
        box.classList.add("design-element");
        box.style.top = "60px";
        box.style.left = "60px";
        box.style.width = "120px";

        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "100%";

        box.appendChild(img);
        designArea.appendChild(box);
        addEvents(box);
    };
    reader.readAsDataURL(file);
});

// funcion para que puedas mover el texto o imagen donde tu quieras
function addEvents(element) {

    element.addEventListener("click", e => {
        e.stopPropagation();

        if (selectedElement) selectedElement.classList.remove("selected");
        selectedElement = element;
        element.classList.add("selected");

        element.style.zIndex = Date.now();
    });

    let offsetX, offsetY;

    element.addEventListener("pointerdown", e => {

        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        function move(e) {
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;

            element.style.left = x + "px";
            element.style.top = y + "px";
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
document.addEventListener("click", () => {
    if (selectedElement) selectedElement.classList.remove("selected");
    selectedElement = null;
});

// ELIMINAR
function deleteSelected() {
    if (selectedElement) selectedElement.remove();
    selectedElement = null;
}

// GUARDAR
function guardarDiseno() {
    const shirt = document.getElementById("shirt");

    html2canvas(shirt, {
        useCORS: true,
        backgroundColor: "#ffffff",
        scale: 2
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "mi-diseno-wearyourway.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}