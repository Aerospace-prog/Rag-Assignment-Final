# Local Development Setup Guide

## Overview

This guide provides step-by-step instructions for setting up the Stock Market & Investment Analysis RAG System on your local machine. The system consists of a FastAPI backend, React frontend, and Firebase services.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.9+**: [Download Python](https://www.python.org/downloads/)
- **Node.js 18+**: [Download Node.js](https://nodejs.org/)
- **npm 9+**: Comes with Node.js
- **Git**: [Download Git](https://git-scm.com/downloads)
- **Firebase Account**: [Create Firebase Account](https://firebase.google.com/)
- **Google AI Studio Account**: [Get Gemini API Key](https://aistudio.google.com/app/apikey)

## Project Structure

```
.
├── backend/                 # FastAPI backend
│   ├── api/                # API routes
│   ├── core/               # Core modules (Firebase)
│   ├── services/           # Business logic (chunker, embedder, LLM)
│   ├── main.py             # FastAPI application entry point
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Backend environment variables (create this)
├── frontend/               # React frontend
│   ├── src/                # React source code
│   ├── public/             # Static assets
│   ├── package.json        # Node dependencies
│   └── .env                # Frontend environment variables (create this)
├── .env.example            # Example environment variables
└── README.md               # Project documentation
```

## Backend Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-name>
```

### 2. Create Python Virtual Environment

Navigate to the backend directory and create a virtual environment:

```bash
cd backend
python -m venv venv
```

### 3. Activate Virtual Environment

**On Windows:**
```bash
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

### 4. Install Python Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- FastAPI (web framework)
- Uvicorn (ASGI server)
- Firebase Admin SDK
- PDFPlumber (PDF text extraction)
- Google Generative AI (Gemini embeddings)
- APScheduler (background task scheduler)
- And other dependencies

### 5. Configure Firebase Service Account

#### Option A: Using Service Account JSON File (Recommended for Local Development)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon → Project Settings
4. Navigate to "Service accounts" tab
5. Click "Generate new private key"
6. Save the downloaded JSON file as `serviceAccountKey.json` in the `backend/` directory

**Important**: Never commit this file to Git! It's already in `.gitignore`.

#### Option B: Using Environment Variable (For Production)

Set the `FIREBASE_SERVICE_ACCOUNT_JSON` environment variable with the entire JSON content (see Production Deployment section).

### 6. Create Backend Environment File

Create a `.env` file in the `backend/` directory:

```bash
cd backend
touch .env  # On Windows: type nul > .env
```

Add the following content to `backend/.env`:

```env
# Gemini API key from https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here
```

**How to get your Gemini API key:**
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in the `.env` file

### 7. Verify Backend Setup

Start the backend server:

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     ✅ Embedding scheduler started — runs every 2 minutes.
```

Open your browser and navigate to:
- **API Root**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs (interactive Swagger UI)

If you see `{"status": "ok", "message": "FastAPI is running!"}`, the backend is working!

## Frontend Setup

### 1. Navigate to Frontend Directory

Open a new terminal window (keep the backend running) and navigate to the frontend directory:

```bash
cd frontend
```

### 2. Install Node Dependencies

```bash
npm install
```

This will install:
- React 19
- Vite (build tool)
- Firebase SDK
- Lucide React (icons)
- React Markdown
- And other dependencies

### 3. Configure Firebase for Frontend

The Firebase configuration is already set in `frontend/src/config/firebase.js`. If you're using a different Firebase project, update the configuration:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon → Project Settings
4. Scroll down to "Your apps" section
5. Click the web app icon (`</>`) or select your existing web app
6. Copy the `firebaseConfig` object
7. Replace the configuration in `frontend/src/config/firebase.js`

### 4. Create Frontend Environment File (Optional)

If you need to override the default Firebase configuration, create a `.env` file in the `frontend/` directory:

```bash
cd frontend
touch .env  # On Windows: type nul > .env
```

Add the following content to `frontend/.env`:

```env
# Firebase Configuration (for Vite projects)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Note**: The current setup uses hardcoded Firebase config in `firebase.js`. If you want to use environment variables, update `firebase.js` to read from `import.meta.env.VITE_*` variables.

### 5. Verify Frontend Setup

Start the development server:

```bash
npm run dev
```

You should see:
```
  VITE v8.0.1  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and navigate to http://localhost:5173/

You should see the login page with Google Sign-In button.

## Firebase Configuration

### 1. Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to "Authentication" in the left sidebar
4. Click "Get started"
5. Click on "Google" provider
6. Toggle "Enable"
7. Add your support email
8. Click "Save"

### 2. Create Firestore Database

1. In Firebase Console, navigate to "Firestore Database"
2. Click "Create database"
3. Select "Start in production mode" (or test mode for development)
4. Choose a location (e.g., us-central)
5. Click "Enable"

### 3. Set Firestore Security Rules (Optional for Development)

For development, you can use permissive rules. Navigate to "Firestore Database" → "Rules" tab:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /document_chunks/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /chat_sessions/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Important**: For production, implement proper security rules based on user authentication.

### 4. Enable Firebase Storage (Optional)

If you plan to use Firebase Storage for file uploads:

1. Navigate to "Storage" in Firebase Console
2. Click "Get started"
3. Follow the setup wizard
4. Configure security rules as needed

## Running the Application

### 1. Start Backend Server

In one terminal:

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Start Frontend Development Server

In another terminal:

```bash
cd frontend
npm run dev
```

### 3. Access the Application

- **Frontend**: http://localhost:5173/
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### 4. Test the Application

1. Sign in with Google
2. Upload a PDF document (e.g., Investment Book)
3. Wait 2 minutes for embeddings to process (background scheduler runs every 2 minutes)
4. Check Firestore Console to see chunks and embeddings
5. Ask questions in the chat interface

## Environment Variables Reference

### Backend Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Google Gemini API key for embeddings and LLM | Yes | `AIza...` |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Firebase service account JSON (production) | No* | `{"type": "service_account", ...}` |

*Required for production deployment, optional for local (uses `serviceAccountKey.json` file instead)

### Frontend Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | No** | `AIza...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | No** | `project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | No** | `my-project` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | No** | `project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | No** | `123456789` |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | No** | `1:123:web:abc` |

**Currently hardcoded in `firebase.js`, but can be moved to environment variables

## Troubleshooting

### Backend Issues

#### Issue: `ModuleNotFoundError: No module named 'fastapi'`
**Solution**: Ensure virtual environment is activated and dependencies are installed:
```bash
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

#### Issue: `FileNotFoundError: Service account key not found`
**Solution**: 
1. Ensure `serviceAccountKey.json` exists in `backend/` directory
2. Or set `FIREBASE_SERVICE_ACCOUNT_JSON` environment variable
3. Verify the file path is correct

#### Issue: `Invalid API key` when calling Gemini
**Solution**:
1. Verify `GEMINI_API_KEY` is set in `backend/.env`
2. Check the API key is valid at [Google AI Studio](https://aistudio.google.com/app/apikey)
3. Ensure `.env` file is in the `backend/` directory

#### Issue: Backend starts but embeddings don't process
**Solution**:
1. Check backend logs for errors
2. Verify Gemini API key is valid
3. Wait 2 minutes for the scheduler to run
4. Check Firestore Console for chunks with `status: "new"`

### Frontend Issues

#### Issue: `npm install` fails
**Solution**:
1. Ensure Node.js 18+ is installed: `node --version`
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and `package-lock.json`, then retry:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

#### Issue: Frontend can't connect to backend
**Solution**:
1. Verify backend is running on http://localhost:8000
2. Check `frontend/src/config/api.js` has correct backend URL
3. Check browser console for CORS errors
4. Ensure backend CORS middleware allows `http://localhost:5173`

#### Issue: Google Sign-In doesn't work
**Solution**:
1. Verify Firebase Authentication is enabled in Firebase Console
2. Ensure Google provider is enabled
3. Check Firebase configuration in `firebase.js` is correct
4. Clear browser cache and cookies
5. Check browser console for Firebase errors

#### Issue: `Vite` command not found
**Solution**:
1. Ensure you're in the `frontend/` directory
2. Run `npm install` to install dependencies
3. Use `npm run dev` instead of running `vite` directly

### Firebase Issues

#### Issue: Permission denied when accessing Firestore
**Solution**:
1. Check Firestore security rules in Firebase Console
2. Ensure user is authenticated
3. For development, use permissive rules (see Firebase Configuration section)

#### Issue: Chunks created but no embeddings
**Solution**:
1. Wait 2 minutes for background scheduler to run
2. Check backend logs for embedding errors
3. Verify Gemini API key is valid
4. Check Firestore Console - chunks should have `status: "processed"` after embedding

#### Issue: Firebase initialization fails
**Solution**:
1. Verify `serviceAccountKey.json` is in `backend/` directory
2. Check the JSON file is valid (not corrupted)
3. Ensure Firebase project ID matches your project
4. Verify service account has necessary permissions

### General Issues

#### Issue: Port already in use
**Solution**:
- **Backend (port 8000)**:
  ```bash
  # Find and kill process on port 8000
  # On macOS/Linux:
  lsof -ti:8000 | xargs kill -9
  # On Windows:
  netstat -ano | findstr :8000
  taskkill /PID <PID> /F
  ```
- **Frontend (port 5173)**:
  ```bash
  # Find and kill process on port 5173
  # On macOS/Linux:
  lsof -ti:5173 | xargs kill -9
  # On Windows:
  netstat -ano | findstr :5173
  taskkill /PID <PID> /F
  ```

#### Issue: Changes not reflecting in browser
**Solution**:
1. Hard refresh browser: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Restart development server
4. Check browser console for errors

## Production Deployment

### Backend Deployment (Render)

1. Create account on [Render](https://render.com/)
2. Create new "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables**:
     - `GEMINI_API_KEY`: Your Gemini API key
     - `FIREBASE_SERVICE_ACCOUNT_JSON`: Entire content of `serviceAccountKey.json` as a single-line string
5. Deploy and note the URL (e.g., `https://your-app.onrender.com`)

### Frontend Deployment (Firebase Hosting)

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase Hosting (if not already done):
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to `frontend/dist`
   - Configure as single-page app: Yes
   - Don't overwrite `index.html`

4. Update `frontend/src/config/api.js` with production backend URL:
   ```javascript
   export const API_BASE_URL = import.meta.env.DEV 
     ? 'http://localhost:8000/api' 
     : 'https://your-app.onrender.com/api';  // Update this
   ```

5. Build and deploy:
   ```bash
   cd frontend
   npm run build
   firebase deploy --only hosting
   ```

6. Note the hosting URL (e.g., `https://your-project.web.app`)

### Verify Production Deployment

1. Visit your frontend URL
2. Sign in with Google
3. Upload a PDF
4. Wait 2 minutes for embeddings
5. Test queries
6. Check Firestore Console for data

## Additional Resources

- **DEMO_GUIDE.md**: Video demonstration instructions
- **VIDEO_CHECKLIST.md**: Pre-recording checklist
- **README.md**: Project overview
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Documentation](https://vitejs.dev/)

## Getting Help

If you encounter issues not covered in this guide:

1. Check the troubleshooting section above
2. Review backend logs for error messages
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly
5. Ensure all prerequisites are installed
6. Try restarting both backend and frontend servers

## Next Steps

After successful setup:

1. Upload the Investment Book PDF
2. Test all 5 mandatory queries (see DEMO_GUIDE.md)
3. Verify embeddings in Firebase Console
4. Practice the video demonstration flow
5. Deploy to production for final testing
6. Record your video demonstration

Good luck with your project!
