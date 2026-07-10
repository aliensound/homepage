/* =============================================================
   Alien Sound — script.js
   1) Estrellas animadas en el canvas
   2) Enlaces de WhatsApp generados desde tu número
   3) Año dinámico del footer
   ============================================================= */

/* ============================================================
   >>> CONFIGURA AQUÍ TU NÚMERO DE WHATSAPP <<<
   Formato: código de país + número, SIN "+", espacios ni guiones.
   Ejemplo México: "5215512345678"  (52 = país, 1, luego 10 dígitos)
   ============================================================ */
const NUMERO_WHATSAPP = "NUMERO_WHATSAPP";

/* Construye todos los enlaces de WhatsApp de la página.
   Cada botón con la clase .js-wa usa su atributo data-msg como texto. */
function armarEnlacesWhatsApp() {
  const botones = document.querySelectorAll(".js-wa");
  botones.forEach((btn) => {
    const mensaje = btn.getAttribute("data-msg") || "Hola, me interesa Alien Sound.";
    const url = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(mensaje);
    btn.setAttribute("href", url);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener");
  });
}

/* Año actual en el footer */
function ponerAnio() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   Campo de estrellas animadas sobre el <canvas id="stars">
   ============================================================ */
function iniciarEstrellas() {
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width, height, estrellas;
  const DENSIDAD = 0.00018; // estrellas por pixel

  function redimensionar() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const cantidad = Math.floor(width * height * DENSIDAD);
    estrellas = [];
    for (let i = 0; i < cantidad; i++) {
      estrellas.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        // velocidad de parpadeo
        tw: Math.random() * 0.02 + 0.005,
        fase: Math.random() * Math.PI * 2,
        // ligera deriva hacia abajo (efecto de viaje espacial)
        vy: Math.random() * 0.15 + 0.02,
        // tono holográfico ocasional
        color: Math.random() > 0.85
          ? ["#b16bff", "#2ff2ff", "#ff5fd2", "#4d7dff"][Math.floor(Math.random() * 4)]
          : "#ffffff",
      });
    }
  }

  function dibujar() {
    ctx.clearRect(0, 0, width, height);
    for (const s of estrellas) {
      s.fase += s.tw;
      const alpha = 0.4 + Math.abs(Math.sin(s.fase)) * 0.6;
      s.y += s.vy;
      if (s.y > height) { s.y = 0; s.x = Math.random() * width; }

      ctx.beginPath();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = s.color;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(dibujar);
  }

  redimensionar();
  window.addEventListener("resize", redimensionar);

  // Respeta la preferencia de menos movimiento: dibuja una sola vez
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    for (const s of estrellas) {
      ctx.beginPath();
      ctx.fillStyle = s.color;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    dibujar();
  }
}

/* ============================================================
   Lightbox: ampliar la imagen del paquete al hacer click
   ============================================================ */
function iniciarLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbCap = document.getElementById("lightbox-cap");
  const btnCerrar = lightbox ? lightbox.querySelector(".lightbox-close") : null;
  if (!lightbox || !lbImg) return;

  let ultimoFoco = null; // para devolver el foco al cerrar

  function abrir(img) {
    ultimoFoco = img;
    lbImg.src = img.src;
    lbImg.alt = img.alt || "";
    // El título del paquete está en la misma tarjeta
    const card = img.closest(".card");
    const titulo = card ? card.querySelector(".card-title") : null;
    lbCap.textContent = titulo ? titulo.textContent : "";

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // evita scroll de fondo
    if (btnCerrar) btnCerrar.focus();
  }

  function cerrar() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (ultimoFoco) ultimoFoco.focus();
  }

  // Abrir al hacer click (o Enter/Espacio) en cualquier imagen .js-zoom
  document.querySelectorAll(".js-zoom").forEach((img) => {
    img.addEventListener("click", () => abrir(img));
    img.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        abrir(img);
      }
    });
  });

  // Cerrar: botón X, click en el fondo, o tecla Escape
  if (btnCerrar) btnCerrar.addEventListener("click", cerrar);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) cerrar(); // click fuera de la imagen
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) cerrar();
  });
}

/* ============================================================
   Aparición suave de las secciones al hacer scroll
   ============================================================ */
function iniciarReveal() {
  const elementos = document.querySelectorAll(".reveal");
  if (!elementos.length) return;

  // Si el navegador no soporta IntersectionObserver o el usuario prefiere
  // menos movimiento, mostramos todo de inmediato.
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entradas, obs) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("is-visible");
        obs.unobserve(entrada.target); // se anima una sola vez
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px",
  });

  elementos.forEach((el) => observer.observe(el));
}

/* Arranque */
document.addEventListener("DOMContentLoaded", () => {
  armarEnlacesWhatsApp();
  ponerAnio();
  iniciarEstrellas();
  iniciarLightbox();
  iniciarReveal();
});
