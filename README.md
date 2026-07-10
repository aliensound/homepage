# 🛸 Alien Sound — Sitio web

Sitio web estático de una sola página para **Alien Sound** (audio, iluminación y DJ).
Hecho con HTML, CSS y JavaScript puro — sin frameworks ni build. Listo para **GitHub Pages**.

## 📁 Estructura

```
index.html      → Contenido de la página
style.css       → Estilos (tema espacial/alien, liquid chrome)
script.js       → Estrellas animadas + enlaces de WhatsApp
images/         → logo.webp y Paquete 1..4.webp
```

## ✏️ Cómo editar tus datos de contacto

### 1. Número de WhatsApp
Abre **`script.js`** y edita la primera constante:

```js
const NUMERO_WHATSAPP = "NUMERO_WHATSAPP";
```

Reemplázalo por tu número con **código de país, sin `+`, espacios ni guiones**.
Ejemplo (México): `"5215512345678"`.

> Todos los botones de WhatsApp de la página usan ese mismo número
> automáticamente, cada uno con su propio mensaje.

### 2. Redes sociales
Abre **`index.html`**, busca la sección `<!-- ===== REDES SOCIALES ===== -->`
y reemplaza los enlaces placeholder:

| Placeholder   | Reemplázalo por                         |
|---------------|------------------------------------------|
| `@instagram`  | `https://instagram.com/TU_USUARIO`       |
| `@facebook`   | `https://facebook.com/TU_PAGINA`         |
| `@tiktok`     | `https://tiktok.com/@TU_USUARIO`         |

### 3. Textos de los paquetes / “Sobre nosotros”
Edita directamente el texto dentro de **`index.html`** (secciones
`Paquetes` y `Sobre nosotros`).

### 4. SEO / Open Graph (opcional)
En el `<head>` de **`index.html`** ajusta la URL de tu sitio en las etiquetas
`og:url` y `og:image` cuando publiques en tu dominio de GitHub Pages.

## 🚀 Publicar en GitHub Pages

1. Sube estos archivos a un repositorio de GitHub.
2. Ve a **Settings → Pages**.
3. En **Source** elige la rama `main` y la carpeta `/root`.
4. Guarda. En unos minutos tu sitio estará en
   `https://TU_USUARIO.github.io/AlienSound/`.

## 🔍 Ver el sitio localmente
Solo abre `index.html` en tu navegador (doble clic), o levanta un servidor simple:

```bash
python -m http.server 8000
# luego abre http://localhost:8000
```

---
© Alien Sound — Audio, Iluminación y DJ.
