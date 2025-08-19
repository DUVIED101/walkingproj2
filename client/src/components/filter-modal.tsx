import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    category: string;
    duration: string;
    distance: string;
    difficulty: string;
  };
  onFiltersChange: (filters: {
    category: string;
    duration: string;
    distance: string;
    difficulty: string;
  }) => void;
}

const durationOptions = [
  { value: "all", label: "Any" },
  { value: "short", label: "< 1 hour" },
  { value: "medium", label: "1-3 hours" },
  { value: "long", label: "3+ hours" },
];

const distanceOptions = [
  { value: "all", label: "Any" },
  { value: "short", label: "< 2 km" },
  { value: "medium", label: "2-5 km" },
  { value: "long", label: "5+ km" },
];

const difficultyOptions = [
  { value: "all", label: "Any" },
  { value: "easy", label: "Easy" },
  { value: "moderate", label: "Moderate" },
  { value: "challenging", label: "Challenging" },
];

export default function FilterModal({ isOpen, onClose, filters, onFiltersChange }: FilterModalProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="mobile-container mx-auto rounded-t-3xl slide-up">
        <SheetHeader className="pb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-ios-dark">Filter Routes</SheetTitle>
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="text-ios-blue font-medium"
              data-testid="filter-done"
            >
              Done
            </Button>
          </div>
          <SheetDescription className="sr-only">
            Filter routes by duration, distance, and difficulty
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 pb-8">
          <div>
            <h3 className="font-medium text-ios-dark mb-3">Duration</h3>
            <div className="flex flex-wrap gap-2">
              {durationOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filters.duration === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange("duration", option.value)}
                  className={cn(
                    "rounded-full text-sm",
                    filters.duration === option.value
                      ? "bg-ios-blue text-white"
                      : "bg-ios-light-gray text-ios-dark border-ios-light-gray"
                  )}
                  data-testid={`duration-filter-${option.value}`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-ios-dark mb-3">Distance</h3>
            <div className="flex flex-wrap gap-2">
              {distanceOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filters.distance === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange("distance", option.value)}
                  className={cn(
                    "rounded-full text-sm",
                    filters.distance === option.value
                      ? "bg-ios-blue text-white"
                      : "bg-ios-light-gray text-ios-dark border-ios-light-gray"
                  )}
                  data-testid={`distance-filter-${option.value}`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-ios-dark mb-3">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {difficultyOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filters.difficulty === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange("difficulty", option.value)}
                  className={cn(
                    "rounded-full text-sm",
                    filters.difficulty === option.value
                      ? "bg-ios-green text-white"
                      : "bg-ios-light-gray text-ios-dark border-ios-light-gray"
                  )}
                  data-testid={`difficulty-filter-${option.value}`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
