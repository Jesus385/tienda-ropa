// ----------------------------
// CARRITO DE COMPRAS CON LOCALSTORAGE, ANIMACIONES Y CONTADOR
// ----------------------------
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count'); // Agregar en HTML: <span id="cart-count">0</span>
let total = 0;

// Cargar carrito desde localStorage al iniciar
const savedCart = JSON.parse(localStorage.getItem('cart'));
if (savedCart) {
  total = savedCart.total;
  cartTotal.textContent = total.toFixed(2);

  savedCart.items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name + " - $" + item.price;

    // Botón para eliminar producto
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";
    removeBtn.style.cursor = "pointer";

    removeBtn.addEventListener('click', () => {
      li.remove();
      total -= item.price;
      cartTotal.textContent = total.toFixed(2);
      updateCartStorage();
      updateCartCount();
    });

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
  updateCartCount();
}

// Función para actualizar localStorage
function updateCartStorage() {
  const itemsArray = [];
  cartItems.querySelectorAll('li').forEach(li => {
    const text = li.firstChild.textContent.split(' - $');
    itemsArray.push({name: text[0], price: parseFloat(text[1])});
  });
  localStorage.setItem('cart', JSON.stringify({items: itemsArray, total: total}));
}

// Función para actualizar contador
function updateCartCount() {
  cartCount.textContent = cartItems.children.length;
}

// Agregar productos al carrito
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.parentElement;
    const name = product.querySelector('p:first-of-type').textContent;
    const price = parseFloat(product.querySelector('p:nth-of-type(2)').textContent.replace('$',''));

    const li = document.createElement('li');
    li.textContent = `${name} - $${price}`;
    li.style.opacity = 0; // animación inicial

    // Botón para eliminar producto
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";
    removeBtn.style.cursor = "pointer";

    removeBtn.addEventListener('click', () => {
      li.remove();
      total -= price;
      cartTotal.textContent = total.toFixed(2);
      updateCartStorage();
      updateCartCount();
    });

    li.appendChild(removeBtn);
    cartItems.appendChild(li);

    // Animación fade-in
    setTimeout(() => { li.style.opacity = 1; li.style.transition = 'opacity 0.5s'; }, 50);

    total += price;
    cartTotal.textContent = total.toFixed(2);
    updateCartStorage();
    updateCartCount();

    // Mensaje flotante
    const msg = document.createElement('div');
    msg.textContent = `${name} añadido al carrito ✅`;
    msg.style.position = 'fixed';
    msg.style.top = '20px';
    msg.style.right = '20px';
    msg.style.background = '#0b74df';
    msg.style.color = 'white';
    msg.style.padding = '10px 20px';
    msg.style.borderRadius = '5px';
    msg.style.zIndex = 1000;
    msg.style.opacity = 0;
    msg.style.transition = 'opacity 0.5s';
    document.body.appendChild(msg);
    setTimeout(() => { msg.style.opacity = 1; }, 50);
    setTimeout(() => { msg.style.opacity = 0; setTimeout(()=> msg.remove(), 500); }, 2000);
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
