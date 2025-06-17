This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Estructura del proyecto
src/
├── app/                                 # Rutas
│   ├── layout.tsx
│   ├── page.tsx                         # Home: muestra productos
│   ├── cart/                            # Carrito
│   │   └── page.tsx
│   ├── checkout/                        # Checkout
│   │   └── page.tsx
│   ├── product/[id]/                    # Detalle de producto
│   │   └── page.tsx
│   ├── dashboard/                       # Panel de administración
│   │   ├── layout.tsx
│   │   └── products/                    # Gestión de productos
│   │       └── page.tsx
│   └── login/                           # Autenticación
│       └── page.tsx
│
├── features/                            # Módulos organizados por funcionalidad
│   ├── auth/                            # Login, registro, recuperación
│   │   ├── components/
│   │   ├── actions.ts
│   │   └── schema.ts
│
│   ├── products/                        # Catálogo y gestión de productos
│   │   ├── components/
│   │   │   ├── public/                  # Listado, cards, etc.
│   │   │   └── admin/                   # Formulario, tabla, filtros
│   │   ├── actions/
│   │   │   ├── getPublicProducts.ts
│   │   │   └── getAdminProducts.ts
│   │   ├── schema.ts
│   │   └── types.ts
│
│   ├── cart/                            # Carrito de compras
│   │   ├── hooks.ts
│   │   ├── actions.ts
│   │   └── components/
│   │       └── CartItem.tsx
│
│   ├── checkout/                        # Proceso de compra
│   │   ├── actions.ts
│   │   └── components/
│   │       └── CheckoutForm.tsx
│
│   ├── orders/                          # Órdenes de compra
│   │   ├── actions.ts
│   │   └── components/
│
│   └── categories/                      # Categorías de productos
│       ├── actions.ts
│       └── components/
│
├── components/                          # Componentes globales
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   └── Input.tsx
│
├── hooks/                               # Hooks globales
│   ├── useMediaQuery.ts
│   └── useOutsideClick.ts
│
├── lib/                                 # Utilidades y helpers
│   ├── supabaseClient.ts                # Cliente de Supabase
│   ├── formatter.ts                     # Formatear precios, fechas, etc.
│   └── constants.ts                     # Constantes como roles, estados, etc.
│
├── actions/                             # Server actions globales
│   └── sendEmail.ts
│
├── schemas/                             # Validaciones globales (Zod, Yup)
│   └── userSchema.ts
│
├── styles/                              # Estilos globales
│   └── globals.css
│
└── types/                               # Tipos globales de la app
    └── index.ts

