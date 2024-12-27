import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-lg">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Generating your quiz...</p>
    </div>
  );
};

export default LoadingSpinner;