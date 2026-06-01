# Manual Técnico: Centro Dental Lizama

Este documento técnico detalla la arquitectura, el stack tecnológico, los endpoints de la API, la estructura del proyecto y los pasos para el despliegue del sitio web de **Centro Dental Lizama**.

---

## 1. Información General

* **Cliente:** Centro Dental Lizama (Representante: Dr. Mynor Lizama Lombardi)
* **Fecha de Inicio del Proyecto:** 29 de enero de 2026
* **Diseño:** Diseñado y desarrollado a la medida por la agencia **Aumenta**. El diseño presenta un sistema visual moderno, responsive, enfocado en el área médica, con una paleta de colores limpia basada en verde azulado/turquesa (`#70bfa8` / `#4EB99F`) y gris oscuro (`#4a5568`), y un selector de idioma persistente (Español/Inglés) mediante cookies.
* **Mantenimiento y Soporte:**
  * **Periodo de Garantía:** 30 días calendario tras la entrega final para corrección de fallas críticas de software directamente relacionadas con el desarrollo inicial.
  * **Contrato de Soporte:** El mantenimiento continuo del servidor de Next.js, hosting, y la administración de actualizaciones/parches de seguridad del WordPress Backend se gestionan bajo un acuerdo de mantenimiento mensual independiente con la agencia **Aumenta**.

---

## 2. Stack Tecnológico e Información Técnica

El proyecto sigue una arquitectura **desacoplada (Headless CMS)**. El frontend se encarga de renderizar la interfaz de usuario de forma ultra rápida consumiendo datos de una instancia de **WordPress** mediante servicios REST API personalizados.

### Stack Tecnológico:
* **Entorno de Ejecución:** Node.js (versión recomendada 20.x o superior)
* **Framework Frontend:** Next.js v16.1.6 (utilizando App Router y Server Components)
* **Librería de UI:** React v19.2.3
* **Lenguaje:** TypeScript v5.x
* **Framework CSS:** Tailwind CSS v4 con PostCSS
* **Librería de Iconos:** Lucide React v0.563.0

### Arquitectura de Datos:
* El frontend consume servicios asíncronos en el servidor (`Next.js Server Components`) para inyectar los contenidos estructurados en bloques Gutenberg creados en WordPress.
* Cuenta con soporte bilingüe dinámico (`espanol` / `ingles`) mediante parámetros de búsqueda en la URL (`?lang=en`) persistidos a través de cookies de sesión (`lang=en`).
* El backend cuenta con un plugin a la medida que traduce las estructuras nativas de Gutenberg a arreglos JSON comprensibles por el frontend (`gutenberg_structure`), permitiendo total dinamismo en el diseño desde el administrador de contenidos.

---

## 3. Estructura de Carpetas

A continuación se muestra el árbol de directorios principal y la descripción de cada carpeta clave:

```text
centrodental-lizama/
├── app/                       # Directorio principal del App Router de Next.js
│   ├── agendar-servicio/      # Página de reserva de citas
│   ├── blog/                  # Listado de artículos de blog y posts dinámicos
│   │   ├── [slug]/            # Ruta dinámica para ver un post específico
│   │   └── page.tsx           # Página principal del blog
│   ├── components/            # Componentes reutilizables agrupados por módulo
│   │   ├── about/             # Componentes de "Quiénes Somos"
│   │   ├── appointment/       # Formulario y héroe de Reservas de citas
│   │   ├── blog/              # Tarjetas y cuerpo de posts
│   │   ├── contact/           # Formulario de contacto y mapa
│   │   ├── home/              # Secciones de la página de inicio (Hero, Specialties, Team)
│   │   ├── layout/            # Cabeceras, pies de página y botón flotante de WhatsApp
│   │   ├── location/          # Elementos de ubicación
│   │   ├── services/          # Secciones del catálogo de servicios
│   │   └── testimonials/      # Secciones de comentarios de pacientes
│   ├── contacto/              # Página del formulario de contacto
│   ├── quienes-somos/         # Página de la clínica y equipo médico
│   ├── servicios/             # Catálogo de servicios y páginas dinámicas
│   │   ├── [slug]/            # Ruta dinámica para la descripción detallada de un servicio
│   │   └── page.tsx           # Página principal de servicios
│   ├── testimoniales/         # Página de opiniones de pacientes
│   ├── ubicacion/             # Página con mapa interactivo y datos de dirección
│   ├── favicon.ico            # Favicon del sitio
│   ├── globals.css            # Hoja de estilos global y configuración de Tailwind CSS v4
│   ├── layout.tsx             # Diseño principal de la aplicación con inyección de WhatsApp
│   ├── not-found.tsx          # Página de error 404 personalizada
│   └── page.tsx               # Página de inicio principal (Home)
├── lib/                       # Utilidades de backend y conexión con APIs
│   └── wordpress.ts           # Cliente REST para la API de WordPress (Gutenberg API)
├── public/                    # Archivos estáticos públicos (imágenes, logos, etc.)
├── package.json               # Configuración de dependencias, scripts de ejecución y metadatos
├── tsconfig.json              # Configuración de TypeScript
├── next.config.ts             # Configuración del framework Next.js
└── eslint.config.mjs          # Reglas del Linter de código
```

---

## 4. Endpoints y Documentación de API

El frontend se comunica con el servidor de WordPress alojado en `https://centrodentallizamabackend.aumenta.do` mediante la API REST de Gutenberg y los controladores de Contact Form 7.

### 4.1. API de Contenidos (WordPress Gutenberg API)
Todos los endpoints de lectura son de tipo **GET** y no requieren autenticación:

1. **Obtener Menú (Header):**
   * **URL:** `GET https://centrodentallizamabackend.aumenta.do/wp-json/gutenberg-api/v1/pages/{language}/menu`
   * **Parámetros:** `{language}` puede ser `espanol` o `ingles`.
2. **Obtener Pie de Página (Footer):**
   * **URL:** `GET https://centrodentallizamabackend.aumenta.do/wp-json/gutenberg-api/v1/pages/{language}/footer`
3. **Página de Inicio:**
   * **URL:** `GET https://centrodentallizamabackend.aumenta.do/wp-json/gutenberg-api/v1/pages/{language}/inicio`
4. **Página Quiénes Somos:**
   * **URL:** `GET https://centrodentallizamabackend.aumenta.do/wp-json/gutenberg-api/v1/pages/{language}/quienes-somos`
5. **Catálogo de Servicios:**
   * **URL:** `GET https://centrodentallizamabackend.aumenta.do/wp-json/gutenberg-api/v1/pages/{language}/servicios`
6. **Detalle de un Servicio:**
   * **URL:** `GET https://centrodentallizamabackend.aumenta.do/wp-json/gutenberg-api/v1/pages/{language}/servicios/{slug}`
   * **Parámetros:** `{slug}` representa la URL del servicio (p. ej., `carilla-dental`, `ortodoncia`).
7. **Página de Citas (Agendar):**
   * **URL:** `GET https://centrodentallizamabackend.aumenta.do/wp-json/gutenberg-api/v1/pages/{language}/agendar-cita`
8. **Página de Testimoniales:**
   * **URL:** `GET https://centrodentallizamabackend.aumenta.do/wp-json/gutenberg-api/v1/pages/{language}/testimoniales`
9. **Página de Contacto:**
   * **URL:** `GET https://centrodentallizamabackend.aumenta.do/wp-json/gutenberg-api/v1/pages/{language}/contacto`
10. **Página de Ubicación:**
    * **URL:** `GET https://centrodentallizamabackend.aumenta.do/wp-json/gutenberg-api/v1/pages/{language}/ubicacion`
11. **Página del Blog:**
    * **URL:** `GET https://centrodentallizamabackend.aumenta.do/wp-json/gutenberg-api/v1/pages/{language}/blog`
12. **Detalle de un Artículo de Blog:**
    * **URL:** `GET https://centrodentallizamabackend.aumenta.do/wp-json/gutenberg-api/v1/posts/{slug}`

### 4.2. API de Envíos de Formulario (POST)
Estos endpoints procesan los datos e inician el envío de correos electrónicos a la administración médica:

1. **Formulario de Reserva de Citas:**
   * **URL:** `POST https://centrodentallizamabackend.aumenta.do/wp-json/contact-form-7/v1/contact-forms/340/feedback`
   * **Headers:** `Content-Type: multipart/form-data`
   * **Parámetros Requeridos:**
     * `your-name`: Nombre completo del paciente.
     * `your-phone`: Teléfono de contacto (solo dígitos y símbolo `+`).
     * `dentist`: Nombre del odontólogo asignado (p. ej., `Dr. Mynor Lizama Lombardi`).
     * `service`: Servicio dental (p. ej., `Diseño de Sonrisa`, `Ortodoncia`, etc.).
     * `appointment-date`: Fecha en formato YYYY-MM-DD.
     * `appointment-time`: Hora (p. ej., `08:00 AM`, `02:00 PM`).
     * `_wpcf7_unit_tag`: Identificador único (`wpcf7-f340-p1-v1`).
   * **Ejemplo de Respuesta Exitosa:**
     ```json
     {
       "status": "mail_sent",
       "message": "¡Cita reservada con éxito!"
     }
     ```

2. **Formulario de Contacto General:**
   * **URL:** `POST https://centrodentallizamabackend.aumenta.do/wp-json/contact-form-7/v1/contact-forms/341/feedback`
   * **Headers:** `Content-Type: multipart/form-data`
   * **Parámetros Requeridos:**
     * `your-name`: Nombre del usuario.
     * `your-email`: Correo electrónico del usuario.
     * `product-type`: Servicio de interés (p. ej., `Alineadores`).
     * `your-phone`: Teléfono del usuario.
     * `_wpcf7_unit_tag`: Identificador único (`wpcf7-f341-p1-v1`).
   * **Ejemplo de Respuesta Exitosa:**
     ```json
     {
       "status": "mail_sent",
       "message": "Mensaje enviado con éxito."
     }
     ```

---

## 5. Credenciales y Accesos de Producción

> [!WARNING]
> Siguiendo los lineamientos de seguridad, no se guardan contraseñas directamente en el repositorio ni en archivos de configuración. Utilice este espacio como guía para la provisión de las variables en su gestor de secretos de producción (como Vercel Secrets o AWS Parameter Store).

### 5.1. Proveedor de Hosting del Frontend
* **Proveedor:** Vercel (Recomendado) o VPS Node.js en Aumenta Dominicana.
* **URL del Panel:** `https://vercel.com/` o panel asignado.

### 5.2. Backend & CMS (WordPress)
* **Proveedor de WordPress:** Aumenta Dominican Republic Hosting.
* **URL de Administración:** `https://centrodentallizamabackend.aumenta.do/wp-admin/`
* **Marcador de Posición para el Secret Manager:**
  * **Usuario Admin:** `admin_wp`
  * **Contraseña Admin:** `[SOLICITAR_A_ADMINISTRADOR]`

### 5.3. Base de Datos en Producción (WordPress Backend)
La base de datos MySQL/MariaDB que almacena las páginas, configuraciones del Contact Form 7 y entradas de blog.
* **Motor:** MariaDB / MySQL
* **Host:** `localhost` o IP del servidor de Aumenta Backend
* **Puerto:** `3306`
* **Nombre de la Base de Datos:** `lizama_db_prod`
* **Usuario de BD:** `user_db`
* **Contraseña de BD:** `password_db` (Gestionado mediante el panel cPanel/Plesk de Aumenta)

---

## 6. Pasos para el Despliegue (Deploy)

Para desplegar y poner en producción este frontend Next.js siga el paso a paso detallado a continuación:

### Paso 1: Clonar y Descargar Dependencias
Acceda al servidor o entorno donde ejecutará la compilación e instale los módulos de Node:
```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO_GITHUB>
cd centrodental-lizama

# Instalar dependencias limpias de producción
npm ci
```

### Paso 2: Configuración de Variables de Entorno (Opcional)
Actualmente, el backend de WordPress y el contacto se consumen directamente desde los servicios REST en producción definidos en `lib/wordpress.ts`. Sin embargo, si necesita dinamizar estos enlaces en el futuro, puede agregar variables como:
```env
NEXT_PUBLIC_API_URL=https://centrodentallizamabackend.aumenta.do/wp-json/gutenberg-api/v1
```

### Paso 3: Proceso de Compilación (Build)
Next.js utiliza optimización en el servidor y compilación de rutas estáticas. Ejecute el compilador nativo:
```bash
npm run build
```
Este comando generará el directorio optimizado `.next/` listo para producción, validando todos los tipos de TypeScript.

### Paso 4: Inicialización del Servidor en Producción
Una vez compilado correctamente, ejecute el servidor en modo de escucha de producción:
```bash
npm run start
```
Por defecto escuchará en el puerto `3000`. Si utiliza un gestor de procesos en un servidor Linux (VPS), se recomienda usar **PM2**:
```bash
pm2 start npm --name "centrodental-lizama" -- run start
```

### Paso 5: Despliegue Continuo (Recomendado Vercel)
Al estar desarrollado sobre Next.js, la integración con **Vercel** es directa:
1. Conecte su cuenta de GitHub a Vercel.
2. Seleccione el repositorio `centrodental-lizama`.
3. Vercel detectará la configuración del framework de forma automática.
4. Haga clic en **Deploy**. Cada cambio en la rama `main` compilará y actualizará el sitio automáticamente.
