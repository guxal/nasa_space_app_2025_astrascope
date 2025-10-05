import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Orbit, Star, Globe } from "lucide-react";

const Learning = () => {
  const transitFeatures = [
    {
      field: "koi_period",
      name: "Orbital Period",
      description: "Time it takes for the planet to complete one full orbit around its star."
    },
    {
      field: "koi_duration",
      name: "Duration",
      description: "How long the transit lasts, i.e., the passage of the planet in front of its star."
    },
    {
      field: "koi_depth",
      name: "Depth",
      description: "The amount of starlight blocked during transit; indicates how large the planet is compared to its star."
    },
    {
      field: "koi_impact",
      name: "Impact Parameter",
      description: "How centered or offset the transit is relative to the star's center; low values indicate a more central passage."
    },
    {
      field: "koi_model_snr",
      name: "Signal-to-Noise Ratio",
      description: "How clear or reliable the transit signal is; high values mean more confident detections."
    },
    {
      field: "koi_num_transits",
      name: "Number of Transits",
      description: "How many times the planet has been observed passing in front of its star."
    }
  ];

  const stellarFeatures = [
    {
      field: "koi_steff",
      name: "Stellar Temperature",
      description: "Surface temperature of the star measured in Kelvin; determines the star's type and color."
    },
    {
      field: "koi_slogg",
      name: "Surface Gravity",
      description: "Measure of gravitational force at the star's surface; influences its size and density."
    },
    {
      field: "koi_smet",
      name: "Metallicity",
      description: "Amount of elements heavier than hydrogen and helium present in the star; relates to planet formation."
    },
    {
      field: "koi_srad",
      name: "Stellar Radius",
      description: "Size of the star compared to the Sun."
    }
  ];

  const planetFeatures = [
    {
      field: "koi_ror",
      name: "Planet/Star Radius Ratio",
      description: "Ratio between the planet's radius and its star's radius; used to calculate the actual size of the planet."
    },
    {
      field: "koi_prad",
      name: "Planetary Radius",
      description: "Estimated size of the planet, typically expressed in Earth radii."
    },
    {
      field: "koi_teq",
      name: "Equilibrium Temperature",
      description: "Average temperature of the planet, calculated based on the energy it receives from its star (without considering atmosphere)."
    },
    {
      field: "koi_insol",
      name: "Insolation Flux",
      description: "Amount of energy the planet receives from its star; influences its climate and habitability."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          Learning Center
        </h1>
        <p className="text-muted-foreground">
          Understanding exoplanet detection parameters and stellar characteristics
        </p>
      </div>

      {/* Transit Characteristics */}
      <Card className="border-border bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Orbit className="h-5 w-5 text-primary" />
            Transit Characteristics
          </CardTitle>
          <CardDescription>
            Key parameters describing the planet's passage in front of its host star
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {transitFeatures.map((feature) => (
            <div key={feature.field} className="border-l-2 border-primary/50 pl-4 py-2">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="font-mono text-xs">
                  {feature.field}
                </Badge>
                <h3 className="font-semibold text-foreground">{feature.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stellar Characteristics */}
      <Card className="border-border bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Stellar Characteristics
          </CardTitle>
          <CardDescription>
            Properties of the host star that influence planet detection and classification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {stellarFeatures.map((feature) => (
            <div key={feature.field} className="border-l-2 border-primary/50 pl-4 py-2">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="font-mono text-xs">
                  {feature.field}
                </Badge>
                <h3 className="font-semibold text-foreground">{feature.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Derived Planet Characteristics */}
      <Card className="border-border bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Derived Planet Characteristics
          </CardTitle>
          <CardDescription>
            Calculated properties that help determine planet habitability and composition
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {planetFeatures.map((feature) => (
            <div key={feature.field} className="border-l-2 border-primary/50 pl-4 py-2">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="font-mono text-xs">
                  {feature.field}
                </Badge>
                <h3 className="font-semibold text-foreground">{feature.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Learning;
