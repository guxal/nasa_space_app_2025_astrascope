import { useState } from "react";
import { Settings, RefreshCw, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const Tuning = () => {
  const [nTrees, setNTrees] = useState([100]);
  const [learningRate, setLearningRate] = useState([0.1]);
  const [maxDepth, setMaxDepth] = useState([5]);
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRetrain = () => {
    setIsTraining(true);
    setProgress(0);
    
    toast.info("Starting model retraining...", {
      description: "This may take a few minutes",
    });

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          toast.success("Model retrained successfully!", {
            description: `New accuracy: ${(92 + Math.random() * 4).toFixed(1)}%`,
          });
          return 100;
        }
        return prev + 5;
      });
    }, 400);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8 text-primary" />
          Model Tuning
        </h1>
        <p className="text-muted-foreground">Adjust hyperparameters and retrain the model</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-border bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Hyperparameters
            </CardTitle>
            <CardDescription>Configure model training parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="n-trees">Number of Trees</Label>
                <span className="text-sm font-mono text-muted-foreground">{nTrees[0]}</span>
              </div>
              <Slider
                id="n-trees"
                min={10}
                max={200}
                step={10}
                value={nTrees}
                onValueChange={setNTrees}
                className="[&_[role=slider]]:bg-primary"
              />
              <p className="text-xs text-muted-foreground">
                More trees = better performance but slower training
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="learning-rate">Learning Rate</Label>
                <span className="text-sm font-mono text-muted-foreground">
                  {learningRate[0].toFixed(3)}
                </span>
              </div>
              <Slider
                id="learning-rate"
                min={0.001}
                max={0.2}
                step={0.001}
                value={learningRate}
                onValueChange={setLearningRate}
                className="[&_[role=slider]]:bg-primary"
              />
              <p className="text-xs text-muted-foreground">
                Lower values = more stable but slower convergence
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="max-depth">Maximum Depth</Label>
                <span className="text-sm font-mono text-muted-foreground">{maxDepth[0]}</span>
              </div>
              <Slider
                id="max-depth"
                min={1}
                max={10}
                step={1}
                value={maxDepth}
                onValueChange={setMaxDepth}
                className="[&_[role=slider]]:bg-primary"
              />
              <p className="text-xs text-muted-foreground">
                Controls model complexity and overfitting
              </p>
            </div>

            <Button
              onClick={handleRetrain}
              disabled={isTraining}
              className="w-full"
              size="lg"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isTraining ? "animate-spin" : ""}`} />
              {isTraining ? "Training..." : "Retrain Model"}
            </Button>

            {isTraining && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Training Progress</span>
                  <span className="font-mono">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-gradient-card">
          <CardHeader>
            <CardTitle>Current Configuration</CardTitle>
            <CardDescription>Active model parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <span className="font-medium">Model Type</span>
                <span className="text-muted-foreground">XGBoost Classifier</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <span className="font-medium">Training Dataset</span>
                <span className="text-muted-foreground">15,420 samples</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <span className="font-medium">Validation Split</span>
                <span className="text-muted-foreground">20%</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <span className="font-medium">Features</span>
                <span className="text-muted-foreground">24 engineered</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <span className="font-medium">Last Trained</span>
                <span className="text-muted-foreground">2 hours ago</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-sm">Pro Tip</p>
                  <p className="text-sm text-muted-foreground">
                    Start with conservative values and gradually increase complexity. Monitor the
                    validation metrics to avoid overfitting.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tuning;
