# F1 Website

A modern Formula 1 website built with React, TypeScript, and Material-UI that provides real-time information about drivers, standings, and race results.

## Features

- 🏎️ Driver profiles and statistics
- 📊 Live driver and constructor standings
- 🎨 Modern, responsive UI with Material-UI components
- 🖼️ High-quality driver images
- ⚡ Fast performance with Vite
- 🔄 Real-time data updates

## Tech Stack

- React 19
- TypeScript
- Material-UI v6
- Vite
- React Query for data fetching
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/f1-website.git
cd f1-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
pnpm build
```

## Deployment

This project is configured for deployment on Cloudflare Pages. The build settings are:

- Build command: `pnpm build`
- Build output directory: `dist`
- Node.js version: 18

## Project Structure

```
f1-website/
├── public/
│   └── assets/
│       └── drivers/    # Driver images
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # React components
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components
│   ├── services/     # API services
│   ├── types/        # TypeScript types
│   └── utils/        # Utility functions
└── package.json
```

