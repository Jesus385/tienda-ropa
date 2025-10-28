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
    li.textContent = `${name} (Talla: ${size}) - €${price.toFixed(2)}`;

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

// Estrellas interactivas
document.querySelectorAll('.rating').forEach(ratingDiv => {
  const stars = ratingDiv.querySelectorAll('span');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      stars.forEach(s => s.classList.remove('active'));
      star.classList.add('active');
      let val = parseInt(star.dataset.value);
      for (let i = 0; i < val; i++) stars[i].classList.add('active');
    });
  });
});
