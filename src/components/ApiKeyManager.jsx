import React, { useState } from 'react'

const ApiKeyManager = ({ apiKeys, onApiKeyChange, selectedAI, onAIChange, selectedModel, onModelChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tempModel, setTempModel] = useState('')

  const providers = [
    { id: 'openrouter', name: 'OpenRouter', placeholder: 'sk-or-v1-...', link: 'https://openrouter.ai/keys', color: '#f59e0b' }
  ]

  const allModels = [
    {
      provider: 'openrouter',
      name: 'OpenRouter',
      color: '#f59e0b',
      models: [
        // OpenAI (via OpenRouter)
        { id: 'openai/gpt-4o', name: 'GPT-4o', description: 'OpenAI\'s flagship multimodal model', provider: 'OpenAI', pricing: 'High' },
        { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', description: 'Fast, low-cost OpenAI model', provider: 'OpenAI', pricing: 'Medium' },
        { id: 'openai/o3-mini', name: 'o3-mini', description: 'Reasoning-tuned, efficient model', provider: 'OpenAI', pricing: 'Medium' },

        // Anthropic (Claude)
        { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', description: 'Strong reasoning and safety', provider: 'Anthropic', pricing: 'High' },
        { id: 'anthropic/claude-3.5-haiku', name: 'Claude 3.5 Haiku', description: 'Fast and capable', provider: 'Anthropic', pricing: 'Medium' },

        // Google (Gemini)
        { id: 'google/gemini-1.5-pro', name: 'Gemini 1.5 Pro', description: 'Advanced multimodal model', provider: 'Google', pricing: 'High' },
        { id: 'google/gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: 'Fast, cost-effective Gemini', provider: 'Google', pricing: 'Low' },

        // xAI (Grok)
        { id: 'xai/grok-2', name: 'Grok-2', description: 'Latest Grok model from xAI', provider: 'xAI', pricing: 'Medium' },

        // Meta (Llama)
        { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1 405B', description: 'Massive open-source model', provider: 'Meta', pricing: 'High' },
        { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B', description: 'Large open-source model', provider: 'Meta', pricing: 'Medium' },
        { id: 'meta-llama/llama-3.1-8b-instruct', name: 'Llama 3.1 8B', description: 'Fast open-source model', provider: 'Meta', pricing: 'Low' },

        // Mistral
        { id: 'mistralai/mistral-large-latest', name: 'Mistral Large', description: 'High quality instruction model', provider: 'Mistral', pricing: 'Medium' },
        { id: 'mistralai/mixtral-8x22b-instruct', name: 'Mixtral 8x22B', description: 'Sparse MoE instruction model', provider: 'Mistral', pricing: 'Medium' },

        // DeepSeek
        { id: 'deepseek/deepseek-chat', name: 'DeepSeek Chat', description: 'Strong capability at low cost', provider: 'DeepSeek', pricing: 'Low' },
        { id: 'deepseek/deepseek-reasoner', name: 'DeepSeek Reasoner', description: 'Reasoning-optimized', provider: 'DeepSeek', pricing: 'Low' },

        // Qwen (Alibaba)
        { id: 'qwen/qwen2.5-72b-instruct', name: 'Qwen2.5 72B', description: 'Multilingual, strong open model', provider: 'Qwen', pricing: 'Low' },
        { id: 'qwen/qwq-32b', name: 'QwQ-32B', description: 'Reasoning-focused open model', provider: 'Qwen', pricing: 'Low' }
      ]
    }
  ]

  const handleModelSelect = (modelId) => {
    setTempModel(modelId)
  }

  const handleConfirm = () => {
    if (tempModel) {
      onAIChange('openrouter')
      onModelChange(tempModel)
      setIsModalOpen(false)
      setTempModel('')
    }
  }

  const getPricingColor = (pricing) => {
    switch (pricing) {
      case 'Low': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'High': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getProviderColor = (provider) => {
    switch (provider) {
      case 'OpenAI': return '#10a37f'
      case 'Anthropic': return '#d97706'
      case 'Google': return '#4285f4'
      case 'xAI': return '#000000'
      case 'Meta': return '#0490ff'
      case 'Mistral': return '#ff7000'
      case 'DeepSeek': return '#8b5cf6'
      case 'Qwen': return '#22c55e'
      case 'Cohere': return '#f97316'
      default: return '#6b7280'
    }
  }

  const providerCount = new Set(allModels[0].models.map(m => m.provider)).size

  const selectedProviderData = allModels.find(p => p.provider === selectedAI)
  const selectedModelData = selectedProviderData?.models.find(m => m.id === selectedModel)

  return (
    <div className="api-key-manager">
      {/* Clean Setup Header */}
      <div className="setup-header">
        <h2>♟️ OpenChess</h2>
        <p>Choose your AI opponent and start playing</p>
      </div>

      {/* Current Selection Display - Clean and Simple */}
      {selectedAI && selectedModel && (
        <div className="current-selection-simple">
          <div className="selection-display">
            <div className="selected-info">
              <div className="current-provider" style={{ color: selectedProviderData?.color }}>
                {selectedProviderData?.name}
              </div>
              <div className="current-model">{selectedModelData?.name}</div>
            </div>
            <button
              className="change-ai-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Change AI
            </button>
          </div>
        </div>
      )}

      {/* Start Game Button */}
      {(!selectedAI || !apiKeys[selectedAI]) && (
        <div className="start-section">
          <button
            className="select-ai-btn"
            onClick={() => setIsModalOpen(true)}
          >
            🚀 Select AI Opponent
          </button>
        </div>
      )}

      {/* Modal for AI Selection */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🎯 Choose Your AI Model</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* OpenRouter API Key Input */}
              <div className="api-key-section-modal">
                <h4>OpenRouter API Key</h4>
                <div className="api-key-input-container">
                  <input
                    type="password"
                    value={apiKeys.openrouter}
                    onChange={(e) => onApiKeyChange('openrouter', e.target.value)}
                    placeholder="sk-or-v1-..."
                    className="modal-api-input-large"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-get-key-large"
                    onClick={(e) => e.stopPropagation()}
                  >
                    🔑 Get API Key
                  </a>
                </div>
                <p className="api-key-description">
                  One API key gives you access to 15+ AI models from OpenAI, Anthropic, Google, xAI, and more!
                </p>
              </div>

              {/* Model Selection - Grouped by Provider */}
              <div className="model-selection-full">
                <div className="models-header">
                  <h4>🎯 Choose Your AI Model</h4>
                  <div className="models-count">{allModels[0].models.length} models from {providerCount} providers</div>
                </div>

                {/* Group models by provider */}
                {(() => {
                  const modelsByProvider = allModels[0].models.reduce((acc, model) => {
                    if (!acc[model.provider]) acc[model.provider] = []
                    acc[model.provider].push(model)
                    return acc
                  }, {})

                  return Object.entries(modelsByProvider).map(([provider, providerModels]) => (
                    <div key={provider} className="provider-section">
                      <div className="provider-header">
                        <div
                          className="provider-icon"
                          style={{ backgroundColor: getProviderColor(provider) }}
                        >
                          {provider === 'OpenAI' && '🤖'}
                          {provider === 'Anthropic' && '🧠'}
                          {provider === 'Google' && '🔍'}
                          {provider === 'xAI' && '🚀'}
                          {provider === 'Meta' && '🦍'}
                          {provider === 'Mistral' && '💨'}
                          {provider === 'DeepSeek' && '🧩'}
                          {provider === 'Qwen' && '🐉'}
                          {provider === 'Cohere' && '🟠'}
                        </div>
                        <div className="provider-info">
                          <h5 className="provider-name">{provider}</h5>
                          <div className="provider-model-count">{providerModels.length} models</div>
                        </div>
                      </div>

                      <div className="provider-models-grid">
                        {providerModels.map(model => (
                          <div
                            key={model.id}
                            className={`provider-model-card ${tempModel === model.id ? 'selected' : ''}`}
                            onClick={() => handleModelSelect(model.id)}
                          >
                            <div className="provider-model-header">
                              <div className="provider-model-name">{model.name}</div>
                              <div
                                className="provider-model-pricing"
                                style={{ backgroundColor: getPricingColor(model.pricing) }}
                              >
                                {model.pricing}
                              </div>
                            </div>
                            <div className="provider-model-description">{model.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                })()}
              </div>
            </div>

            <div className="modal-footer">
              {tempModel && (
                <button className="confirm-btn-large" onClick={handleConfirm}>
                  🚀 Start Playing with {allModels[0].models.find(m => m.id === tempModel)?.name}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Security Note */}
      <div className="security-note-simple">
        <div className="security-icon-simple">🔒</div>
        <div className="security-text-simple">
          Your API keys are stored locally and never sent to our servers.
        </div>
      </div>
    </div>
  )
}

export default ApiKeyManager


