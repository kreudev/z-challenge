# 📱 Zara Challenge - Tienda de Móviles

## 📌 Descripción
Este proyecto es una tienda de móviles desarrollada con **Next.js**, utilizando **React.js** para la UI y gestionando estado con un **contexto global**. La aplicación permite a los usuarios buscar productos, visualizar detalles y agregar productos al carrito.

Cuenta con **pruebas unitarias e integración** utilizando **Jest y React Testing Library**, además de herramientas de linting y formateo del código para mantener la calidad del código.

---

## 🚀 Instalación y Configuración

### Clonar el repositorio
```sh
 git clone https://github.com/kreudev/z-challenge
 cd z-challenge
```

### Instalar dependencias
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:
```sh
 npm install
```

### Variables de entorno
Crea un archivo `.env` en la raíz del proyecto y añade las variables necesarias:
```env
NEXT_PUBLIC_API_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
API_KEY=87909682e6cd74208f41a6ef39fe4191
```

### Ejecutar la aplicación en modo desarrollo
```sh
 npm run dev
```
La aplicación se ejecutará en `http://localhost:3000`

---

## 📂 Estructura del Proyecto

La estructura del proyecto sigue una organización modular:

```
├── __mocks__/       # Mocks para Jest
├── components/      # Componentes reutilizables
│   ├── __test__/    # Pruebas unitarias de los componentes
│   ├── Button.jsx
│   ├── CartItem.jsx
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── PhoneCard.jsx
│   ├── SearchBar.jsx
│   ├── SimilarProducts.jsx
│   ├── Specifications.jsx
├── context/         # Context API para gestión de estado
│   ├── CartContext.js
├── hooks/           # Hooks personalizados
│   ├── useDebounce.js 
├── pages/           # Páginas de la aplicación
│   ├── __test__/    # Pruebas unitarias de las páginas
│   ├── index.js     # Página principal
│   ├── cart.js      # Carrito de compras
│   ├── phone/       # Detalles del producto
│       ├── [id].js
├── public/          # Archivos estáticos como imágenes y logos
├── services/        # API calls
│   ├── api.js
├── styles/          # Archivos de estilos (CSS Modules y Globales)
│   ├── Button.module.css
│   ├── Cart.module.css
│   ├── ProductDetail.module.css
│   ├── PhoneCard.module.css
│   ├── SearchBar.module.css
│   ├── SimilarProducts.module.css
│   ├── Specifications.module.css
│   ├── globals.css 
│   ├── loader.css
├── .babelrc         # Configuración de Babel
├── .eslintrc.json   # Configuración de ESLint
├── jest.config.js   # Configuración de Jest
├── jest.setup.js    # Setup para Jest
├── next.config.js   # Configuración de Next.js
├── package.json     # Dependencias y scripts del proyecto
├── README.md        # Documentación
```

---

## 📌 Archivos Clave, Configuración y Funcionalidades Principales

### 📜 `next.config.mjs`
Este archivo contiene la configuración de Next.js:
- **Variables de entorno** (`NEXT_PUBLIC_API_URL`, `API_KEY`).
- **Optimización de compilación** (compresión solo en producción).
- **Minificación de código con SWC**.
- **Configuración de Webpack** para mostrar logs dependiendo del entorno.

###  SSR (Server-Side Rendering) para llamadas a la API
- Se usa getServerSideProps en las páginas para obtener datos del servidor en cada request.

###  Búsqueda en tiempo real con debounce
- Se usa el hook `useDebounce.js` para evitar múltiples llamadas a la API mientras el usuario escribe.

###  Gestión de carrito con Context API
- Se usa CartContext.js para manejar el estado global del carrito.
- Métodos: addToCart(), removeFromCart().

---

## ⚙️ Configuración de Desarrollo

### Linter y Formateo
Se ha configurado **ESLint** y **Prettier** para mantener un código limpio y legible.

- Comando para formatear el código:
  ```sh
  npm run format
  ```

---

## 🧪 Testing
Este proyecto cuenta con pruebas unitarias e integración usando **Jest y React Testing Library**.

### Correr todos los tests
```sh
 npm run test
```

### Estructura de pruebas
- **Pruebas unitarias** en `components/__test__/` para componentes individuales.
- **Pruebas de integración** en `pages/__test__/` para probar flujos completos en las páginas principales como Index, Cart y ProductDetail.
- **Mocks** en `__mocks__/` para simular dependencias externas.