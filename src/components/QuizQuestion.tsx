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
    <Card className="p-6 space-y-4 shadow-lg border-2">
      <h3 className="text-xl font-semibold text-primary">{question.question}</h3>
      <RadioGroup
        value={currentAnswer?.toString()}
        onValueChange={(value) => onAnswer(parseInt(value))}
      >
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                currentAnswer === index ? 'bg-muted border border-primary' : 'hover:bg-muted/50'
              }`}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label 
                htmlFor={`option-${index}`} 
                className="flex-grow cursor-pointer text-base"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </Card>
  );
};

export default QuizQuestion;