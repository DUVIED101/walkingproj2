# RouteWise Setup Guide

Complete setup guide for the RouteWise travel route discovery platform.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js 18+**: [Download from nodejs.org](https://nodejs.org/)
- **npm 8+**: Comes with Node.js
- **Git**: [Download from git-scm.com](https://git-scm.com/)
- **A code editor**: VS Code, WebStorm, or similar

### Verify Installation
```bash
node --version    # Should show v18.0.0 or higher
npm --version     # Should show 8.0.0 or higher
git --version     # Any recent version
```

## 🚀 Quick Start (5 minutes)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/routewise.git
cd routewise
```

### 2. Install Dependencies
```bash
npm install
```
This will install all frontend and backend dependencies defined in `package.json`.

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to `http://localhost:5000`

You should see the RouteWise home page with sample routes loaded.

## 📁 Project Structure Overview


```
routewise/
├── README.md                  # Main documentation
├── SETUP.md                  # This file
├── DEPLOYMENT.md             # Deployment guide
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── vite.config.ts            # Vite build configuration
├── replit.md                 # Project context and preferences
│
├── client/                   # Frontend React application
│   ├── index.html           # HTML entry point
│   ├── src/
│   │   ├── App.tsx          # Main app component with routing
│   │   ├── main.tsx         # React entry point
│   │   ├── index.css        # Global styles and CSS variables
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-based page components
│   │   ├── hooks/           # Custom React hooks
│   │   └── lib/             # Utilities and configurations
│   └── public/              # Static assets
│
├── server/                   # Backend Express.js application
│   ├── index.ts             # Server entry point and configuration
│   ├── routes.ts            # API route handlers
│   ├── storage.ts           # Data layer with in-memory storage
│   └── vite.ts              # Vite integration for development
│
├── shared/                   # Shared types and schemas
│   └── schema.ts            # TypeScript interfaces and Zod schemas
│
└── components.json           # shadcn/ui configuration
```

## 🔧 Development Environment Setup

### VS Code Extensions (Recommended)
Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-typescript.typescript",
    "christian-kohler.npm-intellisense",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### VS Code Settings
Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  }
}
```

## 🎨 Understanding the Design System

### Color System
The app uses iOS-inspired colors defined in `client/src/index.css`:

```css
:root {
  --ios-blue: hsl(210 100% 50%);      # Primary actions
  --ios-green: hsl(120 63% 49%);      # Success states
  --ios-orange: hsl(25 100% 50%);     # Warnings
  --ios-red: hsl(5 78% 57%);          # Errors
  --ios-gray: hsl(240 3.7% 15.9%);    # Text
  --ios-light-gray: hsl(240 9% 89%);  # Backgrounds
}
```

### Typography
Uses SF Pro Display/Text (system fonts) with these weights:
- **Light (300)**: Large headers
- **Regular (400)**: Body text
- **Medium (500)**: Subheadings
- **Semibold (600)**: Navigation
- **Bold (700)**: Titles

### Components
All UI components are built with shadcn/ui and customized for iOS feel:
- **Buttons**: Rounded corners, iOS-style shadows
- **Cards**: Elevated appearance with subtle shadows
- **Navigation**: Bottom tab bar for mobile
- **Sheets**: iOS-style modal presentations

## 📱 Mobile-First Development

### Responsive Breakpoints
```css
/* Mobile-first approach */
.mobile-container {
  max-width: 428px;     /* iPhone 14 Pro Max width */
  margin: 0 auto;
}

/* Safe area handling for iOS */
.safe-top {
  padding-top: env(safe-area-inset-top, 44px);
}

.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom, 34px);
}
```

### Testing on Mobile Devices

#### Chrome DevTools
1. Open Chrome DevTools (F12)
2. Click the device toolbar icon (📱)
3. Select iPhone or Android device
4. Test touch interactions and responsiveness

#### Real Device Testing
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access `http://YOUR_IP:5000` from your mobile device
3. Ensure both devices are on the same network

#### PWA Testing
1. Open the app in mobile Safari or Chrome
2. Look for "Add to Home Screen" option
3. Install and test as a standalone app

## 🗄️ Data Layer Understanding

### Current Storage System
The app uses in-memory storage (`server/storage.ts`) for development:

```typescript
// Sample route structure
const sampleRoute: Route = {
  id: "route-1",
  title: "Mission District Street Art",
  description: "Explore vibrant murals and local culture",
  category: "culture-art",
  duration: 150,        // minutes
  distance: "3.2",      // kilometers
  stops: [              // Array of route stops
    {
      id: "stop-1",
      name: "Balmy Alley Murals",
      latitude: 37.748,
      longitude: -122.415,
      estimatedTimeMinutes: 20
    }
  ]
};
```

### Database Integration (Future)
To replace in-memory storage with a real database:

1. **PostgreSQL Setup**
   ```bash
   npm install pg @types/pg drizzle-orm
   ```

2. **Update Storage Interface**
   Replace `MemStorage` class in `server/storage.ts` with database queries

3. **Environment Configuration**
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/routewise
   ```

## 🔌 API Endpoints

### Routes API
```
GET  /api/routes                    # Get all routes with optional filters
GET  /api/routes/:id               # Get specific route details
POST /api/routes                   # Create new route (admin)
```

### User API
```
GET  /api/users/:id                        # Get user profile
GET  /api/users/:userId/saved-routes       # Get user's saved routes
POST /api/users/:userId/saved-routes       # Save a route
GET  /api/users/:userId/completed-routes   # Get completed routes
```

### Route Progress API
```
GET  /api/users/:userId/routes/:routeId/progress    # Get route progress
POST /api/users/:userId/routes/:routeId/progress    # Update progress
```

## 🧪 Testing Your Changes

### Manual Testing Checklist
- [ ] **Home Page**: Routes load, search works, filters function
- [ ] **Route Details**: Information displays correctly, navigation works
- [ ] **Map View**: Step navigation works, photo capture available
- [ ] **Camera**: Interface responds (placeholder functionality)
- [ ] **Profile**: User data displays, statistics calculate correctly
- [ ] **Mobile Navigation**: Bottom tabs work on all pages
- [ ] **Responsive Design**: Works on different screen sizes

### API Testing with curl
```bash
# Test routes endpoint
curl http://localhost:5000/api/routes

# Test specific route
curl http://localhost:5000/api/routes/route-1

# Test with filters
curl "http://localhost:5000/api/routes?category=food-drink&duration=medium"

# Test user endpoint
curl http://localhost:5000/api/users/user-1
```

### Browser Network Tab
1. Open Developer Tools
2. Go to Network tab
3. Interact with the app
4. Check for failed requests or slow responses

## 🔄 Making Changes

### Adding a New Route
1. Open `server/storage.ts`
2. Add your route object to the `sampleRoutes` array:

```typescript
{
  id: "route-new",
  title: "Your Route Title",
  description: "Brief description",
  longDescription: "Detailed description for route page",
  category: "food-drink", // or culture-art, hidden-gems, nightlife
  heroImage: "https://your-image-url.com/image.jpg",
  duration: 120,          // minutes
  distance: "2.5",        // kilometers
  difficulty: "easy",     // easy, moderate, challenging
  stops: [
    {
      id: "stop-new-1",
      name: "Stop Name",
      description: "What visitors will see/do here",
      image: "https://stop-image-url.com/image.jpg",
      latitude: 37.7749,   // GPS coordinates
      longitude: -122.4194,
      order: 1,
      estimatedTimeMinutes: 25
    }
  ],
  isPublished: true,
  createdBy: "user-1"
}
```

3. Restart the development server: `npm run dev`

### Adding a New Page
1. Create component in `client/src/pages/your-page.tsx`
2. Add route in `client/src/App.tsx`:

```typescript
import YourPage from "@/pages/your-page";

// Add to Router component
<Route path="/your-path" component={YourPage} />
```

3. Add navigation link if needed in `client/src/components/bottom-navigation.tsx`

### Modifying Styles
1. **Global styles**: Edit `client/src/index.css`
2. **Component styles**: Use Tailwind classes in JSX
3. **New colors**: Add to CSS variables in `:root` section
4. **Responsive design**: Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`)

### Adding New API Endpoints
1. Define route handler in `server/routes.ts`:

```typescript
app.get("/api/your-endpoint", async (req, res) => {
  try {
    const data = await storage.yourMethod();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error message" });
  }
});
```

2. Add method to storage interface in `server/storage.ts`
3. Update frontend to use new endpoint with TanStack Query

## 🔍 Debugging Tips

### Common Issues

#### "Module not found" Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Port Already in Use
```bash
# Find and kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port
PORT=3000 npm run dev
```

#### TypeScript Errors
```bash
# Check types without building
npx tsc --noEmit

# View detailed error information
npx tsc --noEmit --pretty
```

#### Build Errors
```bash
# Clear build cache
rm -rf dist/
npm run build
```

### Development Tools

#### Chrome DevTools
- **Elements**: Inspect HTML and CSS
- **Console**: View JavaScript errors and logs
- **Network**: Monitor API requests and responses
- **Application**: Test PWA features, storage, service workers

#### VS Code Debugging
1. Install "TypeScript Debugger" extension
2. Add breakpoints in your code
3. Run "Start Debugging" (F5)

## 🌐 PWA Features

### Service Worker
The app includes PWA capabilities:
- **Offline functionality**: Basic app shell works offline
- **Installable**: Can be added to home screen
- **Responsive**: Works on all device sizes

### Testing PWA Features
1. **Chrome**: DevTools > Application > Manifest
2. **Installation**: Look for install prompt or "Add to Home Screen"
3. **Offline**: DevTools > Network > Offline checkbox

## 📚 Learning Resources

### Technologies Used
- **React**: [Official React Docs](https://react.dev)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **Tailwind CSS**: [Tailwind Documentation](https://tailwindcss.com/docs)
- **Express.js**: [Express Guide](https://expressjs.com/en/guide/routing.html)
- **TanStack Query**: [Query Documentation](https://tanstack.com/query/latest)

### Design Resources
- **iOS Guidelines**: [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- **shadcn/ui**: [Component Library](https://ui.shadcn.com/)
- **Lucide Icons**: [Icon Library](https://lucide.dev/)

## 🤝 Getting Help

### Before Asking for Help
1. Check this setup guide
2. Look at the README.md for feature documentation
3. Review the DEPLOYMENT.md for production issues
4. Check the browser console for error messages
5. Test API endpoints with curl or Postman

### Where to Get Help
- **GitHub Issues**: For bugs and feature requests
- **Documentation**: README.md and inline code comments
- **Community**: Join discussions in the repository

---

**Happy coding! 🎉** You're now ready to develop and customize RouteWise.