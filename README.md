# Assault on City 13

A strategic number-based battle game built with HTML5 Canvas and TypeScript.

## Features

- Canvas-based rendering with smooth animations
- Number-based combat system
- Multiple game screens (map, troops, items, etc.)
- Touch and mouse input support
- Responsive design that adapts to screen size

## Technologies Used

- TypeScript
- HTML5 Canvas
- Vite (for development and building)
- ESLint & Prettier (for code quality)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── canvas/            # Core game logic and components
│   ├── components/    # UI components (buttons, icons, etc.)
│   ├── constants/     # Game constants and data
│   ├── mechanics/     # Game mechanics (combat, dialogue)
│   ├── screens/       # Different game screens
│   ├── utils/         # Utility functions
│   ├── events.ts      # Input event handling
│   ├── index.ts       # Main game loop
│   └── setup.ts       # Canvas setup
├── canvas-tool/       # Canvas utility functions
├── main.ts            # Entry point
└── style.css          # Global styles
```

## Controls

- Mouse/Touch: Interact with game elements
- Buttons: Navigate between screens and actions

## Development Notes

The game follows these key patterns:
- Event-driven architecture
- State management through global constants
- Component-based UI system
- Responsive canvas rendering

## License

MIT License - see LICENSE file for details