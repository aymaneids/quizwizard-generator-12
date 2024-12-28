import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizQuestionProps {
  question: Question;
  currentAnswer: number | null;
  onAnswer: (answerIndex: number) => void;
  showCorrect: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  currentAnswer,
  onAnswer,
  showCorrect
}) => {
  return (
    <Card className="p-8 space-y-6 shadow-lg border-2 bg-white/50 backdrop-blur-sm">
      <h3 className="text-2xl font-semibold text-primary leading-tight">{question.question}</h3>
      <RadioGroup
        value={currentAnswer?.toString()}
        onValueChange={(value) => onAnswer(parseInt(value))}
        className="pt-4"
      >
        <div className="grid gap-4">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`relative transition-all duration-200 ${
                currentAnswer === index 
                  ? 'scale-[1.02]' 
                  : 'hover:scale-[1.01]'
              }`}
            >
              <div
                className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-colors ${
                  currentAnswer === index 
                    ? 'bg-primary/10 border-primary shadow-md' 
                    : 'hover:bg-muted/50 border-transparent hover:border-muted'
                }`}
              >
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`}
                  className="w-5 h-5"
                />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-grow cursor-pointer text-lg"
                >
                  {option}
                </Label>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </Card>
  );
};

export default QuizQuestion;