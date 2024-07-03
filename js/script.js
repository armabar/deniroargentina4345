const productos = [ 
    {id: 0, nombre: "Big Deniro", precio: 1050, img:"./img/icon_bigdeniro.png", texto: "hamburguesa con salsa exquisita de autor"},
    {id: 1, nombre: "Caprichosa", precio: 1500, img:"./img/icon_caprichosa.png", texto: "terrible hamburguesa para los mas exigentes"},
    {id: 2, nombre: "Gringa", precio: 1380, img:"./img/icon_gringa.png", texto: "una clasica hamburguesa al estilo europeo"},
    {id: 3, nombre: "Pampernic", precio: 1420, img:"./img/icon_pampernic.png", texto: "una belleza para el paladar de todos"},
    {id: 4, nombre: "Parrillera", precio: 1100, img:"./img/icon_parrillera.png", texto:"para los fanaticos del asado"},
];
const carrito = [];
let contadorIdUnico = 0;

const fetchData = async () => {
    try {
        const res = await fetch('./api.json');
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

https://www.youtube.com/watch?v=JL7Wo-ASah4

https://www.youtube.com/watch?v=M4LaQ3KUGOM

/*document.addEventListener("DOMContentLoaded", () => {
    AOS.init();
  
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    obtenerProductos().then((productos) => {
      mostrarProductos(productos);
      actualizarCarrito();
    });
  
  });*/
  
  // Función para simular la obtención de productos de forma asíncrona
  function obtenerProductos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(productos);
      }, 1000);
    });
  }
  
/*Funcion para mostrar los productos en el DOM*/

// Función para mostrar los productos en el DOM
function mostrarProductos(productos) {

    const contenedorProductos = document.getElementById("productos");
  
    productos.forEach((producto) => {
  
      const card = document.createElement("div");
      card.className = "card col-3 mr-5";
      
      // Añadir la clase 'box' para aplicar el efecto de borde
      card.classList.add("box");
  
      card.setAttribute("data-aos", "fade-up");
  
      card.innerHTML = `
        <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text"> ${producto.texto} <br><br> Precio: $${producto.precio}</p>
          <button onclick="agregarAlCarrito(${producto.id})" class="btn btn-primary">Agregar al Carrito</button>
        </div>
      `;
  
      contenedorProductos.appendChild(card);
    });
  }

mostrarProductos(productos);


// Función para agregar productos al carrito
function agregarAlCarrito(idProducto) {

    //agregarAlCarrito(1);
    //const producto = productos.find((producto) => 1 === 1);
    //producto = {id: 1, nombre: "Snorlax V", precio: 100, img: "./img/snorlax_card.png"}
    const producto = productos.find((producto) => producto.id === idProducto);
  
    console.log(`Contenido de producto: ${JSON.stringify(producto)}`);
  
    const productoConIdUnico = { ...producto, idUnico: contadorIdUnico++ };
  
    console.log(
      `Contenido de productoConIdUnico: ${JSON.stringify(productoConIdUnico)}`
    );
  
    carrito.push(productoConIdUnico);
  
    localStorage.setItem("carrito", JSON.stringify(carrito));
  
    actualizarCarrito();
  
    Toastify({
      text: "Producto agregado al carrito",
      duration: 3000,
    }).showToast();
  
  }
  
  function actualizarCarrito() {

    const listaCarrito = document.querySelector("#carrito");
    listaCarrito.innerHTML = "";
  
    carrito.forEach((producto) => {
  
      const itemCarrito = document.createElement("div");
      itemCarrito.className = "card col-3 mr-5 mb-5";
      itemCarrito.innerHTML = `
        <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text"> ${producto.texto} <br><br> Precio: $${producto.precio}</p>
          <button onclick="eliminarDelCarrito(${producto.idUnico})" class="btn btn-danger">Eliminar</button>
        </div>
      `;
  
      listaCarrito.appendChild(itemCarrito);
    });
  
    calcularTotal();
  }

  function eliminarDelCarrito(idUnico) {

    carrito = carrito.filter((producto) => producto.idUnico !== idUnico);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarCarrito();
  
    Toastify({
      text: "Producto eliminado del carrito",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }
  
  // // Función para calcular el total de la compra
  function calcularTotal() {
  
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    document.getElementById("totalCompra").innerText = `Total: $${total}`;
  
  }
  
  // // Función para finalizar la compra
  function finalizarCompra() {
    return new Promise((resolve, reject) => {
      if (carrito.length > 0) {
        setTimeout(() => {
          resolve("Compra finalizada con éxito");
        }, 2000);
      } else {
        reject("El carrito está vacío");
      }
    }); 
  }
  
  // // Evento para finalizar la compra
  document.getElementById("finalizarCompra").addEventListener("click", () => {
    finalizarCompra()
      .then((mensaje) => {
        Toastify({
          text: mensaje,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          style: {
            background: "#4fbe87",
          },
        }).showToast();
  
        carrito = [];
  
        localStorage.removeItem("carrito");
  
        actualizarCarrito();
      })
      .catch((error) => {
        Toastify({
          text: error,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          backgroundColor: "#e74c3c",
        }).showToast();
      });
  });



