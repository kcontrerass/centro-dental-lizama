# Manual de Usuario: Sitio Web Centro Dental Lizama (Plantilla)

¡Bienvenido al manual oficial de administración de tu nuevo sitio web! Este documento ha sido elaborado especialmente para el equipo de administración y gestión clínica de **Centro Dental Lizama**. Su lenguaje es sencillo y libre de tecnicismos para que cualquier miembro del equipo pueda realizar cambios rápidamente.

---

## 1. Introducción: ¿Qué es este sistema y para qué sirve?

El nuevo sitio web de **Centro Dental Lizama** está diseñado bajo un modelo bilingüe moderno de última generación. Consta de dos partes que trabajan en sintonía:
1. **El Sitio Público (Frontend):** La página web de alta velocidad que ven tus pacientes, donde pueden leer sobre tu equipo, conocer tus servicios, revisar testimoniales y enviar solicitudes de cita.
2. **El Panel de Control (CMS WordPress Headless):** Un sistema administrador privado donde el personal autorizado de la clínica puede agregar artículos de blog, actualizar descripciones de servicios, horarios de atención, teléfonos de contacto e incluso cambiar fotos sin necesidad de saber programación.

---

## 2. Requisitos de Acceso e Inicios de Sesión

Para gestionar la información que aparece en la página pública, debes ingresar al panel administrativo privado.

* **Dirección URL del Administrador (WordPress):** `https://centrodentallizamabackend.aumenta.do/wp-admin/`
* **Navegador Recomendado:** Google Chrome, Safari o Microsoft Edge en su versión más actualizada.

### Tipos de Roles de Usuario
El sistema cuenta con roles predefinidos según el nivel de responsabilidad del personal:
* **Administrador (Admin):** Acceso total a todas las configuraciones, plantillas del sitio, contraseñas de correos electrónicos y formularios.
* **Editor / Gestor de Contenido:** Perfil ideal para el personal de recepción o marketing. Permite crear artículos de blog, modificar textos e imágenes en las páginas informativas, pero sin alterar la estructura técnica o código del sitio.

---

## 3. Guía de Uso de Módulos Principales

### 3.1. Cómo Iniciar Sesión en el Administrador
1. Abre tu navegador de internet.
2. Escribe la dirección: `https://centrodentallizamabackend.aumenta.do/wp-admin/`
3. Ingresa tu **Nombre de usuario** y tu **Contraseña**.
4. Haz clic en el botón **Acceder**.

---

### 3.2. Cómo Editar los Contenidos de una Página (Gutenberg Blocks)
El sitio web está estructurado por bloques dinámicos diseñados por **Aumenta**. Para modificar textos como el horario de atención, teléfonos o servicios:
1. En el panel izquierdo de WordPress, haz clic en **Páginas** (`Pages`).
2. Verás una lista de todas las páginas del sitio (Inicio, Quiénes Somos, Ubicación, etc.) en sus versiones en español e inglés.
3. Busca la página que deseas modificar (ej. `inicio` en español) y haz clic en **Editar**.
4. En el editor visual de bloques, haz clic directamente sobre el texto o la imagen que deseas reemplazar:
   * **Cambiar un Texto:** Haz clic sobre el párrafo, borra el texto anterior y escribe el nuevo.
   * **Cambiar una Imagen:** Haz clic sobre la foto que deseas modificar, presiona el botón **Reemplazar** (`Replace`) y selecciona una nueva imagen desde tu computadora o biblioteca de medios.
5. Al finalizar tus cambios, es **obligatorio** presionar el botón **Actualizar** (`Update`) en la esquina superior derecha para que los cambios se visualicen inmediatamente en la página web pública.

---

### 3.3. Cómo Crear un Nuevo Artículo de Blog
El blog es excelente para atraer pacientes mediante consejos de salud bucal. Sigue estos pasos para subir un nuevo post:
1. En el menú de la izquierda de WordPress, selecciona **Entradas** (`Posts`) y luego haz clic en **Añadir nueva** (`Add New`).
2. Escribe el **Título** de tu artículo.
3. En la sección de abajo, escribe o pega el contenido de tu post. Puedes separar tus ideas en párrafos o agregar imágenes usando el botón `+`.
4. En la barra de configuración lateral derecha:
   * **Imagen Destacada (`Featured Image`):** Sube la fotografía principal que aparecerá como portada del artículo en el blog.
   * **Extracto (`Excerpt`):** Escribe una pequeña frase que resuma el artículo para el listado del blog.
5. Haz clic en **Publicar** (`Publish`) y el artículo aparecerá automáticamente en el listado del blog público tanto en móvil como en escritorio.

---

### 3.4. Cómo Recibir y Administrar las Citas Reservadas
Cuando un paciente llena el formulario de "Reserva tu Cita" en la página pública:
1. El sistema procesa los datos ingresados (Nombre, Teléfono, Dentista, Servicio, Fecha y Hora).
2. De forma automatizada, se envía un correo electrónico de notificación a la cuenta administrativa configurada de la clínica (ej. `info@centrodental.com` o la recepción de la clínica).
3. **Botón de WhatsApp Directo:** Si el paciente necesita asistencia inmediata, el botón flotante en la esquina inferior derecha del sitio los conectará de forma directa al canal de WhatsApp de la clínica (+502 4151-5161) para coordinar en tiempo real.

---

## 4. Preguntas Frecuentes (FAQ) / Resolución de Problemas

### ¿Qué hago si olvidé mi contraseña de acceso al panel de WordPress?
1. En la página de inicio de sesión (`https://centrodentallizamabackend.aumenta.do/wp-admin/`), haz clic debajo de los campos de texto en el enlace: **¿Has perdido tu contraseña?**
2. Introduce tu dirección de correo electrónico institucional o tu nombre de usuario.
3. Presiona **Obtener una contraseña nueva**.
4. Recibirás un enlace seguro en tu buzón de correo para restablecer tu contraseña.

### Realicé un cambio en WordPress pero no se ve reflejado en el sitio público, ¿qué pasa?
1. **Memoria Caché del Navegador:** Los navegadores a veces guardan copias viejas de las páginas para cargar más rápido. Presiona las teclas `Ctrl + F5` en Windows, o `Cmd + Shift + R` en Mac para forzar la actualización de la página.
2. **Botón Actualizar:** Asegúrate de haber hecho clic en el botón azul **Actualizar** en WordPress al realizar el cambio.
3. **Versión de Idioma:** Recuerda que si modificas la página en "Español", debes hacer lo mismo en su equivalente en "Inglés" si deseas que el cambio aparezca en ambos idiomas.

### El formulario de reservas muestra un error al enviar, ¿qué debo hacer?
1. Verifica que el dispositivo desde donde estás navegando tenga conexión a Internet activa.
2. Si el error persiste en varios dispositivos, es posible que el servidor de correos del backend tenga un problema temporal de credenciales. Reporta este caso directamente a tu ejecutivo de soporte en la agencia **Aumenta** para realizar un reinicio del servicio de correos del backend.
