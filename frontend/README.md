# DSA Instructor Frontend

A modern, professional chat interface for the DSA Instructor AI using React.js and Tailwind CSS.

## Features

- 🎨 Modern, responsive UI with gradient design
- 💬 Real-time chat interface
- ⚡ Fast performance with Vite
- 🎯 Suggested questions for quick access
- 🔄 Real-time message loading animation
- 📱 Mobile-friendly design
- 🌙 Dark theme optimized for learning

## Tech Stack

- **React.js** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **PostCSS & Autoprefixer** - CSS processing

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Project

### Development Mode
```bash
npm run dev
```
The application will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Application header
│   │   ├── ChatMessage.jsx   # Individual message component
│   │   └── ChatInput.jsx     # Input field and suggested questions
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles and Tailwind directives
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── package.json              # Project dependencies
└── .env                      # Environment variables
```

## API Connection

The frontend connects to the backend API at `http://localhost:5000/apis/chat`

Make sure the backend server is running before starting the frontend.

## Customization

### Colors and Styling
Modify colors in `tailwind.config.js` or individual components.

### API URL
Update the API URL in `src/App.jsx` if needed (currently hardcoded to `http://localhost:5000`)

### Suggested Questions
Edit the `suggestedQuestions` array in `src/components/ChatInput.jsx`

## Browser Support

Modern browsers with ES6 support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
