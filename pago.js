function guardarPago() {
  const tarjeta = document.getElementById("numTarjeta").value;
  const expira = document.getElementById("expira").value;
  const cvv = document.getElementById("cvv").value;
  const direccion = document.getElementById("direccion").value;
  const ciudad = document.getElementById("ciudad").value;
  const cp = document.getElementById("cp").value;

  if (!tarjeta || !expira || !cvv || !direccion || !ciudad || !cp) {
    alert("Completa todos los campos");
    return;
  }

  const pedido = JSON.parse(localStorage.getItem("pedido"));

  pedido.direccion = `${direccion}, ${ciudad}, CP ${cp}`;
  pedido.envio = 99;
  pedido.total = pedido.subtotal + 99;
  pedido.metodo = "Tarjeta"; // 🔥 NUEVO

  localStorage.setItem("pedido", JSON.stringify(pedido));

  window.location.href = "checkout.html";
}


const pedido = JSON.parse(localStorage.getItem("pedido"));
document.getElementById("productos").innerText = pedido.productos.join(", ");
document.getElementById("subtotal").innerText = pedido.subtotal;
document.getElementById("total").innerText = pedido.subtotal + 99;