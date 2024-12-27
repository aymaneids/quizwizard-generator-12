import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, RotateCcw } from "lucide-react";
import { Question } from './QuizQuestion';

interface QuizResultsProps {
  questions: Question[];
  answers: (number | null)[];
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ questions, answers, onRestart }) => {
  const correctAnswers = answers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;

  const percentage = Math.round((correctAnswers / questions.length) * 100);

  return (
    <Card className="p-8 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Quiz Results</h2>
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 border-4 border-primary">
          <span className="text-4xl font-bold text-primary">{percentage}%</span>
        </div>
        <p className="text-xl text-muted-foreground">
          You got {correctAnswers} out of {questions.length} questions correct
        </p>
      </div>
      
      <div className="space-y-6">
        {questions.map((question, index) => {
          const isCorrect = answers[index] === question.correctAnswer;
          return (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 ${
                isCorrect 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${
                  isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {isCorrect 
                    ? <Check className="h-5 w-5 text-green-600" />
                    : <X className="h-5 w-5 text-red-600" />
                  }
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lg mb-3">{question.question}</p>
                  <p className="text-muted-foreground">
                    Your answer: {answers[index] !== null ? question.options[answers[index]] : 'Not answered'}
                  </p>
                  <p className={`font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    Correct answer: {question.options[question.correctAnswer]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button 
        onClick={onRestart} 
        className="w-full gap-2 text-lg h-12"
      >
        <RotateCcw className="h-5 w-5" />
        Start New Quiz
      </Button>
    </Card>
  );
};

export default QuizResults;