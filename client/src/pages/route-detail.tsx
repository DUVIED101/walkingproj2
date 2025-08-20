import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { ArrowLeft, Star, Clock, MapPin, Users, Play, Bookmark, Share } from "lucide-react";
import { Link } from "wouter";
import { Route } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import BottomNavigation from "@/components/bottom-navigation";

export default function RouteDetail() {
  const { id } = useParams();

  const { data: route, isLoading, error } = useQuery<Route>({
    queryKey: [`/api/routes/${id}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Skeleton className="w-full h-72" />
        <div className="bg-white rounded-t-3xl -mt-8 relative pt-8 px-6">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-6" />
          <Skeleton className="h-24 w-full mb-6" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-ios-dark mb-2">Route not found</h2>
          <p className="text-ios-gray mb-4">This route may have been removed or doesn't exist</p>
          <Link href="/">
            <Button className="bg-ios-blue text-white">
              Back to Discover
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Skeleton className="w-full h-72" />
        <div className="bg-white rounded-t-3xl -mt-8 relative pt-8 px-6">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-6" />
          <Skeleton className="h-24 w-full mb-6" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!route) {
    return null;
  }

  const durationHours = Math.floor(route.duration / 60);
  const durationMinutes = route.duration % 60;
  const durationText = durationHours > 0 
    ? `${durationHours}h ${durationMinutes}m`
    : `${durationMinutes}m`;

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="relative">
        {/* Hero Image */}
        <img 
          src={route.heroImage} 
          alt={route.title} 
          className="w-full h-72 object-cover"
          data-testid="route-hero-image"
        />
        
        {/* Back Button */}
        <Link href="/">
          <button className="absolute top-safe-top left-4 w-10 h-10 bg-black bg-opacity-30 rounded-full flex items-center justify-center ios-blur">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </Link>

        {/* Route Content */}
        <div className="bg-white rounded-t-3xl -mt-8 relative pt-8 px-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-ios-dark mb-2" data-testid="route-title">
                {route.title}
              </h1>
              <div className="flex items-center text-ios-gray text-sm mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span data-testid="route-duration">{durationText}</span>
                <MapPin className="w-4 h-4 ml-4 mr-2" />
                <span data-testid="route-distance">{route.distance} km</span>
                <Users className="w-4 h-4 ml-4 mr-2" />
                <span data-testid="route-stops">{route.stops.length} stops</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center text-ios-orange mr-4">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  <span className="font-medium" data-testid="route-rating">{route.rating}</span>
                  <span className="text-ios-gray ml-1">
                    (<span data-testid="route-review-count">{route.reviewCount}</span>)
                  </span>
                </div>
                <span 
                  className="bg-ios-blue text-white px-3 py-1 rounded-full text-sm"
                  data-testid="route-category"
                >
                  {route.category.replace('-', ' & ')}
                </span>
              </div>
            </div>
          </div>

          <p className="text-ios-gray mb-6" data-testid="route-description">
            {route.longDescription}
          </p>

          {/* Route Stops */}
          <h3 className="text-lg font-bold text-ios-dark mb-4">Route Highlights</h3>
          <div className="space-y-4 mb-6" data-testid="route-stops">
            {route.stops.map((stop, index) => (
              <div key={stop.id} className="flex items-center space-x-3" data-testid={`stop-${stop.id}`}>
                <div className="w-8 h-8 bg-ios-blue rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <img 
                  src={stop.image} 
                  alt={stop.name} 
                  className="w-12 h-12 rounded-lg object-cover"
                  data-testid={`stop-image-${stop.id}`}
                />
                <div className="flex-1">
                  <h4 className="font-medium text-ios-dark" data-testid={`stop-name-${stop.id}`}>
                    {stop.name}
                  </h4>
                  <p className="text-sm text-ios-gray" data-testid={`stop-description-${stop.id}`}>
                    {stop.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mb-6">
            <Link href={`/map/${route.id}`} className="flex-1">
              <Button 
                className="w-full bg-ios-blue text-white py-4 rounded-xl font-medium text-lg hover:bg-ios-blue/90"
                data-testid="start-route-button"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Route
              </Button>
            </Link>
            <Button 
              variant="outline"
              size="lg"
              className="w-14 h-14 bg-ios-light-gray border-ios-light-gray rounded-xl"
              data-testid="save-route-button"
            >
              <Bookmark className="w-5 h-5 text-ios-gray" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="w-14 h-14 bg-ios-light-gray border-ios-light-gray rounded-xl"
              data-testid="share-route-button"
            >
              <Share className="w-5 h-5 text-ios-gray" />
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
