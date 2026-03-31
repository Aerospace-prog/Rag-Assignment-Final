# Security Fix - Firebase Credentials

## What Happened
Firebase credentials were exposed in `frontend/src/config/firebase.js` and committed to GitHub.

## What Was Fixed
1. ✅ Moved credentials to `.env` file (not tracked by git)
2. ✅ Updated `firebase.js` to use environment variables
3. ✅ Added `.env` to `.gitignore`

## CRITICAL: What You Must Do Now

### 1. Rotate Your Firebase API Key (REQUIRED)
Since the key was exposed on GitHub, you should rotate it:

**Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `rag-assignment-b7cea`
3. Go to **Project Settings** (gear icon) → **General**
4. Scroll to **Your apps** → Select your web app
5. Under **Firebase SDK snippet**, click **Config**
6. Click the **Regenerate** button next to the API key
7. Copy the new API key
8. Update `frontend/.env` with the new key

### 2. Review Firebase Security Rules
Your Firebase API key being public is actually normal for web apps, but you MUST have proper security rules:

**Firestore Rules** (check in Firebase Console → Firestore Database → Rules):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Documents collection - only owner can write
    match /documents/{docId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow write: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Chats collection - only owner can access
    match /chats/{chatId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

**Storage Rules** (check in Firebase Console → Storage → Rules):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /documents/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 3. Commit the Security Fix
```bash
# Stage the changes
git add frontend/.gitignore frontend/src/config/firebase.js

# Commit
git commit -m "Security: Move Firebase credentials to environment variables"

# Push to GitHub
git push origin main
```

### 4. Set Environment Variables in Production

**For Firebase Hosting:**
Firebase Hosting doesn't support server-side env vars, but that's okay because:
- The frontend .env values are bundled at build time
- The API key is meant to be public (security comes from Firebase Rules)

**For Render (Backend):**
Your backend credentials in `backend/serviceAccountKey.json` should NEVER be committed. They're already in .gitignore.

### 5. Additional Security Measures

**Enable Firebase App Check** (Recommended):
1. Go to Firebase Console → App Check
2. Enable App Check for your web app
3. Use reCAPTCHA v3 for web
4. This prevents unauthorized apps from accessing your Firebase resources

**Monitor Usage:**
1. Go to Firebase Console → Usage and billing
2. Set up budget alerts
3. Monitor for unusual activity

## Important Notes

### Firebase API Key is NOT a Secret
- The Firebase API key in your frontend is meant to be public
- It only identifies your Firebase project
- Real security comes from:
  - Firebase Authentication (who can access)
  - Security Rules (what they can access)
  - App Check (prevent abuse)

### What IS Secret
- ❌ `backend/serviceAccountKey.json` - NEVER commit this
- ❌ `backend/.env` (Gemini API key) - NEVER commit this
- ✅ Frontend Firebase config - Can be public IF you have proper security rules

## Verification Checklist
- [ ] Rotated Firebase API key
- [ ] Verified Firebase Security Rules are restrictive
- [ ] Committed the security fix
- [ ] Pushed to GitHub
- [ ] Verified `.env` is not in git history
- [ ] Enabled Firebase App Check (optional but recommended)
- [ ] Set up usage alerts in Firebase Console

## If You Need Help
1. Firebase Security Rules: https://firebase.google.com/docs/rules
2. Firebase App Check: https://firebase.google.com/docs/app-check
3. Environment Variables in Vite: https://vitejs.dev/guide/env-and-mode.html
