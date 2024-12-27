import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <Card className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
        <p className="text-4xl font-bold text-primary mb-4">{percentage}%</p>
        <p className="text-lg">
          You got {correctAnswers} out of {questions.length} questions correct
        </p>
      </div>
      
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div
            key={index}
            className={`p-4 rounded ${
              answers[index] === question.correctAnswer
                ? 'bg-green-100'
                : 'bg-red-100'
            }`}
          >
            <p className="font-semibold mb-2">{question.question}</p>
            <p className="text-sm">
              Your answer: {answers[index] !== null ? question.options[answers[index]] : 'Not answered'}
            </p>
            <p className="text-sm text-green-700">
              Correct answer: {question.options[question.correctAnswer]}
            </p>
          </div>
        ))}
      </div>

      <Button onClick={onRestart} className="w-full">
        Start New Quiz
      </Button>
    </Card>
  );
};

export default QuizResults;