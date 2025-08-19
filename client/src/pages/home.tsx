import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";
import { Route } from "@shared/schema";
import RouteCard from "@/components/route-card";
import BottomNavigation from "@/components/bottom-navigation";
import FilterModal from "@/components/filter-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const categoryOptions = [
  { value: "all", label: "All Routes" },
  { value: "food-drink", label: "Food & Drink" },
  { value: "culture-art", label: "Culture & Art" },
  { value: "hidden-gems", label: "Hidden Gems" },
  { value: "nightlife", label: "Nightlife" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    duration: "all",
    distance: "all",
    difficulty: "all",
  });

  const { data: routes = [], isLoading, error } = useQuery<Route[]>({
    queryKey: ["/api/routes", filters.category !== "all" ? filters.category : undefined, filters.duration !== "all" ? filters.duration : undefined, filters.distance !== "all" ? filters.distance : undefined, filters.difficulty !== "all" ? filters.difficulty : undefined],
  });

  // Filter routes by search query
  const filteredRoutes = routes.filter(route =>
    route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-ios-dark mb-2">Unable to load routes</h2>
          <p className="text-ios-gray">Please check your connection and try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Status Bar Placeholder */}
      <div className="bg-black text-white px-6 py-3 flex justify-between items-center text-sm font-medium">
        <span>9:41</span>
        <div className="flex items-center space-x-2">
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-3 h-2 border border-white rounded-sm"></div>
          <div className="w-6 h-3 border border-white rounded-sm bg-white"></div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white px-6 py-4 ios-shadow">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ios-dark" data-testid="page-title">Discover</h1>
            <p className="text-ios-gray text-sm" data-testid="user-location">San Francisco, CA</p>
          </div>
          <button 
            className="w-10 h-10 bg-ios-light-gray rounded-full flex items-center justify-center"
            data-testid="profile-button"
          >
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&w=80&h=80&fit=crop&crop=face" 
              alt="Profile" 
              className="w-8 h-8 rounded-full" 
            />
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="px-6 py-4">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-ios-gray w-4 h-4" />
          <Input
            type="text"
            placeholder="Search routes and places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 bg-ios-light-gray border-none rounded-xl text-ios-dark placeholder-ios-gray focus:ring-2 focus:ring-ios-blue"
            data-testid="search-input"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(true)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-ios-gray hover:text-ios-blue"
            data-testid="filter-button"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Category Filters */}
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {categoryOptions.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category.value);
                setFilters(prev => ({ ...prev, category: category.value }));
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedCategory === category.value
                  ? "bg-ios-blue text-white"
                  : "bg-ios-light-gray text-ios-dark border-ios-light-gray"
              }`}
              data-testid={`category-filter-${category.value}`}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Routes */}
      <div className="px-6">
        <h2 className="text-xl font-bold text-ios-dark mb-4" data-testid="featured-routes-title">
          Featured Routes
        </h2>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl ios-shadow overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredRoutes.length > 0 ? (
          <div data-testid="routes-list">
            {filteredRoutes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-ios-dark mb-2" data-testid="no-routes-title">
              No routes found
            </h3>
            <p className="text-ios-gray" data-testid="no-routes-message">
              Try adjusting your search or filters to find more routes
            </p>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
