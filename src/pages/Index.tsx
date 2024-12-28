import React from 'react';
import TextInput from '@/components/TextInput';
import QuizContainer from '@/components/QuizContainer';
import LoadingPage from '@/components/LoadingPage';
import { Question } from '@/components/QuizQuestion';
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from 'react-router-dom';

const Index = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const sharedQuiz = searchParams.get('sharedQuiz');
    if (sharedQuiz) {
      try {
        const decodedQuestions = JSON.parse(decodeURIComponent(sharedQuiz));
        if (Array.isArray(decodedQuestions) && decodedQuestions.length > 0) {
          setQuestions(decodedQuestions);
        }
      } catch (error) {
        console.error('Error parsing shared quiz:', error);
        toast({
          title: "Error",
          description: "Failed to load shared quiz",
          variant: "destructive"
        });
      }
    }
  }, []);

  const generateQuestions = async (text: string) => {
    setIsLoading(true);
    setLoadingProgress(0);
    
    // Simulate initial processing
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 2;
      });
    }, 100);

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
      
      if (!json.choices?.[0]?.message?.content) {
        throw new Error('Invalid API response format');
      }

      let generatedQuestions;
      try {
        const content = json.choices[0].message.content;
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        const jsonString = jsonMatch ? jsonMatch[0] : content;
        
        generatedQuestions = JSON.parse(jsonString);
        
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
      
      // Set progress to 100% when questions are successfully generated
      setLoadingProgress(100);
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Error",
        description: "Failed to generate quiz questions. Please try again.",
        variant: "destructive"
      });
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsLoading(false);
        setLoadingProgress(0);
      }, 500);
    }
  };

  const handleRestart = () => {
    setQuestions([]);
    window.history.replaceState({}, '', window.location.pathname);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-8">Quiz Generator</h1>
          {isLoading ? (
            <LoadingPage progress={loadingProgress} />
          ) : (
            <TextInput onGenerate={generateQuestions} isLoading={isLoading} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <QuizContainer 
        questions={questions} 
        onRestart={handleRestart}
      />
    </div>
  );
};

export default Index;