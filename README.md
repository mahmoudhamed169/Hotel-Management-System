# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


# Hotel Management Application

## Overview

This is a Hotel Management Application built using **React**, **TypeScript**, and **Material-UI**. The app is designed to allow hotel staff to manage room reservations and view available rooms with ease. It features modern UI components like tables, modals, and date pickers to streamline the user experience.

## Features

- **Responsive UI:** Utilizes Material-UI components for a clean, modern, and responsive design.
- **Room Management:** Display hotel rooms in a table with their respective details such as type and price.
- **Reservation System:** Users can select a date to make a reservation via an interactive date picker.
- **Modal Forms:** Easily manage reservations through modal dialogs.

## Technologies Used

- **React** - JavaScript library for building user interfaces.
- **TypeScript** - Typed superset of JavaScript for better code quality and development experience.
- **Material-UI** - A popular React UI framework with pre-designed components.
- **CSS** - For basic styling and layout.

## Installation

1. Clone the repository:
   ```bash
   


- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
