import { useState, useEffect } from 'react'
import ChessGame from './components/ChessGame'
import ApiKeyManager from './components/ApiKeyManager'
import GameSettings from './components/GameSettings'

function App() {
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    claude: '',
    google: '',
    cohere: '',
    openrouter: ''
  })
  const [selectedAI, setSelectedAI] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [gameSettings, setGameSettings] = useState({
    difficulty: 'intermediate',
    timeControl: 'unlimited',
    showHints: false,
    allowUndo: true,
    soundEnabled: false,
    boardFlipped: false
  })

  // Load API keys and settings from localStorage on component mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('chess-ai-keys')
    if (savedKeys) {
      setApiKeys(JSON.parse(savedKeys))
    }
    
    const savedSettings = localStorage.getItem('chess-game-settings')
    if (savedSettings) {
      setGameSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleApiKeyChange = (provider, key) => {
    const newKeys = {
      ...apiKeys,
      [provider]: key
    }
    setApiKeys(newKeys)
    // Save to localStorage
    localStorage.setItem('chess-ai-keys', JSON.stringify(newKeys))
  }

  const handleSettingsChange = (newSettings) => {
    setGameSettings(newSettings)
    // Save to localStorage
    localStorage.setItem('chess-game-settings', JSON.stringify(newSettings))
  }

  const startGame = () => {
    if (selectedAI && apiKeys[selectedAI] && selectedModel) {
      setGameStarted(true)
    } else {
      alert('Please select an AI opponent and enter a valid API key before starting the game.')
    }
  }

  const resetGame = () => {
    setGameStarted(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>OpenChess</h1>
        <p>Play chess against AI models from OpenAI, Claude, Google AI, and more!</p>
        <p className="creator-link">
          <a href="https://x.com/theprateektomar" target="_blank" rel="noopener noreferrer">
            <svg className="x-icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            @theprateektomar
          </a>
        </p>
      </header>
      
      {!gameStarted ? (
        <div className="setup-container">
          <ApiKeyManager
            apiKeys={apiKeys}
            onApiKeyChange={handleApiKeyChange}
            selectedAI={selectedAI}
            onAIChange={setSelectedAI}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
          
          <GameSettings
            settings={gameSettings}
            onSettingsChange={handleSettingsChange}
            onStartGame={startGame}
            canStart={!!(selectedAI && apiKeys[selectedAI] && selectedModel)}
          />
          
          <div className="quick-start">
            <button
              className="start-button secondary"
              onClick={startGame}
              disabled={!(selectedAI && apiKeys[selectedAI] && selectedModel)}
            >
              Quick Start (Default Settings)
            </button>
          </div>
        </div>
      ) : (
        <div className="game-container">
          <ChessGame
            aiProvider={selectedAI || 'openrouter'}
            apiKey={apiKeys[selectedAI] || apiKeys.openrouter}
            gameSettings={gameSettings}
            selectedModel={selectedModel}
          />
          <button className="reset-button" onClick={resetGame}>
            New Game
          </button>
        </div>
      )}
    </div>
  )
}

export default App
