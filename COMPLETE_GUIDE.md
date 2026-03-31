# Complete Guide: Testing & Video Demonstration

**Stock Market & Investment Analysis RAG System**

---

## Table of Contents

1. [Local Testing Setup](#local-testing-setup)
2. [Production Verification](#production-verification)
3. [Video Recording Guide](#video-recording-guide)
4. [Submission Checklist](#submission-checklist)
5. [Troubleshooting](#troubleshooting)

---

# Local Testing Setup

## Prerequisites

- Python 3.9+
- Node.js 18+
- Firebase account with service account key
- Gemini API key

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment

Create `backend/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Place `serviceAccountKey.json` in `backend/` directory.

### 3. Start Backend Server

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
✅ Embedding scheduler started — runs every 2 minutes.
```

**Test Backend:**
- Open http://localhost:8000 - Should see `{"status":"ok"}`
- Open http://localhost:8000/docs - Should see API documentation

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Frontend Server

```bash
npm run dev
```

**Expected Output:**
```
VITE ready in 500 ms
➜  Local:   http://localhost:5173/
```

**Test Frontend:**
- Open http://localhost:5173
- Should see login page with Google Sign-In button

## Local Testing Checklist

- [ ] Backend running on http://localhost:8000
- [ ] Frontend running on http://localhost:5173
- [ ] Can sign in with Google
- [ ] Can upload PDF document
- [ ] Document appears in sidebar
- [ ] Wait 2 minutes for embeddings
- [ ] Can send queries and receive responses
- [ ] Context chunks are displayed
- [ ] UI animations are smooth
- [ ] No console errors

---

# Production Verification

## Production URLs

- **Frontend**: https://rag-assignment-b7cea.web.app
- **Backend**: https://ai-research-assistant-backend-newa.onrender.com
- **Firebase Console**: https://console.firebase.google.com/project/rag-assignment-b7cea

## Step-by-Step Verification

### 1. Test Authentication (2 min)

- [ ] Open frontend URL
- [ ] Click "Sign in with Google"
- [ ] Complete authentication
- [ ] Verify profile picture appears in sidebar

### 2. Upload Investment Book PDF (1 min)

- [ ] Click upload button (paperclip icon)
- [ ] Select Investment Book PDF
- [ ] Wait for upload to complete
- [ ] Verify document appears in sidebar

### 3. Wait for Embeddings (2 min)

⏱️ **CRITICAL**: Wait 2 full minutes for background scheduler to process embeddings.

- [ ] Note current time: _______________
- [ ] Wait 2 minutes
- [ ] Refresh page if needed

### 4. Verify Chunks in Firebase Console (3 min)

- [ ] Open Firebase Console
- [ ] Navigate to Firestore Database
- [ ] Click `document_chunks` collection
- [ ] Open one chunk document
- [ ] Verify all fields present:
  - [ ] text
  - [ ] chunk_index
  - [ ] page_number
  - [ ] document_name
  - [ ] filename
  - [ ] user_email
  - [ ] status (should be "processed")
  - [ ] char_count
  - [ ] created_at
  - [ ] doc_type

### 5. Verify Embeddings (3 min)

⚠️ **CRITICAL**: Must verify at least 2 chunks have embeddings for video.

**First Chunk:**
- [ ] Find `embedding` field
- [ ] Expand the array
- [ ] Verify 1536 numerical values
- [ ] Take screenshot

**Second Chunk:**
- [ ] Open different chunk
- [ ] Find `embedding` field
- [ ] Expand the array
- [ ] Verify 1536 numerical values
- [ ] Take screenshot

### 6. Test All 5 Mandatory Queries (10 min)

For each query:
1. Type exactly as shown
2. Press Enter
3. Wait for response
4. Verify answer is relevant
5. Check context chunks displayed

#### Query 1: Brokerage Houses
```
how to deal with brokerage houses?
```
- [ ] Response received
- [ ] Answer is relevant
- [ ] Context chunks shown

#### Query 2: Theory of Diversification
```
what is theory of diversification?
```
- [ ] Response received
- [ ] Answer is relevant
- [ ] Context chunks shown
- [ ] Show "Sources" panel for this query

#### Query 3: Intelligent Investor
```
how to become intelligent investor?
```
- [ ] Response received
- [ ] Answer is relevant
- [ ] Context chunks shown

#### Query 4: Business Valuation
```
how to do business valuation?
```
- [ ] Response received
- [ ] Answer is relevant
- [ ] Context chunks shown

#### Query 5: Eggs in One Basket
```
what is putting all eggs in one basket analogy?
```
- [ ] Response received
- [ ] Answer is relevant
- [ ] Context chunks shown

---

# Video Recording Guide

## Pre-Recording Setup

### Technical Setup
- [ ] Screen resolution: 1920x1080 or 1280x720
- [ ] Webcam positioned (bottom-right or top-right corner)
- [ ] Webcam visible and well-lit
- [ ] Audio tested (microphone/headset)
- [ ] Recording software ready (OBS, QuickTime, etc.)
- [ ] Browser zoom at 100%
- [ ] Only 2 tabs open: Application + Firebase Console

### Content Preparation
- [ ] Investment Book PDF ready
- [ ] Production deployment verified
- [ ] All 5 queries tested and working
- [ ] Firebase Console accessible
- [ ] At least 2 chunks have embeddings

### Security Check
- [ ] No API keys visible in code
- [ ] No passwords visible
- [ ] No sensitive information exposed

## Recording Flow (8-10 minutes)

### 1. Introduction (30 seconds)

**Show:**
- Webcam (must be visible)
- Your face clearly
- Production URL in browser

**Say:**
> "Hello, I'm [Your Name], roll number [Your Roll Number]. This is my Stock Market & Investment Analysis RAG System, a Retrieval-Augmented Generation application that uses vector embeddings and semantic search to answer questions about investment concepts."

### 2. PDF Upload (1 minute)

**Show:**
- Click upload button
- Select Investment Book PDF
- Upload progress
- Document appears in sidebar

**Say:**
> "I'll upload the Investment Book PDF. The system extracts text, chunks it into segments, and generates vector embeddings for semantic search."

### 3. Firebase Console - Chunks (1 minute)

**Show:**
- Open Firebase Console tab
- Navigate to Firestore Database
- Show `document_chunks` collection
- Open one chunk document
- Point out all required fields

**Say:**
> "In Firebase Console, you can see the document_chunks collection. Each chunk contains text content, metadata like chunk index and page number, and processing status."

### 4. Firebase Console - Embeddings (1 minute)

**Show:**
- Scroll to `embedding` field
- Expand the array
- Show numerical values (scroll through some)
- Open second chunk
- Show its embedding field

**Say:**
> "Here's the embedding field - a 1536-dimensional vector generated by Gemini. These numerical values represent the semantic meaning of the text. I'll show another chunk to demonstrate multiple embeddings."

### 5. Mandatory Queries (5 minutes)

**For each query:**
1. Switch to application tab
2. Type query exactly
3. Send and wait for response
4. Scroll slowly through answer (2-3 seconds per screen)
5. For Query 2, show Sources panel

**Query 1:** `how to deal with brokerage houses?`
**Query 2:** `what is theory of diversification?` (Show Sources)
**Query 3:** `how to become intelligent investor?`
**Query 4:** `how to do business valuation?`
**Query 5:** `what is putting all eggs in one basket analogy?`

**Say for each:**
> "Let me test the query: [read query]. The system retrieves relevant context and generates this answer based on the Investment Book."

### 6. Conclusion (30 seconds)

**Show:**
- Webcam still visible
- Application interface

**Say:**
> "This demonstration showed the complete RAG pipeline: PDF upload, text chunking, vector embedding generation, and semantic search with LLM-powered answers. The system successfully answered all five queries using context from the Investment Book. Thank you for watching."

## Recording Tips

### Do's ✅
- Speak clearly at moderate pace
- Move cursor deliberately
- Scroll slowly through answers
- Pause 1-2 seconds before scrolling
- Show your actions clearly
- Keep webcam visible throughout

### Don'ts ❌
- Don't rush through content
- Don't skip any mandatory queries
- Don't show API keys or passwords
- Don't have webcam disappear
- Don't scroll too fast
- Don't skip Firebase Console sections

---

# Submission Checklist

## Video Requirements

- [ ] Duration: 8-10 minutes
- [ ] Webcam visible throughout entire video
- [ ] All 5 mandatory queries demonstrated
- [ ] Firebase Console chunks shown with all fields
- [ ] At least 2 embeddings visible (expanded arrays)
- [ ] Answers scrolled slowly and readable
- [ ] Audio clear throughout
- [ ] No sensitive information visible
- [ ] Screen content readable (720p minimum)

## File Preparation

- [ ] Video file format: MP4 (H.264 codec)
- [ ] File name: `Name_RollNumber.mp4`
  - Example: `JohnDoe_2021CS001.mp4`
- [ ] File size: Under 500MB
- [ ] Video plays correctly in media player

## Submission Materials

- [ ] Video file ready
- [ ] GitHub repository: https://github.com/Aerospace-prog/Rag-Assignment-Final.git
- [ ] Production frontend: https://rag-assignment-b7cea.web.app
- [ ] Production backend: https://ai-research-assistant-backend-newa.onrender.com

## Final Verification

- [ ] Watched entire video start to finish
- [ ] All 5 queries are present
- [ ] Webcam never disappears
- [ ] Audio is clear
- [ ] Firebase sections complete
- [ ] No sensitive data visible

## Deadline

**Submit by: March 5, 2026**

---

# Troubleshooting

## Local Development Issues

### Backend Won't Start

**Problem**: `ModuleNotFoundError` or import errors  
**Solution**:
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend Won't Start

**Problem**: `npm install` fails  
**Solution**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Firebase Authentication Error

**Problem**: "Service account key not found"  
**Solution**:
- Verify `serviceAccountKey.json` is in `backend/` directory
- Check file permissions
- Ensure JSON is valid

### Gemini API Error

**Problem**: "Invalid API key"  
**Solution**:
- Verify `GEMINI_API_KEY` in `backend/.env`
- Get new key from https://aistudio.google.com/app/apikey
- Restart backend server

## Production Issues

### Embeddings Not Showing

**Problem**: Chunks exist but no embeddings  
**Solution**:
1. Wait 2 full minutes for scheduler
2. Check backend logs in Render dashboard
3. Verify GEMINI_API_KEY is set in Render
4. Refresh Firebase Console

### Queries Return No Results

**Problem**: Empty responses  
**Solution**:
1. Verify embeddings exist (status: "processed")
2. Check embedding field has 1536 numbers
3. Wait and retry query
4. Check browser console for errors

### Authentication Fails

**Problem**: Can't sign in with Google  
**Solution**:
1. Verify Google Auth enabled in Firebase Console
2. Check frontend domain is authorized
3. Clear browser cookies
4. Try incognito/private mode

### Upload Fails

**Problem**: PDF won't upload  
**Solution**:
1. Check file size (< 10MB)
2. Verify file is PDF or TXT
3. Check internet connection
4. Try different file

## Recording Issues

### Webcam Not Visible

**Problem**: Webcam feed disappears  
**Solution**:
- Check recording software settings
- Ensure webcam overlay is enabled
- Test with short recording first

### Audio Quality Poor

**Problem**: Audio is unclear or quiet  
**Solution**:
- Use headset microphone
- Minimize background noise
- Test audio levels before full recording
- Adjust microphone input volume

### Video File Too Large

**Problem**: File size > 500MB  
**Solution**:
- Compress using HandBrake
- Use H.264 codec
- Reduce resolution if necessary (720p minimum)
- Maintain quality while compressing

### Made a Mistake While Recording

**Problem**: Said something wrong or missed a step  
**Solution**:
- Pause recording
- Take a breath
- Restart that section
- Edit later if needed

## Firebase Console Issues

### Can't See Embeddings

**Problem**: Embedding field not visible  
**Solution**:
1. Ensure status is "processed"
2. Scroll down in chunk document
3. Click to expand embedding array
4. Try different chunk if needed

### Chunks Not Created

**Problem**: No chunks in Firestore  
**Solution**:
1. Verify PDF uploaded successfully
2. Check backend logs for errors
3. Ensure Firestore permissions correct
4. Try uploading again

---

## Quick Reference

### 5 Mandatory Queries (Copy-Paste Ready)

```
how to deal with brokerage houses?
what is theory of diversification?
how to become intelligent investor?
how to do business valuation?
what is putting all eggs in one basket analogy?
```

### Production URLs

- Frontend: https://rag-assignment-b7cea.web.app
- Backend: https://ai-research-assistant-backend-newa.onrender.com
- Firebase: https://console.firebase.google.com/project/rag-assignment-b7cea
- GitHub: https://github.com/Aerospace-prog/Rag-Assignment-Final.git

### Local URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## Support

For additional help:
1. Check this guide's troubleshooting section
2. Review backend logs for errors
3. Check browser console for frontend errors
4. Verify all environment variables are set
5. Test with a fresh browser session

---

**Good luck with your demonstration!** 🚀

**Remember**: The goal is to clearly show that your RAG system works correctly. Focus on clarity and completeness.
