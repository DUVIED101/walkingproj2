# RouteWise Package Scripts Reference

Quick reference for all available npm scripts in the RouteWise project.

## 🚀 Development Scripts

### `npm run dev`
**Purpose**: Start the development server
**What it does**:
- Starts Express.js server on port 5000
- Runs Vite dev server for hot reloading
- Serves both frontend and backend
- Enables TypeScript compilation
- Provides request/response logging

**Usage**:
```bash
npm run dev
```

**Output**: Server starts at `http://localhost:5000`

---

### `npm run build`
**Purpose**: Build the application for production
**What it does**:
- Compiles TypeScript to JavaScript
- Bundles frontend assets with Vite
- Optimizes images and static files
- Creates production-ready dist/ folder
- Minifies CSS and JavaScript

**Usage**:
```bash
npm run build
```

**Output**: Creates `dist/` directory with production files

---

### `npm start`
**Purpose**: Start the production server
**What it does**:
- Runs the built application from dist/
- Serves static files and API routes
- No hot reloading (production mode)

**Usage**:
```bash
npm run build  # Build first
npm start      # Then start production server
```

**Note**: Must run `npm run build` before `npm start`

---

## 🧹 Utility Scripts

### `npm run clean`
**Purpose**: Clean build artifacts and dependencies
**What it does**:
- Removes `dist/` directory
- Clears TypeScript build cache
- Removes node_modules (optional)

**Usage**:
```bash
npm run clean
```

---

### `npm run type-check`
**Purpose**: Check TypeScript types without building
**What it does**:
- Validates TypeScript across the project
- Reports type errors
- Doesn't generate output files

**Usage**:
```bash
npm run type-check
```

---

## 📱 Mobile and PWA Scripts

### `npm run preview`
**Purpose**: Preview production build locally
**What it does**:
- Serves the built application
- Simulates production environment
- Tests PWA functionality

**Usage**:
```bash
npm run build
npm run preview
```

---

## 🗄️ Database Scripts (Future Use)

### `npm run db:generate`
**Purpose**: Generate database migration files
**What it does**:
- Uses Drizzle Kit to create migrations
- Compares schema changes
- Generates SQL migration files

**Usage**:
```bash
npm run db:generate
```

**Note**: Currently not used (in-memory storage), but ready for database integration

---

### `npm run db:migrate`
**Purpose**: Apply database migrations
**What it does**:
- Runs pending migrations
- Updates database schema
- Syncs with schema.ts definitions

**Usage**:
```bash
npm run db:migrate
```

---

### `npm run db:push`
**Purpose**: Push schema changes directly to database
**What it does**:
- Syncs schema.ts with database
- Bypasses migration files
- For development use only

**Usage**:
```bash
npm run db:push
```

---

### `npm run db:studio`
**Purpose**: Open Drizzle Studio for database management
**What it does**:
- Launches web-based database GUI
- Allows data viewing and editing
- Provides schema visualization

**Usage**:
```bash
npm run db:studio
```

---

## 🧪 Testing Scripts (Future Use)

### `npm test`
**Purpose**: Run the test suite
**What it does**:
- Executes unit tests
- Runs integration tests
- Generates coverage reports

**Usage**:
```bash
npm test
```

---

### `npm run test:watch`
**Purpose**: Run tests in watch mode
**What it does**:
- Monitors file changes
- Re-runs tests automatically
- Provides instant feedback

**Usage**:
```bash
npm run test:watch
```

---

## 📦 Build Analysis Scripts

### `npm run analyze`
**Purpose**: Analyze bundle size and performance
**What it does**:
- Generates bundle analysis report
- Shows dependency sizes
- Identifies optimization opportunities

**Usage**:
```bash
npm run analyze
```

---

## 🚀 Deployment Scripts

### `npm run deploy:staging`
**Purpose**: Deploy to staging environment
**What it does**:
- Builds the application
- Deploys to staging server
- Runs post-deployment checks

**Usage**:
```bash
npm run deploy:staging
```

---

### `npm run deploy:production`
**Purpose**: Deploy to production environment
**What it does**:
- Builds optimized production bundle
- Deploys to production server
- Runs health checks

**Usage**:
```bash
npm run deploy:production
```

---

## 🔧 Development Helpers

### Common Workflows

#### Full Reset and Restart
```bash
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### Production Test
```bash
npm run build
npm start
# Test at http://localhost:5000
```

#### Type Safety Check
```bash
npm run type-check
# Fix any TypeScript errors
npm run build
```

#### Development with Clean Slate
```bash
npm run clean
npm run dev
```

---

## 🚨 Troubleshooting Scripts

### Port Issues
If port 5000 is in use:
```bash
# Find process using port
lsof -ti:5000

# Kill process
kill -9 $(lsof -ti:5000)

# Or use different port
PORT=3000 npm run dev
```

### Build Issues
```bash
# Clean everything
npm run clean
rm -rf node_modules
npm install

# Check types first
npm run type-check

# Then build
npm run build
```

### Package Issues
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Audit for security issues
npm audit
npm audit fix
```

---

## 📊 Performance Scripts

### Bundle Analysis
```bash
npm run build
npm run analyze
# Opens bundle analyzer in browser
```

### Performance Profiling
```bash
# Development profiling
NODE_ENV=development npm run dev

# Production profiling
npm run build
NODE_ENV=production npm start
```

---

## 🌐 Environment-Specific Scripts

### Development Environment
```bash
NODE_ENV=development npm run dev
```

### Production Environment
```bash
NODE_ENV=production npm run build
NODE_ENV=production npm start
```

### Staging Environment
```bash
NODE_ENV=staging npm run build
NODE_ENV=staging npm start
```

---

## 📝 Notes

- **Development**: Use `npm run dev` for active development with hot reloading
- **Testing**: Always run `npm run build` before `npm start`
- **Production**: Use proper environment variables in production
- **Debugging**: Check console output for detailed error messages
- **Performance**: Use `npm run analyze` to optimize bundle size

---

## 🆘 Getting Help

If any script fails:

1. **Check the error message** in the console
2. **Verify Node.js version**: `node --version` (should be 18+)
3. **Clear caches**: `npm run clean`
4. **Reinstall dependencies**: `rm -rf node_modules && npm install`
5. **Check logs**: Most scripts provide detailed error information

For script-specific issues, refer to the main README.md or create an issue in the repository.