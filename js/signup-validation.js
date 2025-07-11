/* -------- VALIDACIÓN FORMULARIO DE REGISTRO -------- */
(() => {
  // Elementos
  const form   = document.querySelector('#pills-signup form');   // primer <form> dentro del tab
  const name   = document.getElementById('signupName');
  const email  = document.getElementById('signupEmail');
  const pass   = document.getElementById('signupPassword');
  const pass2  = document.getElementById('signupPassword2');
  const terms  = document.getElementById('terms');

  // 8+ car., 1 minúscula, 1 mayúscula, 1 dígito
  const PWD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


  // Marcar visualmente
  const setValid = (el, ok) => {
    el.classList.toggle('is-valid',   ok);
    el.classList.toggle('is-invalid', !ok);
  };

  // Validaciones
  const validate = () => {
    const okName   = name.value.trim().length >= 2;
    const okEmail  = email.validity.valid;      // HTML5
    const okPass   = PWD_RULE.test(pass.value);
    const okMatch  = pass.value === pass2.value && okPass;
    const okTerms  = terms.checked;

    setValid(name,   okName);
    setValid(email,  okEmail);
    setValid(pass,   okPass);
    setValid(pass2,  okMatch);
    terms.classList.toggle('is-invalid', !okTerms);

    return okName && okEmail && okMatch && okTerms;
  };

  /* ---------- Eventos ---------- */
  // Feedback en tiempo real
  [name, email, pass, pass2, terms].forEach(el => el.addEventListener('input', validate));

  // Bloqueo de envío si algo falla
  form.addEventListener('submit', e => {
    if (!validate()) {
      e.preventDefault();
      e.stopPropagation();
    }
    const toast = new bootstrap.Toast(document.getElementById('invalidToast'));
    toast.show();
  });
})();
