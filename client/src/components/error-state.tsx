// src/components/ErrorState.tsx
import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try again",
}) => {
  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <Alert variant="destructive" className="w-full max-w-md">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-1 text-destructive" />
          <div>
            <AlertTitle className="font-semibold">{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </div>
        </div>
      </Alert>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          {retryLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
