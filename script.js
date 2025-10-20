// Variables carrito
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
let total = 0;

// Función para actualizar contador
function updateCartCount() {
  cartCount.textContent = cartItems.children.length;
}

// Añadir productos al carrito
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.parentElement;
    const name = product.querySelector('p:first-of-type').textContent;
    const price = parseFloat(product.querySelector('p:nth-of-type(2)').textContent.replace('$',''));

    const li = document.createElement('li');
    li.textContent = `${name} - $${price}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";
    removeBtn.style.cursor = "pointer";
    removeBtn.addEventListener('click', () => {
      li.remove();
      total -= price;
      cartTotal.textContent = total.toFixed(2);
      updateCartCount();
    });

    li.appendChild(removeBtn);
    cartItems.appendChild(li);

    setTimeout(() => li.classList.add('visible'), 50);

    total += price;
    cartTotal.textContent = total.toFixed(2);
    updateCartCount();

    // Mensaje flotante
    const msg = document.createElement('div');
    msg.classList.add('floating-msg');
    msg.textContent = `${name} añadido al carrito ✅`;
    document.body.appendChild(msg);
    setTimeout(() => msg.classList.add('show'), 50);
    setTimeout(() => {
      msg.classList.remove('show');
      setTimeout(() => msg.remove(), 500);
    }, 2000);
  });
});

// Scroll suave
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Animaciones al hacer scroll
const sections = document.querySelectorAll('.fade-section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));
