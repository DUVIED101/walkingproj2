# React Native Conversion Guide

Complete guide for converting RouteWise from PWA to native iOS app using React Native.

## 🎯 Overview

This guide walks you through converting the web-based RouteWise platform to a native iOS app using React Native. The current architecture has been designed to make this conversion as smooth as possible.

## 📋 Prerequisites

Before starting the conversion:

- **macOS** (required for iOS development)
- **Xcode 14+** with iOS SDK
- **Node.js 18+**
- **React Native CLI**: `npm install -g @react-native-community/cli`
- **CocoaPods**: `sudo gem install cocoapods`
- **iOS Simulator** or physical iPhone for testing

## 🚀 Step 1: Initialize React Native Project

### Create New React Native Project
```bash
# Navigate to your development directory
cd ~/Development

# Create React Native project
npx react-native init RouteWiseApp --template react-native-template-typescript

# Navigate to project
cd RouteWiseApp
```

### Verify Setup
```bash
# Test iOS build
npx react-native run-ios
```

## 📦 Step 2: Install Required Dependencies

### Navigation
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm install react-native-screens react-native-safe-area-context

# iOS specific
cd ios && pod install && cd ..
```

### UI and Styling
```bash
# UI Components
npm install react-native-elements react-native-vector-icons
npm install react-native-linear-gradient

# Icons
npm install react-native-vector-icons
cd ios && pod install && cd ..
```

### Device Features
```bash
# Camera
npm install react-native-image-picker

# Location/GPS
npm install @react-native-community/geolocation

# Maps
npm install react-native-maps
cd ios && pod install && cd ..

# Storage
npm install @react-native-async-storage/async-storage

# HTTP Client
npm install axios

# State Management
npm install @tanstack/react-query
```

### Optional but Recommended
```bash
# Animations
npm install react-native-reanimated
npm install lottie-react-native

# Permissions
npm install react-native-permissions

# Image handling
npm install react-native-fast-image
```

## 🏗️ Step 3: Project Structure Setup

Create the following directory structure:

```
RouteWiseApp/
├── src/
│   ├── components/         # UI components (converted from web)
│   ├── screens/           # Screen components (converted from pages)
│   ├── navigation/        # Navigation configuration
│   ├── services/          # API services
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom hooks
│   └── assets/           # Images, fonts, etc.
├── ios/                   # iOS specific files
└── android/              # Android specific files (future)
```

## 🔄 Step 4: Component Conversion

### Web to React Native Component Mapping

| Web Component | React Native Equivalent | Notes |
|---------------|------------------------|-------|
| `<div>` | `<View>` | Container component |
| `<span>`, `<p>` | `<Text>` | Text content |
| `<img>` | `<Image>` | Images |
| `<button>` | `<TouchableOpacity>` | Touchable buttons |
| `<input>` | `<TextInput>` | Text input |
| CSS Classes | `StyleSheet.create()` | Styling |

### Example: Converting RouteCard Component

**Web Version (current):**
```typescript
// client/src/components/route-card.tsx
export default function RouteCard({ route }: RouteCardProps) {
  return (
    <Link href={`/route/${route.id}`}>
      <div className="route-card bg-white rounded-2xl ios-shadow mb-4">
        <img src={route.heroImage} alt={route.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-ios-dark text-lg">{route.title}</h3>
          <p className="text-ios-gray text-sm">{route.description}</p>
        </div>
      </div>
    </Link>
  );
}
```

**React Native Version:**
```typescript
// src/components/RouteCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RouteCard({ route }: RouteCardProps) {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('RouteDetail', { id: route.id })}
    >
      <Image source={{ uri: route.heroImage }} style={styles.heroImage} />
      <View style={styles.content}>
        <Text style={styles.title}>{route.title}</Text>
        <Text style={styles.description}>{route.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: 192,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
  },
});
```

## 🧭 Step 5: Navigation Setup

### Create Navigation Structure

**src/navigation/AppNavigator.tsx:**
```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import CameraScreen from '../screens/CameraScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RouteDetailScreen from '../screens/RouteDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Discover':
              iconName = focused ? 'compass' : 'compass-outline';
              break;
            case 'Map':
              iconName = focused ? 'map' : 'map-outline';
              break;
            case 'Camera':
              iconName = focused ? 'camera' : 'camera-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
      })}
    >
      <Tab.Screen name="Discover" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RouteDetail" 
          component={RouteDetailScreen}
          options={{ title: 'Route Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## 📱 Step 6: Screen Conversion

### Convert Pages to Screens

**src/screens/HomeScreen.tsx:**
```typescript
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import RouteCard from '../components/RouteCard';
import { apiService } from '../services/api';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: routes = [], isLoading } = useQuery({
    queryKey: ['routes'],
    queryFn: apiService.getRoutes,
  });

  const filteredRoutes = routes.filter(route =>
    route.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.location}>San Francisco, CA</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search routes and places..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#8E8E93"
        />
      </View>

      <ScrollView style={styles.routesList}>
        <Text style={styles.sectionTitle}>Featured Routes</Text>
        {filteredRoutes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  location: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 4,
  },
  searchContainer: {
    padding: 20,
  },
  searchInput: {
    backgroundColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1C1C1E',
  },
  routesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
});
```

## 🌐 Step 7: API Service Setup

**src/services/api.ts:**
```typescript
import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const apiService = {
  async getRoutes(filters?: any) {
    const response = await api.get('/api/routes', { params: filters });
    return response.data;
  },

  async getRoute(id: string) {
    const response = await api.get(`/api/routes/${id}`);
    return response.data;
  },

  async getUser(id: string) {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  },

  // Add other API methods as needed
};
```

## 📍 Step 8: Location and Maps Integration

### Setup Location Services

**Add to Info.plist (iOS):**
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>RouteWise needs location access to provide personalized route recommendations.</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>RouteWise needs location access to provide navigation during routes.</string>
```

**Location Hook:**
```typescript
// src/hooks/useLocation.ts
import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

export function useLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        console.error('Location error:', error);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  return { location, loading };
}
```

### Maps Integration

**src/screens/MapScreen.tsx:**
```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';

export default function MapScreen() {
  const { location, loading } = useLocation();

  if (loading || !location) {
    return <View style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={location} title="Your Location" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loading: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
});
```

## 📸 Step 9: Camera Integration

**src/screens/CameraScreen.tsx:**
```typescript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

export default function CameraScreen() {
  const handleTakePhoto = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }
      
      if (response.assets && response.assets[0]) {
        // Handle photo capture
        console.log('Photo captured:', response.assets[0]);
      }
    });
  };

  const handleSelectFromLibrary = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }
      
      if (response.assets && response.assets[0]) {
        // Handle photo selection
        console.log('Photo selected:', response.assets[0]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleSelectFromLibrary}>
        <Text style={styles.buttonText}>Select from Library</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
```

## 🔧 Step 10: Configuration and Permissions

### iOS Permissions (Info.plist)
```xml
<!-- Camera permission -->
<key>NSCameraUsageDescription</key>
<string>RouteWise needs camera access to capture photos during routes.</string>

<!-- Photo library permission -->
<key>NSPhotoLibraryUsageDescription</key>
<string>RouteWise needs photo library access to select and save route photos.</string>

<!-- Location permissions -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>RouteWise needs location access to provide personalized route recommendations.</string>
```

### App Configuration
```typescript
// App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
}
```

## 🚀 Step 11: Build and Test

### Development Testing
```bash
# Start Metro bundler
npx react-native start

# Run on iOS simulator
npx react-native run-ios

# Run on physical device
npx react-native run-ios --device "Your iPhone"
```

### Production Build
```bash
# Build for iOS
cd ios
xcodebuild -workspace RouteWiseApp.xcworkspace -scheme RouteWiseApp -configuration Release -destination generic/platform=iOS -archivePath RouteWiseApp.xcarchive archive

# Or use Xcode GUI:
# 1. Open ios/RouteWiseApp.xcworkspace in Xcode
# 2. Select your device or Generic iOS Device
# 3. Product → Archive
# 4. Distribute App → App Store Connect
```

## 📊 Step 12: Performance Optimization

### Image Optimization
```bash
npm install react-native-fast-image
```

```typescript
import FastImage from 'react-native-fast-image';

// Replace Image with FastImage for better performance
<FastImage
  source={{ uri: route.heroImage }}
  style={styles.heroImage}
  resizeMode={FastImage.resizeMode.cover}
/>
```

### Memory Management
```typescript
// Add to navigation options for heavy screens
React.useEffect(() => {
  return navigation.addListener('blur', () => {
    // Cleanup heavy resources when screen loses focus
  });
}, [navigation]);
```

## 🎨 Step 13: iOS-Specific Styling

### iOS Design System
```typescript
// src/styles/colors.ts
export const Colors = {
  ios: {
    blue: '#007AFF',
    green: '#34C759',
    orange: '#FF9500',
    red: '#FF3B30',
    gray: '#8E8E93',
    lightGray: '#E5E5EA',
    background: '#F2F2F7',
    white: '#FFFFFF',
    black: '#000000',
  },
};

// src/styles/typography.ts
export const Typography = {
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.ios.black,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.ios.black,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.ios.gray,
  },
};
```

## 📱 Step 14: App Store Preparation

### App Icons and Launch Screen
1. **Generate App Icons**: Use tools like [App Icon Generator](https://www.appicon.co/)
2. **Launch Screen**: Create in Xcode storyboard
3. **App Store Screenshots**: Prepare for different device sizes

### App Store Connect Setup
1. Create app listing in App Store Connect
2. Fill in app metadata, description, keywords
3. Upload app binary through Xcode
4. Submit for review

## 🔍 Step 15: Testing and Quality Assurance

### Testing Checklist
- [ ] Route discovery and filtering
- [ ] Navigation between screens
- [ ] Camera functionality
- [ ] Location services
- [ ] Offline behavior
- [ ] Performance on different devices
- [ ] App Store guidelines compliance

### Performance Testing
```bash
# Monitor bundle size
npx react-native bundle --platform ios --dev false --entry-file index.js --bundle-output ios-bundle.js

# Test on various iOS devices and versions
```

## 🚀 Step 16: Deployment

### Development Distribution
```bash
# Build for TestFlight
# In Xcode: Product → Archive → Distribute App → TestFlight
```

### Production Release
1. Submit to App Store Review
2. Monitor crash reports and user feedback
3. Plan regular updates and feature releases

## 📈 Future Enhancements

Once the basic conversion is complete, consider adding:

### Native iOS Features
- **Siri Shortcuts**: Voice activation for route discovery
- **Widgets**: Home screen widgets showing nearby routes
- **Apple Watch**: Companion app for navigation
- **Core ML**: On-device route recommendations

### Performance Improvements
- **Code Splitting**: Load screens on demand
- **Image Caching**: Implement robust caching strategy
- **Offline Mode**: Full offline route support
- **Push Notifications**: Route updates and recommendations

## 🤝 Maintenance and Updates

### Regular Tasks
- **Update Dependencies**: Keep React Native and packages current
- **iOS Version Testing**: Test with new iOS releases
- **Performance Monitoring**: Use tools like Flipper or Reactotron
- **Crash Reporting**: Integrate Crashlytics or Sentry

### Deployment Pipeline
Consider setting up CI/CD with:
- **Fastlane**: Automate build and deployment
- **GitHub Actions**: Continuous integration
- **CodePush**: Over-the-air updates for non-native changes

---

**Conversion Timeline Estimate**: 4-6 weeks for a team of 2-3 developers

**Budget Considerations**: 
- Apple Developer Program: $99/year
- Testing devices: $500-1000
- App Store optimization tools: $50-200/month

This comprehensive guide should help you successfully convert RouteWise from a PWA to a native iOS application. The current web architecture has been designed to make this transition as smooth as possible.