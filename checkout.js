const pedido = JSON.parse(localStorage.getItem("pedido"));

if (pedido) {

  // DATOS USUARIO
  fetch("http://localhost:3000/getUserData", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo: pedido.correo })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById("cliente").innerText = data.user.Nombre;
        document.getElementById("correo").innerText = data.user.Correo;
        document.getElementById("direccion").innerText = pedido.direccion;
      }
    });

  // PRODUCTOS
  document.getElementById("producto").innerText = pedido.productos.join(", ");
  document.getElementById("cantidad").innerText = pedido.productos.length;
  document.getElementById("precioProductos").innerText = pedido.subtotal;

  document.getElementById("subtotal").innerText = pedido.subtotal;
  document.getElementById("envio").innerText = pedido.envio;
  document.getElementById("total").innerText = pedido.total;

  // METODO Y FECHA
  document.getElementById("metodo").innerText = pedido.metodo;
  document.getElementById("fecha").innerText = new Date().toLocaleDateString();

  // GUARDAR EN BD
  fetch("http://localhost:3000/guardarPedido", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      correo: pedido.correo,
      productos: pedido.productos,
      subtotal: pedido.subtotal,
      envio: pedido.envio,
      total: pedido.total,
      direccion: pedido.direccion,
      metodo: pedido.metodo
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById("folio").innerText = data.folio;
      }
    });
}