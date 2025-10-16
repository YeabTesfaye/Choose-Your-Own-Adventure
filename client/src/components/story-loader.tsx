import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  RotateCcw,
  Sparkles,
  Trophy,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { api } from "../api";
import type { Story, StoryNode, StoryOption } from "../lib/types";
import { cn } from "../lib/utils";

export default function StoryLoader() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [story, setStory] = useState<Story | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<number | null>(null);
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [options, setOptions] = useState<StoryOption[]>([]);
  const [isEnding, setIsEnding] = useState(false);
  const [isWinningEnding, setIsWinningEnding] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Load story from API
  useEffect(() => {
    if (!id) return;
    const fetchStory = async () => {
      try {
        setLoading(true);
        const response = await api.get<Story>(`/stories/${id}/complete`);
        const loadedStory = response.data;
        setStory(loadedStory);
        setCurrentNodeId(loadedStory.root_node?.id ?? null);
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError("You must be logged in to view this story");
          setTimeout(() => navigate("/login"), 2000);
        } else if (err.response?.status === 404) {
          setError("Story not found");
        } else {
          setError("Failed to load story");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [id, navigate]);

  // Update node on navigation
  useEffect(() => {
    if (currentNodeId !== null && story && story.all_nodes) {
      const node = story.all_nodes[currentNodeId];
      if (!node) return;

      setCurrentNode(node);
      setIsEnding(node.is_ending);
      setIsWinningEnding(node.is_winning_ending);

      if (!node.is_ending && node.options?.length) {
        setOptions(node.options);
      } else {
        setOptions([]);
      }
      setSelectedOption(null);
    }
  }, [currentNodeId, story]);

  const restartStory = () => {
    if (story?.root_node) setCurrentNodeId(story.root_node.id);
  };

  const createNewStory = () => navigate("/generate");

  const chooseOption = (optionId: number) => {
    setSelectedOption(optionId);
    setTimeout(() => setCurrentNodeId(optionId), 300);
  };

  // ------------- UI -------------
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-2xl">
            <CardContent className="flex flex-col items-center gap-4 py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading your adventure...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-2xl">
            <CardContent className="flex flex-col items-center gap-6 py-12">
              <Alert variant="destructive" className="w-full">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <Button onClick={createNewStory} variant="outline">
                Go to Story Generator
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (!story || !currentNode) return null;

  return (
    <div className="min-h-screen">
      <main className="container py-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="text-2xl">{story.title}</CardTitle>
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    {story.theme}
                  </Badge>
                </div>
                <Button
                  onClick={restartStory}
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <RotateCcw className="h-4 w-4" />
                  Restart
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Story Content */}
          <Card className="border-2">
            <CardContent className="space-y-6 p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="leading-relaxed">{currentNode.content}</p>
              </div>

              {isEnding ? (
                <div className="space-y-6">
                  <Separator />
                  <div
                    className={cn(
                      "flex flex-col items-center gap-4 rounded-lg p-6 text-center",
                      isWinningEnding ? "bg-primary/10" : "bg-muted"
                    )}
                  >
                    {isWinningEnding ? (
                      <>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                          <Trophy className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold">
                            Congratulations!
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            You reached a winning ending
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-xl font-semibold">The End</h3>
                        <p className="text-sm text-muted-foreground">
                          Your adventure has concluded
                        </p>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      onClick={restartStory}
                      variant="outline"
                      className="flex-1 gap-2 bg-transparent"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Restart Story
                    </Button>
                    <Button onClick={createNewStory} className="flex-1 gap-2">
                      <Sparkles className="h-4 w-4" />
                      New Story
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Separator />
                  <div className="space-y-3">
                    <h3 className="font-semibold text-muted-foreground">
                      What will you do?
                    </h3>
                    <div className="grid gap-3">
                      {options.map((option, index) => (
                        <Button
                          key={index}
                          onClick={() => chooseOption(option.node_id)}
                          variant="outline"
                          size="lg"
                          className={cn(
                            "h-auto justify-start whitespace-normal p-4 text-left transition-all",
                            selectedOption === option.node_id &&
                              "border-primary bg-primary/5"
                          )}
                        >
                          <span className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                            {index + 1}
                          </span>
                          <span className="text-pretty">{option.text}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
