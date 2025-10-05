import { useState, useMemo } from "react";
import { Upload, FileUp, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ITEMS_PER_PAGE = 10;

const Classify = () => {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleRunPrediction = async () => {
    if (!file) return;

    setLoading(true);
    setPrediction(null);
    setResults([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error en la predicción");

      const data = await res.json();
      setResults(data);
      setPrediction("done");
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      alert("Error al procesar el archivo.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-500";
      case "CANDIDATE":
        return "bg-yellow-500";
      case "FALSE POSITIVE":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return results.slice(start, start + ITEMS_PER_PAGE);
  }, [results, currentPage]);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);

  // Métricas resumen
  const metrics = useMemo(() => {
    const summary = { CONFIRMED: 0, CANDIDATE: 0, "FALSE POSITIVE": 0 };
    results.forEach((r) => {
      if (summary[r.prediction] !== undefined) summary[r.prediction]++;
    });
    return summary;
  }, [results]);

  //const featureKeys = Object.keys(results[0]).filter(
  //  (key) => key !== "prediction"
  //);
  
  const featureKeys = useMemo(() => {
    if (!results || results.length === 0) return [];
  
    const excludeKeys = [
      "prediction",
      "koi_fpflag_nt",
      "koi_fpflag_ss",
      "koi_fpflag_co",
      "koi_fpflag_ec",
    ];
  
    return Object.keys(results[0]).filter(
      (key) => !excludeKeys.includes(key)
    );
  }, [results]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">

            {/* About Us Section */}
      <Card className="border-border bg-gradient-card">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">About Exoplanet AI Classifier</h2>
          <p className="text-muted-foreground mb-3">
            We leverage cutting-edge AI and machine learning to analyze NASA mission data, helping discover and classify exoplanets with unprecedented accuracy. Our platform makes space exploration accessible to researchers and enthusiasts worldwide.
          </p>
          <a 
            href="/about" 
            className="text-primary hover:underline font-medium inline-flex items-center gap-1"
          >
            Learn more about our mission
            <Sparkles className="h-4 w-4" />
          </a>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Upload className="h-8 w-8 text-primary" />
          Classification Demo
        </h1>
        <p className="text-muted-foreground">
          Upload exoplanet data for AI-powered classification
        </p>
      </div>

      {/* Upload card */}
      <Card className="border-border bg-gradient-card">
        <CardHeader>
          <CardTitle>Upload Dataset</CardTitle>
          <CardDescription>
            CSV file with required and optional columns
          </CardDescription>
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="font-semibold text-foreground mb-2">Required fields:</p>
              <div className="flex flex-wrap gap-1.5">
                {['koi_fpflag_nt', 'koi_fpflag_ss', 'koi_fpflag_co', 'koi_fpflag_ec',
                  'koi_period', 'koi_duration', 'koi_depth', 'koi_impact',
                  'koi_model_snr', 'koi_num_transits', 'koi_steff', 'koi_slogg',
                  'koi_smet', 'koi_srad', 'koi_ror', 'koi_prad'].map((field) => (
                  <Badge key={field} variant="secondary" className="text-xs font-mono">
                    {field}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Optional fields (for control):</p>
              <div className="flex flex-wrap gap-1.5">
                {['kepid', 'kepoi_name'].map((field) => (
                  <Badge key={field} variant="outline" className="text-xs font-mono">
                    {field}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-border/50">
              <p className="text-muted-foreground">
                You can download NASA mission data (KOI or TESS) and test it:{' '}
                <a
                  href="https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  NASA Exoplanet Archive
                </a>
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-muted rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer bg-background/50"
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">
                {file ? file.name : "Drop CSV file here or click to browse"}
              </p>
              <p className="text-sm text-muted-foreground">
                Supports CSV files up to 10MB
              </p>
            </label>
          </div>

          <Button
            onClick={handleRunPrediction}
            disabled={!file}
            className="mt-4 w-full"
            size="lg"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {loading ? "Processing..." : "Run Prediction"}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {prediction && (
        <Card className="border-border bg-gradient-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Prediction Results
            </CardTitle>
            <CardDescription>
              Each row corresponds to one detected object from your dataset.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm border border-border/50 rounded-lg overflow-hidden">
  <thead>
    <tr className="bg-muted/60 text-left text-xs uppercase tracking-wide border-b border-border/60">
      <th className="py-3 px-4 font-semibold text-foreground">#</th>
      <th className="py-3 px-4 font-semibold text-foreground">Prediction</th>
      {featureKeys.map((key, index) => (
        <th
          key={key}
          className={`py-3 px-4 font-semibold text-foreground ${
            index % 2 === 0 ? "bg-muted/40" : "bg-muted/20"
          }`}
        >
          {key.replace(/_/g, " ")}
        </th>
      ))}
    </tr>
  </thead>

  <tbody>
    {paginatedResults.map((row, i) => (
      <tr
        key={i}
        className={`border-b border-border/30 ${
          i % 2 === 0 ? "bg-background/40" : "bg-background/20"
        } hover:bg-muted/30 transition-colors`}
      >
        <td className="py-2 px-4 font-mono text-muted-foreground">
          {(currentPage - 1) * ITEMS_PER_PAGE + i + 1}
        </td>
        <td className="py-2 px-4">
          <Badge
            className={`${getStatusColor(
              row.prediction
            )} text-white px-3 py-1 text-xs font-semibold`}
          >
            {row.prediction}
          </Badge>
        </td>

        {featureKeys.map((key) => (
          <td key={key} className="py-2 px-4 whitespace-nowrap">
            {typeof row[key] === "number"
              ? row[key].toFixed(3)
              : String(row[key])}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>


            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-4 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}

            {/* Metrics summary */}
            <div className="mt-6 border-t border-border pt-4">
              <h3 className="text-lg font-semibold mb-2">Summary Metrics</h3>
              <div className="flex gap-4">
                <Badge className="bg-green-500 text-white">
                  Confirmed: {metrics.CONFIRMED}
                </Badge>
                <Badge className="bg-yellow-500 text-black">
                  Candidate: {metrics.CANDIDATE}
                </Badge>
                <Badge className="bg-red-500 text-white">
                  False Positive: {metrics["FALSE POSITIVE"]}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Classify;
