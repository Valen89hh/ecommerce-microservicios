# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

src/
│
├── assets/                # Imágenes, íconos, SVGs, logos, etc.
│
├── components/            # Componentes reutilizables (botones, modales, cards...)
│
├── features/              # Módulos funcionales (users, products, orders, etc.)
│   └── users/
│       ├── components/    # Componentes específicos del módulo de usuarios
│       ├── pages/         # Páginas específicas (UserList, UserProfile...)
│       └── services/      # Lógica de datos (llamadas API, mock data...)
│
├── hooks/                 # Custom hooks reutilizables
│
├── layouts/               # Layouts generales (DashboardLayout, AuthLayout)
│
├── lib/                   # Configuraciones (axios, auth, i18n, temas...)
│   ├── api.js             # Configuración de axios o fetch
│   └── auth.js            # Métodos de login/logout/checkAuth
│
├── pages/                 # Páginas generales (Login, Register, Error...)
│
├── providers/             # Context Providers (ThemeProvider, AuthProvider...)
│
├── routes/                # Archivos de rutas con `react-router-dom`
│   └── index.jsx          # Definición y protección de rutas
│
├── store/                 # Estado global (Context, Zustand, Redux...)
│
├── styles/                # Estilos globales (Tailwind, CSS variables...)
│
├── utils/                 # Funciones utilitarias (formato de fechas, validaciones...)
│
├── App.jsx                # Punto de entrada principal
└── main.jsx               # Renderizado raíz con ReactDOM

