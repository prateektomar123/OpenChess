import React, { useState, useEffect } from 'react'
import { Chess } from 'chess.js'
import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { CohereClient } from 'cohere-ai'

// Custom Chess Board Component
const CustomChessBoard = ({ position, onSquareClick, highlightedSquares, boardWidth = 400 }) => {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1']

  const getPieceSymbol = (piece) => {
    const symbols = {
      'wP': '♙', 'wR': '♖', 'wN': '♘', 'wB': '♗', 'wQ': '♕', 'wK': '♔',
      'bP': '♟', 'bR': '♜', 'bN': '♞', 'bB': '♝', 'bQ': '♛', 'bK': '♚'
    }
    return symbols[piece.color + piece.type.toUpperCase()] || ''
  }

  // Global piece symbol function for captured pieces
  const getPieceSymbolGlobal = (piece) => {
    const symbols = {
      'wp': '♙', 'wr': '♖', 'wn': '♘', 'wb': '♗', 'wq': '♕', 'wk': '♔',
      'bp': '♟', 'br': '♜', 'bn': '♞', 'bb': '♝', 'bq': '♛', 'bk': '♚'
    }
    return symbols[piece.color + piece.type] || piece.type.toUpperCase()
  }

  // Make getPieceSymbolGlobal available globally
  if (typeof window !== 'undefined') {
    window.getPieceSymbolGlobal = getPieceSymbolGlobal
  }

  const getSquareColor = (fileIndex, rankIndex) => {
    return (fileIndex + rankIndex) % 2 === 0 ? '#f0d9b5' : '#b58863'
  }

  const getSquareName = (fileIndex, rankIndex) => {
    return files[fileIndex] + ranks[rankIndex]
  }

  // Create chess instance once for this render
  const chess = new Chess(position)

  return (
    <div 
      style={{ 
        width: boardWidth, 
        height: boardWidth, 
        border: '2px solid #8b4513',
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: 'repeat(8, 1fr)',
        maxWidth: '100%',
        maxHeight: '100%'
      }}
    >
      {ranks.map((rank, rankIndex) =>
        files.map((file, fileIndex) => {
          const squareName = getSquareName(fileIndex, rankIndex)
          const squareColor = getSquareColor(fileIndex, rankIndex)
          const highlight = highlightedSquares[squareName]
          const piece = chess.get(squareName)
          
          return (
            <div
              key={squareName}
              onClick={() => onSquareClick(squareName)}
              style={{
                backgroundColor: highlight ? highlight.backgroundColor : squareColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: Math.max(boardWidth / 8 * 0.5, 16),
                cursor: 'pointer',
                border: highlight ? '2px solid #ffd700' : 'none',
                position: 'relative',
                minHeight: '40px'
              }}
            >
              {piece && (
                <span style={{ 
                  color: piece.color === 'w' ? '#fff' : '#000',
                  textShadow: piece.color === 'w' ? '1px 1px 2px #000' : '1px 1px 2px #fff',
                  fontWeight: 'bold'
                }}>
                  {getPieceSymbol(piece)}
                </span>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}

const ChessGame = ({ aiProvider, apiKey, gameSettings = {}, selectedModel = '' }) => {
  const [game, setGame] = useState(new Chess())
  const [isThinking, setIsThinking] = useState(false)
  const [gameStatus, setGameStatus] = useState('')
  const [moveHistory, setMoveHistory] = useState([])
  const [selectedSquare, setSelectedSquare] = useState('')
  const [highlightedSquares, setHighlightedSquares] = useState({})
  const [isUserTurn, setIsUserTurn] = useState(true)
  const [boardSize, setBoardSize] = useState(400)
  const [lastMove, setLastMove] = useState(null)
  const [error, setError] = useState('')
  const [gameStartTime] = useState(Date.now())
  const [moveCount, setMoveCount] = useState(0)

  // Calculate responsive board size
  useEffect(() => {
    const calculateBoardSize = () => {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      
      // Calculate available space for the board
      const availableWidth = Math.min(screenWidth - 60, 400) // 60px for padding
      const availableHeight = Math.min(screenHeight - 300, 400) // 300px for other UI elements
      
      // Use the smaller dimension to ensure board fits
      let newSize = Math.min(availableWidth, availableHeight)
      
      // Set minimum and maximum bounds
      newSize = Math.max(280, Math.min(newSize, 400))
      
      // Round to nearest 10 for cleaner appearance
      newSize = Math.floor(newSize / 10) * 10
      
      setBoardSize(newSize)
    }

    calculateBoardSize()
    window.addEventListener('resize', calculateBoardSize)
    return () => window.removeEventListener('resize', calculateBoardSize)
  }, [])

  const onSquareClick = (square) => {
    setError('')
    
    // Only allow clicks during user's turn
    if (!isUserTurn || isThinking || gameStatus) {
      if (gameStatus) setError('Game is over. Please start a new game.')
      else if (isThinking) setError('Please wait for AI to make a move.')
      else setError('Not your turn.')
      return
    }

    // If no square is selected, try to select this square
    if (!selectedSquare) {
      const piece = game.get(square)
      // Only allow selecting white pieces (user's pieces)
      if (piece && piece.color === 'w') {
        setSelectedSquare(square)
        highlightLegalMoves(square)
      } else {
        setError('Please select one of your pieces (white).')
      }
    } else {
      // If a square is already selected, try to make a move
      const moveAttempt = {
        from: selectedSquare,
        to: square,
        promotion: 'q' // Auto-promote to queen for simplicity
      }

      // Check if it's a pawn promotion move and get user preference
      const piece = game.get(selectedSquare)
      if (piece && piece.type === 'p' && (square[1] === '8' || square[1] === '1')) {
        const promotionPiece = prompt('Promote pawn to (q/r/b/n):', 'q') || 'q'
        if (['q', 'r', 'b', 'n'].includes(promotionPiece.toLowerCase())) {
          moveAttempt.promotion = promotionPiece.toLowerCase()
        }
      }

      // Try to make the move
      const gameCopy = new Chess(game.fen())
      const result = gameCopy.move(moveAttempt)

      if (result) {
        // Move successful
        setGame(gameCopy)
        setMoveHistory(prev => [...prev, { 
          move: result.san, 
          player: 'user',
          fen: gameCopy.fen(),
          time: Date.now() - gameStartTime
        }])
        setLastMove({ from: selectedSquare, to: square })
        setMoveCount(prev => prev + 1)
        
        // Clear selection and errors
        setSelectedSquare('')
        setHighlightedSquares({})
        setError('')
        
        // Check if game is over
        if (gameCopy.isGameOver()) {
          handleGameEnd(gameCopy)
        } else {
          // Switch to AI's turn
          setIsUserTurn(false)
          // Add small delay for better UX and pass the updated game state
          setTimeout(() => {
            makeAIMove(gameCopy)
          }, 750)
        }
      } else {
        // Invalid move - provide feedback
        const targetPiece = game.get(square)
        if (targetPiece && targetPiece.color === 'w') {
          // Clicked on another white piece, select it
          setSelectedSquare(square)
          highlightLegalMoves(square)
          setError('')
        } else {
          setError(`Invalid move: ${selectedSquare} to ${square}. Please try a legal move.`)
          // Keep current selection
        }
      }
    }
  }

  const highlightLegalMoves = (square) => {
    const moves = game.moves({ square, verbose: true })
    const highlights = {}
    
    // Highlight the selected square
    highlights[square] = { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
    
    // Highlight legal move squares
    moves.forEach(move => {
      highlights[move.to] = { backgroundColor: 'rgba(0, 255, 0, 0.4)' }
    })
    
    setHighlightedSquares(highlights)
  }

  const handleGameEnd = (finalGame) => {
    let status = ''
    if (finalGame.isCheckmate()) {
      status = finalGame.turn() === 'w' ? 'Checkmate! AI (Black) won!' : 'Checkmate! You (White) won!'
    } else if (finalGame.isDraw()) {
      if (finalGame.isStalemate()) {
        status = 'Draw by stalemate!'
      } else if (finalGame.isThreefoldRepetition()) {
        status = 'Draw by threefold repetition!'
      } else if (finalGame.isInsufficientMaterial()) {
        status = 'Draw by insufficient material!'
      } else {
        status = 'Draw by 50-move rule!'
      }
    }
    setGameStatus(status)
  }

  const makeAIMove = async (currentGame = game) => {
    if (currentGame.isGameOver()) return

    // Safety check: Ensure it's actually black's turn
    const currentTurn = currentGame.turn()
    if (currentTurn !== 'b') {
      console.error('ERROR: AI called when it is not black\'s turn!', { currentTurn, fen: currentGame.fen() })
      setError('Game state error: AI was called at wrong time')
      setIsUserTurn(true)
      return
    }

    setIsThinking(true)
    setError('')
    console.log('AI is thinking...', { fen: currentGame.fen(), provider: aiProvider, turn: currentTurn })

    let retryCount = 0
    const maxRetries = 3

    const attemptMove = async () => {
      try {
        const move = await getAIMove(currentGame.fen(), aiProvider, apiKey)
        console.log('AI move received:', move)

        if (move) {
          const gameCopy = new Chess(currentGame.fen())
          const result = gameCopy.move(move)
          console.log('AI move result:', result)

          if (result) {
            console.log('=== AI MOVE SUCCESSFUL ===')
            console.log('AI moved:', result.san)
            console.log('From:', result.from, 'To:', result.to)
            console.log('Piece moved:', result.piece, 'Color:', result.color)
            console.log('======================')

            setGame(gameCopy)
            setMoveHistory(prev => [...prev, {
              move: result.san,
              player: 'ai',
              fen: gameCopy.fen(),
              time: Date.now() - gameStartTime,
              provider: aiProvider
            }])
            setLastMove({ from: result.from, to: result.to })
            setMoveCount(prev => prev + 1)

            // Clear any previous errors on successful move
            setError('')

            // Switch back to user's turn
            setIsUserTurn(true)

            if (gameCopy.isGameOver()) {
              handleGameEnd(gameCopy)
            }
            // Update the main game state with the AI's move
            setGame(gameCopy)
            return true // Success
          } else {
            console.warn(`AI move attempt ${retryCount + 1} failed: invalid move ${move}`)
            if (retryCount < maxRetries) {
              retryCount++
              setError(`AI move was invalid. Retrying... (${retryCount}/${maxRetries})`)
              setTimeout(attemptMove, 1500)
            } else {
              setError('AI failed to make a valid move after multiple attempts. Your turn continues.')
              setIsUserTurn(true)
            }
            return false
          }
        } else {
          console.warn(`AI move attempt ${retryCount + 1} failed: no move returned`)
          if (retryCount < maxRetries) {
            retryCount++
            setError(`AI failed to generate a move. Retrying... (${retryCount}/${maxRetries})`)
            setTimeout(attemptMove, 1500)
          } else {
            setError('AI repeatedly failed to generate moves. Your turn continues.')
            setIsUserTurn(true)
          }
          return false
        }
      } catch (error) {
        console.error(`AI move error (attempt ${retryCount + 1}):`, error)
        if (retryCount < maxRetries) {
          retryCount++
          setError(`AI Error: ${error.message}. Retrying... (${retryCount}/${maxRetries})`)
          setTimeout(attemptMove, 1500)
        } else {
          setError(`AI Error (${aiProvider}): ${error.message}. Your turn continues.`)
          setIsUserTurn(true)
        }
        return false
      }
    }

    await attemptMove()
    setIsThinking(false)
  }

  const getDefaultModelForProvider = (provider) => {
    const defaults = {
      openai: 'gpt-4o-mini',
      claude: 'claude-3.5-haiku',
      google: 'gemini-1.5-flash',
      cohere: 'command',
      openrouter: 'openai/gpt-4o-mini'
    }
    return defaults[provider] || 'gpt-4o-mini'
  }

  const getAIMove = async (fen, provider, apiKey) => {
    const chess = new Chess(fen)
    const legalMoves = chess.moves()
    const verboseMoves = chess.moves({ verbose: true })

    console.log('=== AI MOVE REQUEST ===')
    console.log('AI Provider:', provider)
    console.log('Available legal moves:', legalMoves)
    console.log('Current FEN:', fen)
    console.log('Current turn in FEN:', chess.turn())
    console.log('AI should be playing as BLACK')
    console.log('=======================')

    if (legalMoves.length === 0) return null

    try {
      let aiMove

      // Get difficulty settings
      const difficulty = gameSettings.difficulty || 'intermediate'
      const difficultySettings = {
        'beginner': { temperature: 1.0, model: 'basic' },
        'intermediate': { temperature: 0.7, model: 'standard' },
        'advanced': { temperature: 0.3, model: 'advanced' },
        'expert': { temperature: 0.1, model: 'expert' }
      }
      const settings = difficultySettings[difficulty]

      // Determine which model to use
      const modelToUse = selectedModel || getDefaultModelForProvider(provider)

      switch (provider) {
        case 'openai':
          aiMove = await getOpenAIMove(fen, legalMoves, apiKey, settings)
          break
        case 'claude':
          aiMove = await getClaudeMove(fen, legalMoves, apiKey, settings)
          break
        case 'google':
          aiMove = await getGoogleAIMove(fen, legalMoves, apiKey, settings)
          break
        case 'cohere':
          aiMove = await getCohereMove(fen, legalMoves, apiKey, settings)
          break
        case 'openrouter':
          aiMove = await getOpenRouterMove(fen, legalMoves, apiKey, modelToUse, settings)
          break
        default:
          throw new Error(`Unknown AI provider: ${provider}`)
      }

      // Improved validation logic
      const normalizedMove = aiMove.trim().toLowerCase()

      // Check if the move matches any legal move (case-insensitive)
      const validMove = legalMoves.find(move =>
        move.toLowerCase() === normalizedMove ||
        move.toLowerCase().replace('x', '') === normalizedMove.replace('x', '')
      )

      if (validMove) {
        console.log(`AI (${provider}) selected valid move:`, validMove)
        return validMove
      }

      // If no exact match, try to find a move that could match
      const testChess = new Chess(fen)
      try {
        const moveResult = testChess.move(aiMove)
        if (moveResult) {
          console.log(`AI (${provider}) move validated through chess.js:`, moveResult.san)
          return moveResult.san
        }
      } catch (e) {
        console.warn(`AI move validation failed:`, aiMove, e.message)
      }

      // If all validation fails, use random move
      console.warn(`AI returned invalid move: ${aiMove}, falling back to random move`)
      const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)]
      console.log('Using random fallback move:', randomMove)
      return randomMove

    } catch (error) {
      console.error(`Error getting AI move from ${provider}:`, error)
      // Fall back to random move if AI fails
      const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)]
      console.log('Falling back to random move due to error:', randomMove)
      return randomMove
    }
  }

  const getOpenAIMove = async (fen, legalMoves, apiKey, settings) => {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    })

    const prompt = `You are playing chess as BLACK pieces. The user is playing as WHITE pieces. You must make a move for the BLACK pieces.

Current board position (FEN): ${fen}
Legal moves available for BLACK: ${legalMoves.join(', ')}

CRITICAL INSTRUCTIONS:
- You are BLACK, the user is WHITE
- You must choose a move that BLACK can make
- The legal moves listed above are the moves BLACK can make
- Respond with ONLY ONE move from the legal moves list
- Format: just the move notation like "e5", "Nf6", "O-O", "Qxd5"
- Do not explain, just give the move

Black's move:`

    const model = settings.model === 'expert' ? 'gpt-4o' : 'gpt-4o-mini'
    const response = await openai.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 10,
      temperature: settings.temperature
    })

    return response.choices[0].message.content.trim()
  }

  const getClaudeMove = async (fen, legalMoves, apiKey, settings) => {
    const anthropic = new Anthropic({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    })

    const prompt = `You are playing chess as BLACK pieces. The user is playing as WHITE pieces. You must make a move for the BLACK pieces.

Current board position (FEN): ${fen}
Legal moves available for BLACK: ${legalMoves.join(', ')}

CRITICAL INSTRUCTIONS:
- You are BLACK, the user is WHITE
- You must choose a move that BLACK can make
- The legal moves listed above are the moves BLACK can make
- Respond with ONLY ONE move from the legal moves list
- Format: just the move notation like "e5", "Nf6", "O-O", "Qxd5"
- Do not explain, just give the move

Black's move:`

    const model = settings.model === 'expert' ? 'claude-3.5-sonnet' : 'claude-3.5-haiku'
    const response = await anthropic.messages.create({
      model: model,
      max_tokens: 10,
      messages: [{ role: "user", content: prompt }]
    })

    return response.content[0].text.trim()
  }

  const getGoogleAIMove = async (fen, legalMoves, apiKey, settings) => {
    const genAI = new GoogleGenerativeAI(apiKey)
    const modelName = settings?.model === 'expert' ? 'gemini-1.5-pro' : 'gemini-1.5-flash'
    const model = genAI.getGenerativeModel({ model: modelName })

    const prompt = `You are playing chess as BLACK pieces. The user is playing as WHITE pieces. You must make a move for the BLACK pieces.

Current board position (FEN): ${fen}
Legal moves available for BLACK: ${legalMoves.join(', ')}

CRITICAL INSTRUCTIONS:
- You are BLACK, the user is WHITE
- You must choose a move that BLACK can make
- The legal moves listed above are the moves BLACK can make
- Respond with ONLY ONE move from the legal moves list
- Format: just the move notation like "e5", "Nf6", "O-O", "Qxd5"
- Do not explain, just give the move

Black's move:`

    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text().trim()
  }

  const getCohereMove = async (fen, legalMoves, apiKey, settings) => {
    const cohere = new CohereClient({
      token: apiKey
    })

    const prompt = `You are playing chess as BLACK pieces. The user is playing as WHITE pieces. You must make a move for the BLACK pieces.

Current board position (FEN): ${fen}
Legal moves available for BLACK: ${legalMoves.join(', ')}

CRITICAL INSTRUCTIONS:
- You are BLACK, the user is WHITE
- You must choose a move that BLACK can make
- The legal moves listed above are the moves BLACK can make
- Respond with ONLY ONE move from the legal moves list
- Format: just the move notation like "e5", "Nf6", "O-O", "Qxd5"
- Do not explain, just give the move

Black's move:`

    const response = await cohere.generate({
      model: "command",
      prompt: prompt,
      max_tokens: 10,
      temperature: settings.temperature,
      stop_sequences: ["\n"]
    })

    return response.generations[0].text.trim()
  }

  const getOpenRouterMove = async (fen, legalMoves, apiKey, model, settings) => {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Chess AI Game'
      },
      body: JSON.stringify({
        model: model,
        messages: [{
          role: 'user',
          content: `You are playing chess as BLACK pieces. The user is playing as WHITE pieces. You must make a move for the BLACK pieces.

Current board position (FEN): ${fen}
Legal moves available for BLACK: ${legalMoves.join(', ')}

CRITICAL INSTRUCTIONS:
- You are BLACK, the user is WHITE
- You must choose a move that BLACK can make
- The legal moves listed above are the moves BLACK can make
- Respond with ONLY ONE move from the legal moves list
- Format: just the move notation like "e5", "Nf6", "O-O", "Qxd5"
- Do not explain, just give the move

Black's move:`
        }],
        max_tokens: 10,
        temperature: settings.temperature || 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content.trim()
  }

  const resetGame = () => {
    setGame(new Chess())
    setGameStatus('')
    setMoveHistory([])
    setIsThinking(false)
    setSelectedSquare('')
    setHighlightedSquares({})
    setIsUserTurn(true)
    setLastMove(null)
    setError('')
    setMoveCount(0)
  }

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getGameStats = () => {
    const totalTime = Date.now() - gameStartTime
    const capturedPieces = {
      white: [],
      black: []
    }
    
    // Calculate captured pieces by comparing with starting position
    const startingPieces = new Chess().board().flat().filter(p => p !== null)
    const currentPieces = game.board().flat().filter(p => p !== null)
    
    const startingCount = {}
    const currentCount = {}
    
    startingPieces.forEach(piece => {
      const key = `${piece.color}${piece.type}`
      startingCount[key] = (startingCount[key] || 0) + 1
    })
    
    currentPieces.forEach(piece => {
      const key = `${piece.color}${piece.type}`
      currentCount[key] = (currentCount[key] || 0) + 1
    })
    
    Object.keys(startingCount).forEach(key => {
      const difference = startingCount[key] - (currentCount[key] || 0)
      if (difference > 0) {
        const color = key[0] === 'w' ? 'white' : 'black'
        const opponentColor = color === 'white' ? 'black' : 'white'
        for (let i = 0; i < difference; i++) {
          capturedPieces[opponentColor].push(key[1])
        }
      }
    })
    
    return {
      totalTime: formatTime(totalTime),
      moveCount,
      capturedPieces,
      isCheck: game.inCheck(),
      turn: game.turn() === 'w' ? 'White' : 'Black'
    }
  }

  const gameStats = getGameStats()

  return (
    <div className="chess-game">
      <div className="game-info">
        <h3>Playing against {aiProvider.toUpperCase()} AI</h3>
        {gameStatus && <div className="status">{gameStatus}</div>}
        {error && <div className="error">{error}</div>}
        {isThinking && (
          <div className="thinking">
            <div className="thinking-indicator">
              <span className="thinking-dot"></span>
              <span className="thinking-dot"></span>
              <span className="thinking-dot"></span>
            </div>
            <span>{aiProvider.toUpperCase()} AI is analyzing the position...</span>
          </div>
        )}
        <div className={`turn-indicator ${isThinking ? 'ai-thinking' : ''}`}>
          {gameStatus ? 'Game Over' : isUserTurn ? "Your turn (White)" : "AI's turn (Black)"}
          {gameStats.isCheck && !gameStatus && <span className="check-indicator"> - CHECK!</span>}
          {isThinking && <span className="ai-provider-badge">{aiProvider.toUpperCase()}</span>}
        </div>
      </div>

      <div className="game-stats">
        <div className="stat">Move: {Math.ceil(moveCount / 2)}</div>
        <div className="stat">Time: {gameStats.totalTime}</div>
        <div className="stat">Difficulty: {gameSettings.difficulty.charAt(0).toUpperCase() + gameSettings.difficulty.slice(1)}</div>
        <div className="stat">
          AI: {aiProvider === 'openrouter' ? `OpenRouter (${selectedModel})` : aiProvider.toUpperCase()}
        </div>
        <div className="captures-section">
          <div className="capture-group">
            <div className="capture-label">
              <span>Your Captures</span>
              <span className="capture-count">({gameStats.capturedPieces.white.length})</span>
            </div>
            <div className="captured-pieces">
              {gameStats.capturedPieces.white.length > 0 ? (
                gameStats.capturedPieces.white.map((piece, i) => (
                  <span key={i} className={`captured-piece ${piece.toLowerCase()}`}>
                    {(() => {
                      const symbols = {
                        'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚'
                      }
                      return symbols[piece.toLowerCase()] || piece.toUpperCase()
                    })()}
                  </span>
                ))
              ) : (
                <span className="no-captures">None</span>
              )}
            </div>
          </div>

          <div className="capture-group">
            <div className="capture-label">
              <span>AI Captures</span>
              <span className="capture-count">({gameStats.capturedPieces.black.length})</span>
            </div>
            <div className="captured-pieces">
              {gameStats.capturedPieces.black.length > 0 ? (
                gameStats.capturedPieces.black.map((piece, i) => (
                  <span key={i} className={`captured-piece ${piece.toLowerCase()}`}>
                    {(() => {
                      const symbols = {
                        'p': '♙', 'r': '♖', 'n': '♘', 'b': '♗', 'q': '♕', 'k': '♔'
                      }
                      return symbols[piece.toLowerCase()] || piece.toUpperCase()
                    })()}
                  </span>
                ))
              ) : (
                <span className="no-captures">None</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="board-container">
        <CustomChessBoard 
          position={game.fen()}
          onSquareClick={onSquareClick}
          highlightedSquares={{
            ...highlightedSquares,
            ...(lastMove ? {
              [lastMove.from]: { backgroundColor: 'rgba(255, 255, 0, 0.3)' },
              [lastMove.to]: { backgroundColor: 'rgba(255, 255, 0, 0.3)' }
            } : {})
          }}
          boardWidth={boardSize}
        />
      </div>

      <div className="game-controls">
        <button onClick={resetGame} className="control-btn">
          New Game
        </button>
        <button 
          onClick={() => setHighlightedSquares({})}
          className="control-btn"
          disabled={gameStatus || isThinking}
        >
          Clear Selection
        </button>
      </div>

      <div className="move-history">
        <h4>Move History</h4>
        <div className="moves">
          {moveHistory.map((moveInfo, index) => (
            <div
              key={index}
              className={`move-entry ${moveInfo.player}`}
              title={`Move made at ${formatTime(moveInfo.time)}${moveInfo.provider ? ` by ${moveInfo.provider.toUpperCase()} AI` : ''}`}
            >
              <span className="move-number">{Math.ceil((index + 1) / 2)}.</span>
              <span className="move-notation">{moveInfo.move}</span>
              {moveInfo.provider && (
                <span className="ai-provider-indicator" title={`${moveInfo.provider.toUpperCase()} AI`}>
                  {moveInfo.provider.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          ))}
        </div>
        {moveHistory.length > 0 && (
          <div className="move-stats">
            <div className="stat-item">
              <span className="stat-label">Total Moves:</span>
              <span className="stat-value">{moveHistory.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Your Moves:</span>
              <span className="stat-value">{moveHistory.filter(m => m.player === 'user').length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">AI Moves:</span>
              <span className="stat-value">{moveHistory.filter(m => m.player === 'ai').length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChessGame
