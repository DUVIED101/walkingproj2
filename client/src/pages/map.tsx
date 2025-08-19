import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { ArrowLeft, Navigation, Camera, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Route } from "@shared/schema";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/bottom-navigation";

export default function Map() {
  const { id } = useParams();
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  const { data: route, isLoading } = useQuery<Route>({
    queryKey: ["/api/routes", id],
    enabled: !!id,
  });

  if (!id) {
    return (
      <div className="h-screen bg-gray-200 relative">
        {/* Map placeholder */}
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=400&h=800&fit=crop" 
          alt="Map View" 
          className="w-full h-full object-cover" 
        />
        
        {/* Top controls */}
        <div className="absolute top-safe-top left-4 right-4 flex justify-between items-start">
          <Link href="/">
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center ios-shadow">
              <ArrowLeft className="w-5 h-5 text-ios-dark" />
            </button>
          </Link>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center ios-shadow">
            <Navigation className="w-5 h-5 text-ios-blue" />
          </button>
        </div>

        {/* Current location indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-ios-blue rounded-full border-2 border-white"></div>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  if (isLoading || !route) {
    return (
      <div className="h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-ios-blue border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-ios-gray">Loading route...</p>
        </div>
      </div>
    );
  }

  const currentStop = route.stops[currentStopIndex];

  const handleNextStop = () => {
    if (currentStopIndex < route.stops.length - 1) {
      setCurrentStopIndex(currentStopIndex + 1);
    }
  };

  const handlePrevStop = () => {
    if (currentStopIndex > 0) {
      setCurrentStopIndex(currentStopIndex - 1);
    }
  };

  return (
    <div className="h-screen bg-gray-200 relative pb-24">
      {/* Map placeholder */}
      <img 
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=400&h=800&fit=crop" 
        alt="Route Map" 
        className="w-full h-full object-cover"
        data-testid="map-view"
      />
      
      {/* Top controls */}
      <div className="absolute top-safe-top left-4 right-4 flex justify-between items-start">
        <Link href={`/route/${route.id}`}>
          <button 
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center ios-shadow"
            data-testid="back-button"
          >
            <ArrowLeft className="w-5 h-5 text-ios-dark" />
          </button>
        </Link>
        <div className="bg-white rounded-full px-4 py-2 ios-shadow">
          <span className="text-sm font-medium text-ios-dark" data-testid="step-counter">
            Step {currentStopIndex + 1} of {route.stops.length}
          </span>
        </div>
        <button 
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center ios-shadow"
          data-testid="center-location-button"
        >
          <Navigation className="w-5 h-5 text-ios-blue" />
        </button>
      </div>

      {/* Current location indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 bg-ios-blue rounded-full border-2 border-white"></div>
      </div>

      {/* Bottom navigation card */}
      <div className="absolute bottom-24 left-4 right-4">
        <div className="bg-white rounded-2xl p-4 ios-shadow">
          <div className="flex items-center space-x-3 mb-3">
            <img 
              src={currentStop.image} 
              alt={currentStop.name} 
              className="w-16 h-16 rounded-xl object-cover"
              data-testid="current-stop-image"
            />
            <div className="flex-1">
              <h3 className="font-bold text-ios-dark" data-testid="current-stop-name">
                {currentStop.name}
              </h3>
              <p className="text-sm text-ios-gray" data-testid="current-stop-description">
                {currentStop.description}
              </p>
              <div className="flex items-center mt-1">
                <Navigation className="w-3 h-3 text-ios-gray mr-1" />
                <span className="text-xs text-ios-gray" data-testid="walk-time">
                  {currentStop.estimatedTimeMinutes} min stop
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link 
              href={`/camera/${route.id}/${currentStop.id}`}
              className="flex-1"
            >
              <Button 
                variant="outline"
                className="w-full bg-ios-light-gray border-ios-light-gray text-ios-dark py-3 rounded-xl font-medium"
                data-testid="capture-photo-button"
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </Link>
            <Button 
              onClick={currentStopIndex < route.stops.length - 1 ? handleNextStop : undefined}
              disabled={currentStopIndex >= route.stops.length - 1}
              className="flex-1 bg-ios-blue text-white py-3 rounded-xl font-medium disabled:bg-ios-gray"
              data-testid="continue-button"
            >
              {currentStopIndex < route.stops.length - 1 ? (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                "Route Complete!"
              )}
            </Button>
          </div>
          
          {/* Navigation between stops */}
          {route.stops.length > 1 && (
            <div className="flex justify-center mt-3 space-x-2">
              {route.stops.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStopIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStopIndex ? "bg-ios-blue" : "bg-ios-light-gray"
                  }`}
                  data-testid={`stop-indicator-${index}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
