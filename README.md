# ¿Quieres ser mi novia?

Página estática lista para desplegar en **GitHub Pages**.

## Estructura

```txt
/
├─ index.html
├─ style.css
├─ script.js
├─ .nojekyll
└─ assets/
   ├─ .gitkeep
   └─ cancion.mp3   ← aquí va tu canción
```

## Cómo subirla a GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube estos archivos directamente a la raíz del repositorio, no dentro de otra carpeta.
3. Si quieres música, coloca tu archivo en `assets/cancion.mp3`.
   - Respeta exactamente el nombre: `cancion.mp3`.
   - GitHub Pages distingue mayúsculas y minúsculas.
4. En GitHub ve a **Settings → Pages**.
5. En **Build and deployment**, selecciona:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Guarda y abre el link que GitHub te genere.

## Importante sobre la música

En celular y navegadores modernos, el audio con sonido no puede reproducirse automáticamente sin interacción del usuario. Por eso la página tiene una pantalla inicial de “toca para entrar”. Ese toque permite iniciar la canción de forma compatible.

## Recomendaciones

- Usa nombres de archivos sin acentos ni espacios.
- Mantén `index.html`, `style.css` y `script.js` en la raíz del repositorio.
- No borres `.nojekyll`; ayuda a que GitHub Pages publique archivos estáticos tal cual.
