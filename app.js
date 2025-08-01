document.addEventListener('DOMContentLoaded', () => {
  // Código existente para las barras de progreso...

  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evita el envío del formulario por defecto

      formStatus.textContent = 'Enviando...';
      formStatus.style.color = '#3498db';

      // Simulación de una llamada a una API
      setTimeout(() => {
        formStatus.textContent = '¡Mensaje enviado con éxito!';
        formStatus.style.color = '#27ae60';
        contactForm.reset();
      }, 2000);
    });
  }
});
