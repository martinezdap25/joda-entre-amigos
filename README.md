# 🔥 Joda Entre Amigos

> El juego de fiesta que arruina amistades — 252 cartas de retos, confesiones y momentos incómodos.

## Setup

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en el celular o navegador.

## Stack

- **Next.js 14** (App Router)
- **React 18** con hooks
- **TypeScript**
- **Tailwind CSS**
- Sin backend — 100% frontend

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, viewport)
│   └── page.tsx            # Página principal — orquesta las pantallas
├── components/
│   ├── game/
│   │   ├── PlayerSetup.tsx # Pantalla de agregar jugadores
│   │   ├── GameScreen.tsx  # Pantalla principal del juego
│   │   ├── CardDisplay.tsx # Componente de carta individual
│   │   └── GameOver.tsx    # Pantalla de fin de juego
│   ├── layout/
│   │   └── ParticleBackground.tsx  # Fondo animado con partículas
│   └── ui/
│       ├── Logo.tsx        # Logo / branding
│       ├── PlayerChip.tsx  # Tag de jugador reutilizable
│       └── ProgressBar.tsx # Barra de progreso
├── data/
│   ├── cards/
│   │   ├── reto.ts         # 42 cartas de retos
│   │   ├── confesion.ts    # 42 cartas de confesiones
│   │   ├── elige.ts        # 42 cartas de "elegí a alguien"
│   │   ├── todos.ts        # 42 cartas grupales
│   │   ├── amigos.ts       # 42 cartas de "amigos de mierda"
│   │   └── picante.ts      # 42 cartas picantes leves
│   └── index.ts            # Barrel export de todas las cartas
├── hooks/
│   ├── useGame.ts          # Estado global del juego
│   └── usePlayers.ts       # Manejo de lista de jugadores
├── lib/
│   ├── constants.ts        # Configuración de categorías y constantes
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Helpers (shuffle, processCardText, buildDeck)
└── styles/
    └── globals.css         # Tailwind + estilos globales custom
```

## Categorías de cartas (252 total)

| Categoría         | Emoji | Cartas | Descripción                    |
| ----------------- | ----- | ------ | ------------------------------ |
| Reto              | 🔥    | 42     | Desafíos para hacer en el acto |
| Confesión         | 🤫    | 42     | Secretos y verdades incómodas  |
| Elegí a Alguien   | 👆    | 42     | Señalar a alguien del grupo    |
| Todos             | 🎉    | 42     | Preguntas o retos grupales     |
| Amigos de Mierda  | 💀    | 42     | Bardeo y honestidad brutal     |
| Picante Leve      | 🌶️   | 42     | Coqueteo y situaciones románticas |

## Cómo jugar

1. Agregá los nombres de los jugadores
2. Tocá **EMPEZAR JODA**
3. Cada turno muestra una carta al azar para el jugador actual
4. Cumplí el reto... o tomá
5. Tocá **SIGUIENTE** para pasar al próximo turno
6. Las 252 cartas se mezclan sin repetir hasta agotarlas

## Licencia

Uso personal y entre amigos. Divertite.
