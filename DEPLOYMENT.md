# RouteWise Deployment Guide

This guide covers multiple deployment options for the RouteWise travel route discovery platform.

## 🏗️ Pre-Deployment Checklist

Before deploying, ensure:
- [ ] All environment variables are configured
- [ ] Database connection is working (if using external DB)
- [ ] Build process completes without errors
- [ ] Mobile responsiveness is tested
- [ ] PWA manifest is configured

## 🔧 Environment Configuration

Create a `.env` file in your project root:

```env
# Server Configuration
NODE_ENV=production
PORT=5000

# Database (Optional - currently using in-memory storage)
DATABASE_URL=postgresql://user:password@localhost:5432/routewise

# External APIs (when implemented)
MAPS_API_KEY=your_maps_api_key
IMAGE_UPLOAD_SERVICE=your_image_service_url

# Security
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=https://your-domain.com
```

## 🚀 Deployment Options

### 1. Replit Deployment (Recommended)

**Best for:** Quick deployment, development, and testing

#### Step 1: Import to Replit
1. Go to [Replit](https://replit.com)
2. Click "Import from GitHub"
3. Enter your repository URL: `https://github.com/yourusername/routewise`
4. Select "Node.js" as the language

#### Step 2: Configure
Replit will automatically detect the configuration from `.replit` file:

```yaml
# .replit file (already included)
run = "npm run dev"
modules = ["nodejs-20"]

[deployment]
build = ["npm", "run", "build"]
run = ["npm", "start"]
```

#### Step 3: Deploy
1. Click the "Deploy" button in Replit
2. Configure deployment settings:
   - **Type**: Autoscale deployment
   - **Build command**: `npm run build`
   - **Run command**: `npm start`
3. Your app will be available at `https://routewise.yourusername.repl.co`

#### Step 4: Custom Domain (Optional)
1. Go to deployment settings
2. Add your custom domain
3. Configure DNS to point to Replit

### 2. Vercel Deployment

**Best for:** Frontend-heavy apps with serverless functions

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Configure vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/dist/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/client/dist/$1"
    }
  ],
  "functions": {
    "server/index.ts": {
      "maxDuration": 30
    }
  }
}
```

#### Step 3: Deploy
```bash
# Build the application
npm run build

# Deploy
vercel

# Follow prompts:
# - Project name: routewise
# - Framework: Other
# - Build command: npm run build
# - Output directory: dist
```

#### Step 4: Environment Variables
```bash
vercel env add NODE_ENV production
vercel env add PORT 5000
# Add other environment variables as needed
```

### 3. Railway Deployment

**Best for:** Full-stack apps with database needs

#### Step 1: Connect Repository
1. Go to [Railway](https://railway.app)
2. Click "Deploy from GitHub repo"
3. Select your RouteWise repository
4. Grant necessary permissions

#### Step 2: Configure Build
Railway will auto-detect Node.js and use:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

#### Step 3: Environment Variables
Add in Railway dashboard:
```
NODE_ENV=production
PORT=$PORT (Railway sets this automatically)
```

#### Step 4: Database (Optional)
```bash
# Add PostgreSQL database
railway add postgresql

# This will automatically set DATABASE_URL
```

### 4. Heroku Deployment

**Best for:** Traditional deployment with add-ons

#### Step 1: Install Heroku CLI
Download from [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

#### Step 2: Create Application
```bash
# Login to Heroku
heroku login

# Create app
heroku create routewise-app

# Add Node.js buildpack
heroku buildpacks:add heroku/nodejs
```

#### Step 3: Configure Package.json
Ensure these scripts exist:
```json
{
  "scripts": {
    "build": "tsc && vite build",
    "start": "node dist/server/index.js",
    "heroku-postbuild": "npm run build"
  }
}
```

#### Step 4: Deploy
```bash
# Deploy
git push heroku main

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set PORT=$PORT

# View logs
heroku logs --tail
```

#### Step 5: Add Database (Optional)
```bash
# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# This sets DATABASE_URL automatically
```

### 5. AWS EC2 Deployment

**Best for:** Full control and scalability

#### Step 1: Launch EC2 Instance
1. Go to AWS Console → EC2
2. Launch Instance:
   - **AMI**: Ubuntu 20.04 LTS
   - **Instance Type**: t3.micro (for testing)
   - **Security Group**: Allow HTTP (80), HTTPS (443), SSH (22)

#### Step 2: Connect and Setup
```bash
# Connect to instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx
```

#### Step 3: Deploy Application
```bash
# Clone repository
git clone https://github.com/yourusername/routewise.git
cd routewise

# Install dependencies and build
npm install
npm run build

# Start with PM2
pm2 start dist/server/index.js --name routewise
pm2 save
pm2 startup
```

#### Step 4: Configure Nginx
```nginx
# /etc/nginx/sites-available/routewise
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/routewise /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Step 5: SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 🗄️ Database Setup

### PostgreSQL (Production)

#### Step 1: Install PostgreSQL
```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# macOS
brew install postgresql
```

#### Step 2: Create Database
```sql
-- Connect to PostgreSQL
sudo -u postgres psql

-- Create database and user
CREATE DATABASE routewise;
CREATE USER routewise_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE routewise TO routewise_user;
```

#### Step 3: Update Connection
```env
DATABASE_URL=postgresql://routewise_user:secure_password@localhost:5432/routewise
```

#### Step 4: Run Migrations
```bash
# Install Drizzle CLI
npm install -g drizzle-kit

# Generate migration
npm run db:generate

# Push to database
npm run db:push
```

### MongoDB (Alternative)

#### Step 1: Install MongoDB
```bash
# Ubuntu
sudo apt install mongodb

# Or use MongoDB Atlas (cloud)
```

#### Step 2: Update Storage Layer
Replace PostgreSQL schemas with MongoDB collections in `server/storage.ts`

## 🔐 Security Configuration

### Environment Variables
Never commit sensitive data. Use environment variables:

```bash
# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Set in environment
export JWT_SECRET=your_generated_secret
```

### CORS Configuration
Update `server/index.ts`:

```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
```

### Rate Limiting
```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

## 📊 Monitoring and Logging

### PM2 Monitoring (Node.js)
```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs routewise

# Restart application
pm2 restart routewise
```

### Application Monitoring
Consider integrating:
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Google Analytics**: User analytics

## 🚀 Performance Optimization

### Build Optimization
```json
{
  "scripts": {
    "build:analyze": "vite build --mode analyze",
    "build:prod": "vite build --mode production"
  }
}
```

### CDN Configuration
Use CDN for static assets:
```typescript
// In production
const STATIC_URL = process.env.CDN_URL || '/static';
```

### Caching Strategy
```typescript
// Cache API responses
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
  next();
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy RouteWise

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build application
      run: npm run build
      
    - name: Deploy to production
      run: |
        # Your deployment commands here
        echo "Deploying to production..."
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 5000
lsof -ti:5000

# Kill process
kill -9 $(lsof -ti:5000)
```

#### Build Failures
```bash
# Clear cache
npm run clean
rm -rf node_modules package-lock.json
npm install
```

#### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
```

### Debug Mode
```bash
# Start in debug mode
DEBUG=* npm run dev
```

## 📝 Post-Deployment

### Health Checks
Verify deployment:
- [ ] Application loads at deployed URL
- [ ] API endpoints respond correctly
- [ ] Database connections work
- [ ] Mobile interface functions
- [ ] PWA features work (offline, install)

### Performance Testing
```bash
# Load testing with Artillery
npm install -g artillery
artillery quick --duration 60 --rate 10 https://your-domain.com
```

### Monitoring Setup
1. Set up uptime monitoring
2. Configure error alerting
3. Monitor performance metrics
4. Set up backup procedures

---

**Need help?** Check the main README.md or create an issue on GitHub.