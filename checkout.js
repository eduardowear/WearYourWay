const pedido = JSON.parse(localStorage.getItem("pedido"));

if (pedido) {
  document.getElementById("cliente").innerText = pedido.cliente;
  document.getElementById("correo").innerText = pedido.correo;
  document.getElementById("direccion").innerText = pedido.direccion || "No especificada";
  document.getElementById("metodo").innerText = "Mercado Pago";
  document.getElementById("fecha").innerText = new Date().toLocaleString();
  document.getElementById("producto").innerText = pedido.productos.join(", ");
  document.getElementById("cantidad").innerText = pedido.productos.length;
  document.getElementById("subtotal").innerText = pedido.subtotal;
  document.getElementById("envio").innerText = pedido.envio;
  document.getElementById("total").innerText = pedido.total;
}
