#!/bin/bash

echo "🚀 Setting up Aurangzeb Sunny Portfolio..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm is installed: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. MongoDB credentials are already configured!"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "  1. For local development with API routes:"
echo "     npm install -g vercel"
echo "     vercel dev"
echo ""
echo "  2. For frontend-only development:"
echo "     npm run dev"
echo ""
echo "  3. To deploy to Vercel:"
echo "     vercel login"
echo "     vercel --prod"
echo ""
echo "📖 Read DEPLOYMENT.md for detailed instructions"
echo "🔧 Read MIGRATION_GUIDE.md for MongoDB migration steps"
echo ""
echo "🔑 Admin access: /admin (username: admin, password: admin123)"
echo ""
