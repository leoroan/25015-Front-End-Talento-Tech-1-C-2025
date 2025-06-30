function productCard(titulo, descripcion, precio, stock, imagen) {
  return `
  <div class="col">
    <div class="card">
      <img src="${imagen}" class="card-img-top" alt="${titulo}">
      <div class="card-body">
        <h5 class="card-title">${titulo}</h5>
        <p class="card-text">${descripcion}</p>
        <p class="card-text"><strong>Precio:</strong> $${precio}</p>
        <p class="card-text"><small class="text-body-secondary">Stock: ${stock}</small></p>
        </div>
      </div>
    </div>
  `;
}

const productosContainer = document.getElementById('productosContainer');

fetch('https://65ad277dadbd5aa31be03afc.mockapi.io/products/')
  .then(response => response.json())
  .then(data => {
    productosContainer.innerHTML = data.map(producto =>
      productCard(
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