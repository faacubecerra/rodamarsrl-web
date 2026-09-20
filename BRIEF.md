# Rodamar SRL — Sitio nuevo (brief para Claude Code)

Este documento es la fuente de verdad para reconstruir en React el sitio que diseñamos
en Claude (canvas de diseño). Pegalo entero como primer mensaje a Claude Code dentro de
la carpeta del proyecto, junto con la carpeta `assets/` que va al lado de este archivo.

## 0. Objetivo

Rodamar SRL es un mayorista de rodamientos y retenes (Rosario, Argentina, desde 2003)
que vende a industria, agro y automotor. Ya tiene una app propia (`app.rodamar.com.ar`)
donde los clientes consultan stock, precios y hacen pedidos — **esta web NO reemplaza
la app**, es la puerta de entrada institucional/comercial que hoy no tienen (la actual
es una plantilla de WordPress vieja y poco profesional).

## 1. Stack

- **React + Vite** (JavaScript, no hace falta TypeScript salvo que prefieras).
- **React Router** para las 4 páginas (rutas reales, no anclas de un solo archivo).
- CSS plano (o CSS Modules) — el diseño no usa ningún framework de UI, así que no
  hace falta Tailwind ni librerías de componentes. Sección 4 tiene todos los tokens.
- Sin backend propio todavía: el formulario de contacto queda como UI funcional pero
  sin envío real hasta que se decida un proveedor (ver sección 7).

Estructura de carpetas sugerida:

```
src/
  components/
    Header.jsx
    Footer.jsx
    Button.jsx          (variantes primary / secondary)
    NavLink.jsx          (con el subrayado animado)
    StatCard.jsx
    FeatureCard.jsx      (tarjetas de "Por qué elegirnos")
    SegmentCard.jsx      (Industria / Agro / Automotor)
    BrandBadge.jsx       (logos de marcas)
    PhotoFrame.jsx       (imagen con zoom sutil al hover)
  pages/
    Home.jsx
    QuienesSomos.jsx
    Contacto.jsx
    Productos.jsx
  App.jsx                (Router)
  index.css              (tokens globales + reset)
assets/
  logos/...
  photos/...
```

## 2. Assets provistos

Todos están en la carpeta `assets/` al lado de este brief. Copiarlos a `src/assets/`
(o `public/`, como prefieras manejar imágenes en Vite).

**Logo propio:**
- `logos/rodamar-logo.png` — logo real de Rodamar (celeste/rojo/negro sobre fondo
  transparente). Se usa en el header (34px de alto) y en el footer, ahí dentro de un
  chip blanco porque el footer es oscuro.

**Logos de marcas (para la barra de confianza del Home y la grilla de Productos):**
- `logos/ntn.png`, `logos/timken.svg`, `logos/ina.png`, `logos/fag.png`,
  `logos/zkl.png`, `logos/luk.png`, `logos/dbh.png`
- **NSK no tiene logo** — se muestra como texto ("NSK") con la misma tipografía
  (Space Grotesk 600) dentro de la misma caja que los demás. Si más adelante
  aparece el logo real, reemplazar.
- Nota real: INA y FAG son dos marcas/logos separados (no una sola "INA-FAG"),
  aunque casi siempre se las menciona juntas en el texto.

**Fotos reales del depósito:**
- `photos/deposito-frente-hero.jpg` — foto vertical (recorte 4:5) para el hero del Home.
- `photos/deposito-frente.jpg` — foto panorámica (recorte 21:9) del frente, para la
  sección "Nuestras instalaciones".
- `photos/deposito-interior.jpg` — interior, recorte 4:3.
- `photos/deposito-racks.jpg` — racks/depósito, recorte 4:3.

Todas las fotos van con `object-fit: cover` dentro de un contenedor con `overflow:
hidden` y `border-radius`, nunca estiradas.

## 3. Sitemap y navegación

4 páginas, todas comparten Header y Footer:

| Página | Ruta sugerida | Título de pestaña |
|---|---|---|
| Home | `/` | Rodamar SRL — Rodamientos y retenes |
| Quiénes somos | `/quienes-somos` | Quiénes somos — Rodamar SRL |
| Productos | `/productos` | Productos y marcas — Rodamar SRL |
| Contacto | `/contacto` | Contacto — Rodamar SRL |

**Header** (sticky, fondo blanco 92% opacidad + blur):
- Logo (izquierda) → link a Home.
- Nav: Inicio, Quiénes somos, Productos, Contacto. El link de la página activa se
  pinta celeste (`#0076B5`).
- Botón "Ingresar a la App" (celeste) → `https://app.rodamar.com.ar/login`, `target="_blank"`.

**Footer** (fondo azul oscuro `#04405C`):
- Logo dentro de un chip blanco (padding 8px 12px, radius 8px).
- Texto: "© 2026 Rodamar SRL · Uriburu 3585, Rosario, Santa Fe".

## 4. Design tokens

```css
:root {
  /* Colores de marca — sacados del logo real */
  --primary: #0076B5;      /* celeste, color de trabajo: nav, links, íconos */
  --accent: #ED3237;       /* rojo, reservado para botones de acción/CTA */
  --ink: #262424;          /* negro/gris oscuro del logo — texto, usado con moderación */
  --dark-section: #04405C; /* azul oscuro (NO negro) para secciones de fondo oscuro */

  /* Neutros */
  --bg: #F5F8FA;
  --white: #FFFFFF;
  --border: #E2E8F0;
  --text-secondary: #4B5563;
  --text-tertiary: #7E92A5;
  --tint: #E5F2FA;          /* celeste muy claro, fondos de íconos/badges */

  /* Tipografía */
  --font-display: 'Space Grotesk', system-ui, sans-serif;  /* h1, h2, h3, números grandes */
  --font-body: 'IBM Plex Sans', system-ui, sans-serif;      /* texto corrido */
}
```

Google Fonts: `Space Grotesk` (500/600/700) + `IBM Plex Sans` (400/500/600).

**Botones:**
- `.btn-primary`: fondo sólido (celeste o rojo según el caso — ver uso abajo), texto
  blanco, `border-radius: 8px`, padding `15px 28px`.
  Hover: `transform: translateY(-1px)` + `filter: brightness(0.94)` +
  `box-shadow: 0 8px 20px rgba(4,64,92,0.22)`. Active: vuelve a `translateY(0)` y
  oscurece más (`brightness(0.88)`), sin sombra.
- `.btn-secondary`: fondo transparente, borde `1.5px solid #C7D3DC`, texto `--ink`.
  Hover: borde y texto pasan a celeste + `translateY(-1px)`.

**Regla de color de botones (importante, no mezclar):**
- **Celeste** = navegación entre secciones propias / acceso a la App ("Ingresar a la
  App", que en el header y en los CTAs de la App siempre es celeste).
- **Rojo** = acción de conversión directa ("Consultar stock y hacer pedidos", "Hablar
  por WhatsApp", "Enviar consulta"). Es la única función del rojo en toda la web —
  no usarlo como color decorativo en otro lado.

**Links de nav (subrayado animado):**
```css
.nav-link {
  position: relative;
  transition: color .2s ease;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -6px;
  height: 2px;
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .25s ease;
}
.nav-link:hover::after { transform: scaleX(1); }
```

**Fotos con zoom sutil al hover:**
```css
.photo-frame { position: relative; overflow: hidden; border-radius: 16px; }
.photo-frame img { transition: transform .5s ease; }
.photo-frame:hover img { transform: scale(1.04); }
```

**Foco de formularios:**
```css
input:focus, textarea:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,118,181,0.15);
}
```

**Radios y sombras generales:** cards `border-radius: 14px` con `border: 1px solid
var(--border)`; fotos y secciones grandes `border-radius: 16-20px`. Nada de sombras
duras — siempre difusas y de baja opacidad (`rgba(15,42,67,0.08-0.16)`).

**Breakpoints:** 880px (tablet) y 560px (mobile). Grids de 3-4 columnas pasan a 2,
luego a 1.

## 5. Contenido por página

### 5.1 Home (`/`)

**Hero:**
- Badge: punto verde + "Distribuidor mayorista desde 2003"
- H1: "Rodamientos y retenes para que tu producción no pare."
- Párrafo: "Vendemos a industria, agro y automotor en todo el país. Marcas Premium
  como NTN, TIMKEN e INA-FAG, atención técnica real, y stock y pedidos al instante
  desde nuestra app."
- Botón rojo: "Consultar stock y hacer pedidos" → App (con ícono de flecha)
- Botón secundario: "Hablar por WhatsApp" → `https://wa.me/5493412608989` (con ícono WhatsApp)
- 3 stats: **+20 años** / en el mercado · **+1.200 m²** / depósito propio con WMS ·
  **+20** / personas en el equipo
- Foto real a la derecha (`deposito-frente-hero.jpg`), recorte 4:5, sin overlay ni
  cartelitos encima — la foto sola, limpia.

**Barra de marcas** (fondo blanco, borde arriba/abajo):
"Marcas que representamos" + 8 badges en fila (logos NTN, Timken, INA, FAG — texto
NSK — logos ZKL, LuK, DBH), todas en cajas blancas con borde, altura pareja (32px).

**Nuestras instalaciones:**
- H2: "Invertimos en infraestructura para que tu pedido salga rápido y bien armado."
- Párrafo: "Nuestro depósito nuevo suma +1.200 m², y trabajamos con un sistema WMS
  computarizado que rastrea cada pieza según su ubicación exacta. Así logramos un
  control de stock más preciso y armamos pedidos más rápido."
- 3 stat cards: **+1.200 m²** Superficie del depósito nuevo · **2.500** Posiciones de
  pallets · **+22.000** Posiciones de picking
- Galería de 3 fotos: una grande arriba (`deposito-frente.jpg`, 21:9, ocupa las 2
  columnas) + dos abajo (`deposito-interior.jpg`, `deposito-racks.jpg`, ambas 4:3).

**Por qué elegirnos** — grilla de 6 tarjetas (ícono + título + texto):
1. Precios competitivos — "Opciones flexibles de pago, adaptadas a la realidad de cada cliente."
2. Atención personalizada — "Asesoramiento técnico y buena predisposición para resolver tu consulta."
3. Envíos a todo el país — "Despachos diarios con el transporte que elijas. Reparto propio en Rosario y alrededores."
4. Servicio 24/7 — "Disponibilidad todo el año para industrias, bajo contrato."
5. Variedad de marcas — "Alternativas Premium, intermedias y económicas para cada aplicación."
6. Capacitación sin cargo — "Cursos y entrenamientos en planta junto a los ingenieros de nuestras marcas."
   (los íconos son SVG de línea simple — pedime el detalle de cada uno si hace falta,
   están en el HTML exportado del canvas)

**Quiénes somos (teaser):**
- H2: "De revendedores locales a proveedores de la industria nacional."
- Stats: **2003** Año de fundación · **21** Personas en el equipo
- Párrafo: "Empezamos en 2003 importando rodamientos y retenes para revendedores de
  todo el país. Hoy representamos marcas Premium como NTN, NSK, INA-FAG y TIMKEN,
  atendemos industria, agro y automotor, y lo hacemos con un equipo de más de 20
  personas entre ventas, administración y expedición."
- Botón secundario: "Conocé nuestra historia y al equipo completo" → `/quienes-somos`

**Productos (teaser):**
- H2: "Rodamientos, retenes y repuestos para tres frentes de trabajo."
- 2 botones secundarios: "Ver marcas y cómo comprar" (→ `/productos`) y "Ver
  catálogo y hacer pedidos en la App" (→ App)
- 3 tarjetas de segmento (barra de color arriba: celeste / rojo / negro):
  - **Industria** — "Rodamientos y retenes para industrias usuarias y fabricantes de
    máquina-herramienta, con servicio 24/7 bajo contrato."
  - **Agro** — "Componentes para OEMs y fabricantes de implementos agrícolas, con
    marcas Premium e intermedias según la aplicación."
  - **Automotor** — "Repuestos para talleres, repuesteros y distribuidores
    especializados. Nuestro segmento más nuevo, en crecimiento sostenido."

**Contacto (teaser, fondo azul oscuro `--dark-section`):**
- H2: "Hablemos de lo que tu empresa necesita."
- Texto: "Para stock, precios y pedidos al instante, usá la App. Para todo lo demás,
  escribinos."
- Lista con ícono: dirección (Uriburu 3585, Rosario, Santa Fe), 2 teléfonos
  (+54 9 341 435-1216 / +54 9 341 418-0100), WhatsApp (+54 9 341 260-8989, link a
  wa.me), email (ventas@rodamar.com.ar), horario (Lunes a viernes 08:30-13:00 /
  13:45-18:00).
- Panel blanco a la derecha: "¿Hablamos?" + botón rojo "Hablar por WhatsApp" + botón
  secundario "Completar formulario de contacto" (→ `/contacto`).

### 5.2 Quiénes somos (`/quienes-somos`)

**Intro:**
- H1: "Más de 20 años poniendo rodamientos donde la industria los necesita."
- Stats: **2003** Año de fundación · **21** Personas en el equipo · **+1.200 m²**
  Depósito propio con WMS
- Historia completa (3 párrafos):
  1. "Empezamos en 2003 importando y distribuyendo rodamientos y retenes con marcas
     como ZKL y DBH, enfocados en revendedores y rulemaneros de todo el país desde
     nuestra base en Rosario."
  2. "Con el tiempo sumamos líneas más accesibles y marcas propias de importación
     desde el sudeste asiático, lo que nos permitió atender también a OEMs y
     fabricantes de implementos agrícolas y máquina-herramienta. Más adelante
     incorporamos marcas Premium —NTN, NSK, INA-FAG y TIMKEN— para los clientes más
     exigentes con su aplicación."
  3. "Ese respaldo técnico nos abrió la puerta a industrias de renombre nacional e
     internacional, y en los últimos años sumamos el segmento automotor: repuestos
     para talleres, repuesteros y distribuidores especializados, con un crecimiento
     sostenido. Hoy nos distingue un enfoque dinámico, joven y flexible, con una
     atención cercana y la capacidad de adaptarnos a cada necesidad."

**Nuestro equipo** — H2: "21 personas resolviendo ventas, administración y logística
todos los días." Cada persona: avatar circular con iniciales (fondo `--tint`, texto
celeste) + nombre + rol. Sin fotos reales todavía (usar iniciales hasta que las
suban).

*Ventas (8):*
Darío Burgio (Agro) · Gabriel Sulli (Agro · Automotor) · Álvaro Palmucci (Agro ·
Automotor) · Maximiliano Becerra (Industria) · Stefania Schmaedke (Industria) ·
Jonatan Sisa (Industria) · Axel Dalmasso (Agro) · Santiago Buttice (Ventas)

*Administración (6):*
Anabelia Lobay (Jefa Administrativa) · Mariana Rodriguez (Facturación) · Juan Pablo
Martin (Proveedores) · Federico Garcia (Cobranzas) · Facundo Becerra (Customer
Service) · Gonzalo Romero (Compras)

*Expedición (7, sin rol individual):*
Lucas Arcuri · Joaquin Schmaedke · Julian Lopez · Lucas Franco · Nicolas Marrone ·
Gabriel Ramirez · Cristian Beltramo

**CTA de cierre:** "¿Querés que te asesore alguien del equipo?" + botón rojo "Hablar
por WhatsApp" + botón secundario "Ver todos los medios de contacto" (→ `/contacto`).

### 5.3 Productos (`/productos`)

**Intro:**
- H1: "Rodamientos, retenes y repuestos para industria, agro y automotor."
- Texto: "El stock, los precios y tus pedidos se manejan desde la App. Acá te
  contamos cómo organizamos lo que vendemos y con qué marcas trabajamos, para que
  sepas dónde buscar lo que necesitás."

**Segmentos** (mismas 3 tarjetas del Home, pero con una línea extra de "marcas
típicas" — **esto es una inferencia mía a partir de la historia de la empresa, no un
dato confirmado segmento por segmento; si en la realidad se mezcla más, hay que
corregirlo**):
- Industria → "Marcas típicas: NTN, TIMKEN, INA, FAG, NSK"
- Agro → "Marcas típicas: ZKL, DBH y marcas Premium según exigencia"
- Automotor → "Marca típica: LUK"

**Marcas** — H2: "Premium, intermedias y económicas: la que tu aplicación necesita."
Texto: "No creemos en una sola marca para todo. Por eso representamos opciones en
distintos niveles, para que pagues lo justo según la exigencia de cada aplicación."
Grilla de 8 tarjetas (logo arriba + descripción de nivel):
- NTN — "Premium, para aplicaciones exigentes."
- Timken — "Premium, con respaldo técnico internacional."
- INA — "Premium, para procesos de producción continua."
- FAG — "Premium, para procesos de producción continua."
- NSK (texto, sin logo) — "Premium, alternativa para aplicaciones exigentes."
- ZKL — "Con nosotros desde 2003, alternativa intermedia."
- DBH — "Con nosotros desde 2003, alternativa intermedia."
- LuK — "Repuestos para el segmento automotor."

**Cómo comprar** — H2: "Tres pasos, sin vueltas."
1. **Consultá y pedí** — "Desde nuestra App, con stock y precio actualizados al
   instante — hacés el pedido ahí mismo."
2. **Armamos tu pedido** — "Nuestro depósito computarizado (WMS) ubica cada pieza
   por su posición exacta y arma el pedido completo."
3. **Lo recibís** — "Despacho diario a todo el país, o retiro y reparto propio en
   Rosario y alrededores."

**CTA de cierre** (fondo `--dark-section`): "¿Ya sabés lo que buscás? Pedilo ahora en
la App." + botón celeste "Ingresar a la App" + botón secundario outline blanco
"Prefiero escribir" (→ `/contacto`).

### 5.4 Contacto (`/contacto`)

**Intro:**
- H1: "Hablemos de lo que tu empresa necesita."
- Texto: "Para stock, precios y pedidos al instante, usá la App. Para cotizaciones,
  asesoramiento técnico o cualquier otra consulta, escribinos por acá."

**Columna de datos** (misma info que el teaser del Home) + link real "Ver en Google
Maps →" que abre:
`https://www.google.com/maps/search/?api=1&query=Uriburu+3585%2C+Rosario%2C+Santa+Fe%2C+Argentina`
+ botón rojo "Hablar por WhatsApp ahora" + debajo, un placeholder de mapa (borde
punteado, aspecto 16:10) con el texto "Mapa — Uriburu 3585, Rosario" hasta que se
decida si se embebe un mapa real.

**Formulario** — "Dejanos tu consulta" / "Te respondemos por el medio que
prefieras." Campos: Nombre completo, Empresa, Teléfono, Email, Motivo de la consulta
(select: Industria / Agro / Automotor / Otra consulta), Consulta (textarea). Botón
rojo "Enviar consulta" (**ver sección 7 — hoy no envía nada de verdad**).

**FAQ** — H2: "Antes de escribirnos, capaz esto ya te responde." 4 preguntas:
1. "¿Puedo ver stock, precios y hacer pedidos sin llamar?" — "Sí, desde nuestra App
   podés consultar stock y precios actualizados al instante, y hacer tu pedido
   directamente ahí."
2. "¿Hacen envíos a todo el país?" — "Sí, con despachos diarios por el transporte
   que elijas, y reparto propio en Rosario y alrededores."
3. "¿Atienden industrias fuera de horario?" — "Sí, ofrecemos servicio 24/7 para
   industrias bajo contrato."
4. "¿Con qué marcas trabajan?" — "Marcas Premium como NTN, TIMKEN, INA-FAG y NSK,
   además de alternativas intermedias y económicas según la aplicación."

## 6. Datos de contacto (para no perderlos de vista)

- Dirección: Uriburu 3585, Rosario, Santa Fe
- Teléfonos: +54 9 341 435-1216 / +54 9 341 418-0100
- WhatsApp: +54 9 341 260-8989 (`https://wa.me/5493412608989`)
- Email: ventas@rodamar.com.ar
- Horario: Lunes a viernes, 08:30 a 13:00 y 13:45 a 18:00
- App: `https://app.rodamar.com.ar/login`

## 7. Pendiente — no lo resuelvas solo, avisame antes

- **Envío real del formulario de contacto**: hoy el botón "Enviar consulta" no hace
  nada. Opciones simples sin backend propio: Formspree, Web3Forms o EmailJS (mandan
  el mail directo desde el frontend). Si más adelante hay backend propio, se puede
  cambiar por un endpoint propio. Decidilo antes de conectarlo.
- **Mapa de Contacto**: sigue siendo un placeholder. Se puede embeber un iframe de
  Google Maps real (ahí sí no hay problema técnico, a diferencia del canvas de
  diseño) cuando quieras.
- **Fotos del equipo**: Quiénes somos usa iniciales en vez de fotos reales.
- **Hosting y dominio**: todavía sin decidir (ver charla en el chat de Claude).

## 8. Primer prompt sugerido para Claude Code

Una vez que tengas Node instalado y la carpeta del proyecto creada
(`npm create vite@latest rodamar-web -- --template react`, `cd rodamar-web`, `npm
install`, copiar `assets/` adentro de `src/`), abrí Claude Code en esa carpeta y
pegale algo así:

> Leé el archivo BRIEF.md que está en esta carpeta. Quiero que armes un sitio React
> con Vite y React Router siguiendo ese brief al pie de la letra: mismo copy, mismos
> colores, misma estructura de páginas y componentes. Empezá por el Header, el
> Footer y los componentes de Button y NavLink con las animaciones descriptas en la
> sección 4, después seguimos página por página empezando por el Home.
