// Scroll suave
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({behavior: 'smooth'});
    }
  });
});

// 🛒 Carrito
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
    li.textContent = `${name} (Talla: ${size}) - €${price} `;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Eliminar';
    removeBtn.style.marginLeft = '10px';
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

// ⭐ Valoraciones interactivas
document.querySelectorAll('.rating').forEach(rating => {
  const stars = rating.querySelectorAll('span');
  const ratingValueText = rating.nextElementSibling; // <p class="rating-value">

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const value = star.getAttribute('data-value');
      rating.setAttribute('data-rating', value);
      stars.forEach(s => s.classList.remove('selected'));
      star.classList.add('selected');
      let next = star.nextElementSibling;
      while (next) {
        next.classList.add('selected');
        next = next.nextElementSibling;
      }
      ratingValueText.textContent = `Valoración: ${value} / 5`;
    });
  });
});

// Formulario (solo mensaje)
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

form.addEventListener('submit', e => {
  e.preventDefault();
  result.textContent = "¡Mensaje enviado correctamente!";
  form.reset();
});

// Animaciones al hacer scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));
