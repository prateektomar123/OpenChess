# ♟️ OpenChess

> **An open-source AI-powered chess game built with React and modern web technologies**

> **Follow the creator on X: [@theprateektomar](https://x.com/theprateektomar)**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-green.svg)](https://openai.com/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-API-orange.svg)](https://openrouter.ai/)

## 🎯 Overview

OpenChess is a modern, responsive chess game that lets you play against AI models from various providers including OpenAI, Anthropic, Google AI, xAI, and more. Built with React and designed for both beginners and advanced players.

## ✨ Features

- **🤖 Multiple AI Providers**: Play against models from OpenAI, Anthropic, Google AI, xAI, Meta, Mistral, and more
- **⚙️ Custom Models**: Add your own AI models with custom providers and descriptions
- **🎨 Modern UI**: Clean, responsive design with dark theme
- **🔒 Privacy First**: All API keys stored locally, never sent to our servers
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **♟️ Standard Chess**: Full chess rules implementation with move validation
- **💾 Persistent Storage**: Your custom models and preferences are saved locally

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn
- OpenRouter API key ([Get one here](https://openrouter.ai/keys))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/prateektomar123/openchess.git
   cd openchess
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### First Time Setup

1. Click "🚀 Select AI Opponent"
2. Enter your OpenRouter API key
3. Choose an AI model or add a custom one
4. Start playing chess!

## 🏗️ Project Structure

```
openchess/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ApiKeyManager.jsx    # AI model selection & API key management
│   │   ├── ChessGame.jsx        # Main chess game logic
│   │   ├── ChessBoard.jsx       # Chess board rendering
│   │   └── ...
│   ├── styles/            # CSS files
│   ├── utils/             # Utility functions
│   └── App.js             # Main application component
├── package.json           # Dependencies and scripts
├── README.md             # This file
├── LICENSE               # MIT License
├── CONTRIBUTING.md       # Contribution guidelines
├── CODE_OF_CONDUCT.md    # Community standards
└── .github/              # GitHub templates and workflows
```

## 🎮 How to Play

### Basic Gameplay

- **White moves first** (you play as white)
- **Click and drag** pieces to make moves
- **Valid moves** are highlighted automatically
- **AI responds** after each of your moves

### AI Models

- **Free Tier**: Start with cost-effective models like GPT-4o Mini
- **Premium**: Use advanced models like GPT-4o or Claude 3.5 Sonnet
- **Custom**: Add your own models with specific providers

### Game Controls

- **New Game**: Start a fresh game at any time
- **Undo Move**: Take back your last move
- **Flip Board**: Rotate the board perspective
- **Settings**: Customize AI behavior and game options

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
REACT_APP_OPENROUTER_API_URL=https://openrouter.ai/api/v1
REACT_APP_DEFAULT_MODEL=openai/gpt-4o-mini
```

### Custom AI Models

You can add custom models through the UI:

1. Click "⚙️ Custom Models" in the AI selection modal
2. Click "+ Add Custom Model"
3. Fill in the model details:
   - **Model ID/Name**: Unique identifier for your model
   - **Provider**: Choose from supported providers
   - **Description**: Optional description

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting.

### Ways to Contribute

- 🐛 **Bug Reports**: Report issues and bugs
- 💡 **Feature Requests**: Suggest new features
- 🔧 **Code Contributions**: Submit pull requests
- 📚 **Documentation**: Improve docs and examples
- 🎨 **UI/UX**: Enhance the user interface
- 🧪 **Testing**: Add tests and improve coverage

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📋 Roadmap

- [ ] **Multiplayer Support**: Play against other humans online
- [ ] **Game Analysis**: AI-powered move analysis and suggestions
- [ ] **Tournament Mode**: Organize and participate in tournaments
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **Advanced AI**: Integration with chess engines like Stockfish
- [ ] **Social Features**: Share games, achievements, and leaderboards
- [ ] **Custom Themes**: Multiple board and piece themes
- [ ] **Accessibility**: Screen reader support and keyboard navigation

## 🐛 Known Issues

- Custom models are stored locally and won't sync across devices
- Some AI models may have rate limits or usage quotas
- Mobile touch controls may need fine-tuning on certain devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Chess.js**: Chess logic and move validation
- **React**: Frontend framework
- **OpenRouter**: AI model access
- **OpenAI, Anthropic, Google**: AI model providers
- **Chess.com**: Inspiration and design references
- **Creator**: [@theprateektomar](https://x.com/theprateektomar) on X

## 📞 Support

- **GitHub Issues**: [Report bugs and request features](https://github.com/prateektomar123/openchess/issues)
- **Discussions**: [Join community discussions](https://github.com/prateektomar123/openchess/discussions)
- **X (Twitter)**: [@theprateektomar](https://x.com/theprateektomar)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=prateektomar123/openchess&type=Date)](https://star-history.com/#prateektomar123/openchess&Date)

---

**Made with ♥️ by the OpenChess Community**

**Follow the creator on X: [@theprateektomar](https://x.com/theprateektomar)**

If you find this project helpful, please consider giving it a ⭐ star on GitHub!
