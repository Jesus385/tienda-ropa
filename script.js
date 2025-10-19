// Scroll suave para los enlaces del menú
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Formulario de contacto (ejemplo básico)
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  result.textContent = "¡Mensaje enviado correctamente!";
  form.reset();
});
