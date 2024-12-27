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
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">{question.question}</h3>
      <RadioGroup
        value={currentAnswer?.toString()}
        onValueChange={(value) => onAnswer(parseInt(value))}
      >
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 p-2 rounded ${
                showCorrect
                  ? index === question.correctAnswer
                    ? 'bg-green-100'
                    : currentAnswer === index
                    ? 'bg-red-100'
                    : ''
                  : ''
              }`}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
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