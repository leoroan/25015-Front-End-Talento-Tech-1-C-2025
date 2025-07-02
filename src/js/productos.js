let cart = JSON.parse(localStorage.getItem('cart')) || [];

function guardarCarrito() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function productCard(id, titulo, descripcion, precio, stock, imagen) {
  return `
    <div class="col">
      <div class="card h-100">
        <div class="card-header text-end">
          <span class="fw-bold">Producto destacado</span>
        </div>
        <img src="${imagen}" class="card-img-top" alt="${titulo}">
        <div class="card-body">
          <h5 class="card-title">${titulo}</h5>
          <p class="fs-5">${descripcion}</p>
        </div>
        <div class="card-footer d-flex align-items-start">
          <small class="text-body-secondary mb-2">Stock: ${stock}</small>
          <div class="d-flex justify-content-around align-items-center w-100">
            <span class="fw-bold">Precio: $${precio}</span>
            <button class="btn btn-primary btn-comprar" data-id='${JSON.stringify({ id, titulo, descripcion, precio, stock })}'>
              <i class="bi bi-cart-plus"></i> Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-comprar')) {
    const productoData = JSON.parse(event.target.getAttribute('data-id'));
    const { id, titulo, descripcion, precio, stock } = productoData;

    const itemExistente = cart.find(item => item.id === id);

    if (itemExistente) {
      if (itemExistente.cantidad < stock) {
        itemExistente.cantidad += 1;
      }
    } else {
      cart.push({
        id,
        titulo,
        descripcion,
        precio,
        stock,
        cantidad: 1
      });
    }

    guardarCarrito();
    actualizarCarritoCantidad();
    renderizarCarrito();
  }
});

const productosContainer = document.getElementById('productosContainer');

function mostrarSpinner() {
  productosContainer.innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="height: 100px;">
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div> 
      <p class="text-info ms-3">trayendo productos...</p>
    </div>
  `;
}

mostrarSpinner();

// Usamos una promesa para asegurar el tiempo mínimo de 1.5s
const fetchProductos = fetch('https://65ad277dadbd5aa31be03afc.mockapi.io/products/ ')
  .then(response => response.json())
  .catch(error => {
    console.error('Error:', error);
    return []; // Devolvemos array vacío en caso de error
  });

// Forzamos que pasen al menos 1.5 segundos
Promise.all([
  fetchProductos,
  new Promise(resolve => setTimeout(resolve, 1500))
]).then(([data]) => {
  if (data.length === 0) {
    productosContainer.innerHTML = '<p class="text-center">No se pudieron cargar los productos 😢</p>';
  } else {
    productosContainer.innerHTML = '';
    data.forEach(producto => {
      productosContainer.innerHTML += productCard(
        producto.id,
        producto.titulo,
        producto.descripcion,
        producto.precio,
        producto.stock,
        producto.imagen
      );
    });
  }
});

function actualizarCarritoCantidad() {
  const carritoCantidad = document.getElementById('carritoCantidad');
  if (carritoCantidad) {
    const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
    carritoCantidad.textContent = totalItems;
  }
}

actualizarCarritoCantidad();

const carritoLink = document.getElementById('carritoLink');
const carritoSection = document.getElementById('carritoSection');

if (carritoLink && carritoSection) {
  carritoLink.addEventListener('click', function () {
    carritoSection.style.display = 'block';
    renderizarCarrito();
  });
}

function renderizarCarrito() {
  const productosCarritoContainer = document.getElementById('productosCarritoContainer');
  if (!productosCarritoContainer || productosCarritoContainer.style.display === 'none') return;

  if (cart.length === 0) {
    productosCarritoContainer.innerHTML = '<p class="text-danger">El carrito está vacío.</p>';
    return;
  }

  let tabla = `
  <div class="table-responsive">
    <table class="table table-sm table-striped">
    <caption>Productos en el carrito</caption>
      <thead class="table-light">
        <tr>
          <th>Título</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
  </div>
  `;

  cart.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    tabla += `
      <tr>
      <td>${item.titulo}</td>
      <td>$${item.precio}</td>
      <td>${item.cantidad}</td>
      <td>$${subtotal.toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-outline-danger btn-reducir-cantidad" data-id="${item.id}" title="Reducir cantidad" id="btn-reducir-cantidad">
          <i class="bi bi-dash"></i>
        </button>
      </td>
    </tr>
  `;
  });

  tabla += `
    </tbody>
    </table>
    <div class="d-flex gap-2">
      <button id="vaciarCarrito" class="btn btn-danger btn-sm">Vaciar carrito</button>
      <button id="simularCompra" class="btn btn-success btn-sm">Simular compra</button>
    </div>
  `;

  let total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  productosCarritoContainer.innerHTML = tabla;
  productosCarritoContainer.innerHTML += `
    <div class="mt-3">
      <strong>Total: $${total.toFixed(2)}</strong>
    </div>
  `;
}

// Mover la función reducirCantidadProducto y el event listener fuera de renderizarCarrito
function reducirCantidadProducto(id) {
  const index = cart.findIndex(item => String(item.id) === String(id));

  if (index !== -1) {
    if (cart[index].cantidad > 1) {
      cart[index].cantidad -= 1;
    } else {
      cart.splice(index, 1);
    }
    guardarCarrito();
    actualizarCarritoCantidad();
    renderizarCarrito();
  }
}

// Evento para reducir cantidad o eliminar producto del carrito (solo se agrega una vez)
document.addEventListener('click', function (event) {
  if (event.target.id === 'btn-reducir-cantidad' || (event.target.closest && event.target.closest('#btn-reducir-cantidad'))) {
    const btn = event.target.closest('#btn-reducir-cantidad');
    const id = btn.getAttribute('data-id');
    reducirCantidadProducto(id);
  }
});

document.addEventListener('click', function (event) {
  if (event.target.id === 'vaciarCarrito') {
    cart = [];
    guardarCarrito();
    actualizarCarritoCantidad();
    renderizarCarrito();
  }

  if (event.target.id === 'simularCompra') {
    if (cart.length > 0) {
      alert("¡Compra realizada! ID: " + Math.floor(Math.random() * 1000000));
      cart = [];
      guardarCarrito();
      actualizarCarritoCantidad();
      renderizarCarrito();
    } else {
      alert("El carrito está vacío.");
    }
  }
});

const cerrarCarritoBtn = document.getElementById('cerrarCarritoBtn');
if (cerrarCarritoBtn && carritoSection) {
  cerrarCarritoBtn.addEventListener('click', function () {
    carritoSection.style.display = 'none';
  });
}