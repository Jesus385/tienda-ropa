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

// Valoración interactiva
document.querySelectorAll('.rating').forEach(rating => {
  const stars = rating.querySelectorAll('span');
  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      rating.dataset.rated = index + 1;
      stars.forEach((s, i) => {
        s.classList.toggle('active', i < index + 1);
      });
    });
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
// Valoración por estrellas
document.querySelectorAll('.rating').forEach(rating => {
  const stars = rating.textContent.trim().split('').map(() => '⭐');
  rating.innerHTML = stars.join('');

  const starElements = Array.from(rating.children);
  starElements.forEach((_, i) => {
    const star = document.createElement('span');
    star.innerHTML = '⭐';
    star.classList.add('star');
    rating.appendChild(star);
  });

  rating.querySelectorAll('.star').forEach((star, index) => {
    star.addEventListener('click', () => {
      rating.querySelectorAll('.star').forEach((s, i) => {
        s.textContent = i <= index ? '⭐' : '☆';
      });
    });
  });
});
