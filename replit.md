# Travel Route Discovery Platform

## Project Overview
A comprehensive travel route discovery platform with AI-generated walking tours, expert curation, GPS navigation, and photo sharing. Built as a PWA for immediate deployment with React Native conversion path for native iOS app.

## User Preferences
- Target platform: Native iOS app (starting with web PWA)
- MVP timeline focused
- Real-time GPS integration required
- Offline capabilities essential
- Photo sharing at route stops
- Mobile-first UI design (phones as primary device)

## Project Architecture
- **Frontend**: React + TypeScript with PWA capabilities
- **Backend**: Express.js API server
- **Database**: In-memory storage (MemStorage) for MVP
- **Conversion Path**: React Native for native iOS
- **Styling**: Tailwind CSS + shadcn/ui components

## Core Features (MVP)
1. **Route Management**
   - Pre-curated routes from standalone AI generation system (reviewed by team)
   - Manual route creation by experts
   - Price filtering for premium routes
   - Future: On-demand route generation (v2+)
   good


2. **Route Categories**
   - Food and drink
   - Culture and art
   - Hidden gems
   - Nightlife

3. **Search & Filter**
   - GPS-based route suggestions
   - Duration filters (1-4 hours)
   - Distance from user
   - Route type selection
   - Preview with key attractions

4. **Navigation & Guidance**
   - Step-by-step walking instructions
   - Offline map support
   - Photo sharing at stops

## Technical Decisions
- Using PWA approach first for rapid prototyping
- React Native chosen as optimal iOS conversion path
- GPS integration for location-based features
- Offline-first architecture for maps and routes

## Recent Changes
- 2025-08-19: Initial project setup and architecture planning