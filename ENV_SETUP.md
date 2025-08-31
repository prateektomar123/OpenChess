# Environment Setup

## Overview

OpenChess is a frontend-only application that makes direct API calls to AI services. No backend environment variables are required since API keys are handled client-side and stored in localStorage.

## For Development

1. **No environment variables needed** - The app works out of the box
2. **API keys are entered by users** in the application interface
3. **Keys are stored locally** in the browser's localStorage

## For Production Deployment

### Netlify Deployment

1. **No configuration needed** - just connect your GitHub repo to Netlify
2. **Automatic builds** - Netlify will build and deploy automatically
3. **No environment variables required** - the app is self-contained

### Manual Deployment

If deploying to other platforms, ensure:

- The build command is `npm run build`
- The publish directory is `dist`
- No environment variables are needed

## Optional Environment Variables

If you want to add features later, you can use these Vite environment variables:

```bash
# Default AI provider (optional)
VITE_DEFAULT_AI_PROVIDER=openrouter

# Analytics ID (if you add analytics)
VITE_ANALYTICS_ID=your_analytics_id

# Custom API base URL (if you modify the app)
VITE_API_BASE_URL=https://your-api.com
```

## Security Notes

- **API keys are never sent to your server** - they stay in the user's browser
- **All AI API calls are made client-side** from the user's browser
- **No backend required** - reduces security surface area
- **User's API keys are their responsibility** - they manage their own usage and costs
