import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { JobResponse, JobStatusResponse } from "../lib/types";
import { api } from "../api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { themeSchema, type ThemeFormData } from "../validation/themeSchema";

export default function GeneratePage() {
  const navigate = useNavigate();
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<
    "processing" | "completed" | "failed" | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ThemeFormData>({
    resolver: zodResolver(themeSchema),
    defaultValues: { theme: "" },
  });

  // Poll job status every few seconds
  useEffect(() => {
    let pollInterval: ReturnType<typeof setInterval>;

    if (jobId && jobStatus === "processing") {
      pollInterval = setInterval(() => pollJobStatus(jobId), 3000);
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [jobId, jobStatus]);

  // Smooth progress bar simulation
  useEffect(() => {
    if (jobStatus === "processing") {
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? prev : prev + Math.random() * 10));
      }, 500);
      return () => clearInterval(progressInterval);
    }
  }, [jobStatus]);

  const onSubmit = async (data: ThemeFormData) => {
    setLoading(true);
    setError(null);
    setProgress(0);

    try {
      const response = await api.post<JobResponse>("/stories/create", data);
      const { job_id, status } = response.data;
      setJobId(job_id);
      setJobStatus(status);
      setLoading(false);

      pollJobStatus(job_id);
    } catch (err: any) {
      setLoading(false);
      if (err.response?.status === 401) {
        setError("You must be logged in to generate stories");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(
          err.response?.data?.detail ||
            "Failed to generate story. Please try again."
        );
      }
    }
  };

  const pollJobStatus = async (id: string) => {
    try {
      const response = await api.get<JobStatusResponse>(`/jobs/${id}`);
      const { status, story_id, error: jobError } = response.data;
      setJobStatus(status);

      if (status === "completed" && story_id) {
        setProgress(100);
        setTimeout(() => navigate(`/story/${story_id}`), 1000);
      } else if (status === "failed" || jobError) {
        setError(jobError || "Failed to generate story");
        setJobStatus("failed");
      }
    } catch (err: any) {
      if (err.response?.status !== 404) {
        setError("Failed to check story status");
        setJobStatus("failed");
      }
    }
  };

  const handleReset = () => {
    setJobId(null);
    setJobStatus(null);
    setError(null);
    setLoading(false);
    setProgress(0);
    reset();
  };

  return (
    <div className="min-h-screen">
      <main className="container py-12">
        <div className="mx-auto max-w-2xl">
          {!jobId && !loading && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      Generate Your Adventure
                    </CardTitle>
                    <CardDescription>
                      Enter a theme to create your interactive story
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Story Theme</Label>
                    <Input
                      id="theme"
                      type="text"
                      placeholder="e.g., pirates, space exploration..."
                      {...register("theme")}
                      disabled={loading}
                    />
                    {errors.theme && (
                      <p className="text-sm text-red-500">
                        {errors.theme.message}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Choose any theme you'd like — the AI will create a unique
                      story with multiple paths and endings.
                    </p>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" size="lg" className="w-full gap-2">
                    <Sparkles className="h-5 w-5" />
                    Generate Story
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {(loading || jobStatus === "processing") && (
            <Card>
              <CardContent className="flex flex-col items-center gap-6 py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>

                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-semibold">Crafting Your Story</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI is weaving an immersive narrative...
                  </p>
                </div>

                <div className="w-full space-y-2">
                  <progress value={progress} className="h-2" />
                  <p className="text-center text-xs text-muted-foreground">
                    {progress < 30 && "Generating story structure..."}
                    {progress >= 30 &&
                      progress < 60 &&
                      "Creating narrative branches..."}
                    {progress >= 60 &&
                      progress < 90 &&
                      "Adding choices and endings..."}
                    {progress >= 90 && "Finalizing your adventure..."}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {jobStatus === "failed" && error && (
            <Card>
              <CardContent className="flex flex-col items-center gap-6 py-12">
                <Alert variant="destructive" className="w-full">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>

                <Button onClick={handleReset} variant="outline">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
