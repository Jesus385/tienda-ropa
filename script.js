// Scroll suave
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const href = this.getAttribute('href');
    if(href.startsWith('#')) {
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior: 'smooth'});
    } else {
      window.location.href = href; // para páginas separadas
    }
  });
});

// Carrito
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
let total = 0;

document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.parentElement;
    const name = product.querySelector('h3').textContent;
    const price = parseFloat(product.querySelector('.price').textContent.replace('€',''));
    const size = product.querySelector('.size-select').value;

    const li = document.createElement('li');
    li.textContent = `${name} (Talla: ${size}) - €${price.toFixed(2)} `;

    // Botón eliminar
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Eliminar';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => {
      cartItems.removeChild(li);
      total -= price;
      cartTotal.textContent = total.toFixed(2);
    });

    li.appendChild(removeBtn);
    cartItems.appendChild(li);

    total += price;
    cartTotal.textContent = total.toFixed(2);
  });
});

// Formulario de contacto
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

form.addEventListener('submit', e => {
  e.preventDefault();
  result.textContent = "¡Mensaje enviado correctamente!";
  form.reset();
});

// Animaciones secciones
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// FILTROS
const searchInput = document.getElementById('search');
const sizeFilter = document.getElementById('filter-size');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const storeItems = document.querySelectorAll('.store-item');

function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  const selectedSize = sizeFilter.value;
  const minPrice = parseFloat(minPriceInput.value) || 0;
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

  storeItems.forEach(item => {
    const name = item.querySelector('h3').textContent.toLowerCase();
    const price = parseFloat(item.querySelector('.price').textContent.replace('€',''));
    const size = item.querySelector('.size-select').value;

    const matchesText = name.includes(searchText);
    const matchesSize = !selectedSize || size === selectedSize;
    const matchesPrice = price >= minPrice && price <= maxPrice;

    if(matchesText && matchesSize && matchesPrice) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

searchInput.addEventListener('input', filterProducts);
sizeFilter.addEventListener('change', filterProducts);
minPriceInput.addEventListener('input', filterProducts);
maxPriceInput.addEventListener('input', filterProducts);

// Estrellas interactivas
document.querySelectorAll('.rating').forEach(rating => {
  const stars = rating.querySelectorAll('span');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      stars.forEach(s => s.classList.remove('active'));
      for(let i=0; i<star.dataset.value; i++){
        stars[i].classList.add('active');
      }
    });
  });
});
