# Vercel Deployment Guide

## Changes Made to Fix FUNCTION_INVOCATION_FAILED

### 1. **server.js**
- ✅ Removed file system operations (`fs.mkdirSync`, `fs.existsSync`)
- ✅ Removed static file serving (`express.static` for uploads)
- ✅ Changed `connectDB()` to async with `.catch()` instead of blocking
- ✅ Added proper error handling middleware
- ✅ Added 404 handler
- ✅ Changed root route to return JSON instead of plain text
- ✅ Added `/api/health` endpoint for monitoring

### 2. **config/db.js**
- ✅ Removed `process.exit(1)` (kills serverless function)
- ✅ Added connection caching for serverless
- ✅ Added MongoDB connection options for stability
- ✅ Changed to throw error instead of exit

### 3. **vercel.json**
- ✅ Added `NODE_ENV: production` environment variable

## Required Environment Variables

Add these in Vercel Dashboard → Project → Settings → Environment Variables:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=mySuperSecretKey123
FRONTEND_URL=https://your-frontend.vercel.app
PORT=5000
NODE_ENV=production
```

## File Upload Issue

⚠️ **IMPORTANT:** Vercel serverless functions have read-only file system.

Your current upload system won't work on Vercel. You need to:

**Option 1: Use Cloudinary (Recommended)**
```bash
npm install cloudinary multer-storage-cloudinary
```

**Option 2: Use AWS S3**
```bash
npm install @aws-sdk/client-s3 multer-s3
```

**Option 3: Use Vercel Blob Storage**
```bash
npm install @vercel/blob
```

For now, file uploads will fail. You need to implement cloud storage.

## Deployment Steps

### 1. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your Git repository
4. Configure:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: `npm install`
5. Add environment variables
6. Click "Deploy"

### 3. Deploy via CLI
```bash
vercel --prod
```

## Testing After Deployment

### Test endpoints:
```bash
# Health check
curl https://your-app.vercel.app/api/health

# Root
curl https://your-app.vercel.app/

# Register
curl -X POST https://your-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"test123"}'

# Jobs
curl https://your-app.vercel.app/api/jobs
```

## Why FUNCTION_INVOCATION_FAILED Happened

### Problems:
1. **File System Access** - `fs.mkdirSync()` tried to write to read-only system
2. **Synchronous DB Connection** - `connectDB()` called without awaiting
3. **Process.exit(1)** - Immediately killed the function on DB error
4. **Static File Serving** - Can't serve files from local filesystem

### Solutions Applied:
1. ✅ Removed all file system operations
2. ✅ Made DB connection async with error handling
3. ✅ Removed `process.exit()`, throw error instead
4. ✅ Removed static file middleware (needs cloud storage)
5. ✅ Added connection caching for performance
6. ✅ Added proper error handlers

## Next Steps

1. ✅ Deploy to Vercel
2. ⚠️ Implement cloud storage for file uploads (Cloudinary/S3/Vercel Blob)
3. ✅ Test all API endpoints
4. ✅ Update frontend URL in CORS settings

## Important Notes

- MongoDB Atlas must allow connections from `0.0.0.0/0` (Vercel IPs change)
- File uploads won't work until cloud storage is implemented
- Logs available in Vercel Dashboard → Project → Deployments → Logs
- Cold starts may take 1-2 seconds on first request

## Troubleshooting

If you still see errors:

1. Check Vercel logs: Dashboard → Your Project → Deployments → Click deployment → Logs
2. Verify environment variables are set correctly
3. Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
4. Test MongoDB connection string locally first
5. Check if MongoDB user has correct permissions
