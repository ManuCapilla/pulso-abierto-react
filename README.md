# Pulso Abierto

Aplicación web desarrollada para consultar los precios de Bitcoin, Ethereum y Solana. Permite buscar criptomonedas, filtrar por tendencia, consultar detalles y administrar favoritos.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- Zustand
- React Router
- Zod
- Vitest
- Testing Library
- Git y GitHub

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

## Ejecutar pruebas

```bash
npm run test
```

Para ejecutar las pruebas una sola vez:

```bash
npm run test -- --run
```

## Análisis de código

```bash
npm run lint
```

## Generar build productivo

```bash
npm run build
```

## Comprobar el build

```bash
npm run preview
```

## Mejora de mantenibilidad

Se revisó la gestión de carga de datos del componente CryptoList para mejorar su organización y evitar actualizaciones de estado innecesarias durante la carga inicial.

Se comprobó el funcionamiento mediante las pruebas automatizadas, el análisis de código y la compilación del proyecto.

## Aplicación publicada

URL de Vercel: https://pulso-abierto-react.vercel.app

## Verificación final

- Pruebas automatizadas: 8 tests aprobados.
- Build productivo: generado correctamente.
- Lint: 0 advertencias y 0 errores.
- Preview: comprobado.
- Despliegue: realizado correctamente.
- Fecha de verificación: 20/11/2026.

