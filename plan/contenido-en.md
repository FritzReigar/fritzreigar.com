# Contenido de la web nueva, en inglés

Tanda 2.8 (2026-11-06). Todo el texto visible de fritzreigar.com en `/en/`, con el mismo índice
que [`contenido.md`](contenido.md) (§ 0 a § 6), más los `alt` de las capturas
([`capturas.md`](capturas.md)). Lo traduce Claude y lo revisa Fritz (decisión F0): **nada de aquí
se publica sin su OK**. La 2.9 lo monta tal cual, sin escribir una línea.

Cómo se lee: lo que va a la web está en los bloques de texto, en inglés. Las notas **↳** son del
plan y **no van a la web**: no repiten las fuentes, remiten al bloque gemelo de `contenido.md`, y
solo dicen lo que cambia al pasar al inglés. Donde los datos (`src/data/home.ts`,
`src/content/cases/es/*.json`) parten el texto de otra forma que `contenido.md` (las cifras, las
capas, los títulos sin punto), va también la forma de los datos.

Reglas aplicadas, además de las de `contenido.md`: inglés americano (como el estudio y el README de
Snugtone); cifras con el formato inglés (0.48 s, 9,503, «more than 1,200», 95–96); lo que en
español es local se explica la primera vez (Benetússer, l'Horta, Bizum); el texto español que sale
en una captura se cita tal cual y se traduce entre paréntesis; los puestos, como en
`docs/cv/cv-en.html`.

---

## 0. El marco (todas las páginas)

**Enlace de salto:** Skip to content

**Cabecera:** Fritz Reigar (to the home page) · Work · Projects · How I work · Career · Contact ·
Español

**Menú del móvil:** Menu

**Pie:** © 2026 Fritz Reigar · Valencia — CV · GitHub · LinkedIn · X · contact@fritzreigar.com

**Rótulo de sección en las fichas:** Work · Project — **Pies de las parejas:** Before · After

↳ Gemelo de § 0. Todo esto ya está en `ui.en` de `src/data/ui.ts` y no cambia. La nav son las
etiquetas medidas en spec § 5 (668 px, holgura a 56rem): no se vuelve a medir. El CV enlaza a
`/assets/cv/fritz-reigar-cv-en.pdf` (`cvHref`).

---

## 1. Portada

### 1.1 Hero

**Nombre:** Fritz Reigar

**Avatar** — `alt`: «Line drawing of Fritz Reigar, with a beard and a blue T-shirt, on a light blue
background.»

**Quién es:**
> Freelance web developer in Valencia, Spain. I love technology and make a living from it: I build
> websites for businesses with Estudio Reigar and, in my spare time, my own apps, which I share
> publicly.

**Estado:** Taking on projects

**Acciones:** Estudio Reigar ↗ (`https://estudioreigar.com/en/`) · Get in touch (a `#contact`)

↳ Gemelo de § 1.1. «Valencia, Spain» la primera vez, como el estudio en inglés. «Taking on
projects» y no «Open to work» ni «Available for hire», que suenan a buscar empleo (decisión 4). El
enlace del estudio va a su portada inglesa, `/en/`, que existe (`estudio/en/index.astro`).

### 1.2 Estudio Reigar

**Título:** Estudio Reigar

> Estudio Reigar is my workshop: websites, online stores and Google Business Profiles for small
> businesses. There's no team behind it: I answer the messages and I write the websites, by hand,
> with no templates and tailored to each business. I deliver them with their speed score measured
> and everything in the client's name. In person in Valencia and the towns around it (l'Horta);
> anywhere else in Spain, remotely.

**Enlace:** Visit estudioreigar.com ↗ (`https://estudioreigar.com/en/`)

↳ Gemelo de § 1.2. «Workshop» y «I write the websites», como `estudio/en/about-me.astro`.
L'Horta se explica: es la comarca alrededor de Valencia. Sin precios, sin servicios y sin fechas.

### 1.3 Trabajo

**Título:** Work

**Missphone** (primero y más grande)
- Rótulo: Client · Inherited online store · Ongoing maintenance
- > A phone shop in Benetússer, near Valencia, with custom phone cases, accessories, repairs and
  > photo gifts. I inherited its WooCommerce store: I took back control, brought every page up to
  > the standard of its home page, added gifts that customers design right on the site, and
  > relaunched it.
- Enlace: See the case study →

**Limpiezas Artemisa**
- Rótulo: Client · New website · Delivered in September 2026 · Ongoing maintenance
- > A custom website for a cleaning company in Valencia: static, without a single cookie and with
  > one page per service for local search. Mobile Lighthouse: 95–96 for performance and 100 for
  > everything else. Plus its Google Business Profile, kept up to date every month.
- Enlace: See the case study →

↳ Gemelo de § 1.3. «Heredada» es «inherited», nunca «built» ni «rebuilt» (`CLAUDE.md`,
«Posicionamiento»).

### 1.4 Proyectos

**Título:** Projects

**Snugtone** (primero y más grande)
- Rótulo: My own app · Open source (MIT) · 1.0.1 for Windows
- > A desktop music player for your own library, in Rust with Tauri. Gapless between tracks, every
  > album at the same volume, and a 9,503-file library that rescans in 0.48 s.
- Enlace: See the project →

**Snugport**
- Rótulo: My own product · Free, with a paid plan
- > A control room for freelancers: time tracking with rates, projects, clients, finances and
  > deadlines. In production as a vanilla JavaScript PWA, with the panel being migrated to React and
  > TypeScript, backed by more than 1,200 unit tests.
- Enlace: See the project →

**CPP-Galaxian-Engine** (pequeño, sin ficha)
- Rótulo: C++ · 2023
- > An arcade game in C++ with no commercial engine: its own game loop, entities in static arrays, a
  > state machine for the enemy AI and hand-written AABB collisions.
- Enlace: See the repository ↗ (`https://github.com/FritzReigar/CPP-Galaxian-Engine`)

**Pie de la sección:** All my public code, on GitHub ↗

↳ Gemelo de § 1.4. «Gapless», «every album at the same volume» y «rescan in 0.48 s» son las
palabras del README inglés de Snugtone (`snugtone/README.md`). «Control room for freelancers» es
el nombre de `docs/cv/cv-en.html`; «panel», el de la landing inglesa de Snugport.

### 1.5 Cómo trabajo

**Título:** How I work

1. **By hand, with no templates.** HTML, CSS and TypeScript written for each project, and Astro when
   the website has several pages. Minimal JavaScript, and nothing that goes unused.
2. **Tests and CI that gate every deploy.** On the Estudio Reigar website, Playwright, axe and
   Lighthouse have to pass before anything goes live; in Snugport, Vitest, Playwright and mutation
   testing; in Snugtone, 640 tests and `cargo clippy` without a single warning.
3. **Lighthouse measured, not promised.** Every project I deliver comes with its mobile score,
   measured and shared.
4. **With AI, and with a safety net.** AI-assisted development (Claude Code), with one rule: watch
   every new test fail before trusting a pass.

↳ Gemelo de § 1.5. En los datos los títulos llevan el punto, como en español. «Mutantes» pasa a
«mutation testing», que es como se dice en inglés.

### 1.6 Trayectoria

**Título:** Career

| Dates | Role | Where |
|---|---|---|
| Apr 2026 — Present | Freelance web developer | Estudio Reigar · Self-employed, Valencia |
| Jan 2026 — Present | AI Red-Teaming & Prompt Engineer | DataAnnotation Tech · Self-employed, remote |
| Jul 2025 — Present | AI QA Analyst / Project Tester | Lionbridge Technologies · Self-employed, remote |
| Dec 2024 — Oct 2025 | Energy Consultant & Account Manager | Selectra Sur SL · Valencia |
| 2019 | IT Support Technician · Internship | Valencia City Council — Local Police |

**Education:** Multiplatform Application Development (DAM), Spain's two-year higher vocational
program in software — IES El Grao, Valencia · Specialization in Video Game Design and Development —
ESAT, Valencia

**Languages:** Spanish (native) · Valencian (C1) · English (C1) · German (A2)

**Enlace:** CV (PDF) ↓

↳ Gemelo de § 1.6. La cabecera de la tabla (`headers`) es «Dates · Role · Where»; los títulos de
los bloques (`education.title`, `languages.title`), «Education» y «Languages». Puestos, fechas y
organizaciones, de `docs/cv/cv-en.html` («Present», «Internship», «Valencia City Council, Local
Police»), con «Self-employed, remote» como en español. El DAM con su nombre explicado y **sin
decir que está terminado**: ni «Diploma» ni «Graduate». Sin fechas ni estado en la formación, sin
EOI y sin las clases particulares, como en español.

### 1.7 Contacto

**Título:** Contact

> A project, a website you've inherited, or a technical question? Write to me: I answer personally,
> usually within 24 hours. If it's about your business's website, estudioreigar.com explains how I
> work and what it costs.

**Correo:** Or email me directly at contact@fritzreigar.com

**Formulario** (Formspree, el mismo `action`):
- Name — marcador: «Your name or company»
- Email — marcador: «you@email.com»
- Message — marcador: «Tell me what you need…»
- Botón: Send
- Asunto oculto: «New message from fritzreigar.com (English)»
- Mientras envía: «Sending…»
- Enviado: «Message sent. I'll get back to you soon.»
- Error: «Your message couldn't be sent. Try again or email me at contact@fritzreigar.com.»

**Enlace discreto:** CV (PDF) ↓

↳ Gemelo de § 1.7. En los datos, la entradilla es `Rich`: «estudioreigar.com» es el enlace, a
`https://estudioreigar.com/en/`; `direct` es «Or email me directly at ». El asunto lleva «(English)»
para que Fritz sepa, desde la bandeja, en qué idioma contestar.

---

## 2. Ficha de Missphone — `/en/work/missphone`

**Rótulo:** Work · Client · Inherited online store · Ongoing maintenance

**Título:** Missphone

**Entradilla:**
> A phone shop in Benetússer, a town just south of Valencia: custom phone cases, accessories,
> repairs and photo gifts, in its physical shop and in its online store. I didn't build the
> online store: I inherited it up and running, and this is what I've done with it.

**Enlaces:** See the store ↗ (`https://missphone.es/`) · The case study for business owners, on
estudioreigar.com ↗ (`https://estudioreigar.com/en/case-studies/missphone`)

**The best part:**
> That the website finally looks like the shop: pink, charming and built around personalization, the
> same from the home page to the very last brand page. And that the products shine: each one with
> its photo, its price up front and, if it can be personalized, the designer right on the product
> page.

### The state I found it in

> I inherited it up and running, with orders coming in, on WordPress, WooCommerce and a commercial
> theme, but in a state that called for a thorough overhaul rather than a touch-up:
> - The home page header was a single image with the «Click aquí» (click here) button drawn into it,
>   so it led nowhere.
> - Much of the text was gray on top of photos and couldn't be read.
> - The gift pages didn't link to any product.
> - The catalog repeated the same product page for every phone model.
> - Admin access was scattered among several people.
>
> That's what happens to a website that runs for years with no one looking after it. I won't comment
> on whoever built it: I don't know what budget they had or what they were asked for.

### Before and after

> The «before» is from August 31, 2026, saved before touching anything. The «after» is captured at
> the same width and with the same framing, or there's no comparison.

1. **The home page, on desktop**
   - Before: A single image with the button drawn into it, which led nowhere.
   - After: A real header that says what the shop is and where it is, with two buttons (design your
     case and see the accessories) and the Google rating.
2. **The home page, on mobile**
   - Before: The same image, shrunk to 380 px and too small to read.
   - After: The photo on top and, below it, the headline, the two buttons and the rating, sized for
     a phone.
3. **The categories on the home page**
   - Before: Each category's name set over its photo, sometimes right on top of the product.
   - After: Cards with the photo on one side and, on the other, the name and the starting price.
4. **One category: phone cases**
   - Before: Four paragraphs in gray over a photo of cases, impossible to read.
   - After: The colored header, with a headline you can read, a button to make one with your photo
     and the framed photo; the same header on every page.
5. **Further down the home page**
   - Before: An accessories block with gray text over a dark photo, almost invisible.
   - After: In that spot, the physical shop gets its own block, «La tienda, en Benetússer» (the
     shop, in Benetússer): the address, a photo of the shop and buttons to call and get directions.

**In numbers** (en los datos, `num` + `unit` + `text`):
- **39** — pages brought up to the home page's standard: 37 redone and 2 new
- **8** — products customers design and buy online
- **268** → 8 — duplicate product pages, one per phone model, merged into 8 products with a dropdown
  (252 models)
- **15** — custom PHP extensions (mu-plugins)
- **14** — before-and-after pairs, framed identically

### What I did, phase by phase

**1. The rescue.** First, taking back control: admin access and notifications, put in the business's
own name; a verified backup before touching anything; payments by card and by Bizum (Spain's mobile
payment app) and shipping costs, checked with test orders. And the catalog: 268 product pages that
repeated the same product for every phone model, merged into 8 products with a model dropdown, with
every old address redirected (301) to its product with the model already selected.

**2. Gifts customers design on the site.** Mug, T-shirt, cushion and frame, and later mouse pads and
puzzles: 8 products with the designer on the product page itself, and an extension that won't let
anyone buy them without a design. The 8 gift pages, with a photo, text and a button that leads to
designing or buying.

**3. Every page up to the home page's standard.** 37 pages redone (gifts, occasions, accessories and
the 14 brands) and 2 new ones, built from the home page's components: a colored header with the
framed photo, full-width bands, cards and photos. The shared CSS, written once in named blocks
rather than page by page. And a new header for the home page itself.

**4. The loose ends.** A single H1 and alt text on every page, the copy that promised things the
shop didn't offer, the store page and product pages restyled, the social sharing image for the home
page, and a thorough clean-up before the final backup.

**5. The handover.** A full walkthrough of the website, from the home page to the cart, on desktop
and on mobile; a final backup verified file by file; and the handover in person, at the shop, with
a document of every decision I made on their behalf, for them to review.

**6. The launch.** The launch post on the blog and the Google Business Profile up to date; an iPhone
repair page covering eight types of fault, with structured data; the online store turned into a
showcase, with the categories and the products customers design; and seasonal sections (Christmas,
Valentine's Day, Mother's Day…) switched on and off from the menu, without touching code.

**Today** I still maintain it.

↳ En los datos, los títulos de las fases van sin el punto, como en español (Desvío de la 2.5), y
`today` es «Today I still maintain it.».

### Built with

WordPress · WooCommerce · PHP (mu-plugins) · CSS · Fancy Product Designer · JSON-LD (Store, FAQPage,
Service) · WordPress REST API · Python and Node for measuring and taking screenshots without
touching the store

### How it was done

> Nothing is taken for granted without measuring it on the live site, and every change is preceded
> by a backup and a screenshot of the «before». It's a store with orders and customer data: there's
> no room for improvising.

### What isn't shown

> How much it sells, what it spends on advertising and what that brings in, its customers' data and
> the store's admin panel. Nor how it's protected. It's theirs, and I don't publish it, not even
> with permission.

↳ Gemelo de § 2. Heredada, sin culpar a quien la montó y sin decir que se facturó como Estudio
Reigar, igual que en español. «Shop» es la tienda de la calle y «store», la online, para no
confundirlas. Benetússer se sitúa al lado de Valencia; Bizum se explica. El caso del estudio
enlaza a su versión inglesa (`estudio/en/case-studies/missphone.astro`). «Lo mejor» es la etiqueta
del `pullQuote` («The best part»); las comillas latinas de las citas se quedan («Click aquí»,
«before») porque son las de toda la web y la 2.9 las pinta igual.

---

## 3. Ficha de Limpiezas Artemisa — `/en/work/limpiezas-artemisa`

**Rótulo:** Work · Client · New website · Delivered in September 2026 · Ongoing maintenance

**Título:** Limpiezas Artemisa

**Entradilla:**
> A cleaning company in Valencia (homes, offices, apartment buildings, windows, garages and
> post-construction cleaning) well reviewed on Google and with no website of its own. A new, custom
> website, and its Google Business Profile set up properly.

**Enlaces:** See the website ↗ (`https://www.limpiezasartemisa.com/`) · The case study for business
owners, on estudioreigar.com ↗ (`https://estudioreigar.com/en/case-studies/limpiezas-artemisa`)

### The starting point

> No website of its own, several domains bought and none of them showing anything, and the Google
> Business Profile without organized photos or the right categories.

### What was done

- **A static website, with no framework and no dependencies.** On Cloudflare Pages and deployed from
  GitHub on every push: home page, one page per service (six), a blog and the legal pages, plus a
  custom error page.
- **Local SEO.** One page per service, so Google shows the right one to someone searching for
  «limpieza de comunidades» (apartment-building cleaning) instead of the home page; structured data
  (LocalBusiness, Service, BreadcrumbList, BlogPosting); a sitemap and the site registered in Search
  Console.
- **The form, with no third parties in the browser.** A Pages Function that sends through Resend and
  only reports success once the server confirms it, with validation and spam filters on the server
  and no captcha. Next to it, WhatsApp and a sticky call-and-message bar on mobile.
- **Strict CSP and not a single cookie.** Security headers (CSP, HSTS, `X-Frame-Options`) and
  cookie-free analytics, so no banner either: asking permission for something that doesn't happen
  would be wrong as well as annoying.
- **The domains, sorted out.** One main domain and the rest redirecting to it, each with its
  certificate, without moving the domain or the email away from their provider.
- **Google Business Profile.** An initial audit, a rewritten description, a complete service
  catalog, wider service areas and posts that link to the website.
- **After delivery.** Monthly upkeep of the profile, one blog article a month, updates and backups.

↳ En los datos, el título de cada punto va aparte y sin el punto final (Desvío de la 2.2): «A
static website, with no framework and no dependencies», «Local SEO»…

### Measured

> Lighthouse on mobile, on the home page and two service pages: **performance 95–96, and 100 for
> accessibility, best practices and SEO**.

Las cifras (`figureList.items`): **95–96** performance · **100** accessibility · **100** best
practices · **100** SEO

### Who owns what

> The client owns the domains, the hosting and the email, the Google Business Profile and Search
> Console. I'm the technical manager, not the owner.

### Built with

HTML · CSS · JavaScript · Cloudflare Pages · Pages Functions · Resend · JSON-LD · Cloudflare Web
Analytics · Search Console · Google Business Profile

### What isn't shown

> What it cost, and the numbers from its Google Business Profile: views, calls and searches are its
> business data. What's measured here is the website.

↳ Gemelo de § 3. Sin precio, sin las métricas de su ficha y sin la cifra de páginas, como en
español. «Comunidades» son los edificios de viviendas (como dice el estudio en inglés) y la
búsqueda se cita en español, que es como la escribe su cliente. El caso del estudio, en inglés
(`estudio/en/case-studies/limpiezas-artemisa.astro`).

---

## 4. Ficha de Snugtone — `/en/projects/snugtone`

**Rótulo:** Project · My own app · Open source (MIT) · 1.0.1 for Windows

**Título:** Snugtone

**Entradilla:**
> A desktop music player for your own library, written in Rust with Tauri. Free and open source.

**Acciones:** Download for Windows ↗ (`https://github.com/FritzReigar/snugtone/releases`) · Code on
GitHub ↗ (`https://github.com/FritzReigar/snugtone`)

### Why

> foobar2000 felt very dated to me, and it had too much going on. I wanted something simpler and
> faster that still read the formats everyone uses. And to learn Rust along the way.

### What it does

- **It plays.** FLAC, MP3, Opus, WAV, AAC, ALAC, Vorbis and AIFF, gapless between tracks. Every
  album at the same volume: it measures loudness itself (EBU R128, per album, within 0.04 LU of
  ffmpeg). A ten-band equalizer that, switched off, doesn't touch a single bit. And if your
  headphones switch off mid-song, it moves to another output and keeps playing from the same
  millisecond.
- **It's fast with a big library.** A rescan in 0.48 s, the list on screen in under a second,
  watched folders and a search box that narrows things down (`format:flac`, `duration:>3:30`,
  `year:2016`…).
- **It fixes things without touching your files.** It checks FLAC and ALAC sample by sample against
  their MD5, corrects tags in the library rather than in the file, and brings tags from MusicBrainz,
  showing the comparison field by field before anything changes.
- **It's yours to set up.** Theme, density, columns, audio output and every shortcut, all from
  within the app, with changes applied instantly; underneath, three plain TOML files. In English and
  Spanish.

### Measured

- A real library of **9,503 files and 161 GB**: a rescan in **0.48 s**, about **230 MB** of memory
- **609 tests** for the core and **31** for the shell; `cargo clippy` **without a single warning**
- M3U import and export: **9,503 paths out and 9,503 back in**, without losing one

Las cinco cifras, como las pintan los datos (`num` + `unit` + `text`):
- **0.48** s — to rescan a real library of 9,503 files and 161 GB
- **230** MB — of memory, roughly, with that library
- **609** — core tests, plus 31 more for the shell
- **0** — `cargo clippy` warnings
- **9,503** — M3U paths out and 9,503 back in, without losing one

### How it's built

> The core is pure Rust (audio engine, queue, library, configuration) and doesn't know Tauri exists,
> so it's tested without opening a window. The Tauri shell provides the window and the real audio
> output (cpal). The interface is HTML, CSS and JavaScript with no framework and no build step.

**Las tres capas, de arriba abajo:**
- **Interface:** HTML, CSS and JavaScript, with no framework and no build step
- **Shell:** Tauri 2: the window and the real audio output (cpal)
- **Core:** Pure Rust: audio engine, queue, library and configuration. It doesn't know Tauri exists

**Built with:** Rust · Tauri 2 · cpal · vanilla HTML/CSS/JS · TOML · MusicBrainz

### Download

> The Windows installer is on GitHub. It isn't signed, so Windows will warn you with «Windows
> protected your PC»: click «More info» and then «Run anyway». The code is meant for Linux too,
> which comes next; macOS and mobile, later. MIT license.

**Nota de las capturas:**
> Everything in the screenshots is free to use: the music is CC0 and public domain; the covers, CC0
> and public-domain paintings.

↳ Gemelo de § 4. Casi todo sale del README inglés del propio Snugtone (`snugtone/README.md`):
«gapless», «within 0.04 LU of ffmpeg», «doesn't touch a single bit», «keeps playing from the same
millisecond», «core» y «shell», y los avisos de Windows en inglés, que son los que ve quien lo
instala en inglés. Los filtros del buscador, con las claves inglesas (`format:`, `duration:`,
`year:`), que son las que salen en la captura. La nota de las capturas **pierde su última frase**
(«La interfaz de las capturas está en inglés»): en la página inglesa no avisa de nada. Las cifras,
las de la 1.1, sin recontar (eso es de la 2.11).

---

## 5. Ficha de Snugport — `/en/projects/snugport`

**Rótulo:** Project · My own product · Free, with a paid plan

**Título:** Snugport

**Entradilla:**
> A control room for freelancers: hour tracker with rates, projects, client pipeline, finances,
> deadlines and checklists.

**Acción:** Try the app ↗ (`https://snugport.app/`)

- The production version, in vanilla JavaScript with no dependencies, is an installable PWA that
  works offline.
- An ongoing migration of the panel to React 19 + TypeScript + Tailwind 4, alongside production:
  more than 1,200 unit tests (Vitest), more than 300 E2E tests (Playwright) on mobile and desktop,
  and mutation testing.
- Free, with no account and no limits; the paid plan, a Stripe subscription, syncs your data across
  devices. Backend on Supabase (Postgres, Auth and Edge Functions in TypeScript): the paywall lives
  in Postgres RLS policies, not in the client.
- Accessibility audited (AA contrast, focus trap, `prefers-reduced-motion`), a choice of themes, a
  bilingual ES/EN interface and 80 currencies.

**Built with:** vanilla JavaScript · React · TypeScript · Tailwind · Supabase · Postgres RLS ·
Stripe · PWA · Cloudflare Pages

↳ Gemelo de § 5. La entradilla, como el primer bullet de `docs/cv/cv-en.html`; las cifras, las
mismas (1.246 y 315 contadas el 2026-11-04, dichas «more than»). Temas sin cifra, y sin usuarios,
suscriptores ni ingresos. `https://snugport.app/` ya sirve la landing en inglés.

---

## 6. El 404, los `title`, las `description`, el Open Graph y el JSON-LD

### 6.1 El 404 — `/en/404`

- `title`: Page not found · Fritz Reigar
- Rótulo: Error 404
- Título: This page doesn't exist
- > Or it has moved. What you were looking for is probably on the home page.
- Acciones: Back to home · See the work · See the projects

↳ Gemelo de § 6.1. Los tres botones llevan a `/en/`, `/en/#work` y `/en/#projects`. Sustituye al
texto de reserva de hoy en `src/pages/en/404.astro`.

### 6.2 Por página

| Página | `title` | `description` | OG: título | OG: línea |
|---|---|---|---|---|
| Portada | Fritz Reigar · Freelance web developer in Valencia, Spain | I'm Fritz Reigar, a freelance web developer in Valencia, Spain. I build websites for businesses with Estudio Reigar and, in my spare time, my own apps, like Snugtone. | Fritz Reigar | Freelance web developer in Valencia, Spain: websites for businesses with Estudio Reigar and my own apps, shared publicly. |
| Missphone | Missphone · Work · Fritz Reigar | An inherited WooCommerce store: taking back control, gifts customers design on the site, 39 pages brought up to the home page's standard, the handover and the launch. | Missphone: an inherited store, brought up to date | Rescuing and relaunching an online store near Valencia, phase by phase, with its before and after. |
| Limpiezas Artemisa | Limpiezas Artemisa · Work · Fritz Reigar | A custom static website for a cleaning company in Valencia: local SEO, no cookies, strict CSP and a mobile Lighthouse score of 95–96 for performance and 100 for the rest. | Limpiezas Artemisa: a new website and its Google profile | One page per service, not a single cookie, and a measured Lighthouse score. |
| Snugtone | Snugtone · Project · Fritz Reigar | A desktop music player in Rust and Tauri, free and open source: gapless, every album at the same volume and a rescan in 0.48 s. | Snugtone, a music player in Rust | For your own library: fast, MIT-licensed, and it never touches your files. |
| Snugport | Snugport · Project · Fritz Reigar | A control room for freelancers: a vanilla JavaScript PWA in production and a panel migrating to React and TypeScript, with more than 1,200 tests. | Snugport, the freelancer's control room | Hours, projects, clients and finances in one panel: free, with a paid plan. |
| 404 | Page not found · Fritz Reigar | — (con `noindex`) | — | — |

↳ Gemelo de § 6.2: cada línea resume su ficha inglesa, con las mismas cifras. El formato de
`title` es el del estudio en inglés («Missphone · Case study · Estudio Reigar»). El título de OG
de Artemisa dice «Google profile» y no «Google Business Profile» para que quepa en el cartel de la
2.10.

### 6.3 JSON-LD de la portada inglesa

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://fritzreigar.com/en/#page",
      "url": "https://fritzreigar.com/en/",
      "name": "Fritz Reigar · Freelance web developer in Valencia, Spain",
      "inLanguage": "en",
      "mainEntity": { "@id": "https://fritzreigar.com/#fritz" }
    },
    {
      "@type": "Person",
      "@id": "https://fritzreigar.com/#fritz",
      "name": "Fritz Reigar",
      "url": "https://fritzreigar.com/",
      "image": "https://fritzreigar.com/assets/img/fritz-reigar-avatar.png",
      "jobTitle": "Web developer",
      "description": "Freelance web developer in Valencia, Spain. He builds websites for businesses with Estudio Reigar and his own apps, like Snugtone.",
      "email": "mailto:contact@fritzreigar.com",
      "address": { "@type": "PostalAddress", "addressLocality": "Valencia", "addressCountry": "ES" },
      "worksFor": { "@id": "https://estudioreigar.com/#estudio" },
      "alumniOf": [
        { "@type": "EducationalOrganization", "name": "IES El Grao", "address": "Valencia, Spain" },
        { "@type": "EducationalOrganization", "name": "ESAT — Escuela Superior de Arte y Tecnología", "address": "Valencia, Spain" }
      ],
      "knowsLanguage": [
        { "@type": "Language", "name": "Spanish", "alternateName": "es" },
        { "@type": "Language", "name": "Valencian", "alternateName": "ca" },
        { "@type": "Language", "name": "English", "alternateName": "en" },
        { "@type": "Language", "name": "German", "alternateName": "de" }
      ],
      "knowsAbout": [
        "Web development", "TypeScript", "JavaScript", "Astro", "React", "Tailwind CSS",
        "Rust", "Tauri", "Web accessibility (WCAG AA)", "Playwright", "Vitest",
        "Cloudflare Pages", "Supabase", "PostgreSQL", "Stripe", "WordPress", "WooCommerce",
        "Local SEO", "Google Business Profile", "AI model evaluation"
      ],
      "sameAs": [
        "https://github.com/FritzReigar",
        "https://www.linkedin.com/in/fritz-reif-garcia/",
        "https://x.com/FritzReigar"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://estudioreigar.com/#estudio",
      "name": "Estudio Reigar",
      "url": "https://estudioreigar.com/",
      "founder": { "@id": "https://fritzreigar.com/#fritz" }
    }
  ]
}
```

↳ Gemelo de § 6.3. Cambian la página (su `@id`, su `url`, su `name` e `inLanguage: "en"`) y los
textos de la persona; los `@id` de la persona y del estudio son los mismos en los dos idiomas,
porque son la misma persona y el mismo estudio. El nombre de ESAT es propio y no se traduce.

---

## Los `alt` de las capturas

Gemelos de [`capturas.md`](capturas.md), por la clave de `src/data/shots.ts`. Las de las bandas van
con `alt=""` igual que en español; las de reserva de `capturas.md` no se usan y no llevan inglés.

| Clave | `alt` |
|---|---|
| `estudio-reigar-desktop` | The estudioreigar.com home page on a computer: a blue hanging sign that reads «Abierto, también en Google» (open, on Google too) and the headline «Tu negocio lleva años abierto. En internet, todavía no» (your business has been open for years; online, not yet). |
| `estudio-reigar-mobile` | The same home page on a phone: the sign at the top, the headline below and the button to ask for the free check-up. |
| `missphone-desktop` | The Missphone online store's home page on a computer: pink phone cases on fabric, the headline «Fundas personalizadas y accesorios para móvil en Benetússer» (custom phone cases and accessories in Benetússer) and the «Diseña tu funda» (design your case) button. |
| `missphone-mobile` | The same home page on a phone: the photo of the cases at the top, with the headline and the two buttons below. |
| `missphone-before-home-desktop` | Before: the Missphone home page header was a single image, with «Fundas personalizadas» (custom cases) and a «Click aquí» (click here) button drawn into it. |
| `missphone-after-home-desktop` | After: the header with the headline «Fundas personalizadas y accesorios para móvil en Benetússer», the «Diseña tu funda» and «Ver los accesorios» (design your case, see the accessories) buttons and the Google rating. |
| `missphone-before-home-mobile` | Before, on a phone: the same header image shrunk, with the text and the button too small to read. |
| `missphone-after-home-mobile` | After, on a phone: the photo of the cases at the top and, below it, the headline, the two buttons and the Google rating, sized for a phone. |
| `missphone-before-categories` | Before: the categories on the home page, with each name set over its photo and sometimes on top of the product. |
| `missphone-after-categories` | After: category cards with the photo on the left and, beside it, the name and the starting price; the phone cases card is twice as wide. |
| `missphone-before-cases-page` | Before: the phone cases page, with four paragraphs of gray text over a photo of cases, impossible to read. |
| `missphone-after-cases-page` | After: the phone cases page opens with a colored header, the headline, two lines of text, the «Hazla con tu foto» (make it with your photo) button and the framed photo. |
| `missphone-before-home-lower` | Before: further down the home page, an accessories block with gray text over a dark photo, almost invisible. |
| `missphone-after-home-lower` | After: in that spot, the «La tienda, en Benetússer» (the shop, in Benetússer) block, with the address, a photo of the shop and buttons to call and get directions. |
| `limpiezas-artemisa-desktop` | The limpiezasartemisa.com home page on a computer: a midnight-blue background, the headline «La limpieza bien hecha se nota al entrar» (good cleaning shows the moment you walk in), the quote and WhatsApp buttons and a photo of a clean living room. |
| `limpiezas-artemisa-mobile` | The same home page on a phone: the headline, the two buttons and the photo below. |
| `snugtone-library` | Snugtone in the dark theme: the album view with its covers, the queue on the right and the player at the bottom. |
| `snugtone-search` | Snugtone in the light theme: the search «format:mp3 duration:>2:30» narrows the library down to 11 tracks. |
| `snugtone-equalizer` | Snugtone's ten-band equalizer, with the preamp and the warning that boosting bands can clip. |
| `snugtone-musicbrainz` | The MusicBrainz tag search: several releases of the Goldberg Variations, sorted by how many tracks match. |
| `snugport-desktop` | The Snugport landing page on a computer: the headline «Cronómetro, tareas, clientes y vencimientos. Todo tu trabajo freelance en una sola página» (timer, tasks, clients and deadlines: all your freelance work on one page) and, below it, the panel with the timer, what's next and the day's tasks. |
| `snugport-mobile` | The same landing page on a phone: the headline, the «Abrir el panel» and «Ver precios» (open the panel, see pricing) buttons and the panel peeking out below. |
| `galaxian` | CPP-Galaxian-Engine running: the enemy formation at the top, the player's ship at the bottom and the scores on a black background. |

↳ Las capturas enseñan las webs en español (la de Snugport es `snugport.app/es/`), así que el
texto que se lee en ellas se cita tal cual y se traduce entre paréntesis. El avatar va en § 1.1.

---

## Para Fritz

**OK de Fritz el 2026-11-06** («por lo que he visto bien», y cuatro vueltas más). Lo que decidí al
traducir, de más a menos importante; el 4 y el 5 quedan para la 2.12 (Desvíos de `fase-2.md`):

1. **«Acepto proyectos» → «Taking on projects».** Alternativa: «Available for projects». Las dos
   evitan «Open to work».
2. **Los enlaces al estudio van a su inglés** (`/en/`, `/en/case-studies/missphone` y
   `/en/case-studies/limpiezas-artemisa`): cambia el `href`, no el texto.
3. **«Al resto de España, a distancia» → «anywhere else in Spain, remotely».** El estudio en
   inglés dice «in Spain or abroad»; aquí no lo he ampliado porque cambiaría lo que dice el
   español. Si quieres «and abroad», cambian los dos.
4. **El DAM**: «Multiplatform Application Development (DAM), Spain's two-year higher vocational
   program in software». `cv-en.html` dice «Higher National Diploma in…», que en inglés se lee como
   título obtenido: lo apunto para la 2.12.
5. **Inglés americano** (como el estudio y Snugtone); `cv-en.html` va en británico
   («Specialisation»). No es contradicción, pero la 2.12 puede igualarlos.
6. **Rótulos de Proyectos**: «My own app» y «My own product» para «App propia» y «Producto propio».
7. **La nota de las capturas de Snugtone** pierde «la interfaz está en inglés».
8. **El asunto del formulario** lleva «(English)» para que sepas en qué idioma contestar.

Repaso de calcos (2026-11-06, a petición de Fritz): «Under maintenance» pasa a «Ongoing
maintenance», porque en inglés se lee como web caída; «al nivel de la portada» deja de ser «up to
the level of» y pasa a «up to the home page's standard»; y fuera los giros literales del tipo «in
the open», «made to measure», «in plain sight», «the shop on the street» o «the free diagnosis»
(el estudio en inglés dice «free check-up»).
Segunda vuelta: las fases de Missphone («a verified backup», «won't let anyone buy them without a
design», «the social sharing image», «a full walkthrough»), «The domains, sorted out», «After
delivery», «the Estudio Reigar website» en Cómo trabajo y el último «shop on the street».
Tercera vuelta: el hero («make a living from it», «which I share publicly»), el estudio («I answer
the messages and I write the websites»), Missphone «relaunched» (ya estaba en marcha), «watch every
new test fail before trusting a pass», «up and running, with orders coming in», «duplicate product
pages, one per phone model», «well reviewed on Google» y la línea de OG de Snugtone, que mezclaba
adjetivos y un verbo.
Cuarta vuelta, contra el significado de `contenido.md`. Tres cambiaban lo que dice el español: «Nada
se da por hecho» es «Nothing is taken for granted», no «Nothing counts as done»; «ninguno enseñando
nada» es «none of them showing anything», no «pointing anywhere»; y la página de iPhone cubre «ocho
averías», no «las ocho más comunes». Vuelven el «igual» de Lo mejor y el «en abierto» de la línea de
OG de la portada; sobra el «to the client» de Cómo trabajo, que el español no dice; «a nombre de la
casa» es «in the business's own name»; y «la temporada» son «seasonal sections», no «campaigns», que
en inglés suena a anuncios. Un matiz que sí se deja: la tarjeta de Missphone dice «relaunched» por
«la lancé», porque la tienda ya funcionaba cuando llegó Fritz.
Quinta y última: el bloque del estudio sin el «write» repetido, «time tracking with rates» en la
tarjeta de Snugport y «store page» (la de WooCommerce) en vez de «shop page», para no mezclarla
con la tienda de la calle.
