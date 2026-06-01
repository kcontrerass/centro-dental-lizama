# Centro Dental Lizama — Respaldo de Documentación Aumenta

Este repositorio alberga el frontend desarrollado para **Centro Dental Lizama**, implementado sobre un esquema **Headless** bilingüe altamente optimizado. Este archivo contiene la información técnica esencial consolidada de la entrega del proyecto para la agencia **Aumenta**.

---

## 📋 Ficha Técnica del Proyecto

| Campo | Detalle |
| :--- | :--- |
| **Cliente** | Centro Dental Lizama (Dr. Mynor Lizama Lombardi) |
| **Diseño y UI/UX** | **Aumenta** (Diseño exclusivo, responsive y bilingüe) |
| **Fecha de Inicio** | 29 de Enero de 2026 |
| **Mantenimiento** | 30 días de garantía; soporte posterior bajo contrato mensual |
| **Arquitectura** | Headless CMS (Next.js Frontend + WordPress REST API Backend) |
| **Idiomas Soportados** | Español (`espanol`) & Inglés (`ingles`) |

---

## 🛠️ Stack Tecnológico

El frontend utiliza el estado del arte de la optimización y renderizado web:
* **Entorno:** Node.js v20+
* **Framework:** Next.js v16.1.6 (App Router)
* **Librería UI:** React v19.2.3
* **Lenguaje:** TypeScript v5.x
* **Estilos:** Tailwind CSS v4 con PostCSS
* **Iconos:** Lucide React

---

## 📂 Estructura Principal del Repositorio

El código fuente está distribuido modularmente de la siguiente manera:
* `app/`: Contiene la lógica de enrutamiento basada en el App Router de Next.js.
  * `components/`: Componentes organizados por sección (about, appointment, blog, contact, layout, services, testimonials).
  * `globals.css`: Punto de importación de Tailwind CSS v4 y variables CSS personalizadas.
  * `layout.tsx` & `page.tsx`: Layout base global y página de inicio principal.
* `lib/`: Contiene la lógica del cliente HTTP de conexión con WordPress en `wordpress.ts`.
* `public/`: Assets estáticos y logos institucionales del centro odontológico.

---

## 🔗 Endpoints del Sistema (API REST de WordPress)

El sitio web recopila contenido dinámico del backend hospedado en `https://centrodentallizamabackend.aumenta.do`:

### Consultas de Contenido (GET)
* **Menú Navegación:** `GET /wp-json/gutenberg-api/v1/pages/{language}/menu`
* **Pie de Página:** `GET /wp-json/gutenberg-api/v1/pages/{language}/footer`
* **Página de Inicio:** `GET /wp-json/gutenberg-api/v1/pages/{language}/inicio`
* **Quiénes Somos:** `GET /wp-json/gutenberg-api/v1/pages/{language}/quienes-somos`
* **Servicios (Catálogo):** `GET /wp-json/gutenberg-api/v1/pages/{language}/servicios`
* **Detalle del Servicio:** `GET /wp-json/gutenberg-api/v1/pages/{language}/servicios/{slug}`
* **Blog (Listado):** `GET /wp-json/gutenberg-api/v1/pages/{language}/blog`
* **Post del Blog:** `GET /wp-json/gutenberg-api/v1/posts/{slug}`
* **Ubicación:** `GET /wp-json/gutenberg-api/v1/pages/{language}/ubicacion`
* **Testimoniales:** `GET /wp-json/gutenberg-api/v1/pages/{language}/testimoniales`

### Envíos de Formularios (POST - Contact Form 7)
* **Formulario de Citas:** `POST /wp-json/contact-form-7/v1/contact-forms/340/feedback`
  * *Campos:* `your-name`, `your-phone`, `dentist`, `service`, `appointment-date`, `appointment-time`, `_wpcf7_unit_tag`
* **Formulario de Contacto:** `POST /wp-json/contact-form-7/v1/contact-forms/341/feedback`
  * *Campos:* `your-name`, `your-email`, `product-type`, `your-phone`, `_wpcf7_unit_tag`

---

## 🔒 Credenciales y Accesos en Producción

> [!IMPORTANT]
> **No subir contraseñas en claro al repositorio.** Las credenciales reales deben administrarse mediante gestores de secretos (como Vercel Environment Variables o AWS Secrets Manager).

### Marcadores de Conexión de Base de Datos (WordPress Backend)
* **Motor:** MySQL / MariaDB (Alojado en el servidor Aumenta)
* **Host:** `localhost` o IP asignada
* **Puerto:** `3306`
* **Base de Datos:** `lizama_db_prod`
* **Usuario de BD:** `user_db`
* **Contraseña de BD:** `password_db`

---

## 🚀 Despliegue Rápido (Deploy)

### Local y Desarrollo:
1. Instale dependencias: `npm install`
2. Corra el servidor local: `npm run dev`
3. Abra el navegador en: `http://localhost:3000`

### Producción:
1. Compile de forma optimizada el proyecto:
   ```bash
   npm run build
   ```
2. Ejecute el servidor optimizado en producción:
   ```bash
   npm run start
   ```
3. Alternativamente, para integraciones automáticas, conecte este repositorio en el panel de **Vercel** para activar compilaciones e integraciones continuas (CI/CD) tras cada commit a la rama principal.

---

## 📁 Archivos Relacionados

Para un desglose detallado e interactivo del proyecto, verifique los siguientes archivos locales creados en la raíz:
* [Manual Técnico Completo](file:///Users/kevin/Desktop/centrodental-lizama/MANUAL_TECNICO.md): Explicación exhaustiva del código, endpoints y base de datos para desarrolladores.
* [Manual de Usuario - Plantilla](file:///Users/kevin/Desktop/centrodental-lizama/MANUAL_USUARIO.md): Guía de uso no técnica para que el equipo de la clínica aprenda a editar bloques Gutenberg, añadir posts y revisar formularios.
