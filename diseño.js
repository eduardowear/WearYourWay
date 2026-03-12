const designArea = document.getElementById("designArea");
const imageUpload = document.getElementById("imageUpload");
const shirtColorLayer = document.getElementById("shirtColorLayer");

let selectedElement = null;


// CAMBIAR COLOR PLAYERA
function changeShirtColor(color) {
    shirtColorLayer.style.background = color;
}


// AGREGAR TEXTO
function addText() {

    const value = document.getElementById("textInput").value;
    if (value.trim() === "") return;

    const box = document.createElement("div");
    box.classList.add("design-element");

    box.style.top = "40px";
    box.style.left = "40px";
    box.style.width = "150px";
    box.style.height = "60px";

    const text = document.createElement("div");

    text.innerText = value;
    text.style.fontSize = "30px";
    text.style.fontFamily = document.getElementById("fontFamily").value;
    text.style.color = document.getElementById("textColor").value;
    text.style.transformOrigin = "top left";

    box.appendChild(text);

    designArea.appendChild(box);

    addEvents(box);


    // ESCALAR TEXTO CUANDO CAMBIE TAMAÑO
    const observer = new ResizeObserver(entries => {

        for (let entry of entries) {

            let scale = entry.contentRect.width / 150;

            text.style.transform = "scale(" + scale + ")";

        }

    });

    observer.observe(box);

}


// SUBIR IMAGEN
imageUpload.addEventListener("change", function () {

    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const box = document.createElement("div");

        box.classList.add("design-element");

        box.style.top = "50px";
        box.style.left = "50px";
        box.style.width = "120px";

        const img = document.createElement("img");

        img.src = e.target.result;
        img.style.width = "100%";

        box.appendChild(img);

        addEvents(box);

        designArea.appendChild(box);

    };

    reader.readAsDataURL(file);

});


// OBSERVAR CAMBIO DE TAMAÑO PARA ESCALAR TEXTO
function observeResize(box, text) {

    const resizeObserver = new ResizeObserver(entries => {

        for (let entry of entries) {

            let newSize = entry.contentRect.width / 6;

            text.style.fontSize = newSize + "px";

        }

    });

    resizeObserver.observe(box);

}


// MOVER ELEMENTOS
function addEvents(element) {

    element.addEventListener("click", function (e) {

        e.stopPropagation();

        if (selectedElement) selectedElement.classList.remove("selected");

        selectedElement = element;

        element.classList.add("selected");

    });

    let offsetX, offsetY;

    element.addEventListener("mousedown", function (e) {

        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;

        function move(e) {

            element.style.left = (e.clientX - offsetX) + "px";
            element.style.top = (e.clientY - offsetY) + "px";

        }

        function stop() {

            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", stop);

        }

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", stop);

    });

}


// DESELECCIONAR
document.addEventListener("click", function () {

    if (selectedElement) selectedElement.classList.remove("selected");

    selectedElement = null;

});


// ELIMINAR
function deleteSelected() {

    if (selectedElement) {

        selectedElement.remove();

        selectedElement = null;

    }

}

