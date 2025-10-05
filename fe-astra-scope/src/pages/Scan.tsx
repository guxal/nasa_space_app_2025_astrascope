import { useState } from "react";
import { Search, Play, Download, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Scan = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showHighConfidence, setShowHighConfidence] = useState(false);

  const scanData = [
    { id: "KIC-12345678", mission: "Kepler", period: 3.45, score: 0.96, prediction: "Confirmed" },
    { id: "TIC-98765432", mission: "TESS", period: 12.8, score: 0.93, prediction: "Confirmed" },
    { id: "KIC-11223344", mission: "Kepler", period: 5.21, score: 0.88, prediction: "Candidate" },
    { id: "TIC-55667788", mission: "TESS", period: 8.92, score: 0.91, prediction: "Confirmed" },
    { id: "KIC-99887766", mission: "Kepler", period: 15.3, score: 0.72, prediction: "Candidate" },
    { id: "TIC-44556677", mission: "TESS", period: 2.14, score: 0.95, prediction: "Confirmed" },
    { id: "KIC-33445566", mission: "Kepler", period: 7.89, score: 0.65, prediction: "False Positive" },
  ];

  const filteredData = showHighConfidence
    ? scanData.filter((item) => item.score >= 0.9)
    : scanData;

  const handleRunScanner = () => {
    setIsScanning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Candidate":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default:
        return "bg-red-500/10 text-red-500 border-red-500/20";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Search className="h-8 w-8 text-primary" />
          Batch Scanner
        </h1>
        <p className="text-muted-foreground">Process multiple light curves simultaneously</p>
      </div>

      <Card className="border-border bg-gradient-card">
        <CardHeader>
          <CardTitle>Scan Controls</CardTitle>
          <CardDescription>Run classification on batch dataset</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Button onClick={handleRunScanner} disabled={isScanning} size="lg">
              <Play className="mr-2 h-4 w-4" />
              {isScanning ? "Scanning..." : "Run Scanner"}
            </Button>

            <div className="flex items-center space-x-2">
              <Switch
                id="high-confidence"
                checked={showHighConfidence}
                onCheckedChange={setShowHighConfidence}
              />
              <Label htmlFor="high-confidence" className="cursor-pointer">
                <Filter className="inline h-4 w-4 mr-1" />
                High Confidence Only (≥90%)
              </Label>
            </div>
          </div>

          {isScanning && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing...</span>
                <span className="font-mono">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-border bg-gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Scan Results</CardTitle>
              <CardDescription>
                Showing {filteredData.length} of {scanData.length} objects
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Object ID</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Mission</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Period (days)</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Score</th>
                  <th className="text-center p-4 font-medium text-muted-foreground">Prediction</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                  >
                    <td className="p-4 font-mono text-sm">{row.id}</td>
                    <td className="p-4">
                      <Badge variant="outline">{row.mission}</Badge>
                    </td>
                    <td className="text-right p-4 font-mono">{row.period.toFixed(2)}</td>
                    <td className="text-right p-4">
                      <span className="font-mono font-medium text-primary">
                        {(row.score * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className="text-center p-4">
                      <Badge className={getStatusColor(row.prediction)} variant="outline">
                        {row.prediction}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Scan;
