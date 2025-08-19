# RouteWise - Travel Route Discovery Platform

A comprehensive travel route discovery platform with AI-generated walking tours, expert curation, GPS navigation, and photo sharing. Built as a PWA (Progressive Web App) with mobile-first design for immediate deployment and React Native conversion path for native iOS development.

![RouteWise Preview](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=800&h=400&fit=crop)

## ✨ Features

### Core Functionality
- **Route Discovery**: Browse curated walking routes with intelligent filtering
- **Search & Filter**: GPS-based suggestions, duration filters (1-4 hours), distance filtering
- **Route Categories**: Food & drink, culture & art, hidden gems, nightlife
- **Detailed Route Views**: Step-by-step guidance with photo stops
- **Interactive Maps**: Real-time navigation with offline capability
- **Photo Sharing**: Capture and share photos at route stops
- **User Profiles**: Track completed routes and personal statistics

### Technical Features
- **Mobile-First Design**: Optimized for phone usage with iOS-style interface
- **PWA Ready**: Installable web app with offline capabilities
- **Real-time GPS**: Location-based route recommendations
- **Responsive UI**: Tailwind CSS with shadcn/ui components
- **TypeScript**: Full type safety across frontend and backend

## 🏗️ Architecture

```
RouteWise/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route-based pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
├── server/                # Express.js backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route handlers
│   └── storage.ts         # Data layer with in-memory storage
├── shared/                # Shared types and schemas
└── components/            # shadcn/ui component configurations
```

### Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Wouter (routing)
- **Backend**: Express.js, Node.js, TypeScript
- **Database**: In-memory storage (easily replaceable with PostgreSQL/MongoDB)
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS with iOS design system
- **Build Tool**: Vite
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/routewise.git
   cd routewise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

The app will automatically reload when you make changes to the code.

## 📱 Mobile Testing

For the best experience, test the app on mobile devices:

1. **Chrome DevTools**: Use mobile device simulation
2. **Real Device**: Access via your local network IP
3. **PWA Installation**: Use "Add to Home Screen" on mobile browsers

## 🛠️ Development

### Project Structure

```
client/src/
├── components/
│   ├── bottom-navigation.tsx    # Mobile tab navigation
│   ├── route-card.tsx          # Route display component
│   └── filter-modal.tsx        # Route filtering interface
├── pages/
│   ├── home.tsx                # Route discovery page
│   ├── route-detail.tsx        # Individual route details
│   ├── map.tsx                 # Navigation interface
│   ├── camera.tsx              # Photo capture interface
│   └── profile.tsx             # User profile and stats
└── lib/
    ├── queryClient.ts          # TanStack Query configuration
    └── utils.ts                # Utility functions
```

### Key Components

#### Route Management
- Pre-curated routes from standalone AI generation system
- Manual route creation by local experts
- Price filtering for premium routes
- Category-based organization

#### Navigation System
- Step-by-step walking instructions
- Offline map support for generated routes
- Photo sharing at designated stops
- Progress tracking throughout routes

### Data Models

The app uses TypeScript interfaces for type safety:

```typescript
interface Route {
  id: string;
  title: string;
  description: string;
  category: 'food-drink' | 'culture-art' | 'hidden-gems' | 'nightlife';
  duration: number;        // in minutes
  distance: string;        // in kilometers
  stops: RouteStop[];
  rating: string;
  reviewCount: number;
}

interface RouteStop {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  estimatedTimeMinutes: number;
}
```

### Adding New Routes

Routes are currently stored in `server/storage.ts`. To add new routes:

1. Create route objects following the `Route` interface
2. Add them to the `seedData()` method
3. Restart the development server

For production, replace the in-memory storage with a proper database.

## 🎨 Design System

The app uses an iOS-inspired design system:

### Colors
- **Primary Blue**: `#007AFF` (iOS system blue)
- **Success Green**: `#34C759`
- **Warning Orange**: `#FF9500`
- **Error Red**: `#FF3B30`
- **Gray Scale**: Various iOS system grays

### Typography
- **Font Family**: SF Pro Display/Text (system fonts)
- **Font Sizes**: iOS standard scale (12px, 14px, 16px, 20px, 24px, 32px)

### Components
- **Buttons**: Rounded corners (12px radius)
- **Cards**: Elevated with subtle shadows
- **Navigation**: Bottom tab bar for mobile
- **Modals**: iOS-style sheet presentations

## 📦 Production Build

### Build for Production

```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

### Environment Configuration

Create a `.env` file for environment variables:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=your_database_url_here
```

## 🚀 Deployment

### Deploy to Replit (Recommended)

1. **Import to Replit**
   - Go to [Replit](https://replit.com)
   - Click "Import from GitHub"
   - Enter your repository URL

2. **Configure Environment**
   - Replit will automatically detect the Node.js project
   - The `.replit` file contains the run configuration

3. **Deploy**
   - Click the "Deploy" button in Replit
   - Your app will be available at `https://your-repl-name.your-username.repl.co`

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure**
   - Follow the prompts to configure your deployment
   - Set build command: `npm run build`
   - Set output directory: `dist`

### Deploy to Railway

1. **Connect GitHub Repository**
   - Go to [Railway](https://railway.app)
   - Click "Deploy from GitHub repo"
   - Select your repository

2. **Configure**
   - Railway will auto-detect Node.js
   - Set start command: `npm start`
   - Add environment variables if needed

### Deploy to Heroku

1. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

2. **Configure**
   ```bash
   git push heroku main
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   ```

## 📱 React Native Conversion Guide

This PWA is designed for easy conversion to React Native for native iOS development:

### 1. Component Mapping
- **React components** → React Native components
- **div/span** → View/Text
- **img** → Image
- **button** → TouchableOpacity/Pressable

### 2. Navigation
- **Wouter** → React Navigation
- **Link components** → Navigation actions

### 3. Styling
- **Tailwind classes** → StyleSheet objects
- **CSS variables** → Theme objects
- **iOS design tokens** already match React Native

### 4. APIs and Storage
- **Fetch calls** → React Native networking
- **Local storage** → AsyncStorage
- **Camera API** → React Native Camera
- **GPS** → React Native Location

### 5. Key Libraries for Conversion
```bash
# Navigation
npm install @react-navigation/native @react-navigation/bottom-tabs

# UI Components
npm install react-native-elements react-native-vector-icons

# Camera and Location
npm install react-native-camera @react-native-community/geolocation

# Storage
npm install @react-native-async-storage/async-storage
```

### 6. Conversion Steps
1. **Setup React Native project**: `npx react-native init RouteWiseApp`
2. **Copy component logic**: Maintain the same component structure
3. **Update styling**: Convert Tailwind to StyleSheet
4. **Replace web APIs**: Use React Native equivalents
5. **Test on iOS simulator**: Ensure native functionality works

The current codebase structure makes this conversion straightforward, with most business logic remaining unchanged.

## 🧪 Testing

### Manual Testing Checklist

- [ ] Route discovery and filtering works
- [ ] Route details load correctly
- [ ] Map navigation functions
- [ ] Camera interface responds
- [ ] Profile statistics display
- [ ] Mobile navigation works
- [ ] PWA installation works

### API Testing

Test API endpoints with curl or Postman:

```bash
# Get all routes
curl http://localhost:5000/api/routes

# Get specific route
curl http://localhost:5000/api/routes/route-1

# Get user profile
curl http://localhost:5000/api/users/user-1
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Use TypeScript for all new code
- Follow the existing component structure
- Add comments for complex logic
- Test on mobile devices
- Maintain iOS design consistency

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: iOS Human Interface Guidelines
- **UI Components**: shadcn/ui and Radix UI
- **Icons**: Lucide React
- **Images**: Unsplash (for demo purposes)

## 📞 Support

For support and questions:

- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ for travelers and urban explorers**