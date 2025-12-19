🇨🇱 Visor Legislativo - Frontend
Este es el cliente web para el Scraper de la Cámara de Diputadas y Diputados de Chile. Es una aplicación moderna y responsiva construida con React y Vite que permite visualizar de manera gráfica y ordenada la actividad legislativa de los parlamentarios.
<img width="1893" height="779" alt="image" src="https://github.com/user-attachments/assets/d84dc398-a02d-482b-a4b9-6b603d65da8d" />

🚀 Características
Análisis en Tiempo Real: Se conecta a la API Python para extraer datos en vivo.

Visualización de Datos:

📊 Gráfico de Barras: Cantidad de proyectos por estado (Publicados, Archivados, etc.).

🍩 Gráfico de Dona: Distribución porcentual de la efectividad.

Diseño Moderno: Interfaz limpia construida con Tailwind CSS.

Tabla Detallada: Listado completo de mociones con etiquetas de estado codificadas por colores.

Feedback de Usuario: Indicadores de carga (spinners) y manejo de errores.

🛠️ Tech Stack
Core: React + Vite

Estilos: Tailwind CSS

Gráficos: Chart.js + React-Chartjs-2

Iconos: Lucide React

Http Client: Fetch API nativa.

📋 Requisitos Previos
Node.js (versión 16 o superior).

NPM o Yarn.


📂 Estructura del Proyecto
Plaintext

src/
├── components/      # (Opcional) Componentes reutilizables
├── App.jsx          # Lógica principal y Vista del Dashboard
├── index.css        # Configuración de Tailwind y estilos globales
├── main.jsx         # Punto de entrada de React
└── ...
🔗 Integración con Backend
Este frontend espera recibir una respuesta JSON del backend con la siguiente estructura:

JSON

{
  "status": "success",
  "diputado_info": { "periodos": "..." },
  "total": 150,
  "data": [
    {
      "año": "2024",
      "boletin": "1234-56",
      "titulo": "Ley de Ejemplo",
      "estado": "En tramitación"
    }
  ]
}
📄 Licencia
Este proyecto está bajo la licencia MIT. Siéntete libre de contribuir o modificarlo.
