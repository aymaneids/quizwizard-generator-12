import React from 'react';
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ShareQuizProps {
  quizContent: string;
}

const ShareQuiz: React.FC<ShareQuizProps> = ({ quizContent }) => {
  const { toast } = useToast();

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const shareUrl = `${currentUrl}?quiz=${encodeURIComponent(quizContent)}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiz Share',
          text: 'Check out this quiz!',
          url: shareUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
        handleCopyToClipboard(shareUrl);
      }
    } else {
      handleCopyToClipboard(shareUrl);
    }
  };

  const handleCopyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied!",
        description: "Quiz link has been copied to clipboard",
      });
    }).catch(() => {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive"
      });
    });
  };

  return (
    <Button
      variant="outline"
      className="gap-2"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4" />
      Share Quiz
    </Button>
  );
};

export default ShareQuiz;