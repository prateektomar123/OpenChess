# OpenChess

A free, open-source React-based chess application that allows users to play chess against AI models from OpenAI, Claude, Google AI, and more. Play directly in your browser with no backend required!

## ✨ Features

- 🎯 **Play Against AI**: Challenge AI models from OpenAI, Anthropic, Google, xAI, Meta, and more
- ♟️ **Beautiful Chess Board**: Interactive chess board with drag-and-drop moves
- 🔐 **Secure API Management**: API keys stored locally in your browser
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile devices
- ⚡ **No Backend Required**: Direct API calls from your browser
- 📊 **Game Analytics**: Move history, captured pieces, and game statistics
- 🎮 **Multiple Difficulty Levels**: From beginner to expert AI opponents
- 🌟 **Open Source**: Free to use, modify, and contribute to

## Prerequisites

- Node.js (v16 or higher)
- API keys from:
  - OpenAI (https://platform.openai.com/)
  - Anthropic/Claude (https://console.anthropic.com/)
  - Google AI (https://makersuite.google.com/app/apikey)

## 🚀 Quick Start

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/openchess.git
   cd openchess
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Production Deployment

#### Netlify (Recommended)

1. Fork this repository
2. Connect your fork to [Netlify](https://netlify.com)
3. Deploy automatically - no configuration needed!
4. Your site will be live at `https://your-site-name.netlify.app`

#### Manual Build

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

## How It Works

The application makes **direct API calls** to AI services from the browser:

1. Users enter their API key and select an AI provider
2. API keys are stored securely in localStorage (never sent to external servers)
3. When making a move, the app directly calls the selected AI service
4. The AI analyzes the chess position and returns the best move
5. Moves are validated and applied to the game

## Usage

1. Enter your API key for the AI provider you want to use
2. Select the AI provider from the dropdown
3. Click "Start Game" to begin playing
4. Make moves by dragging pieces on the board
5. The AI will respond with its moves
6. Use the controls to start a new game or undo moves

## API Key Security

- **Local Storage**: API keys are stored in your browser's localStorage
- **No Server Storage**: Keys are never sent to or stored on our servers
- **Direct API Calls**: Your browser communicates directly with AI services
- **Privacy**: Only you have access to your API keys

## 🛠️ Technologies Used

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **chess.js** - Chess game logic and validation
- **react-chessboard** - Beautiful chess board component
- **OpenAI API** - GPT models integration
- **Anthropic Claude API** - Claude models integration
- **Google Generative AI** - Gemini models integration
- **OpenRouter API** - Unified access to multiple AI providers

## 📁 Project Structure

```
openchess/
├── src/
│   ├── components/
│   │   ├── ApiKeyManager.jsx    # AI provider and API key management
│   │   ├── ChessGame.jsx        # Main game logic and AI integration
│   │   └── GameSettings.jsx     # Difficulty and game settings
│   ├── App.jsx                  # Main application component
│   ├── index.css               # Styling and responsive design
│   └── main.jsx                # Application entry point
├── public/
│   └── vite.svg               # App icon
├── package.json
├── vite.config.js             # Build configuration
└── README.md
```

## 🔒 Security & Privacy

- **Client-Side Only**: No backend server - your API keys never leave your browser
- **Local Storage**: API keys stored securely in your browser's localStorage
- **Direct API Calls**: Communication goes directly from your browser to AI providers
- **No Data Collection**: We don't collect or store any of your data

> 📖 **Detailed Security Info**: See [SECURITY.md](SECURITY.md) for comprehensive security documentation

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure responsive design works on all devices

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [chess.js](https://github.com/jhlywa/chess.js) - Chess logic library
- [react-chessboard](https://github.com/Clariity/react-chessboard) - Chess board component
- [OpenRouter](https://openrouter.ai) - Unified AI API access
- All the amazing AI providers making this possible!

## 🎯 Roadmap

- [ ] Add more AI providers (Cohere, Mistral, etc.)
- [ ] Implement game analysis and move suggestions
- [ ] Add multiplayer support
- [ ] Create mobile app versions
- [ ] Add chess puzzles and tutorials

---

**Enjoy playing chess against AI! ♟️🤖**

If you find this project helpful, please give it a ⭐ on GitHub!
