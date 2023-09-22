principal();
//mi funcion principal
function principal() {
  //llamados del dom

  const nav = document.getElementById("navBar");
  const abrirMenu = document.getElementById("abrir");
  const cerrarMenu = document.getElementById("cerrar");
  abrirMenu.addEventListener("click", () => mostrarMenu(nav, abrirMenu));
  cerrarMenu.addEventListener("click", () => mostrarMenu(nav, abrirMenu));

  let carrito = [];
  localStorage.getItem("carrito")
    ? (carrito = JSON.parse(localStorage.getItem("carrito")))
    : (carrito = []);

  const btnVaciar = document.querySelector(".vaciar__carrito");
  btnVaciar.addEventListener("click", () => vaciarCarrito(carrito));

  const btnComprar = document.querySelector(".comprarCarrito");
  btnComprar.addEventListener("click", () => comprarCarrito(carrito));

  renderizarCarrito(carrito);
  actualizarTotal(carrito);
}

//function mostrar menu
function mostrarMenu(nav, menu) {
  nav.classList.toggle("visible");
  menu.classList.toggle("not-visible");
}

// funcion renderizar carrito
function renderizarCarrito(productos) {
  let contenedor = document.querySelector(".contenedor-carrito");
  contenedor.innerHTML = "";

  productos.forEach((prod) => {
    let tarjetaProducto = document.createElement("div");
    tarjetaProducto.className = "tarjetaCarrito";

    tarjetaProducto.innerHTML = `
    <img src=${prod.img}>
    <p><strong>Nombre:</strong>${prod.titulo}</p>
    <p><strong>Precio:</strong>$${prod.precioUnitario}</p>
    <p><strong>Cantidad:</strong> ${prod.unidades}</p>
    <p><strong>SubTotal:</strong>$${prod.subtotal}</p>
    `;

    contenedor.appendChild(tarjetaProducto);
  });
}

// funcion actualizar total
function actualizarTotal(prod) {
  let total = document.querySelector(".total");

  let templateTotal = prod.reduce(
    (ac, prod) => ac + prod.precioUnitario * prod.unidades,
    0
  );

  total.innerText = `Total: $${templateTotal}`;
}

// funcion vaciar carrito
function vaciarCarrito(carrito) {
  carrito.length = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito(carrito);
  let total = document.querySelector(".total");
  total.innerText = "Total: $0";
}

// comprar carrito
function comprarCarrito(carrito) {
  if (carrito.length > 1) {
    carrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito(carrito);

    Swal.fire({
      icon: `success`,
      title: `Compra recibida`,
      showConfirmButton: false,
      timer: 2300,
    });

    let total = document.querySelector(".total");
    total.innerText = "Total: $0";
  }
}
