# Deployment Guide - MongoDB + Vercel

This portfolio website has been configured to use MongoDB as the database and can be deployed to Vercel.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `mongodb` - MongoDB driver
- `@vercel/node` - Vercel serverless functions support
- All other existing dependencies

### 2. Environment Variables

The `.env` file has already been created with your MongoDB credentials:

```env
MONGODB_URI=mongodb+srv://parizaadsunny_db_user:pS2TrTuUkpUAAHy1@portfolio.22goksc.mongodb.net/?appName=portfolio
MONGODB_DB=portfolio
VITE_API_URL=/api
```

### 3. Local Development

To run locally:

```bash
npm run dev
```

**Note**: For local development with API routes, you'll need to use `vercel dev` instead:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Run with Vercel dev server (supports API routes)
vercel dev
```

This will start both your frontend and API routes locally.

### 4. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Login to Vercel (first time only)
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub/GitLab repository
4. Vercel will auto-detect the settings
5. Add environment variables in project settings:
   - `MONGODB_URI`: Your MongoDB connection string
   - `MONGODB_DB`: `portfolio`
6. Click "Deploy"

### 5. Configure Environment Variables on Vercel

After deploying, make sure to add these environment variables in your Vercel project settings:

1. Go to your project on Vercel
2. Click "Settings" → "Environment Variables"
3. Add:
   - `MONGODB_URI`: `mongodb+srv://parizaadsunny_db_user:pS2TrTuUkpUAAHy1@portfolio.22goksc.mongodb.net/?appName=portfolio`
   - `MONGODB_DB`: `portfolio`
   - `VITE_API_URL`: `/api`

## 📁 Project Structure

```
/
├── api/                      # Vercel Serverless Functions
│   ├── db.ts                 # MongoDB connection
│   ├── init.ts               # Database initialization
│   ├── projects.ts           # Projects API
│   ├── posts.ts              # Blog posts API
│   ├── videos.ts             # Videos API
│   ├── certificates.ts       # Certificates API
│   ├── jobs.ts               # Jobs API
│   ├── reviews.ts            # Reviews API
│   ├── qas.ts                # Q&A API
│   ├── messages.ts           # Messages API
│   ├── newsletter.ts         # Newsletter API
│   ├── settings.ts           # Settings API
│   └── analytics.ts          # Analytics API
├── components/               # React components
├── utils/
│   ├── storage.tsx          # OLD: localStorage (keep as backup)
│   └── api-storage.tsx      # NEW: API-based storage
├── .env                      # Environment variables
├── .env.example              # Example environment variables
├── vercel.json              # Vercel configuration
└── package.json             # Dependencies

```

## 🔄 Migration from localStorage to MongoDB

The website now uses MongoDB instead of localStorage. All your data will be automatically initialized in MongoDB when you first access the API.

### What Changed:

1. **Storage Layer**: Created new `api-storage.tsx` that uses API calls
2. **API Routes**: Created 12 API endpoints in `/api` folder
3. **Database**: MongoDB is used for persistent storage
4. **Deployment**: Configured for Vercel with serverless functions

### Important Notes:

- The old `storage.tsx` file is kept for reference but is no longer used
- All components now use async/await for data operations
- Data is automatically initialized with sample content on first API call
- Default admin credentials: `username: admin`, `password: admin123` (change in production!)

## 🔒 Security Notes

1. **Change Default Admin Password**: 
   - The default admin password is set in `/api/init.ts`
   - For production, implement proper password hashing (bcrypt recommended)

2. **Environment Variables**:
   - Never commit `.env` file to Git
   - Use Vercel's environment variables for production
   - Rotate MongoDB credentials if exposed

3. **API Security**:
   - Consider adding API authentication for admin routes
   - Implement rate limiting for public endpoints
   - Add input validation for all API endpoints

## 🐛 Troubleshooting

### API Routes Not Working Locally
- Use `vercel dev` instead of `npm run dev` for local API support
- Make sure port 3000 is available

### MongoDB Connection Failed
- Check your MongoDB credentials
- Verify IP whitelist in MongoDB Atlas (allow all: 0.0.0.0/0 for Vercel)
- Ensure MongoDB cluster is running

### Deployment Fails
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `package.json` has correct build script

### Data Not Appearing
- Check browser console for API errors
- Verify API routes are accessible at `/api/*`
- Check MongoDB Atlas for data

## 📊 Database Collections

Your MongoDB database will have these collections:

- `projects` - Portfolio projects
- `posts` - Blog posts
- `videos` - Video gallery
- `certificates` - Certificates & awards
- `jobs` - Work experience timeline
- `reviews` - Client testimonials
- `qas` - FAQ items
- `messages` - Contact form submissions & Aura leads
- `newsletter` - Newsletter subscriptions
- `settings` - Site settings & social links
- `admin` - Admin user credentials

## 🎉 You're Ready!

Your portfolio is now ready to be deployed to Vercel with MongoDB as the backend. All data will persist in the cloud and can be managed through the admin panel at `/admin`.

For any issues, check the Vercel deployment logs and MongoDB Atlas monitoring.
