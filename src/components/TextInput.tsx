import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from './LoadingSpinner';

interface TextInputProps {
  onGenerate: (text: string) => void;
  isLoading: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ onGenerate, isLoading }) => {
  const [text, setText] = React.useState('');
  const { toast } = useToast();

  const handleGenerate = () => {
    if (text.trim().length < 100) {
      toast({
        title: "Text too short",
        description: "Please enter at least 100 characters to generate a meaningful quiz.",
        variant: "destructive"
      });
      return;
    }
    onGenerate(text);
  };

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      <div className="relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg z-10">
            <LoadingSpinner />
          </div>
        ) : null}
        <Textarea
          placeholder="Paste your text here to generate quiz questions..."
          className="min-h-[200px] resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <Button 
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90"
      >
        {isLoading ? "Generating Quiz..." : "Generate Quiz"}
      </Button>
    </div>
  );
};

export default TextInput;