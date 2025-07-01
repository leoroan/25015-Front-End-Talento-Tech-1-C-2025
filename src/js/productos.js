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
      <div class="card-footer d-flex  align-items-start">
        <small class="text-body-secondary mb-2">Stock: ${stock}</small>
        <div class="d-flex justify-content-around align-items-center w-100">
          <span class="fw-bold">Precio: $${precio}</span>
          <button class="btn btn-primary btn-comprar" data-id="${id},${titulo},${precio},${stock}">
            <i class="bi bi-cart-plus"></i>
              Agregar
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-comprar')) {
    const producto = event.target.getAttribute('data-id');
    cart.push(producto);
    guardarCarrito();
  }
});

const productosContainer = document.getElementById('productosContainer');

fetch('https://65ad277dadbd5aa31be03afc.mockapi.io/products/')
  .then(response => response.json())
  .then(data => {
    productosContainer.innerHTML = data.map(producto =>
      productCard(
        producto.id,
        producto.titulo,
        producto.descripcion,
        producto.precio,
        producto.stock,
        producto.imagen
      )
    ).join('');
  })
  .catch(error => {
    productosContainer.innerHTML = '<p>Error al cargar los productos.</p>';
    console.error(error);
  });

function actualizarCarritoCantidad() {
  const carritoCantidad = document.getElementById('carritoCantidad');
  if (carritoCantidad) {
    carritoCantidad.textContent = cart.length;
  }
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-comprar')) {
    actualizarCarritoCantidad();
  }
});

actualizarCarritoCantidad();

const carritoLink = document.getElementById('carritoLink');
const carritoSection = document.getElementById('carritoSection');

if (carritoLink && carritoSection) {
  carritoLink.addEventListener('click', function () {
    carritoSection.style.display = 'block';
  });
}

function renderizarCarrito() {
  const productosCarritoContainer = document.getElementById('productosCarritoContainer');
  if (!productosCarritoContainer || productosCarritoContainer.style.display === 'none') return;

  if (cart.length === 0) {
    productosCarritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }

  let tabla = `
      <table class="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          ${cart.map(item => {
    const [id, titulo, precio, stock] = item.split(',');
    return `
              <tr>
                <td>${titulo}</td>
                <td>$${precio}</td>
                <td>${stock}</td>
              </tr>
            `;
  }).join('')}
        </tbody>
      </table>
      <div class="d-flex gap-2">
          <button id="vaciarCarrito" class="btn btn-danger">Vaciar carrito</button>
          <button id="simularCompra" class="btn btn-success">Simular compra</button>
        </div>
    `;
  totalCarrito = cart.reduce((total, item) => {
    const [, , precio] = item.split(',');
    return total + parseFloat(precio);
  }, 0);
  productosCarritoContainer.innerHTML = tabla;
  productosCarritoContainer.innerHTML += `
      <div class="mt-3">
        <strong>Total: $${totalCarrito.toFixed(2)}</strong>
      </div>
    `;
}

if (carritoSection) {
  const productosCarritoContainer = document.getElementById('productosCarritoContainer');
  carritoLink.addEventListener('click', function () {
    if (productosCarritoContainer) {
      productosCarritoContainer.style.display = 'block';
      renderizarCarrito();
    }
  });
}

document.addEventListener('click', function (event) {
  if (event.target.id === 'vaciarCarrito') {
    cart = [];
    guardarCarrito();
    actualizarCarritoCantidad();
    renderizarCarrito();
  }
  if (event.target.id === 'simularCompra') {
    if (cart.length > 0) {
      const compraId = Math.floor(Math.random() * 1000000);
      alert('Compra realizada. ID: ' + compraId);
      cart = [];
      guardarCarrito();
      actualizarCarritoCantidad();
      renderizarCarrito();
    }
  }
});

// Actualizar carrito cuando se agregan productos
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-comprar')) {
    renderizarCarrito();
  }
});

const cerrarCarritoBtn = document.getElementById('cerrarCarritoBtn');
if (cerrarCarritoBtn && carritoSection) {
  cerrarCarritoBtn.addEventListener('click', function () {
    carritoSection.style.display = 'none';
  });
}