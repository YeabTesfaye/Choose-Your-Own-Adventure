import { Link } from "react-router-dom";

import { BookOpen, Sparkles, Zap, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main className="container py-12 md:py-24">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-balance">
              AI-Powered Interactive Storytelling
            </span>
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Create Your Own{" "}
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Epic Adventures
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Generate unique interactive stories powered by AI. Make choices that
            shape your narrative and discover multiple endings in immersive
            adventures.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/generate">
              <Button size="lg" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Start Creating
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                View Stories
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mx-auto mt-24 grid max-w-5xl gap-6 md:grid-cols-3">
          <Card className="border-border/50">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">AI-Generated Stories</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Advanced AI creates unique, engaging narratives tailored to your
                chosen theme.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Interactive Choices</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Make decisions that matter and shape the outcome of your
                adventure.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10">
                <Users className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="text-lg font-semibold">Multiple Endings</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Discover different outcomes and replay to explore all
                possibilities.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
