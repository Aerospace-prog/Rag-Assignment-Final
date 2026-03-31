# Video Demonstration Checklist

## Overview

This checklist ensures you've covered all required elements for the Stock Market & Investment Analysis RAG System video demonstration. Use this as your final verification before recording and submitting your video.

**Submission Format**: Name_RollNumber.mp4  
**Deadline**: March 5, 2026  
**Video Duration**: 8-10 minutes

---

## Pre-Recording Setup

Complete these items before you start recording:

- [ ] **Production deployment is live and verified**
  - Backend API is accessible via HTTPS
  - Frontend loads correctly and connects to backend
  - No console errors in browser or backend logs

- [ ] **Investment Book PDF is uploaded and processed**
  - PDF uploaded successfully to production environment
  - Document appears in sidebar/document list
  - Chunks are created in Firestore

- [ ] **Embeddings are generated and visible**
  - Wait at least 2 minutes after upload for background scheduler to run
  - Verify in Firebase Console that chunks have `status: "processed"`
  - Confirm at least 2 chunks have visible `embedding` arrays (1536 dimensions)

- [ ] **All 5 mandatory queries tested and working**
  - Test each query in production environment
  - Verify all queries return non-empty, relevant responses
  - Confirm context chunks are displayed for each query

- [ ] **Firebase Console is accessible**
  - Logged into Firebase Console
  - Can navigate to Firestore Database
  - Can view `document_chunks` collection
  - Can expand chunk documents to see all fields

- [ ] **Screen recording software configured**
  - Recording software installed and tested
  - Screen resolution set to 1920x1080 or 1280x720
  - Audio input tested and clear
  - Recording format set to MP4 (H.264 codec)

- [ ] **Webcam positioned and visible**
  - Webcam positioned in corner (bottom-right or top-right)
  - Webcam feed is clear and well-lit
  - Webcam size is appropriate (visible but not obstructive)

- [ ] **Audio quality verified**
  - Microphone or headset connected
  - Audio levels tested with short recording
  - Background noise minimized
  - Voice is clear and understandable

- [ ] **Browser tabs organized**
  - Application tab open and ready
  - Firebase Console tab open and ready
  - All unnecessary tabs closed
  - Browser zoom set to 100%

- [ ] **No sensitive information visible**
  - API keys not visible in code or console
  - Passwords not visible
  - Personal information redacted if necessary
  - Environment variables not exposed

---

## Video Content Requirements

### Technical Demonstration

- [ ] **Webcam visible throughout entire video**
  - Webcam feed appears from start to finish
  - Face is visible and identifiable
  - Webcam doesn't disappear during screen transitions

- [ ] **Introduction completed (30 seconds)**
  - Name and roll number stated clearly
  - Project title mentioned: "Stock Market & Investment Analysis RAG System"
  - Production URL shown in browser address bar

- [ ] **PDF upload demonstrated (1 minute)**
  - Upload button clicked and shown clearly
  - Investment Book PDF selected from file system
  - Upload progress indicator visible
  - Document appears in sidebar after upload

- [ ] **Firebase Console - Chunks shown (1 minute)**
  - Firebase Console opened in browser
  - Navigated to Firestore Database
  - `document_chunks` collection displayed
  - At least one chunk document opened and expanded
  - All required fields visible and pointed out:
    - [ ] `text` field (chunk content)
    - [ ] `chunk_index` field
    - [ ] `page_number` field
    - [ ] `document_name` field
    - [ ] `filename` field
    - [ ] `user_email` field
    - [ ] `status` field (should be "processed")
    - [ ] `char_count` field
    - [ ] `created_at` field
    - [ ] `doc_type` field

- [ ] **Firebase Console - Embeddings shown (1 minute)**
  - `embedding` field located in chunk document
  - Embedding array expanded to show numerical values
  - 1536-dimensional vector visible (scroll through some values)
  - At least 2 different chunks shown with embeddings
  - Explanation provided that these are Gemini-generated vectors

---

## Mandatory Queries (All 5 Required)

Each query must be demonstrated with the following steps:
1. Type query exactly as shown (or paste and show clearly)
2. Click send or press Enter
3. Wait for AI response to appear
4. Scroll through answer slowly (2-3 seconds per screen)
5. For at least one query, show the "Sources" or "Context" button/panel

### Query 1: Brokerage Houses
- [ ] **Query typed exactly**: `how to deal with brokerage houses?`
- [ ] Response received and displayed
- [ ] Answer scrolled slowly for legibility
- [ ] Answer is relevant to the question

### Query 2: Theory of Diversification
- [ ] **Query typed exactly**: `what is theory of diversification?`
- [ ] Response received and displayed
- [ ] Answer scrolled slowly for legibility
- [ ] Answer is relevant to the question
- [ ] Context chunks/sources panel shown (recommended for this query)

### Query 3: Intelligent Investor
- [ ] **Query typed exactly**: `how to become intelligent investor?`
- [ ] Response received and displayed
- [ ] Answer scrolled slowly for legibility
- [ ] Answer is relevant to the question

### Query 4: Business Valuation
- [ ] **Query typed exactly**: `how to do business valuation?`
- [ ] Response received and displayed
- [ ] Answer scrolled slowly for legibility
- [ ] Answer is relevant to the question

### Query 5: Eggs in One Basket Analogy
- [ ] **Query typed exactly**: `what is putting all eggs in one basket analogy?`
- [ ] Response received and displayed
- [ ] Answer scrolled slowly for legibility
- [ ] Answer is relevant to the question

---

## Answer Presentation Quality

- [ ] **Scrolling speed is appropriate**
  - Answers scrolled slowly enough to read
  - Paused briefly (1-2 seconds) before scrolling
  - No rushing through content

- [ ] **Context chunks demonstrated**
  - "Sources" or "Context" button clicked for at least one query
  - Retrieved chunks displayed
  - Explanation provided that context comes from Investment Book

- [ ] **Relevance highlighted**
  - Brief commentary on answer relevance
  - Key points mentioned or read aloud
  - Connection to Investment Book emphasized

- [ ] **Professional presentation**
  - Clear narration throughout
  - Smooth transitions between sections
  - No long pauses or dead air

---

## Video Quality Requirements

- [ ] **Video length is 8-10 minutes**
  - Not too short (< 7 minutes)
  - Not too long (> 11 minutes)
  - All required content covered

- [ ] **Video resolution is appropriate**
  - Minimum 1280x720 (720p)
  - Recommended 1920x1080 (1080p)
  - Screen content is readable

- [ ] **Audio quality is clear**
  - Voice is understandable throughout
  - No excessive background noise
  - Audio levels are consistent
  - No audio cutting out or distortion

- [ ] **Screen content is readable**
  - Text is large enough to read
  - Browser zoom is at 100%
  - No blurry or pixelated sections
  - Code and console output are legible

- [ ] **Webcam quality is acceptable**
  - Face is visible and identifiable
  - Lighting is adequate
  - Webcam feed is not pixelated
  - Webcam position doesn't obstruct important content

- [ ] **No technical issues**
  - No screen freezing or stuttering
  - No audio sync issues
  - No recording artifacts or glitches
  - Smooth playback throughout

---

## Security and Privacy

- [ ] **No sensitive information exposed**
  - API keys not visible in code, console, or environment files
  - Passwords not shown
  - Service account keys not displayed
  - Firebase configuration details appropriate for public viewing

- [ ] **Personal information appropriate**
  - Only name and roll number shared
  - Email address visible in Firebase is acceptable
  - No other personal information unnecessarily exposed

- [ ] **Production URLs are safe to share**
  - URLs don't contain sensitive tokens
  - Deployment URLs are appropriate for submission

---

## Conclusion and Wrap-Up

- [ ] **Conclusion provided (30 seconds)**
  - Key capabilities summarized
  - RAG pipeline components mentioned (upload, chunking, embedding, search, generation)
  - Thank you message included

- [ ] **Webcam still visible at end**
  - Webcam feed visible during conclusion
  - Professional closing

---

## Post-Recording Verification

After recording, watch your entire video and verify:

- [ ] **Complete video review**
  - Watched entire video from start to finish
  - All sections are present and complete
  - No missing content or skipped sections

- [ ] **All 5 queries demonstrated**
  - Counted and verified all 5 queries are shown
  - Each query has a visible response
  - Queries are typed correctly

- [ ] **Webcam visibility confirmed**
  - Webcam is visible throughout entire video
  - No sections where webcam disappears
  - Webcam feed is clear and identifiable

- [ ] **Audio quality verified**
  - Audio is clear throughout
  - No sections with missing or garbled audio
  - Background noise is minimal

- [ ] **Firebase Console sections complete**
  - Chunks are shown with all required fields
  - At least 2 embeddings are visible
  - Embedding arrays are expanded to show values

- [ ] **No sensitive information visible**
  - Reviewed entire video for exposed API keys
  - No passwords or secrets visible
  - Environment variables not exposed

- [ ] **Video file is correct format**
  - File format is MP4
  - File plays correctly in media player
  - File size is reasonable (< 500MB)

---

## Submission Requirements

### File Preparation

- [ ] **Video file named correctly**
  - Format: `Name_RollNumber.mp4`
  - Example: `JohnDoe_2021CS001.mp4`
  - No spaces or special characters in filename

- [ ] **Video file size is appropriate**
  - File size under 500MB
  - If too large, compressed using appropriate codec
  - Quality maintained after compression

- [ ] **Video file format is correct**
  - File extension is `.mp4`
  - Codec is H.264 (recommended)
  - File plays in standard media players

### Submission Materials

- [ ] **Video file ready**
  - Video file named correctly
  - Video file tested and plays correctly
  - Video file size is under limit

- [ ] **GitHub repository link ready**
  - Repository URL copied and verified
  - Repository is public or accessible to instructor
  - Repository contains all required code and documentation

- [ ] **Production deployment URL ready**
  - Frontend URL copied and verified
  - Backend URL copied and verified (if required)
  - URLs are accessible and working

- [ ] **Documentation complete in repository**
  - README.md is comprehensive
  - DEMO_GUIDE.md is present
  - SETUP.md is present
  - VIDEO_CHECKLIST.md is present (this file)
  - .env.example files are present for frontend and backend

### Final Submission

- [ ] **Video file uploaded**
  - Uploaded to required submission platform
  - Upload completed successfully
  - Confirmation received

- [ ] **GitHub repository link submitted**
  - Link submitted to required platform
  - Link is correct and accessible
  - Repository contains latest code

- [ ] **Production deployment URL submitted**
  - URL submitted to required platform
  - URL is correct and accessible
  - Deployment is working correctly

- [ ] **Submission confirmation received**
  - Confirmation email or message received
  - Submission timestamp is before deadline
  - All required materials confirmed submitted

- [ ] **Deadline met**
  - Submission completed before March 5, 2026
  - Timestamp verified
  - No late submission penalties

---

## Troubleshooting Common Issues

### Before Recording

**Issue**: Embeddings not showing in Firebase Console  
**Solution**: Wait 2 minutes for background scheduler to run, then refresh Firebase Console

**Issue**: Queries return no results  
**Solution**: Verify embeddings exist in Firestore (check `status: "processed"`), wait and retry

**Issue**: Can't access Firebase Console  
**Solution**: Ensure you're logged in with correct account, verify project permissions

**Issue**: Production deployment not working  
**Solution**: Check backend logs, verify environment variables, test API endpoints

### During Recording

**Issue**: Made a mistake while recording  
**Solution**: Pause, take a breath, and restart that section (you can edit later)

**Issue**: Query doesn't return results  
**Solution**: Stay calm, wait a moment, and retry the query (can edit out the pause)

**Issue**: Forgot to show something  
**Solution**: Note what was missed, continue recording, and record that section separately to edit in later

### After Recording

**Issue**: Video file is too large  
**Solution**: Compress using HandBrake or similar tool with H.264 codec, maintain quality

**Issue**: Realized something was missed  
**Solution**: Record the missing section separately and edit it into the main video

**Issue**: Audio quality is poor  
**Solution**: If critical sections are affected, re-record those sections with better audio setup

---

## Additional Resources

- **DEMO_GUIDE.md**: Detailed step-by-step video demonstration instructions
- **SETUP.md**: Local development setup instructions
- **README.md**: Project overview and documentation
- [Firebase Console](https://console.firebase.google.com/): Access your Firestore data
- [Google AI Studio](https://aistudio.google.com/): Manage Gemini API keys

---

## Final Checklist Summary

Before submitting, ensure:

✅ Video is 8-10 minutes long  
✅ Webcam is visible throughout  
✅ All 5 mandatory queries are demonstrated  
✅ Firebase Console shows chunks with all required fields  
✅ At least 2 embeddings are visible in Firebase Console  
✅ Answers are scrolled slowly for legibility  
✅ Audio is clear and understandable  
✅ No sensitive information is exposed  
✅ Video file is named correctly: Name_RollNumber.mp4  
✅ Video file size is under 500MB  
✅ GitHub repository link is ready  
✅ Production deployment URL is ready  
✅ Submission is before deadline: March 5, 2026  

---

## Good Luck!

You've prepared thoroughly by following this checklist. Take a deep breath, stay calm during recording, and showcase your excellent work. Your RAG system demonstrates sophisticated understanding of vector embeddings, semantic search, and LLM integration.

**Remember**: The goal is to clearly demonstrate that your system works correctly and meets all assignment requirements. Focus on clarity and completeness rather than perfection.

**You've got this!** 🚀
