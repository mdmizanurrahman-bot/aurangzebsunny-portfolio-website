# Aurangzeb Sunny - Portfolio Website

A comprehensive personal portfolio website with luxury modern aesthetic, built with React, TypeScript, Tailwind CSS, and MongoDB.

## ✨ Features

- 🎨 **Luxury Modern Design** - Glassmorphic UI with custom color palette
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **High Performance** - Optimized for speed and SEO
- 🎯 **Complete CMS** - Full admin dashboard for content management
- 🤖 **AI Assistant** - Aura AI chatbot for lead generation
- 📧 **Newsletter System** - Built-in subscription management
- 💼 **Project Showcase** - Display your best work
- 📝 **Blog Platform** - Share your thoughts and tutorials
- 🎥 **Video Gallery** - Showcase YouTube videos
- 🏆 **Certificates** - Display your achievements
- 💼 **Work Timeline** - Professional experience showcase
- ⭐ **Client Reviews** - Testimonials with rating system
- ❓ **FAQ Section** - Interactive Q&A accordion
- 📬 **Contact Form** - With toast notifications
- 🗓️ **Cal.com Integration** - Easy meeting scheduling

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS v4.0
- **Animations**: Motion (Framer Motion)
- **Backend**: Vercel Serverless Functions
- **Database**: MongoDB Atlas
- **Icons**: Lucide React
- **UI Components**: Shadcn/ui
- **Forms**: React Hook Form
- **Notifications**: Sonner (Toast)

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server (with API routes)
vercel dev

# OR use Vite dev server (frontend only, no API)
npm run dev
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with:

```env
MONGODB_URI=mongodb+srv://parizaadsunny_db_user:pS2TrTuUkpUAAHy1@portfolio.22goksc.mongodb.net/?appName=portfolio
MONGODB_DB=portfolio
VITE_API_URL=/api
```

### MongoDB Setup

1. Your MongoDB credentials are already configured
2. Database will auto-initialize with sample data on first API call
3. Collections created: projects, posts, videos, certificates, jobs, reviews, qas, messages, newsletter, settings, admin

### Admin Access

Default credentials (change in production!):
- **Username**: `admin`
- **Password**: `admin123`

Access admin panel at: `/admin`

## 🎨 Color Scheme

- **Background**: #F5F5F2 (Warm Off-White)
- **Primary**: #6C00A2 (Luxury Purple)
- **Accent**: #9C6B30 (Bronze Gold)
- **Text**: System defaults with custom overrides

## 📁 Project Structure

```
/
├── api/                      # Vercel Serverless API Routes
│   ├── db.ts                 # MongoDB connection
│   ├── init.ts               # Database initialization
│   ├── projects.ts           # Projects CRUD API
│   ├── posts.ts              # Posts CRUD API
│   ├── videos.ts             # Videos CRUD API
│   ├── certificates.ts       # Certificates API
│   ├── jobs.ts               # Jobs API
│   ├── reviews.ts            # Reviews API
│   ├── qas.ts                # Q&A API
│   ├── messages.ts           # Messages/Contact API
│   ├── newsletter.ts         # Newsletter API
│   ├── settings.ts           # Settings API
│   └── analytics.ts          # Analytics API
├── components/               # React Components
│   ├── ui/                   # Shadcn UI Components
│   ├── admin/                # Admin Dashboard Components
│   ├── figma/                # Figma utility components
│   ├── Navigation.tsx        # Main navigation
│   ├── Hero.tsx              # Hero section
│   ├── About.tsx             # About section
│   ├── Projects.tsx          # Projects showcase
│   ├── Posts.tsx             # Blog posts
│   ├── VideoGallery.tsx      # Video gallery
│   ├── Certificates.tsx      # Certificates display
│   ├── Jobs.tsx              # Work timeline
│   ├── Reviews.tsx           # Client testimonials
│   ├── QA.tsx                # FAQ accordion
│   ├── Contact.tsx           # Contact form
│   ├── Footer.tsx            # Footer with newsletter
│   └── AuraAssistant.tsx     # AI chatbot
├── utils/                    # Utility Functions
│   ├── storage.tsx           # LocalStorage implementation (backup)
│   ├── api-storage.tsx       # API/MongoDB implementation
│   └── storage-wrapper.tsx   # Storage abstraction layer
├── styles/                   # Global Styles
│   └── globals.css           # Tailwind + custom styles
├── App.tsx                   # Main App component
├── main.tsx                  # Entry point
├── package.json              # Dependencies
├── vercel.json               # Vercel configuration
├── .env                      # Environment variables
├── .env.example              # Example env vars
├── .gitignore                # Git ignore rules
├── DEPLOYMENT.md             # Deployment guide
├── MIGRATION_GUIDE.md        # Migration guide
└── README.md                 # This file
```

## 🌐 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables on Vercel

Add these in your Vercel project settings:

1. `MONGODB_URI` - Your MongoDB connection string
2. `MONGODB_DB` - Database name (portfolio)
3. `VITE_API_URL` - `/api`

See `DEPLOYMENT.md` for detailed deployment instructions.

## 📖 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Migration from localStorage to MongoDB

## 🔒 Security

- Admin credentials should be hashed in production
- MongoDB IP whitelist configured for Vercel (0.0.0.0/0)
- API routes include CORS headers
- Sensitive data in environment variables
- `.env` file excluded from Git

## 📝 Content Management

### Admin Dashboard (`/admin`)

Manage all content through the admin panel:

- **Projects** - Add/edit/delete portfolio projects
- **Posts** - Create and manage blog posts
- **Videos** - Add YouTube videos to gallery
- **Certificates** - Showcase certifications
- **Jobs** - Manage work experience timeline
- **Reviews** - Add client testimonials
- **Q&A** - Manage FAQ items
- **Messages** - View contact form submissions
- **Newsletter** - Manage email subscribers
- **Settings** - Update site settings & social links

### Aura AI Assistant

- Engages visitors after they interact
- Collects lead information after 4 messages
- Stores leads in messages collection
- Admin can view and respond

## 🎯 Features in Detail

### Video Gallery
- Supports YouTube videos and Shorts
- Automatic thumbnail extraction
- Modal video player
- Edit functionality in admin
- Real thumbnails, not placeholders

### Contact Form
- Toast notifications
- Spam protection
- Admin notification
- Aura Assistant integration

### Newsletter
- Email validation
- Duplicate prevention
- Admin management
- Export capability

### Projects
- Category filtering
- Featured projects
- Live demo & GitHub links
- Tag system

### Blog
- Full blog system
- Reading time
- Author info
- Tags & categories

## 🐛 Troubleshooting

### API Routes Not Working Locally
Use `vercel dev` instead of `npm run dev`

### MongoDB Connection Issues
- Check connection string
- Verify IP whitelist in MongoDB Atlas
- Check cluster status

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist .vercel
npm install
npm run build
```

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and customize for your own use!

## 📄 License

All rights reserved © 2025 Aurangzeb Sunny

## 📧 Contact

- **Email**: aurangzeb@example.com
- **LinkedIn**: [linkedin.com/in/aurangzebsunny](https://linkedin.com/in/aurangzebsunny)
- **GitHub**: [github.com/aurangzebsunny](https://github.com/aurangzebsunny)
- **Instagram**: [instagram.com/aurangzebsunny](https://instagram.com/aurangzebsunny)

---

**Made with ❤️ using React, TypeScript, and MongoDB**
