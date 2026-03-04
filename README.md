# Comunidad Artista - Mensajería de Músicos

**Comunidad Artista** es una aplicación de mensajería inspirada en WhatsApp, desarrollada con **React**. Permite a los usuarios interactuar con músicos a través de una interfaz moderna, accesible y dinámica.

## Tecnologías y Librerías Utilizadas
**React.js:** Biblioteca principal empleada para el desarrollo de la interfaz, basada en componentes funcionales y reutilizables.

**React Router DOM:** Herramienta utilizada para gestionar el sistema de rutas y los parámetros dinámicos que permiten navegar entre los distintos chats.

**React Context API:** Implementada para centralizar el estado global de la aplicación, incluyendo contactos, mensajes y datos de sesión del usuario.

**CSS3 Moderno:** Aplicación de diseño responsive mediante el uso de variables CSS, Flexbox y Grid para garantizar adaptabilidad en distintos dispositivos.

## Dificultades Encontradas
**Sincronización de mensajes:** El principal reto fue generar respuestas automáticas de los “cracks” de forma aleatoria sin afectar la coherencia ni el historial individual de cada conversación.

**Persistencia de datos:** Se trabajó en la correcta propagación del nombre del usuario desde el login hacia todos los contextos, asegurando mensajes personalizados en cada chat.

**Navegación dinámica:** Fue necesario configurar adecuadamente los parámetros dinámicos (:PhoneNumber) para que el componente ChatWindow renderizara la información correspondiente al atleta seleccionado.

## Requerimientos del Trabajo Práctico Cumplidos
**React y Componentes:** Desarrollo estructurado a partir de componentes funcionales reutilizables.

**Estados y Contextos:** Implementación de useState, useEffect y useContext para mantener una lógica organizada, centralizada y alineada con el principio DRY.

**Enrutamiento:** Configuración de rutas protegidas mediante un sistema de autenticación simulado.

**Formularios:** Creación de un formulario de login con validación y un campo de envío de mensajes en tiempo real.

**Accesibilidad:** Uso de una paleta de alto contraste y diseño adaptable a múltiples resoluciones.

**Parámetros de URL:** Empleo de useParams para identificar de manera única cada conversación.

## Principios de Diseño Aplicados
**KISS** (Keep It Simple, Stupid): Se priorizó una interfaz clara, simple e intuitiva para facilitar la experiencia del usuario.

**DRY** (Don't Repeat Yourself): Centralización de la lógica y estilos para evitar redundancias y mejorar la mantenibilidad del código.

**Accesibilidad:** Selección de fondos claros y tipografías oscuras que favorecen la legibilidad y la experiencia inclusiva.
