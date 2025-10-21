// Scroll suave para el menú
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Variables del carrito
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
let total = 0;

// Añadir producto al carrito
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.parentElement;
    const name = product.querySelector('h3').textContent;
    const price = parseFloat(product.querySelector('.price').textContent.replace('€',''));
    const sizeSelect = product.querySelector('.size-select');
    const size = sizeSelect.value || "No seleccionada";
    const comment = product.querySelector('.comment').value;
    const rating = product.querySelector('.rating').textContent;

    const li = document.createElement('li');
    li.textContent = `${name} - €${price} - Talla: ${size} - Valoración: ${rating} - Comentario: ${comment}`;
    cartItems.appendChild(li);

    total += price;
    cartTotal.textContent = total.toFixed(2);

    // Limpiar comentario y talla
    sizeSelect.selectedIndex = 0;
    product.querySelector('.comment').value = '';
  });
});

// Animaciones de aparición al hacer scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Formulario de contacto básico
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');
form.addEventListener('submit', function(e){
  e.preventDefault();
  result.textContent = "¡Mensaje enviado correctamente!";
  form.reset();
});
