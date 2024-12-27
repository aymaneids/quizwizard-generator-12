import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import { Question } from './QuizQuestion';

interface QuizContainerProps {
  questions: Question[];
  onRestart: () => void;
}

const QuizContainer = ({ questions, onRestart }: QuizContainerProps) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResults, setShowResults] = React.useState(false);
  const [showCorrect, setShowCorrect] = React.useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    setShowCorrect(false);
  };

  const handleNext = () => {
    setShowCorrect(true);
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(curr => curr + 1);
        setShowCorrect(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(curr => curr - 1);
      setShowCorrect(false);
    }
  };

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto">
        <QuizResults
          questions={questions}
          answers={answers}
          onRestart={onRestart}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <Progress 
          value={(currentQuestion + 1) / questions.length * 100} 
          className="h-2"
        />
        <div className="text-sm text-center text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <QuizQuestion
        question={questions[currentQuestion]}
        currentAnswer={answers[currentQuestion]}
        onAnswer={handleAnswer}
        showCorrect={showCorrect}
      />

      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="w-32"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={answers[currentQuestion] === null}
          className="w-32"
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default QuizContainer;