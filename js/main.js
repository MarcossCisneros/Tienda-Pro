// pedido de informacion al data.json
fetch("../js/data.json")
  .then((respuesta) => respuesta.json())
  .then((productos) => principal(productos));

//mi funcion principal
function principal(productosBD) {
  //array de productos
  const productos = productosBD;
  //llamados del dom
  const botonesCategorias = document.querySelectorAll(".boton-categoria");
  const tituloPrincipal = document.querySelector(".titulo__productos");

  const nav = document.getElementById("navBar");
  const abrirMenu = document.getElementById("abrir");
  const cerrarMenu = document.getElementById("cerrar");
  abrirMenu.addEventListener("click", () => mostrarMenu(nav, abrirMenu));
  cerrarMenu.addEventListener("click", () => mostrarMenu(nav, abrirMenu));

  let carrito = [];
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  } else {
    carrito = [];
  }
  renderizarTarjetas(productos, carrito);
  filtrarProductos(botonesCategorias, tituloPrincipal, productos, carrito);
}

//function mostrar menu
function mostrarMenu(nav, menu) {
  nav.classList.toggle("visible");
  menu.classList.toggle("not-visible");
}

//filtrar productos
function filtrarProductos(
  botonesCategorias,
  tituloPrincipal,
  productos,
  carrito
) {
  botonesCategorias.forEach((boton) => {
    boton.addEventListener("click", (evento) => {
      if (evento.currentTarget.id != "todos") {
        const productoCategoria = productos.find(
          (prod) => prod.categoria.id === evento.currentTarget.id
        );
        tituloPrincipal.innerText = productoCategoria.categoria.nombre;

        const productosBoton = productos.filter(
          (producto) => producto.categoria.id === evento.currentTarget.id
        );
        renderizarTarjetas(productosBoton, carrito);
      } else {
        tituloPrincipal.innerText = "Todos los productos";
        renderizarTarjetas(productos, carrito);
      }
    });
  });
}

// function para renderizar prods
function renderizarTarjetas(prod, carrito) {
  const contenedor = document.querySelector("#contenedor__productos");
  contenedor.innerHTML = "";

  prod.forEach((producto) => {
    const tarjeta = document.createElement("div");

    tarjeta.innerHTML = `<div class="producto">
    <img src="${producto.imagen}">
    <div class="producto__info">
    <p class="producto__info-title">${producto.titulo}</p>
    <p class="precio">$${producto.precio}</p>
    <button class="button__agregar" id=${producto.id}>Agregar al Carrito</button>
    </div>
    </div>`;

    contenedor.appendChild(tarjeta);

    let botonCarrito = document.getElementById(producto.id);
    botonCarrito.addEventListener("click", (e) =>
      agregarAlCarrito(prod, e, carrito)
    );
  });
}

// funcion agregar al carrito
function agregarAlCarrito(producto, evento, carrito) {
  let productoOriginal = producto.find((prod) => prod.id === evento.target.id);

  let productoEnCarrito = carrito.find(
    (prod) => prod.id === productoOriginal.id
  );

  if (productoEnCarrito) {
    productoEnCarrito.unidades++;
    productoEnCarrito.subtotal = Number(
      productoEnCarrito.precioUnitario * productoEnCarrito.unidades
    );
  } else {
    carrito.push({
      img: productoOriginal.imagen,
      id: productoOriginal.id,
      titulo: productoOriginal.titulo,
      precioUnitario: Number(productoOriginal.precio),
      unidades: 1,
      subtotal: Number(productoOriginal.precio),
    });
  }

  Toastify({
    text: "Producto Agregado",
    duration: 2000,
    newWindow: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
  //localStorage

  let carritoJSON = JSON.stringify(carrito);
  localStorage.setItem("carrito", carritoJSON);
}
