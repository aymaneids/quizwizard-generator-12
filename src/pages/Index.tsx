import React from 'react';
import TextInput from '@/components/TextInput';
import QuizQuestion, { Question } from '@/components/QuizQuestion';
import QuizResults from '@/components/QuizResults';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<(number | null)[]>([]);
  const [showResults, setShowResults] = React.useState(false);
  const { toast } = useToast();

  const generateQuestions = async (text: string) => {
    setIsLoading(true);
    try {
      const prompt = `Based on the following text, create 20 multiple choice questions for a quiz. Each question should have exactly 4 options with only one correct answer. Format your response as a valid JSON array where each question object has these exact fields: "question" (string), "options" (array of 4 strings), and "correctAnswer" (number 0-3 indicating the index of the correct option).

Example format:
[{
  "question": "What is...?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 2
}]

Text to generate questions from:
${text}

Remember:
1. Generate exactly 20 questions
2. Each question must have exactly 4 options
3. The correctAnswer must be a number between 0 and 3
4. Response must be a valid JSON array
5. Questions should test understanding of the provided text`;

      const response = await fetch('https://api.hyperbolic.xyz/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzb3Vzc2kuNWFiYXlhQGdtYWlsLmNvbSIsImlhdCI6MTczMDAzNjIwMn0.nvvz0dE3ZDw-AmzRtPb44jMOEQTSUIYsyPg0MlsNUpY',
        },
        body: JSON.stringify({
          model: 'meta-llama/Llama-3.3-70B-Instruct',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2048,
          temperature: 0.7,
          top_p: 0.9,
          stream: false
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from API');
      }

      const json = await response.json();
      console.log('API Response:', json); // Debug log
      
      if (!json.choices?.[0]?.message?.content) {
        throw new Error('Invalid API response format');
      }

      let generatedQuestions;
      try {
        const content = json.choices[0].message.content;
        console.log('Raw content:', content); // Debug log
        
        // Try to extract JSON if the response contains additional text
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        const jsonString = jsonMatch ? jsonMatch[0] : content;
        
        generatedQuestions = JSON.parse(jsonString);
        
        // Validate the response format
        if (!Array.isArray(generatedQuestions) || !generatedQuestions.every(q => 
          typeof q.question === 'string' &&
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          typeof q.correctAnswer === 'number' &&
          q.correctAnswer >= 0 &&
          q.correctAnswer <= 3
        )) {
          throw new Error('Invalid questions format');
        }
      } catch (parseError) {
        console.error('Parse error:', parseError);
        throw new Error('Failed to parse questions from API response');
      }
      
      setQuestions(generatedQuestions);
      setAnswers(new Array(generatedQuestions.length).fill(null));
      setCurrentQuestion(0);
      setShowResults(false);
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Error",
        description: "Failed to generate quiz questions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleRestart = () => {
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-8">Quiz Generator</h1>
          <TextInput onGenerate={generateQuestions} isLoading={isLoading} />
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          <QuizResults
            questions={questions}
            answers={answers}
            onRestart={handleRestart}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Progress value={(currentQuestion + 1) / questions.length * 100} />
        
        <div className="text-sm text-center text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </div>

        <QuizQuestion
          question={questions[currentQuestion]}
          currentAnswer={answers[currentQuestion]}
          onAnswer={handleAnswer}
          showCorrect={false}
        />

        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={answers[currentQuestion] === null}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;