import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

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
      <Textarea
        placeholder="Paste your text here to generate quiz questions..."
        className="min-h-[200px]"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button 
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Generating Quiz..." : "Generate Quiz"}
      </Button>
    </div>
  );
};

export default TextInput;