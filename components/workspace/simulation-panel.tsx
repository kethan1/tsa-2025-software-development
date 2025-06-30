"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  TrendingUp,
  Droplets,
  Leaf,
  Bug,
  BarChart3,
  Eye,
  Download,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSimulation } from "./simulation-context";

export function SimulationPanel() {
  const [isPaused, setIsPaused] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const animationRef = useRef<number | undefined>(undefined);
  const currentYearRef = useRef<number>(2025);
  const { currentYear, setCurrentYear, isPlaying, setIsPlaying, videoRef } = useSimulation();
  const { toast } = useToast();

  // Update video time when slider changes
  useEffect(() => {
    if (videoRef?.current && !isPlaying) {
      const yearProgress = (currentYear - 2025) / 20; // 20 years from 2025 to 2045
      const newTime = yearProgress * (videoRef.current.duration || 20);
      videoRef.current.currentTime = newTime;
    }
  }, [currentYear, videoRef, isPlaying]);

  // Auto-advance year when playing
  useEffect(() => {
    if (isPlaying && !isPaused && videoRef?.current) {
      const interval = setInterval(() => {
        if (videoRef.current && !videoRef.current.paused) {
          const currentTime = videoRef.current.currentTime;
          const duration = videoRef.current.duration || 20;
          const yearProgress = currentTime / duration;
          const newYear = 2025 + Math.round(yearProgress * 20);
          setCurrentYear(newYear);

          if (currentTime >= duration) {
            // Stop simulation when video ends
            if (videoRef.current) {
              videoRef.current.pause();
            }
            setIsPlaying(false);
            setIsPaused(false);
          }
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying, isPaused, videoRef, setCurrentYear, setIsPlaying, setIsPaused]);

  // Alternative animation for when video is not available
  useEffect(() => {
    if (isPlaying && !isPaused && !videoRef?.current) {
      const animate = () => {
        const nextYear = currentYearRef.current + simulationSpeed;
        if (nextYear >= 2045) {
          // Stop simulation when reaching end
          setIsPlaying(false);
          setIsPaused(false);
          setCurrentYear(2045);
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
        } else {
          currentYearRef.current = nextYear;
          setCurrentYear(nextYear);
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isPaused, simulationSpeed, setCurrentYear, setIsPlaying, setIsPaused]);

  // Update ref when currentYear changes
  useEffect(() => {
    currentYearRef.current = currentYear;
  }, [currentYear]);

  const handleSliderChange = (value: number[]) => {
    const newYear = value[0];
    setCurrentYear(newYear);
    
    // Update video time if available
    if (videoRef?.current) {
      const yearProgress = (newYear - 2025) / 20;
      const newTime = yearProgress * (videoRef.current.duration || 20);
      videoRef.current.currentTime = newTime;
    }
  };

  const handlePlaySimulation = () => {
    if (videoRef?.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setIsPaused(false);
      toast({
        title: "Simulation Started",
        description: "Playing time-based simulation...",
      });
    } else {
      // Fallback animation without video
      setIsPlaying(true);
      setIsPaused(false);
      toast({
        title: "Simulation Started",
        description: "Running time-based simulation...",
      });
    }
  };

  const handlePauseSimulation = () => {
    if (videoRef?.current) {
      videoRef.current.pause();
    }
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Simulation Resumed" : "Simulation Paused",
      description: isPaused ? "Continuing simulation..." : "Simulation paused.",
    });
  };

  const handleStopSimulation = () => {
    if (videoRef?.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentYear(2025);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    toast({
      title: "Simulation Stopped",
      description: "Simulation has been reset to the beginning.",
    });
  };

  const handleSpeedChange = (speed: number) => {
    setSimulationSpeed(speed);
    if (videoRef?.current) {
      videoRef.current.playbackRate = speed;
    }
    toast({
      title: "Speed Changed",
      description: `Simulation speed set to ${speed}x`,
    });
  };

  const handleGenerateActionPlan = () => {
    toast({
      title: "Action Plan Generated",
      description: "Your detailed implementation plan is ready.",
    });
    // Simulate file download
    const link = document.createElement("a");
    link.href = "#";
    link.download = "verdecore-action-plan.pdf";
    link.click();
  };

  const handleViewEarthMirror = () => {
    toast({
      title: "EarthMirror View",
      description: "Opening satellite imagery overlay...",
    });
  };

  const handleCreateDeploymentKit = () => {
    toast({
      title: "Deployment Kit Created",
      description:
        "Complete implementation kit with supply lists and grant proposals generated.",
    });
    // Simulate file download
    const link = document.createElement("a");
    link.href = "#";
    link.download = "verdecore-deployment-kit.zip";
    link.click();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Regen Simulator</h2>
        <p className="text-sm text-muted-foreground">
          Time-based forecasting engine powered by real environmental data
        </p>
      </div>

      {/* Time Controls */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Time Slider
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>2025</span>
              <span className="font-medium">{currentYear}</span>
              <span>2045</span>
            </div>
            <Slider
              value={[currentYear]}
              min={2025}
              max={2045}
              step={1}
              onValueChange={handleSliderChange}
              disabled={isPlaying && !isPaused}
            />

            {/* Control Buttons */}
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlaySimulation}
                disabled={isPlaying && !isPaused}
                title="Start Simulation"
              >
                <Play className="w-4 h-4 mr-2" />
                Simulate
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handlePauseSimulation}
                disabled={!isPlaying}
                title="Pause/Resume Simulation"
              >
                <Pause className="w-4 h-4" />
              </Button>

              <Button 
                variant="outline" 
                size="sm"
                onClick={handleStopSimulation}
                title="Stop and Reset Simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {/* Speed Controls */}
            <div className="flex justify-center gap-1">
              {[0.5, 1, 2, 4].map((speed) => (
                <Button
                  key={speed}
                  variant={simulationSpeed === speed ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSpeedChange(speed)}
                  disabled={!isPlaying || isPaused}
                  className="w-12 h-8 text-xs"
                >
                  {speed}x
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simulation Metrics */}
      <Tabs defaultValue="environmental" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
          <TabsTrigger value="economic">Economic</TabsTrigger>
        </TabsList>

        <TabsContent value="environmental" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-500" />
                Soil Carbon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current: 2.1%</span>
                  <span className="text-green-600">+0.8% projected</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Bug className="w-4 h-4 text-blue-500" />
                Biodiversity Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Species Count: 45</span>
                  <span className="text-green-600">+23 projected</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                Water Retention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Infiltration Rate</span>
                  <span className="text-green-600">+40% improvement</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="economic" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Yield Projection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Year 1: $2,400/acre</span>
                  <span>Year 5: $4,800/acre</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-500" />
                Input Reduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Fertilizer</span>
                  <Badge variant="secondary">-60%</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pesticides</span>
                  <Badge variant="secondary">-85%</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Water</span>
                  <Badge variant="secondary">-30%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          className="w-full bg-transparent"
          variant="outline"
          onClick={handleGenerateActionPlan}
        >
          <Download className="w-4 h-4 mr-2" />
          Generate Action Plan
        </Button>

        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <h4 className="font-medium text-sm mb-2">Ready to Deploy?</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Generate your complete implementation kit with supply lists and
              grant proposals.
            </p>
            <Button
              size="sm"
              className="w-full"
              onClick={handleCreateDeploymentKit}
            >
              Create Deployment Kit
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
