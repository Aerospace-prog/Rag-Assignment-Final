#!/bin/bash

echo "🔒 Committing Security Fix..."
echo ""

# Check if .env is tracked
if git ls-files --error-unmatch frontend/.env 2>/dev/null; then
    echo "❌ ERROR: frontend/.env is tracked by git!"
    echo "Run: git rm --cached frontend/.env"
    exit 1
fi

# Check if serviceAccountKey.json is tracked
if git ls-files --error-unmatch backend/serviceAccountKey.json 2>/dev/null; then
    echo "❌ ERROR: backend/serviceAccountKey.json is tracked by git!"
    echo "Run: git rm --cached backend/serviceAccountKey.json"
    exit 1
fi

echo "✅ No sensitive files are tracked"
echo ""

# Stage the security-related changes
echo "📦 Staging security fixes..."
git add frontend/.gitignore
git add frontend/src/config/firebase.js
git add frontend/.env.example
git add SECURITY_FIX.md

# Show what will be committed
echo ""
echo "📋 Changes to be committed:"
git diff --cached --name-status

echo ""
echo "🔍 Review the changes above. If everything looks good, run:"
echo "   git commit -m 'Security: Move Firebase credentials to environment variables'"
echo "   git push origin main"
echo ""
echo "⚠️  IMPORTANT: After pushing, follow the steps in SECURITY_FIX.md to:"
echo "   1. Rotate your Firebase API key"
echo "   2. Review Firebase Security Rules"
echo "   3. Enable Firebase App Check"
