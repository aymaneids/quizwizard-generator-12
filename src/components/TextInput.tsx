import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles } from "lucide-react";
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
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">Quiz Generator</h1>
        <p className="text-muted-foreground">Transform any text into an interactive quiz experience</p>
      </div>
      
      <div className="relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg z-10">
            <LoadingSpinner />
          </div>
        ) : null}
        <Textarea
          placeholder="Paste your text here to generate quiz questions..."
          className="min-h-[200px] resize-none text-lg p-4 border-2 focus:border-primary"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      
      <Button 
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full h-12 text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {isLoading ? (
          "Generating Quiz..."
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Quiz
          </>
        )}
      </Button>
    </div>
  );
};

export default TextInput;