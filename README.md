# 25015-Front-End-Talento-Tech-1-C-2025
Curso de desarrollo front-end parte del curso de full-stack @ Talento-Tech 2025
___

### Descripción:

- Este proyecto es una página web básica desarrollada como parte de un curso de Front-End. La página está estructurada con HTML semántico y utiliza las etiquetas `<header>`, `<main>`, y `<footer>` para organizar el contenido. El objetivo es aprender a crear la estructura básica de una página web y prepararla para futuras mejoras con CSS y JavaScript.

- UPDATE (Proyecto-Entrega-Final): Agregando a lo desarrolado, he implementado Bootstrap en la página de productos para mejorar su diseño y usabilidad. Además, desarrollé un carrito de compras de demostración que gestiona productos simulados utilizando "MockApi". Este carrito permite agregar productos, acumular cantidades, eliminar artículos y realizar una compra final, todo con una interfaz sencilla y funcional.

*Mi estructura de archivos actual*
```
/mi-proyecto-fe
│
├── public/                # Archivos estáticos accesibles directamente por el navegador
│   ├── favicon.ico        # Icono de la pestaña del navegador
│   └── assets/            # Imágenes, fuentes, íconos, etc.
│       ├── images/        
│       ├── videos/
│
├── src/                   # Código fuente de la aplicación
│   │
|   ├── js/                # Scripts js de la aplicacion
│   │   └── productos.js   # script de la vista de productos.
|
│   ├── pages/             # Páginas principales de la aplicación
│   │   ├── Productos.js   # Página de productos
│   │   └── Contacto.js    # Página de contacto
│   │
│   ├── styles/            # Archivos de estilos globales o modulares
│   │   ├── global.css     # Estilos globales
│   │   ├── contacto.css   # de otras paginas
│   │   ├── index.css      # de otras paginas
│   │   ├── productos.css  # de otras paginas
│   │
│   ├── index.js           # Punto de entrada de la aplicación
│
├── .gitignore             # Archivos y carpetas ignorados por Git
├── index.html         # Página principal (HTML base)
├── README.md              # Documentación del proyecto
```

## ✅ Checklist del Proyecto

### 🧱 Estructura HTML
- [✅] Uso de etiquetas semánticas: `header`, `nav`, `main`, `section`, `footer`.
- [✅] Sección "Productos" organizada con cards responsivas.
- [✅] Sección "Reseñas" creada con Grid CSS.
- [✅] Sección "Contacto" responsive usando Media Queries.

### 🎨 Estilos CSS
- [✅] Archivo `styles.css` externo correctamente enlazado.
- [✅] Estilos aplicados a `header`, `footer` y barra de navegación.
- [✅] Fuentes de Google Fonts correctamente implementadas.
- [✅] Uso de propiedades de `background` (color, imagen o degradado).
- [✅] Diseño responsivo usando **Flexbox** y **Bootstrap**.
- [✅] Uso de **Grid CSS** para la sección de reseñas.
- [✅] Media Queries aplicados para hacer la sección de contacto responsiva.

### 🖼️ Multimedia
- [✅] Inclusión de imágenes, video o iframe correctamente integrados en la página.

### 📝 Navegación
- [✅] Lista desordenada (`<ul>`) simulando navegación interna (Inicio, Productos, Contacto, etc.).

### 📩 Formulario de Contacto
- [✅ Formulario funcional con campos: nombre, correo electrónico y mensaje.
- [✅] Integración con **Formspree** para el envío de datos.

### 💻 JavaScript
- [✅] Archivo `script.js` creado y enlazado correctamente al HTML.
- [✅ ] Consumo de una API REST usando `fetch`.
- [✅] Renderizado dinámico de productos en forma de tarjetas (con imagen, título y precio).
- [✅] Validación de formulario de contacto (campos requeridos y formato de correo).
- [✅] Manipulación del DOM para actualizar el carrito y mostrar mensajes al usuario.
- [✅] Funcionalidad de carrito de compras:
   - [✅] Agregar productos al carrito desde las tarjetas.
   - [✅] Mostrar productos seleccionados con cantidad, precio y total.
   - [✅] Editar cantidad de productos o eliminarlos del carrito.
   - [✅] Actualización dinámica del total de la compra.
- [✅] Persistencia del carrito usando `localStorage` o `sessionStorage`.
- [✅] Contador dinámico del número de productos en el carrito.

### 🔍 Accesibilidad y SEO
- [✅] Uso de atributos `alt` en todas las imágenes.
- [✅] Navegación accesible mediante teclado.
- [✅] Metaetiquetas básicas en el `<head>` para optimización SEO.

### 🚀 Despliegue
- [✅] Proyecto subido a **GitHub Pages** con URL funcional.

### 🧪 Funcionalidad Esperada
- [✅] Interactividad completa: visualizar productos, agregar al carrito, editar y simular compra.
- [✅] Diseño adaptable a diferentes dispositivos (responsive).
- [✅] Persistencia del carrito incluso tras recargar o cerrar la página.


