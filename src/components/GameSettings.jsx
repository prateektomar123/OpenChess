import React, { useState } from 'react'

const GameSettings = ({ settings, onSettingsChange, onStartGame, canStart }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const difficulties = [
    { 
      id: 'beginner', 
      name: 'Beginner', 
      description: 'Simple moves, good for learning',
      temperature: 1.0,
      model: 'basic'
    },
    { 
      id: 'intermediate', 
      name: 'Intermediate', 
      description: 'Balanced gameplay',
      temperature: 0.7,
      model: 'standard'
    },
    { 
      id: 'advanced', 
      name: 'Advanced', 
      description: 'Challenging opponent',
      temperature: 0.3,
      model: 'advanced'
    },
    { 
      id: 'expert', 
      name: 'Expert', 
      description: 'Maximum difficulty',
      temperature: 0.1,
      model: 'expert'
    }
  ]

  const timeControls = [
    { id: 'unlimited', name: 'Unlimited', description: 'No time pressure' },
    { id: 'casual', name: 'Casual', description: '15 min per side' },
    { id: 'rapid', name: 'Rapid', description: '10 min per side' },
    { id: 'blitz', name: 'Blitz', description: '5 min per side' },
    { id: 'bullet', name: 'Bullet', description: '1 min per side' }
  ]

  const handleSettingChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    })
  }

  const selectedDifficulty = difficulties.find(d => d.id === settings.difficulty)
  const selectedTimeControl = timeControls.find(t => t.id === settings.timeControl)

  return (
    <div className="game-settings">
      <div className="settings-header">
        <h3>Game Settings</h3>
        <button 
          className="toggle-button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      <div className={`settings-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
        {/* Difficulty Selection */}
        <div className="setting-group">
          <label className="setting-label">
            <span>Difficulty Level</span>
            <span className="setting-description">
              Current: {selectedDifficulty?.name} - {selectedDifficulty?.description}
            </span>
          </label>
          <div className="difficulty-options">
            {difficulties.map(difficulty => (
              <label key={difficulty.id} className="radio-option">
                <input
                  type="radio"
                  name="difficulty"
                  value={difficulty.id}
                  checked={settings.difficulty === difficulty.id}
                  onChange={(e) => handleSettingChange('difficulty', e.target.value)}
                />
                <span className="radio-label">
                  <strong>{difficulty.name}</strong>
                  <small>{difficulty.description}</small>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Time Control */}
        <div className="setting-group">
          <label className="setting-label">
            <span>Time Control</span>
            <span className="setting-description">
              Current: {selectedTimeControl?.name} - {selectedTimeControl?.description}
            </span>
          </label>
          <select 
            value={settings.timeControl} 
            onChange={(e) => handleSettingChange('timeControl', e.target.value)}
            className="setting-select"
          >
            {timeControls.map(control => (
              <option key={control.id} value={control.id}>
                {control.name} - {control.description}
              </option>
            ))}
          </select>
        </div>

        {/* Advanced Options */}
        <div className="setting-group">
          <label className="setting-label">
            <span>Advanced Options</span>
          </label>
          
          <div className="checkbox-group">
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={settings.showHints}
                onChange={(e) => handleSettingChange('showHints', e.target.checked)}
              />
              <span>Show move hints</span>
            </label>

            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={settings.allowUndo}
                onChange={(e) => handleSettingChange('allowUndo', e.target.checked)}
              />
              <span>Allow undo moves</span>
            </label>

            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
              />
              <span>Enable sound effects</span>
            </label>

            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={settings.boardFlipped}
                onChange={(e) => handleSettingChange('boardFlipped', e.target.checked)}
              />
              <span>Flip board (play as Black)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button 
          className="start-game-button"
          onClick={onStartGame}
          disabled={!canStart}
        >
          Start Game with These Settings
        </button>
      </div>
    </div>
  )
}

export default GameSettings