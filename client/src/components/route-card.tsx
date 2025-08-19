import { Route } from "@shared/schema";
import { Star, Clock, MapPin, Users } from "lucide-react";
import { Link } from "wouter";

interface RouteCardProps {
  route: Route;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "food-drink":
      return "bg-ios-green";
    case "culture-art":
      return "bg-ios-blue";
    case "hidden-gems":
      return "bg-ios-orange";
    case "nightlife":
      return "bg-ios-red";
    default:
      return "bg-ios-gray";
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "food-drink":
      return "Food & Drink";
    case "culture-art":
      return "Culture & Art";
    case "hidden-gems":
      return "Hidden Gems";
    case "nightlife":
      return "Nightlife";
    default:
      return category;
  }
};

export default function RouteCard({ route }: RouteCardProps) {
  const durationHours = Math.floor(route.duration / 60);
  const durationMinutes = route.duration % 60;
  const durationText = durationHours > 0 
    ? `${durationHours}h ${durationMinutes}m`
    : `${durationMinutes}m`;

  return (
    <Link href={`/route/${route.id}`}>
      <div 
        className="route-card bg-white rounded-2xl ios-shadow mb-4 overflow-hidden cursor-pointer"
        data-testid={`route-card-${route.id}`}
      >
        <img 
          src={route.heroImage} 
          alt={route.title} 
          className="w-full h-48 object-cover"
          data-testid={`route-image-${route.id}`}
        />
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-ios-dark text-lg" data-testid={`route-title-${route.id}`}>
                {route.title}
              </h3>
              <p className="text-ios-gray text-sm" data-testid={`route-description-${route.id}`}>
                {route.description}
              </p>
            </div>
            <div className="text-right ml-3">
              <div className="flex items-center text-ios-orange">
                <Star className="w-3 h-3 mr-1 fill-current" />
                <span className="text-sm font-medium" data-testid={`route-rating-${route.id}`}>
                  {route.rating}
                </span>
              </div>
              <p className="text-xs text-ios-gray" data-testid={`route-reviews-${route.id}`}>
                {route.reviewCount} reviews
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-ios-gray">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span data-testid={`route-duration-${route.id}`}>{durationText}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span data-testid={`route-distance-${route.id}`}>{route.distance} km</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span data-testid={`route-stops-${route.id}`}>{route.stops.length} stops</span>
            </div>
            <span 
              className={`${getCategoryColor(route.category)} text-white px-2 py-1 rounded-full text-xs font-medium`}
              data-testid={`route-category-${route.id}`}
            >
              {getCategoryLabel(route.category)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
