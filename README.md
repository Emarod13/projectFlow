### Live Demo

https://project-flow-454hnkcd1-emanuel-rodriguez-s-projects.vercel.app/

***


### ProjectFlow

ProjectFlow es una aplicación web desarrollada como parte de un challenge técnico, cuyo objetivo es facilitar la gestión de proyectos y tareas dentro de un equipo de trabajo.

La aplicación permite administrar proyectos, crear y asignar tareas a distintos usuarios, realizar el seguimiento de su estado y visualizar información relevante mediante un dashboard con estadísticas.

El sistema implementa autenticación, autorización basada en roles y una interfaz moderna desarrollada con Next.js y Tailwind CSS.

* * *

### Tecnologías utilizadas

*   **Next.js 15 (App Router):** Para el desarrollo de la aplicación.
*   **React:** Para la construcción de la interfaz de usuario.
*   **TypeScript:** Para aportar tipado estático y mejorar la mantenibilidad del código.
*   **Supabase:** Como backend, encargado de la autenticación, base de datos PostgreSQL y almacenamiento de la información.
*   **Tailwind CSS:** Para el diseño de la interfaz.
*   **shadcn/ui:** Como biblioteca de componentes reutilizables.
*   **Lucide React:** Para los iconos.
*   **Sonner:** Para mostrar notificaciones al usuario.

* * *

### Arquitectura y decisiones de diseño

Durante el desarrollo intenté mantener una arquitectura simple, modular y fácil de mantener.

El proyecto está organizado separando responsabilidades en distintos módulos:

*   `Components`: Componentes reutilizables de la interfaz.
*   `Services`: Acceso a datos y consultas a Supabase.
*   `Types`: Definición centralizada de los tipos utilizados en toda la aplicación.
*   `Lib`: Utilidades compartidas, autenticación y funciones auxiliares.

Además, aproveché las características del App Router de Next.js utilizando **Server Components** cuando era posible y **Client Components** únicamente en las partes que requerían interacción del usuario.

También se implementó un sistema de autenticación basado en Supabase con protección de rutas y control de acceso según el rol del usuario.

### Roles del sistema

*   **Team Leader**
    *   Puede administrar proyectos.
    *   Puede crear, editar y eliminar tareas.
    *   Puede asignar tareas a otros usuarios.
    *   Puede visualizar todas las tareas del sistema.
*   **Team Member**
    *   Solo puede visualizar las tareas que le fueron asignadas.
    *   Puede actualizar únicamente el estado de sus propias tareas.

Esta separación permite representar un escenario real de trabajo colaborativo.

* * *

### Uso de herramientas de Inteligencia Artificial

Durante el desarrollo utilicé ChatGPT como herramienta de apoyo. Principalmente lo utilicé para:

*   Resolver dudas específicas sobre Next.js y Supabase.
*   Analizar distintas alternativas de diseño antes de implementar una solución.
*   Mejorar la organización del código y la separación de responsabilidades.
*   Detectar posibles mejoras de experiencia de usuario.
*   Revisar errores de TypeScript y del proceso de build previo al deploy.

Intenté utilizar la IA como una herramienta de asistencia y aprendizaje, más en este caso en el que tuve que aprender a utilizar una tecnología nueva para mí, como lo es un BaaS (Supabase).

* * *

### Funcionalidades principales

*   Registro e inicio de sesión.
*   Autenticación mediante Supabase.
*   Protección de rutas.
*   Gestión de proyectos.
*   Gestión de tareas.
*   Asignación de tareas a usuarios.
*   Control de acceso según roles.
*   Dashboard con estadísticas.
*   Filtros para búsqueda de tareas.
*   Notificaciones visuales mediante toasts.

* * *

### Instalación

Sigue estos pasos para ejecutar el proyecto de forma local:

1.  **Clonar el repositorio:**
    
    bash
    
        git clone https://github.com/Emarod13/projectFlow.git
        
    
    Usa el código con precaución.
    
2.  **Ingresar al proyecto:**
    
    bash
    
        cd projectFlow
        
    
    Usa el código con precaución.
    
3.  **Instalar dependencias:**
    
    bash
    
        npm install
        
    
    Usa el código con precaución.
    
4.  **Configurar variables de entorno:**  
    Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
    
    env
    
        NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
        NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        
    
    Usa el código con precaución.
    
5.  **Ejecutar la aplicación:**
    
    bash
    
        npm run dev
        
    
    Usa el código con precaución.
    
6.  **Abrir en el navegador:**  
    http://localhost:3000

* * *

### Posibles mejoras futuras

Due al tiempo disponible para el challenge y al coincidir con semanas de parciales, quedaron algunas ideas que podrían incorporarse en una futura versión:

*   Comentarios dentro de las tareas.
*   Fechas de vencimiento.
*   Adjuntos por tarea.
*   Notificaciones en tiempo real.
*   Dashboard con gráficos.
*   Búsqueda global.
*   Invitación de usuarios mediante correo electrónico.
*   Creación de equipos personalizados.

* * *

### Autor

**Emanuel Rodriguez**  
Estudiante de Ingeniería en Informática de la *Universidad Nacional de La Matanza (UNLaM)*.
