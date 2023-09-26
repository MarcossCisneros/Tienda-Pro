
//mi funcion principal
function principal(productosBD) {
  //array de productos
  const productos = [
  {
    "id": "abrigo-01",
    "titulo": "Abrigo 01",
    "imagen": "./img/abrigos/01.jpg",
    "categoria": {
      "nombre": "Abrigos",
      "id": "abrigos"
    },
    "precio": 1000
  },
  {
    "id": "abrigo-02",
    "titulo": "Abrigo 02",
    "imagen": "./img/abrigos/02.jpg",
    "categoria": {
      "nombre": "Abrigos",
      "id": "abrigos"
    },
    "precio": 1000
  },
  {
    "id": "abrigo-03",
    "titulo": "Abrigo 03",
    "imagen": "./img/abrigos/03.jpg",
    "categoria": {
      "nombre": "Abrigos",
      "id": "abrigos"
    },
    "precio": 1000
  },
  {
    "id": "abrigo-04",
    "titulo": "Abrigo 04",
    "imagen": "./img/abrigos/04.jpg",
    "categoria": {
      "nombre": "Abrigos",
      "id": "abrigos"
    },
    "precio": 1000
  },
  {
    "id": "abrigo-05",
    "titulo": "Abrigo 05",
    "imagen": "./img/abrigos/05.jpg",
    "categoria": {
      "nombre": "Abrigos",
      "id": "abrigos"
    },
    "precio": 1000
  },
  {
    "id": "pantalo-01",
    "titulo": "pantalon 01",
    "imagen": "./img/pantalones/01.jpg",
    "categoria": {
      "nombre": "Pantalones",
      "id": "pantalones"
    },
    "precio": 5000
  },
  {
    "id": "pantalo-02",
    "titulo": "pantalon 02",
    "imagen": "./img/pantalones/02.jpg",
    "categoria": {
      "nombre": "Pantalones",
      "id": "pantalones"
    },
    "precio": 5000
  },
  {
    "id": "pantalo-03",
    "titulo": "pantalon 03",
    "imagen": "./img/pantalones/03.jpg",
    "categoria": {
      "nombre": "Pantalones",
      "id": "pantalones"
    },
    "precio": 5000
  },
  {
    "id": "pantalo-04",
    "titulo": "pantalon 04",
    "imagen": "./img/pantalones/04.jpg",
    "categoria": {
      "nombre": "Pantalones",
      "id": "pantalones"
    },
    "precio": 5000
  },
  {
    "id": "pantalo-05",
    "titulo": "pantalon 05",
    "imagen": "./img/pantalones/05.jpg",
    "categoria": {
      "nombre": "Pantalones",
      "id": "pantalones"
    },
    "precio": 5000
  },
  {
    "id": "camiseta-01",
    "titulo": "camiseta 01",
    "imagen": "./img/camisetas/01.jpg",
    "categoria": {
      "nombre": "Camisetas",
      "id": "camisetas"
    },
    "precio": 3000
  },
  {
    "id": "camiseta-02",
    "titulo": "camiseta 02",
    "imagen": "./img/camisetas/02.jpg",
    "categoria": {
      "nombre": "Camisetas",
      "id": "camisetas"
    },
    "precio": 3000
  },
  {
    "id": "camiseta-03",
    "titulo": "camiseta 03",
    "imagen": "./img/camisetas/03.jpg",
    "categoria": {
      "nombre": "Camisetas",
      "id": "camisetas"
    },
    "precio": 3000
  },
  {
    "id": "camiseta-04",
    "titulo": "camiseta 04",
    "imagen": "./img/camisetas/04.jpg",
    "categoria": {
      "nombre": "Camisetas",
      "id": "camisetas"
    },
    "precio": 3000
  },
  {
    "id": "camiseta-05",
    "titulo": "camiseta 05",
    "imagen": "./img/camisetas/05.jpg",
    "categoria": {
      "nombre": "Camisetas",
      "id": "camisetas"
    },
    "precio": 3000
  }
];
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
