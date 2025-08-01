# CODENAMES AI

A modern, AI-powered implementation of the classic Codenames word association game. Built with React, Node.js, and Socket.IO for real-time multiplayer gameplay.

![Codenames AI](https://img.shields.io/badge/Game-Codenames%20AI-blue)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)
![Socket.IO](https://img.shields.io/badge/Real-time-Socket.IO-010101)

## Features

### Core Gameplay
- **Real-time multiplayer** - Play with friends instantly
- **Classic Codenames rules** - Red vs Blue team gameplay
- **Dynamic word boards** - Randomized 5x5 word grids
- **Team management** - Join as Operative or Spymaster
- **Turn-based gameplay** - Strategic clue giving and guessing

### Modern UI/UX
- **Dark/Light themes** - Toggle between themes
- **Responsive design** - Works on desktop and mobile
- **Glassmorphism effects** - Beautiful modern styling
- **Smooth animations** - Polished user experience
- **Intuitive controls** - Easy to learn and play

### Technical Features
- **Socket.IO integration** - Real-time game synchronization
- **Room-based gameplay** - Create and join game rooms
- **State management** - Jotai for efficient state handling
- **Auto-reconnection** - Robust connection handling
- **Cross-platform** - Works on any modern browser

## Live Demo

**Play now:** [codenamesai.onrender.com](https://codenamesai.onrender.com)

## Game Rules

### Objective
- **Red Team**: Find all your red words before the Blue team
- **Blue Team**: Find all your blue words before the Red team
- **Spymasters**: Give one-word clues with a number
- **Operatives**: Click words based on your Spymaster's clues

### Card Types
- **Red Cards** - Your team's words (8-9 cards)
- **Blue Cards** - Opponent's words (8-9 cards)
- **Bystander Cards** - Neutral, don't help either team
- **Assassin Card** - Game over if clicked (1 card)

### How to Play
1. **Join a room** - Enter room name and get a random player name
2. **Choose your role** - Join as Operative or Spymaster
3. **Spymasters give clues** - One word + number of related words
4. **Operatives guess** - Click words based on the clue
5. **End turn** - When you're done guessing
6. **Win** - Find all your team's words first!

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhruvErry/codenamesAI.git
   cd codenamesAI
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Start the development servers**
   ```bash
   # Start server (from server directory)
   npm run dev
   
   # Start client (from client directory, in new terminal)
   npm start
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Create or join a room
   - Start playing!

## Project Structure

```
codenamesAI/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── Atoms.js       # Jotai state management
│   │   └── socket.js      # Socket.IO client
│   └── package.json
├── server/                # Node.js backend
│   ├── server.js          # Express + Socket.IO server
│   ├── static/            # Static files
│   └── package.json
└── README.md
```

## Key Components

### Frontend (React)
- **Game.js** - Main game component with board and teams
- **Board.js** - 5x5 word grid with click handling
- **TeamPanel.js** - Team score and player management
- **Clue.js** - Clue input and display system
- **SettingsPopup.js** - Theme toggle and GitHub link

### Backend (Node.js)
- **server.js** - Socket.IO server with game logic
- **Room management** - Create, join, and manage game rooms
- **Game state** - Track cards, turns, scores, and players
- **Real-time updates** - Synchronize game state across clients

## Future Features

### Planned Enhancements
- **AI Spymaster** - OpenAI-powered clue generation
- **Mobile optimization** - Better touch controls
- **Custom themes** - More visual options
- **Game statistics** - Track wins, best clues, etc.
- **Tournament mode** - Competitive play
- **Sound effects** - Immersive audio

### Technical Improvements
- **Reconnection logic** - Handle disconnects gracefully
- **Performance optimization** - Faster loading
- **Security enhancements** - Better input validation
- **Analytics** - Game usage insights

## Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** - `git checkout -b feature/amazing-feature`
3. **Make your changes** - Add new features or fix bugs
4. **Test thoroughly** - Ensure everything works
5. **Submit a pull request** - We'll review and merge

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on multiple browsers
- Update documentation as needed

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- **Original Codenames** - Czech Games Edition
- **React** - For the amazing frontend framework
- **Socket.IO** - For real-time communication
- **Jotai** - For state management
- **Render** - For hosting the live demo

## Contact

- **GitHub**: [@dhruvErry](https://github.com/dhruvErry)
- **Live Demo**: [codenamesai.onrender.com](https://codenamesai.onrender.com)
- **Repository**: [github.com/dhruvErry/codenamesAI](https://github.com/dhruvErry/codenamesAI)

---

**Ready to play?** [Start a game now!](https://codenamesai.onrender.com)
