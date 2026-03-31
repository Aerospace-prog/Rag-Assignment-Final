# Stock Market & Investment Analysis RAG System

A Retrieval-Augmented Generation (RAG) system that combines document retrieval with LLM-powered answer generation to provide intelligent responses about stock market and investment concepts.

## 🎯 Project Overview

This application demonstrates a complete RAG pipeline that:
- Extracts text from PDF documents (Investment Book)
- Chunks text into semantic segments
- Generates 1536-dimensional vector embeddings using Google Gemini
- Performs semantic search using cosine similarity
- Generates contextual answers using LLM with retrieved context

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 19 with Vite
- Firebase Authentication (Google Sign-In)
- Lucide React (icons)
- React Markdown (answer rendering)

**Backend:**
- FastAPI (Python web framework)
- Firebase Admin SDK (Firestore database)
- Google Generative AI (Gemini embeddings & LLM)
- PDFPlumber (PDF text extraction)
- APScheduler (background embedding generation)

**Database:**
- Firebase Firestore (document chunks, embeddings, chat sessions)

### System Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   React     │─────▶│   FastAPI    │─────▶│  Firestore  │
│  Frontend   │◀─────│   Backend    │◀─────│  Database   │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │    Gemini    │
                     │  Embeddings  │
                     │   & LLM      │
                     └──────────────┘
```

## ✨ Features

- **PDF Upload**: Upload investment-related PDF documents
- **Automatic Chunking**: Text is automatically split into semantic chunks
- **Vector Embeddings**: Background scheduler generates embeddings every 2 minutes
- **Semantic Search**: Find relevant context using cosine similarity
- **LLM-Powered Answers**: Generate comprehensive answers with retrieved context
- **Chat History**: Save and load previous chat sessions
- **Modern UI**: Smooth animations, professional typography, and sophisticated color palette
- **Firebase Console Integration**: View chunks and embeddings in real-time

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 18+
- Firebase account
- Google AI Studio account (for Gemini API key)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd <repository-name>
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure Firebase Service Account**
   - Download `serviceAccountKey.json` from Firebase Console
   - Place it in the `backend/` directory

4. **Create Backend Environment File**
   ```bash
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

5. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

6. **Configure Frontend (Optional)**
   ```bash
   cp .env.example .env
   # Edit .env if you need to override Firebase config
   ```

### Running Locally

1. **Start Backend**
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## 📚 Documentation

- **[SETUP.md](SETUP.md)**: Detailed setup instructions for local development
- **[DEMO_GUIDE.md](DEMO_GUIDE.md)**: Step-by-step video demonstration guide
- **[VIDEO_CHECKLIST.md](VIDEO_CHECKLIST.md)**: Pre-recording checklist for assignment submission

## 🎥 Video Demonstration

This project includes comprehensive documentation for recording a video demonstration. The system is designed to answer five mandatory queries:

1. "how to deal with brokerage houses?"
2. "what is theory of diversification?"
3. "how to become intelligent investor?"
4. "how to do business valuation?"
5. "what is putting all eggs in one basket analogy?"

See [DEMO_GUIDE.md](DEMO_GUIDE.md) for detailed recording instructions.

## 🌐 Production Deployment

### Backend (Render)

**Deployment URL**: https://ai-research-assistant-backend-newa.onrender.com

**Environment Variables Required:**
- `GEMINI_API_KEY`: Your Gemini API key
- `FIREBASE_SERVICE_ACCOUNT_JSON`: Service account JSON as single-line string

**Build Command**: `pip install -r backend/requirements.txt`  
**Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Firebase Hosting)

**Deployment URL**: https://abhishek-rag-2026.web.app

**Deployment Steps:**
```bash
cd frontend
npm run build
firebase deploy --only hosting
```

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your Gemini API key from: https://aistudio.google.com/app/apikey

### Frontend (`frontend/.env`) - Optional

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Note**: Firebase config is currently hardcoded in `frontend/src/config/firebase.js`

## 📁 Project Structure

```
.
├── backend/                    # FastAPI backend
│   ├── api/                   # API routes
│   │   ├── routes/           # Endpoint definitions
│   │   └── deps.py           # Dependencies
│   ├── core/                 # Core modules
│   │   └── firebase.py       # Firebase initialization
│   ├── services/             # Business logic
│   │   ├── chunker.py        # Text chunking
│   │   ├── embedder.py       # Embedding generation
│   │   ├── embedding_scheduler.py  # Background scheduler
│   │   ├── html_cleaner.py   # HTML cleaning
│   │   └── llm.py            # LLM integration
│   ├── main.py               # FastAPI app entry point
│   ├── requirements.txt      # Python dependencies
│   └── .env.example          # Environment variables template
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── auth/        # Authentication
│   │   │   ├── chat/        # Chat interface
│   │   │   └── layout/      # Layout components
│   │   ├── config/          # Configuration
│   │   │   ├── api.js       # API endpoints
│   │   │   └── firebase.js  # Firebase config
│   │   ├── App.jsx          # Main app component
│   │   ├── App.css          # Component styles
│   │   └── index.css        # Global styles & CSS variables
│   ├── public/              # Static assets
│   ├── package.json         # Node dependencies
│   └── .env.example         # Environment variables template
├── .gitignore               # Git ignore rules
├── DEMO_GUIDE.md            # Video demonstration guide
├── SETUP.md                 # Setup instructions
├── VIDEO_CHECKLIST.md       # Pre-recording checklist
└── README.md                # This file
```

## 🎨 UI Enhancements

The application features a modern, polished UI with:

- **Typography System**: Professional font hierarchy using Inter font family
- **Color Palette**: Financial-themed blues and purples with dark mode support
- **Smooth Animations**: GPU-accelerated transitions and effects
- **Accessibility**: WCAG AA compliant contrast ratios and keyboard navigation
- **Responsive Design**: Works seamlessly from 320px to 2560px width

All UI enhancements are implemented using CSS custom properties (variables) for easy theming.

## 🔒 Security

- **Environment Variables**: All sensitive data stored in `.env` files (not committed)
- **Service Account Keys**: Excluded from Git via `.gitignore`
- **Firebase Security Rules**: Configured for authenticated users only
- **API Key Protection**: Backend API keys never exposed to frontend

## 🧪 Testing

The system includes comprehensive testing:

- **Unit Tests**: Specific examples and edge cases
- **Property-Based Tests**: Universal correctness properties
- **Integration Tests**: End-to-end user flows
- **Accessibility Tests**: WCAG compliance verification

## 📊 Firebase Console

View your data in Firebase Console:

1. Navigate to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Firestore Database
4. View collections:
   - `document_chunks`: Text chunks with embeddings
   - `chat_sessions`: User chat history

## 🐛 Troubleshooting

### Embeddings Not Generating

**Problem**: Chunks created but no embeddings  
**Solution**: Wait 2 minutes for background scheduler to run, check backend logs for errors

### Query Returns No Results

**Problem**: Queries return empty responses  
**Solution**: Verify embeddings exist in Firestore (status: "processed"), ensure Gemini API key is valid

### Frontend Can't Connect to Backend

**Problem**: CORS errors or connection refused  
**Solution**: Verify backend is running, check `frontend/src/config/api.js` has correct URL

See [SETUP.md](SETUP.md) for more troubleshooting tips.

## 📝 Assignment Submission

**Submission Requirements:**
- Video demonstration (Name_RollNumber.mp4)
- GitHub repository link (this repository)
- Production deployment URLs

**Deadline**: March 5, 2026

**Video Requirements:**
- 8-10 minutes duration
- Webcam visible throughout
- All 5 mandatory queries demonstrated
- Firebase Console shown (chunks and embeddings)
- Answers scrolled slowly for legibility

See [VIDEO_CHECKLIST.md](VIDEO_CHECKLIST.md) for complete requirements.

## 🎓 Educational Use

This project is developed for educational purposes as part of a course assignment. The Investment Book PDF and all generated content are used solely for learning and demonstration within the course context.

## 📄 License

This project is for educational use only. All rights reserved.

## 🙏 Acknowledgments

- **Google Gemini**: For embeddings and LLM capabilities
- **Firebase**: For authentication and database services
- **FastAPI**: For the excellent Python web framework
- **React**: For the powerful frontend library

## 📞 Support

For issues or questions:
1. Check [SETUP.md](SETUP.md) for setup help
2. Review [DEMO_GUIDE.md](DEMO_GUIDE.md) for demonstration guidance
3. Consult [VIDEO_CHECKLIST.md](VIDEO_CHECKLIST.md) for submission requirements

---

**Built with ❤️ for learning and demonstrating RAG system capabilities**
