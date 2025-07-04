# Codenames

A full-stack Codenames game implementation with React frontend and Express.js backend.

## Project Structure

```
codenames/
├── server/
│   ├── static/          # Static files served by Express
│   ├── index.js         # Express server entry point
│   ├── package.json     # Server dependencies
│   └── package-lock.json
├── .vscode/             # VS Code configuration
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Install server dependencies:
```bash
cd server
npm install
```

### Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

The server will start on port 3001 (or PORT environment variable).

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET *` - Serves static files from the static directory

## Development

- Server runs with nodemon for auto-restart during development
- Static files are served from the `server/static` directory
