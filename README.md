🇨🇱 Visor Legislativo - Frontend
Este es el cliente web para el Scraper de la Cámara de Diputadas y Diputados de Chile. Es una aplicación moderna y responsiva construida con React y Vite que permite visualizar de manera gráfica y ordenada la actividad legislativa de los parlamentarios.

(Te recomiendo reemplazar esta imagen con una captura real de tu proyecto)

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

Tener el Backend corriendo (ya sea localmente o en Render).

💻 Instalación y Uso Local
Clona el repositorio:

Bash

git clone https://github.com/tu-usuario/visor-diputados.git
cd visor-diputados
Instala las dependencias:

Bash

npm install
Configura las Variables de Entorno: Crea un archivo .env en la raíz del proyecto y define la URL de tu API backend.

Si tu backend está local:

Fragmento de código

VITE_API_URL=http://127.0.0.1:8000
Si tu backend está en Render:

Fragmento de código

VITE_API_URL=https://tu-backend-api.onrender.com
Ejecuta el servidor de desarrollo:

Bash

npm run dev
Abre tu navegador en http://localhost:5173.

☁️ Despliegue en Vercel
Esta aplicación está optimizada para ser desplegada en Vercel.

Sube tu código a GitHub.

Importa el proyecto en Vercel Dashboard.

En la configuración del despliegue, ve a Environment Variables.

Agrega la variable clave:

Key: VITE_API_URL

Value: https://tu-backend-api.onrender.com (Tu URL de Render sin la barra final).

Haz clic en Deploy.

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
