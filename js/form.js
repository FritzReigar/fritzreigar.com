// Envío del formulario de contacto sin recargar la página (Formspree AJAX).
// Muestra el resultado inline en .form-status en el idioma activo.

const contactForm = document.querySelector('.contact-form');
const formStatus = contactForm.querySelector('.form-status');
const submitBtn = contactForm.querySelector('button[type="submit"]');

const FORM_MSG = {
  es: {
    sending: 'Enviando…',
    ok: 'Mensaje enviado. Te respondo pronto.',
    error: 'No se ha podido enviar. Prueba otra vez o escríbeme a contact@fritzreigar.com.',
  },
  en: {
    sending: 'Sending…',
    ok: "Message sent. I'll get back to you soon.",
    error: "It couldn't be sent. Try again or email me at contact@fritzreigar.com.",
  },
};

function idiomaActual() {
  return document.documentElement.lang === 'en' ? 'en' : 'es';
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = FORM_MSG[idiomaActual()];
  const textoBoton = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = msg.sending;
  formStatus.hidden = true;

  try {
    const res = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      contactForm.reset();
      formStatus.textContent = msg.ok;
      formStatus.className = 'form-status ok';
    } else {
      formStatus.textContent = msg.error;
      formStatus.className = 'form-status error';
    }
  } catch {
    formStatus.textContent = msg.error;
    formStatus.className = 'form-status error';
  }

  formStatus.hidden = false;
  submitBtn.disabled = false;
  submitBtn.textContent = textoBoton;
});
