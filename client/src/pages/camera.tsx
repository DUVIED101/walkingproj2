import { useState, useRef, useCallback } from "react";
import { useParams } from "wouter";
import { X, Zap, Camera as CameraIcon, Share } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Camera() {
  const { routeId, stopId } = useParams();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // For demo purposes, we'll use a placeholder camera view
  // In a real app, you'd use getUserMedia() to access the camera
  const capturePhoto = useCallback(() => {
    // Simulate photo capture
    const placeholderPhoto = "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&w=400&h=600&fit=crop";
    setCapturedPhoto(placeholderPhoto);
  }, []);

  const handleShare = () => {
    // Simulate sharing photo
    console.log("Sharing photo...");
  };

  return (
    <div className="h-screen bg-black relative">
      {/* Camera viewfinder placeholder */}
      <img 
        src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&w=400&h=800&fit=crop" 
        alt="Camera viewfinder" 
        className="w-full h-full object-cover"
        data-testid="camera-viewfinder"
      />
      
      {/* Top controls */}
      <div className="absolute top-safe-top left-4 right-4 flex justify-between items-center">
        <Link href={routeId ? `/map/${routeId}` : "/map"}>
          <button 
            className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center ios-blur"
            data-testid="close-camera-button"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </Link>
        <div className="bg-black bg-opacity-50 rounded-full px-3 py-2 ios-blur">
          <span className="text-white text-sm font-medium" data-testid="stop-name">
            {stopId ? "Current Stop" : "Photo Mode"}
          </span>
        </div>
        <button 
          className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center ios-blur"
          onClick={() => setFlashEnabled(!flashEnabled)}
          data-testid="flash-toggle"
        >
          <Zap className={`w-5 h-5 ${flashEnabled ? 'text-yellow-400' : 'text-white'}`} />
        </button>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-safe-bottom left-4 right-4">
        <div className="flex items-center justify-center mb-4">
          <button 
            className="w-16 h-16 border-4 border-white rounded-full bg-white flex items-center justify-center"
            onClick={capturePhoto}
            data-testid="capture-button"
          >
            <div className="w-12 h-12 rounded-full bg-white"></div>
          </button>
        </div>
        
        {/* Photo preview and share */}
        {capturedPhoto && (
          <div className="bg-black bg-opacity-50 rounded-2xl p-4 ios-blur">
            <div className="flex items-center space-x-3">
              <img 
                src={capturedPhoto} 
                alt="Captured photo" 
                className="w-16 h-16 rounded-xl object-cover"
                data-testid="photo-preview"
              />
              <div className="flex-1">
                <p className="text-white font-medium">Photo captured!</p>
                <p className="text-gray-300 text-sm">Add to your route story</p>
              </div>
              <Button 
                className="bg-ios-blue text-white px-4 py-2 rounded-xl font-medium"
                onClick={handleShare}
                data-testid="share-photo-button"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden video and canvas elements for real camera implementation */}
      <video
        ref={videoRef}
        className="hidden"
        autoPlay
        playsInline
      />
      <canvas
        ref={canvasRef}
        className="hidden"
      />
    </div>
  );
}
