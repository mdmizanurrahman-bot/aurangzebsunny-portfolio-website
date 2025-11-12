# Migration Guide: localStorage → MongoDB/API

## Overview

This guide explains how to complete the migration from localStorage to MongoDB/API storage.

## What's Been Done

✅ Created 12 API endpoints in `/api` folder
✅ Set up MongoDB connection and initialization
✅ Created `api-storage.tsx` with async API calls
✅ Updated VideoGallery component as an example
✅ Added Vercel configuration files
✅ Created deployment documentation

## What Needs To Be Done

You need to update the remaining components to use async storage. Here's the pattern:

### Pattern for Migration

**Before (localStorage - synchronous):**
```tsx
import { storage } from '../utils/storage';

export function MyComponent() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = () => {
    const items = storage.getItems(); // Synchronous
    setData(items);
  };
}
```

**After (API - asynchronous):**
```tsx
import { storage } from '../utils/api-storage';

export function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {  // Make async
    try {
      setLoading(true);
      const items = await storage.getItems(); // Await the promise
      setData(items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };
}
```

## Files That Need Updating

### 1. Public Components (High Priority)

- [x] `/components/VideoGallery.tsx` ✅ DONE
- [ ] `/components/Projects.tsx`
- [ ] `/components/Posts.tsx`
- [ ] `/components/Certificates.tsx`
- [ ] `/components/Jobs.tsx`
- [ ] `/components/Reviews.tsx`
- [ ] `/components/QA.tsx`

### 2. Interactive Components

- [ ] `/components/Contact.tsx` - Update form submission
- [ ] `/components/Footer.tsx` - Update newsletter subscription
- [ ] `/components/AuraAssistant.tsx` - Update lead submission
- [ ] `/components/Navigation.tsx` - Update settings loading
- [ ] `/components/About.tsx` - Update settings loading

### 3. Admin Dashboard (Critical)

- [ ] `/components/admin/AdminDashboard.tsx` - Update all CRUD operations

## Detailed Migration Steps

### For Public Display Components

Files: Projects, Posts, Certificates, Jobs, Reviews, QA

1. Change import:
```tsx
// OLD
import { storage } from '../utils/storage';

// NEW
import { storage } from '../utils/api-storage';
```

2. Add loading state:
```tsx
const [loading, setLoading] = useState(true);
```

3. Make load function async:
```tsx
const loadData = async () => {
  try {
    setLoading(true);
    const data = await storage.getData();
    setData(data);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};
```

4. Add loading UI:
```tsx
if (loading) {
  return <div>Loading...</div>;
}
```

### For Form Components

Files: Contact, Footer (newsletter), AuraAssistant

1. Change import (same as above)

2. Make submit handlers async:
```tsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await storage.addMessage(formData);
    toast.success('Message sent!');
  } catch (error) {
    toast.error('Failed to send message');
  }
};
```

### For Admin Dashboard

This is the most complex file. Each view function needs:

1. Change import at top
2. Update all `onRefresh` callbacks to be async
3. Add error handling for all operations
4. Example for ProjectsView:

```tsx
const handleSave = async () => {
  try {
    if (editingId) {
      await storage.updateProject(editingId, formData);
      toast.success('Project updated!');
    } else {
      await storage.addProject(formData);
      toast.success('Project added!');
    }
    setIsDialogOpen(false);
    await onRefresh(); // Make sure parent refreshes
  } catch (error) {
    toast.error('Failed to save project');
  }
};
```

## Quick Migration Script

Here's a bash script to help update imports automatically:

```bash
# Update all imports from storage to api-storage
find ./components -name "*.tsx" -type f -exec sed -i '' 's/from.*utils\/storage/from ..\/utils\/api-storage/g' {} +
find ./components/admin -name "*.tsx" -type f -exec sed -i '' 's/from.*utils\/storage/from ..\/..\/utils\/api-storage/g' {} +
```

**Warning**: This only updates imports. You still need to manually add async/await and error handling!

## Testing Checklist

After migration, test these features:

### Public Site
- [ ] Projects load and display correctly
- [ ] Blog posts load and display correctly
- [ ] Videos load and play correctly
- [ ] Certificates display correctly
- [ ] Jobs timeline displays correctly
- [ ] Client reviews display correctly
- [ ] Q&A accordion works
- [ ] Contact form submits successfully
- [ ] Newsletter subscription works
- [ ] Aura Assistant saves leads

### Admin Panel
- [ ] Login works
- [ ] Dashboard shows correct analytics
- [ ] Can add/edit/delete projects
- [ ] Can add/edit/delete posts
- [ ] Can add/edit/delete videos
- [ ] Can add/delete certificates
- [ ] Can add/edit/delete jobs
- [ ] Can add/delete reviews
- [ ] Can add/edit/delete Q&A items
- [ ] Can view/reply to messages
- [ ] Can manage newsletter subscribers
- [ ] Can update settings

## Deployment Checklist

- [ ] Install dependencies: `npm install`
- [ ] Test locally with: `vercel dev`
- [ ] Set environment variables in Vercel
- [ ] Deploy to Vercel: `vercel --prod`
- [ ] Verify MongoDB connection
- [ ] Test all features on production
- [ ] Monitor API logs in Vercel dashboard
- [ ] Check MongoDB Atlas for data

## Common Issues & Solutions

### Issue: "Cannot read property of undefined"
**Solution**: Add null checks and loading states

### Issue: "API route not found"
**Solution**: Make sure you're using `vercel dev` locally, or routes are deployed on Vercel

### Issue: "CORS errors"
**Solution**: API routes have CORS headers. If issues persist, check Vercel logs

### Issue: "MongoDB connection timeout"
**Solution**: 
- Check MongoDB Atlas IP whitelist (set to 0.0.0.0/0 for Vercel)
- Verify connection string in environment variables
- Check MongoDB cluster status

### Issue: "Data not persisting"
**Solution**: Verify API routes are actually being called (check Network tab in DevTools)

## Need Help?

1. Check deployment logs in Vercel dashboard
2. Check MongoDB Atlas monitoring
3. Check browser console for errors
4. Check Network tab for failed API calls
5. Review this guide and DEPLOYMENT.md

## Quick Start (If You Want To Deploy Now)

If you want to deploy immediately without migrating everything:

1. Keep using localStorage for now
2. Just deploy to Vercel
3. It will work in "localStorage mode"
4. Migrate components one by one later
5. Switch to API storage when ready

To do this, update `/utils/storage-wrapper.tsx`:
```tsx
// Use localStorage (current)
export { storage } from './storage';

// Use API (MongoDB) - comment out for now
// export { storage } from './api-storage';
```

This gives you a gradual migration path!
