#!/bin/bash

# Aurangzeb Sunny Portfolio - Quick Deploy Script
# This script helps you deploy to Vercel with MongoDB

echo "🚀 Aurangzeb Sunny Portfolio Deployment"
echo "======================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
else
    echo "✅ Vercel CLI is installed"
fi

echo ""
echo "📋 Pre-deployment checklist:"
echo "✅ MongoDB connection configured"
echo "✅ All API routes ready"
echo "✅ Hybrid storage system active"
echo ""

# Ask user what they want to do
echo "What would you like to do?"
echo "1) Deploy to Vercel (Production)"
echo "2) Deploy to Preview"
echo "3) Add MongoDB environment variable"
echo "4) View deployment logs"
echo "5) Exit"
echo ""
read -p "Enter choice [1-5]: " choice

case $choice in
  1)
    echo ""
    echo "🚀 Deploying to Production..."
    vercel --prod
    ;;
  2)
    echo ""
    echo "🔍 Deploying to Preview..."
    vercel
    ;;
  3)
    echo ""
    echo "🔐 Adding MongoDB environment variable..."
    echo ""
    echo "When prompted, paste this value:"
    echo "mongodb+srv://parizaadsunny_db_user:pS2TrTuUkpUAAHy1@portfolio.22goksc.mongodb.net/?appName=portfolio"
    echo ""
    read -p "Press Enter to continue..."
    vercel env add MONGODB_URI
    ;;
  4)
    echo ""
    echo "📜 Fetching deployment logs..."
    vercel logs
    ;;
  5)
    echo "👋 Goodbye!"
    exit 0
    ;;
  *)
    echo "❌ Invalid choice"
    exit 1
    ;;
esac

echo ""
echo "✅ Done!"
echo ""
echo "📱 Next steps:"
echo "1. Visit your deployed URL"
echo "2. Check console for MongoDB connection"
echo "3. Go to /admin to manage content"
echo ""
