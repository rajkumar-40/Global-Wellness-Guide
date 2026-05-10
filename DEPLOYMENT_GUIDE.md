# Global Wellness Guide - Deployment Guide

## Prerequisites

1. **Google Account** with Firebase project access
2. **Firebase CLI** installed locally
3. **Node.js** (v18+) and npm
4. **git** and GitHub account

## Step 1: Set Up Firebase Project

### 1.1 Create a Firebase Project (if not already done)
- Go to [Firebase Console](https://console.firebase.google.com/)
- Click "Add Project"
- Name it (e.g., "global-wellness-guide")
- Enable Google Analytics if desired
- Click "Create Project"

### 1.2 Get Your Firebase Project ID
- In Firebase Console, go to **Project Settings**
- Copy your **Project ID** (you'll need this for deployment)

## Step 2: Get Google Generative AI API Key

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Select your Firebase Project
4. Copy the API Key
5. **Keep this secure** - never commit to version control

## Step 3: Install and Configure Firebase CLI

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project directory
firebase init app-hosting
```

When prompted:
- Select your Firebase Project
- Confirm the service ID: `global-wellness-guide`
- Select "Next.js" when asked about the framework

## Step 4: Set Environment Variables

### For Local Development:
```bash
# Create .env.local from the example
cp .env.local.example .env.local

# Edit .env.local and add your actual API keys
nano .env.local
```

### For Production (Firebase App Hosting):
```bash
# Set environment variables in Firebase
firebase apphosting:secrets:set GOOGLE_GENAI_API_KEY

# When prompted, paste your Google Generative AI API Key
```

For Firebase-specific variables (if needed):
```bash
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_API_KEY
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_PROJECT_ID
# ... and other Firebase variables
```

## Step 5: Deploy to Firebase App Hosting

### Option A: Deploy from Command Line

```bash
# Build the project
npm run build

# Deploy to Firebase App Hosting
firebase apphosting:deploy

# The CLI will provide your live URL
```

### Option B: Set Up Automatic Deployments (GitHub)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect GitHub to Firebase**
   - In Firebase Console, go to **App Hosting**
   - Click "Connect Repository"
   - Select your GitHub repository
   - Choose branch: `main`
   - Set build configuration:
     - Build command: `npm run build`
     - Output directory: `.next`

3. **Deploy** - Firebase will automatically deploy on every push to `main`

## Step 6: Configure Custom Domain (Optional)

1. In Firebase Console → **App Hosting**
2. Click "Manage Custom Domain"
3. Add your domain (e.g., globalwellnessguide.com)
4. Follow DNS configuration instructions provided

## Step 7: Monitor and Scale

### View Logs:
```bash
firebase apphosting:logs
```

### Adjust Instance Scaling:
Edit `apphosting.yaml`:
```yaml
runConfig:
  maxInstances: 3  # Increase based on traffic
  minInstances: 1
  cpuCores: 2
  memoryMiB: 1024
```

Then redeploy:
```bash
firebase apphosting:deploy
```

## Troubleshooting

### Build Fails
```bash
# Clear build cache and redeploy
rm -rf .next
npm run build
firebase apphosting:deploy
```

### API Key Error
- Verify `GOOGLE_GENAI_API_KEY` is set in Firebase Console
- Check that the key is valid at [Google AI Studio](https://ai.google.dev/)

### Connection Issues
```bash
# Test local build
npm run build && npm run start

# Check logs
firebase apphosting:logs
```

### Performance Issues
- Increase `maxInstances` in `apphosting.yaml`
- Enable caching in `next.config.ts`
- Consider Firebase Performance Monitoring

## Monitoring Checklist

- [ ] App loads and responds to requests
- [ ] Form submissions work correctly
- [ ] AI responses generate without errors
- [ ] SSL certificate is valid (HTTPS)
- [ ] Performance is acceptable (< 3s load time)
- [ ] Error logs are reviewed regularly

## Support

- **Firebase Documentation**: https://firebase.google.com/docs/app-hosting
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Google AI API**: https://ai.google.dev/docs

## Next Steps After Deployment

1. **Test thoroughly** using the live URL
2. **Set up error monitoring** (Firebase Crashlytics)
3. **Enable analytics** to track user behavior
4. **Create backup** of your Firestore data
5. **Set up automated backups** in Firebase
