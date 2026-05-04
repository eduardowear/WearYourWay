function guardarPago() {
  const tarjeta = document.getElementById("numTarjeta").value;
  const expira = document.getElementById("expira").value;
  const cvv = document.getElementById("cvv").value;
  const direccion = document.getElementById("direccion").value;
  const ciudad = document.getElementById("ciudad").value;
  const cp = document.getElementById("cp").value;

  if (!tarjeta || !expira || !cvv || !direccion || !ciudad || !cp) {
    alert("Completa todos los campos de pago y dirección");
    return;
  }

  // Recuperar pedido existente
  const pedido = JSON.parse(localStorage.getItem("pedido")) || { productos: [], subtotal: 0 };

  // Guardar datos de pago y envío
  pedido.tarjeta = `**** **** **** ${tarjeta.slice(-4)} (expira ${expira})`;
  pedido.direccion = `${direccion}, ${ciudad}, CP ${cp}`;
  pedido.envio = 99;
  pedido.total = pedido.subtotal + 99;

  localStorage.setItem("pedido", JSON.stringify(pedido));

  // Redirigir a la confirmación
  window.location.href = "checkout.html";
}

// Mostrar resumen en pago.html
const pedido = JSON.parse(localStorage.getItem("pedido")) || { productos:["Playera personalizada"], subtotal:299 };
document.getElementById("productos").innerText = pedido.productos.join(", ");
document.getElementById("subtotal").innerText = pedido.subtotal;
document.getElementById("total").innerText = pedido.subtotal + 99;
