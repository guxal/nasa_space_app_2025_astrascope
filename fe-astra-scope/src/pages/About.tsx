import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Target, Users, Rocket } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          About Us
        </h1>
        <p className="text-muted-foreground">
          Pioneering AI-powered exoplanet discovery and classification
        </p>
      </div>

      {/* Mission */}
      <Card className="border-border bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            We are dedicated to advancing exoplanet research through cutting-edge artificial intelligence and machine learning technologies. Our AI classifier analyzes data from NASA missions like Kepler and TESS to identify and classify potential exoplanets with unprecedented accuracy.
          </p>
          <p className="text-foreground">
            By combining state-of-the-art deep learning models with astronomical data, we help researchers and enthusiasts discover new worlds beyond our solar system, contributing to humanity's understanding of the universe.
          </p>
        </CardContent>
      </Card>

      {/* What We Do */}
      <Card className="border-border bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            What We Do
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="border-l-2 border-primary/50 pl-4 py-2">
              <h3 className="font-semibold text-foreground mb-1">AI-Powered Classification</h3>
              <p className="text-sm text-muted-foreground">
                Our advanced machine learning models classify exoplanet candidates as CONFIRMED, CANDIDATE, or FALSE POSITIVE based on transit photometry data.
              </p>
            </div>
            <div className="border-l-2 border-primary/50 pl-4 py-2">
              <h3 className="font-semibold text-foreground mb-1">Real Mission Data</h3>
              <p className="text-sm text-muted-foreground">
                We work with authentic data from NASA's Kepler and TESS missions, analyzing stellar characteristics and transit parameters to identify potential exoplanets.
              </p>
            </div>
            <div className="border-l-2 border-primary/50 pl-4 py-2">
              <h3 className="font-semibold text-foreground mb-1">Educational Resources</h3>
              <p className="text-sm text-muted-foreground">
                We provide comprehensive learning materials to help users understand the science behind exoplanet detection and the parameters that define these distant worlds.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="border-border bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Our Approach
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground mb-4">
            We leverage the latest advancements in deep learning and data science to create accessible tools for exoplanet research. Our platform bridges the gap between complex astronomical data and actionable insights, making space exploration more accessible to researchers, students, and space enthusiasts worldwide.
          </p>
          <p className="text-foreground">
            Every prediction is powered by carefully trained models that consider multiple stellar and transit characteristics, ensuring high accuracy and reliability in exoplanet classification.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;