// ----------------------------
// CARRITO DE COMPRAS
// ----------------------------
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
let total = 0;

document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.parentElement;
    const name = product.querySelector('p:first-of-type').textContent;
    const price = parseFloat(product.querySelector('p:nth-of-type(2)').textContent.replace('$',''));

    // Crear item en el carrito
    const li = document.createElement('li');
    li.textContent = `${name} - $${price}`;
    cartItems.appendChild(li);

    // Actualizar total
    total += price;
    cartTotal.textContent = total.toFixed(2);
  });
});

// ----------------------------
// FORMULARIO DE CONTACTO
// ----------------------------
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  result.textContent = "✅ ¡Mensaje enviado correctamente!";
  form.reset();
});

// ----------------------------
// ANIMACIONES DE SCROLL
// ----------------------------
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// ----------------------------
// SCROLL SUAVE EN EL MENÚ
// ----------------------------
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
