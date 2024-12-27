import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import ShareQuiz from './ShareQuiz';
import { Question } from './QuizQuestion';

interface QuizContainerProps {
  questions: Question[];
  onRestart: () => void;
}

const QuizContainer = ({ questions, onRestart }: QuizContainerProps) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResults, setShowResults] = React.useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(curr => curr - 1);
    }
  };

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto">
        <QuizResults
          questions={questions}
          answers={answers}
          onRestart={onRestart}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-2 flex-1 mr-4">
            <Progress 
              value={(currentQuestion + 1) / questions.length * 100} 
              className="h-3"
            />
            <div className="text-sm text-center text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
          <ShareQuiz questions={questions} />
        </div>

        <QuizQuestion
          question={questions[currentQuestion]}
          currentAnswer={answers[currentQuestion]}
          onAnswer={handleAnswer}
          showCorrect={false}
        />

        <div className="flex justify-between gap-4 mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="w-32 gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={answers[currentQuestion] === null}
            className="w-32 gap-2"
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            {currentQuestion !== questions.length - 1 && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;