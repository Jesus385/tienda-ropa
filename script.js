// Scroll suave para navegación
document.querySelectorAll('.navbar a').forEach(link=>{
link.addEventListener('click',e=>{
e.preventDefault();
document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
});
});


// Animación de secciones al scroll
const sections=document.querySelectorAll('section');
window.addEventListener('scroll',()=>{
const triggerBottom=window.innerHeight/5*4;
sections.forEach(section=>{
const sectionTop=section.getBoundingClientRect().top;
if(sectionTop<triggerBottom){section.classList.add('visible');}
});
});


// Configuración EmailJS
emailjs.init('TU_USER_ID'); // reemplaza con tu EmailJS user ID
const form=document.getElementById('contact-form');
form.addEventListener('submit',function(e){
e.preventDefault();
emailjs.sendForm('TU_SERVICE_ID','TU_TEMPLATE_ID',this)
.then(()=>{document.getElementById('form-result').textContent='Mensaje enviado con éxito!';form.reset();})
.catch(()=>{document.getElementById('form-result').textContent='Error al enviar. Intenta de nuevo.';});
});