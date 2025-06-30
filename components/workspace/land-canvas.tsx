"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Upload, Map, Layers, ZoomIn, ZoomOut, RotateCw, MousePointer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSimulation } from "./simulation-context";

interface GISData {
  type: string;
  features: Array<{
    type: string;
    geometry: {
      type: string;
      coordinates: number[][][] | number[][] | number[];
    };
    properties: Record<string, any>;
  }>;
}

interface CanvasState {
  zoom: number;
  panX: number;
  panY: number;
  rotation: number;
}

interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  showVideo: boolean;
}

// Enhanced color scheme for more realistic appearance
const featureColors = {
  boundary: { 
    fill: 'rgba(34, 197, 94, 0.15)', 
    stroke: 'rgba(34, 197, 94, 0.9)', 
    lineWidth: 3,
    pattern: 'dashed'
  },
  tree: { 
    fill: 'rgba(22, 163, 74, 0.8)', 
    stroke: 'rgba(22, 163, 74, 1)', 
    lineWidth: 2,
    shadow: 'rgba(0, 0, 0, 0.3)'
  },
  tree_cluster: { 
    fill: 'rgba(22, 163, 74, 0.6)', 
    stroke: 'rgba(22, 163, 74, 0.9)', 
    lineWidth: 2,
    pattern: 'dotted'
  },
  orchard: { 
    fill: 'rgba(34, 197, 94, 0.4)', 
    stroke: 'rgba(34, 197, 94, 0.8)', 
    lineWidth: 2,
    pattern: 'grid'
  },
  stream: { 
    fill: 'rgba(59, 130, 246, 0.7)', 
    stroke: 'rgba(59, 130, 246, 1)', 
    lineWidth: 4,
    pattern: 'flowing'
  },
  water_body: { 
    fill: 'rgba(59, 130, 246, 0.5)', 
    stroke: 'rgba(59, 130, 246, 0.8)', 
    lineWidth: 2,
    pattern: 'ripple'
  },
  wetland: { 
    fill: 'rgba(168, 85, 247, 0.4)', 
    stroke: 'rgba(168, 85, 247, 0.7)', 
    lineWidth: 2,
    pattern: 'marsh'
  },
  building: { 
    fill: 'rgba(156, 163, 175, 0.7)', 
    stroke: 'rgba(107, 114, 128, 1)', 
    lineWidth: 2,
    shadow: 'rgba(0, 0, 0, 0.4)'
  },
  road: { 
    fill: 'rgba(245, 158, 11, 0.8)', 
    stroke: 'rgba(245, 158, 11, 1)', 
    lineWidth: 3,
    pattern: 'striped'
  },
  fence: { 
    fill: 'rgba(120, 113, 108, 0.9)', 
    stroke: 'rgba(120, 113, 108, 1)', 
    lineWidth: 2,
    pattern: 'post'
  },
  hedge: { 
    fill: 'rgba(34, 197, 94, 0.6)', 
    stroke: 'rgba(34, 197, 94, 0.9)', 
    lineWidth: 3,
    pattern: 'bushy'
  },
  geological: { 
    fill: 'rgba(107, 114, 128, 0.7)', 
    stroke: 'rgba(107, 114, 128, 1)', 
    lineWidth: 2,
    pattern: 'rocky'
  },
  default: { 
    fill: 'rgba(34, 197, 94, 0.3)', 
    stroke: 'rgba(34, 197, 94, 0.8)', 
    lineWidth: 2,
    pattern: 'solid'
  }
};

export function LandCanvas() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const { setVideoRef } = useSimulation();
  
  const [gisData, setGisData] = useState<GISData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [canvasState, setCanvasState] = useState<CanvasState>({
    zoom: 1,
    panX: 0,
    panY: 0,
    rotation: 0,
  });
  const [videoState, setVideoState] = useState<VideoState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    showVideo: false,
  });

  // Register video ref with simulation context
  useEffect(() => {
    if (videoRef.current != null) {
      return;
    }

    setVideoRef(videoRef as React.RefObject<HTMLVideoElement>);
    return () => setVideoRef(null);
  }, [setVideoRef]);

  const handleImportGISData = () => {
    fileInputRef.current?.click();
  };

  const parseGeoJSON = (content: string): GISData => {
    try {
      const data = JSON.parse(content);
      if (data.type === "FeatureCollection" || data.type === "Feature") {
        return data;
      }
      throw new Error("Invalid GeoJSON format");
    } catch (error) {
      throw new Error("Failed to parse GeoJSON");
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    
    try {
      const content = await file.text();
      let parsedData: GISData;

      if (file.name.toLowerCase().endsWith('.geojson') || file.name.toLowerCase().endsWith('.json')) {
        parsedData = parseGeoJSON(content);
      } else if (file.name.toLowerCase().endsWith('.kml')) {
        // Basic KML parsing - in a real app you'd use a proper KML parser
        toast({
          title: "KML Support",
          description: "KML files are supported but require additional parsing libraries.",
        });
        return;
      } else {
        throw new Error("Unsupported file format");
      }

      setGisData(parsedData);
      setVideoState(prev => ({ ...prev, showVideo: true }));
      
      toast({
        title: "GIS Data Imported",
        description: `Successfully imported ${parsedData.features?.length || 1} feature(s) from ${file.name}`,
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Failed to import GIS data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      
      setCanvasState(prev => ({
        ...prev,
        panX: prev.panX + deltaX / prev.zoom,
        panY: prev.panY + deltaY / prev.zoom,
      }));
      
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setCanvasState(prev => ({
      ...prev,
      zoom: Math.max(0.1, Math.min(5, prev.zoom * zoomFactor)),
    }));
  };

  // Video control functions
  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setVideoState(prev => ({
        ...prev,
        currentTime: videoRef.current!.currentTime,
        duration: videoRef.current!.duration,
      }));
    }
  };

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoState(prev => ({
        ...prev,
        duration: videoRef.current!.duration,
      }));
    }
  };

  const handleTimeSliderChange = (value: number[]) => {
    if (videoRef.current) {
      const newTime = value[0];
      videoRef.current.currentTime = newTime;
      setVideoState(prev => ({ ...prev, currentTime: newTime }));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getFeatureStyle = (featureType: string) => {
    return featureColors[featureType as keyof typeof featureColors] || featureColors.default;
  };

  // Draw realistic 3D tree with detailed structure
  const drawTree = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number = 8) => {
    ctx.save();
    
    // Calculate tree dimensions based on size
    const trunkHeight = size * 1.8;
    const trunkWidth = size * 0.25;
    const foliageRadius = size * 0.9;
    const branchLength = size * 0.5;
    
    // Enhanced shadow with multiple layers for depth
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    // Draw tree base shadow (elliptical for realism)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x, y + foliageRadius + trunkHeight, trunkWidth * 2.5, trunkWidth * 1.2, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw main trunk with realistic bark texture
    const trunkGradient = ctx.createLinearGradient(x - trunkWidth, y + foliageRadius, x + trunkWidth, y + foliageRadius + trunkHeight);
    trunkGradient.addColorStop(0, 'rgba(139, 69, 19, 0.9)');
    trunkGradient.addColorStop(0.3, 'rgba(160, 82, 45, 1)');
    trunkGradient.addColorStop(0.7, 'rgba(139, 69, 19, 0.95)');
    trunkGradient.addColorStop(1, 'rgba(101, 67, 33, 0.8)');
    
    ctx.fillStyle = trunkGradient;
    ctx.fillRect(x - trunkWidth, y + foliageRadius, trunkWidth * 2, trunkHeight);
    
    // Draw trunk bark texture lines
    ctx.strokeStyle = 'rgba(101, 67, 33, 0.6)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 3; i++) {
      const yPos = y + foliageRadius + (trunkHeight / 4) * (i + 1);
      ctx.beginPath();
      ctx.moveTo(x - trunkWidth + 1, yPos);
      ctx.lineTo(x + trunkWidth - 1, yPos);
      ctx.stroke();
    }
    
    // Draw trunk highlight for 3D effect
    ctx.fillStyle = 'rgba(160, 82, 45, 0.7)';
    ctx.fillRect(x - trunkWidth + 1, y + foliageRadius, trunkWidth * 0.4, trunkHeight);
    
    // Draw multiple branches with varying angles
    const branchGradient = ctx.createLinearGradient(0, 0, 0, branchLength);
    branchGradient.addColorStop(0, 'rgba(139, 69, 19, 1)');
    branchGradient.addColorStop(1, 'rgba(160, 82, 45, 0.8)');
    
    // Left branches
    ctx.save();
    ctx.translate(x - trunkWidth * 0.6, y + foliageRadius * 0.6);
    ctx.rotate(-0.4);
    ctx.fillStyle = branchGradient;
    ctx.fillRect(0, 0, trunkWidth * 0.7, branchLength * 0.8);
    ctx.restore();
    
    ctx.save();
    ctx.translate(x - trunkWidth * 0.3, y + foliageRadius * 0.8);
    ctx.rotate(-0.2);
    ctx.fillStyle = branchGradient;
    ctx.fillRect(0, 0, trunkWidth * 0.5, branchLength * 0.6);
    ctx.restore();
    
    // Right branches
    ctx.save();
    ctx.translate(x + trunkWidth * 0.6, y + foliageRadius * 0.6);
    ctx.rotate(0.4);
    ctx.fillStyle = branchGradient;
    ctx.fillRect(0, 0, trunkWidth * 0.7, branchLength * 0.8);
    ctx.restore();
    
    ctx.save();
    ctx.translate(x + trunkWidth * 0.3, y + foliageRadius * 0.8);
    ctx.rotate(0.2);
    ctx.fillStyle = branchGradient;
    ctx.fillRect(0, 0, trunkWidth * 0.5, branchLength * 0.6);
    ctx.restore();
    
    // Draw main foliage with multiple layers for 3D effect
    // Base foliage layer
    const baseFoliageGradient = ctx.createRadialGradient(x, y, 0, x, y, foliageRadius);
    baseFoliageGradient.addColorStop(0, 'rgba(22, 163, 74, 1)');
    baseFoliageGradient.addColorStop(0.5, 'rgba(21, 128, 61, 0.9)');
    baseFoliageGradient.addColorStop(0.8, 'rgba(20, 83, 45, 0.8)');
    baseFoliageGradient.addColorStop(1, 'rgba(5, 46, 22, 0.6)');
    
    ctx.fillStyle = baseFoliageGradient;
    ctx.beginPath();
    ctx.arc(x, y, foliageRadius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Middle foliage layer (slightly smaller and lighter)
    const middleFoliageGradient = ctx.createRadialGradient(x, y, 0, x, y, foliageRadius * 0.8);
    middleFoliageGradient.addColorStop(0, 'rgba(34, 197, 94, 0.9)');
    middleFoliageGradient.addColorStop(0.6, 'rgba(22, 163, 74, 0.8)');
    middleFoliageGradient.addColorStop(1, 'rgba(21, 128, 61, 0.6)');
    
    ctx.fillStyle = middleFoliageGradient;
    ctx.beginPath();
    ctx.arc(x, y, foliageRadius * 0.8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Top foliage highlight for 3D effect
    const highlightGradient = ctx.createRadialGradient(x - foliageRadius * 0.3, y - foliageRadius * 0.3, 0, x - foliageRadius * 0.3, y - foliageRadius * 0.3, foliageRadius * 0.7);
    highlightGradient.addColorStop(0, 'rgba(74, 222, 128, 0.9)');
    highlightGradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.6)');
    highlightGradient.addColorStop(1, 'rgba(22, 163, 74, 0.3)');
    
    ctx.fillStyle = highlightGradient;
    ctx.beginPath();
    ctx.arc(x - foliageRadius * 0.3, y - foliageRadius * 0.3, foliageRadius * 0.7, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw smaller foliage clusters for texture and depth
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const clusterX = x + Math.cos(angle) * foliageRadius * 0.7;
      const clusterY = y + Math.sin(angle) * foliageRadius * 0.7;
      const clusterSize = foliageRadius * 0.25;
      
      const clusterGradient = ctx.createRadialGradient(clusterX, clusterY, 0, clusterX, clusterY, clusterSize);
      clusterGradient.addColorStop(0, 'rgba(34, 197, 94, 0.9)');
      clusterGradient.addColorStop(1, 'rgba(22, 163, 74, 0.7)');
      
      ctx.fillStyle = clusterGradient;
      ctx.beginPath();
      ctx.arc(clusterX, clusterY, clusterSize, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Draw additional small foliage details
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 + Math.PI / 4;
      const detailX = x + Math.cos(angle) * foliageRadius * 0.5;
      const detailY = y + Math.sin(angle) * foliageRadius * 0.5;
      const detailSize = foliageRadius * 0.15;
      
      ctx.fillStyle = 'rgba(74, 222, 128, 0.8)';
      ctx.beginPath();
      ctx.arc(detailX, detailY, detailSize, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Draw tree base/roots with texture
    const rootGradient = ctx.createRadialGradient(x, y + foliageRadius + trunkHeight, 0, x, y + foliageRadius + trunkHeight, trunkWidth * 1.5);
    rootGradient.addColorStop(0, 'rgba(139, 69, 19, 0.8)');
    rootGradient.addColorStop(1, 'rgba(101, 67, 33, 0.6)');
    
    ctx.fillStyle = rootGradient;
    ctx.beginPath();
    ctx.ellipse(x, y + foliageRadius + trunkHeight, trunkWidth * 1.8, trunkWidth * 1, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add some grass detail around the base
    for (let i = 0; i < 6; i++) {
      const grassAngle = (i / 6) * Math.PI * 2;
      const grassX = x + Math.cos(grassAngle) * trunkWidth * 1.5;
      const grassY = y + foliageRadius + trunkHeight + Math.sin(grassAngle) * trunkWidth * 0.5;
      
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(grassX, grassY);
      ctx.lineTo(grassX + (Math.random() - 0.5) * 3, grassY - 2);
      ctx.stroke();
    }
    
    ctx.restore();
  };

  // Draw realistic 3D building with detailed structure
  const drawBuilding = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
    ctx.save();
    
    // Draw building shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    
    // Draw main building with 3D gradient
    const buildingGradient = ctx.createLinearGradient(x, y, x + width, y);
    buildingGradient.addColorStop(0, 'rgba(156, 163, 175, 0.9)');
    buildingGradient.addColorStop(0.5, 'rgba(209, 213, 219, 1)');
    buildingGradient.addColorStop(1, 'rgba(156, 163, 175, 0.8)');
    
    ctx.fillStyle = buildingGradient;
    ctx.fillRect(x, y, width, height);
    
    // Draw building side wall (3D effect)
    const sideGradient = ctx.createLinearGradient(x + width, y, x + width + 3, y);
    sideGradient.addColorStop(0, 'rgba(156, 163, 175, 0.8)');
    sideGradient.addColorStop(1, 'rgba(107, 114, 128, 0.6)');
    
    ctx.fillStyle = sideGradient;
    ctx.fillRect(x + width, y, 3, height);
    
    // Draw roof with 3D perspective
    const roofGradient = ctx.createLinearGradient(x, y - 4, x + width, y - 4);
    roofGradient.addColorStop(0, 'rgba(107, 114, 128, 1)');
    roofGradient.addColorStop(0.5, 'rgba(75, 85, 99, 0.9)');
    roofGradient.addColorStop(1, 'rgba(107, 114, 128, 0.8)');
    
    ctx.fillStyle = roofGradient;
    ctx.beginPath();
    ctx.moveTo(x - 2, y);
    ctx.lineTo(x + width/2, y - 6);
    ctx.lineTo(x + width + 2, y);
    ctx.closePath();
    ctx.fill();
    
    // Draw roof side (3D effect)
    ctx.fillStyle = 'rgba(75, 85, 99, 0.7)';
    ctx.beginPath();
    ctx.moveTo(x + width + 2, y);
    ctx.lineTo(x + width + 5, y - 3);
    ctx.lineTo(x + width + 5, y + height - 3);
    ctx.lineTo(x + width + 2, y + height);
    ctx.closePath();
    ctx.fill();
    
    // Draw door with 3D frame
    const doorGradient = ctx.createLinearGradient(x + width/3, y + height - 4, x + width/3, y + height);
    doorGradient.addColorStop(0, 'rgba(87, 13, 248, 0.9)');
    doorGradient.addColorStop(1, 'rgba(67, 56, 202, 1)');
    
    ctx.fillStyle = doorGradient;
    ctx.fillRect(x + width/3, y + height - 4, width/3, 4);
    
    // Door frame
    ctx.fillStyle = 'rgba(107, 114, 128, 0.8)';
    ctx.fillRect(x + width/3 - 1, y + height - 4, 1, 4);
    ctx.fillRect(x + width*2/3, y + height - 4, 1, 4);
    ctx.fillRect(x + width/3 - 1, y + height - 4, width/3 + 2, 1);
    
    // Draw windows with 3D frames
    const windowGradient = ctx.createRadialGradient(x + 2, y + 2, 0, x + 2, y + 2, 2);
    windowGradient.addColorStop(0, 'rgba(147, 197, 253, 1)');
    windowGradient.addColorStop(1, 'rgba(59, 130, 246, 0.8)');
    
    // Left window
    ctx.fillStyle = windowGradient;
    ctx.fillRect(x + 1, y + 1, 3, 3);
    
    // Right window
    ctx.fillRect(x + width - 4, y + 1, 3, 3);
    
    // Window frames
    ctx.fillStyle = 'rgba(107, 114, 128, 0.8)';
    ctx.fillRect(x + 1, y + 1, 3, 0.5);
    ctx.fillRect(x + 1, y + 1, 0.5, 3);
    ctx.fillRect(x + width - 4, y + 1, 3, 0.5);
    ctx.fillRect(x + width - 1.5, y + 1, 0.5, 3);
    
    // Draw chimney
    ctx.fillStyle = 'rgba(107, 114, 128, 0.9)';
    ctx.fillRect(x + width - 6, y - 8, 2, 4);
    
    // Chimney top
    ctx.fillStyle = 'rgba(75, 85, 99, 1)';
    ctx.fillRect(x + width - 7, y - 9, 4, 1);
    
    ctx.restore();
  };

  // Draw flowing stream with ripples
  const drawStream = (ctx: CanvasRenderingContext2D, coords: number[][], minX: number, minY: number, scale: number) => {
    ctx.save();
    
    // Draw main stream
    ctx.beginPath();
    for (let i = 0; i < coords.length; i++) {
      const coord = coords[i];
      const x = (coord[0] - minX) * scale;
      const y = (coord[1] - minY) * scale;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Draw flowing water effect
    ctx.strokeStyle = 'rgba(147, 197, 253, 0.6)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Add ripples
    for (let i = 1; i < coords.length - 1; i += 2) {
      const coord = coords[i];
      const x = (coord[0] - minX) * scale;
      const y = (coord[1] - minY) * scale;
      
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(147, 197, 253, 0.4)';
      ctx.fill();
    }

    ctx.restore();
  };

  // Draw water body with ripple effect
  const drawWaterBody = (ctx: CanvasRenderingContext2D, coords: number[][], minX: number, minY: number, scale: number) => {
    ctx.save();
    
    // Draw main water body
    ctx.beginPath();
    for (let i = 0; i < coords.length; i++) {
      const coord = coords[i];
      const x = (coord[0] - minX) * scale;
      const y = (coord[1] - minY) * scale;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    
    // Create gradient for water
    const gradient = ctx.createRadialGradient(
      coords[0][0] * scale, coords[0][1] * scale, 0,
      coords[0][0] * scale, coords[0][1] * scale, 50
    );
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)');
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add ripple effect
    const centerX = coords.reduce((sum, coord) => sum + (coord[0] - minX) * scale, 0) / coords.length;
    const centerY = coords.reduce((sum, coord) => sum + (coord[1] - minY) * scale, 0) / coords.length;
    
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5 + i * 3, 0, 2 * Math.PI);
      ctx.strokeStyle = `rgba(147, 197, 253, ${0.3 - i * 0.1})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.restore();
  };

  const renderGISData = () => {
    const canvas = canvasRef.current;
    if (!canvas || !gisData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply transformations
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(canvasState.zoom, canvasState.zoom);
    ctx.translate(canvasState.panX, canvasState.panY);
    ctx.rotate(canvasState.rotation);

    // Calculate bounds for all geometry types
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    const features = gisData.features || [gisData];
    features.forEach(feature => {
      if (feature.geometry.type === "Polygon") {
        const coords = feature.geometry.coordinates as number[][][];
        for (const coord of coords[0]) {
          minX = Math.min(minX, coord[0]);
          minY = Math.min(minY, coord[1]);
          maxX = Math.max(maxX, coord[0]);
          maxY = Math.max(maxY, coord[1]);
        }
      } else if (feature.geometry.type === "LineString") {
        const coords = feature.geometry.coordinates as number[][];
        for (const coord of coords) {
          minX = Math.min(minX, coord[0]);
          minY = Math.min(minY, coord[1]);
          maxX = Math.max(maxX, coord[0]);
          maxY = Math.max(maxY, coord[1]);
        }
      } else if (feature.geometry.type === "Point") {
        const coord = feature.geometry.coordinates as number[];
        minX = Math.min(minX, coord[0]);
        minY = Math.min(minY, coord[1]);
        maxX = Math.max(maxX, coord[0]);
        maxY = Math.max(maxY, coord[1]);
      }
    });

    const width = maxX - minX;
    const height = maxY - minY;
    const scale = Math.min(canvas.width / width, canvas.height / height) * 0.8;

    // Draw features
    features.forEach((feature, index) => {
      const featureType = feature.properties?.type || 'default';
      const style = getFeatureStyle(featureType);

      if (feature.geometry.type === "Polygon") {
        const coords = feature.geometry.coordinates as number[][][];
        
        if (featureType === 'water_body') {
          drawWaterBody(ctx, coords[0], minX, minY, scale);
        } else {
          ctx.beginPath();
          for (let i = 0; i < coords[0].length; i++) {
            const coord = coords[0][i];
            const x = (coord[0] - minX) * scale;
            const y = (coord[1] - minY) * scale;
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          
          // Fill and stroke
          ctx.fillStyle = style.fill;
          ctx.fill();
          ctx.strokeStyle = style.stroke;
          ctx.lineWidth = style.lineWidth;
          ctx.stroke();

          // Draw building details if it's a building
          if (featureType === 'building') {
            const centerX = coords[0].reduce((sum, coord) => sum + (coord[0] - minX) * scale, 0) / coords[0].length;
            const centerY = coords[0].reduce((sum, coord) => sum + (coord[1] - minY) * scale, 0) / coords[0].length;
            const width = Math.max(...coords[0].map(coord => (coord[0] - minX) * scale)) - Math.min(...coords[0].map(coord => (coord[0] - minX) * scale));
            const height = Math.max(...coords[0].map(coord => (coord[1] - minY) * scale)) - Math.min(...coords[0].map(coord => (coord[1] - minY) * scale));
            drawBuilding(ctx, centerX - width/2, centerY - height/2, width, height);
          }
        }

        // Add feature name if available
        if (feature.properties?.name) {
          const centerX = coords[0].reduce((sum, coord) => sum + (coord[0] - minX) * scale, 0) / coords[0].length;
          const centerY = coords[0].reduce((sum, coord) => sum + (coord[1] - minY) * scale, 0) / coords[0].length;
          
          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.font = 'bold 12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(feature.properties.name, centerX, centerY);
        }
      } else if (feature.geometry.type === "LineString") {
        const coords = feature.geometry.coordinates as number[][];
        
        if (featureType === 'stream') {
          drawStream(ctx, coords, minX, minY, scale);
        } else {
          ctx.beginPath();
          for (let i = 0; i < coords.length; i++) {
            const coord = coords[i];
            const x = (coord[0] - minX) * scale;
            const y = (coord[1] - minY) * scale;
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          
          ctx.strokeStyle = style.stroke;
          ctx.lineWidth = style.lineWidth;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Add feature name for lines
        if (feature.properties?.name) {
          const midIndex = Math.floor(coords.length / 2);
          const midCoord = coords[midIndex];
          const x = (midCoord[0] - minX) * scale;
          const y = (midCoord[1] - minY) * scale;
          
          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.font = 'bold 11px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(feature.properties.name, x, y - 5);
        }
      } else if (feature.geometry.type === "Point") {
        const coord = feature.geometry.coordinates as number[];
        const x = (coord[0] - minX) * scale;
        const y = (coord[1] - minY) * scale;
        
        // Draw point based on feature type
        if (featureType === 'tree') {
          const treeSize = feature.properties?.height_meters ? Math.min(12, Math.max(6, feature.properties.height_meters / 2)) : 8;
          drawTree(ctx, x, y, treeSize);
        } else if (featureType === 'geological') {
          // Draw rock outcrop
          ctx.save();
          ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
          ctx.shadowBlur = 3;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
          
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(107, 114, 128, 0.8)';
          ctx.fill();
          
          // Add rock texture
          for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.arc(x + (Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 4, 1, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(75, 85, 99, 0.9)';
            ctx.fill();
          }
          
          ctx.restore();
        } else {
          // Draw generic point
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fillStyle = style.fill;
          ctx.fill();
          ctx.strokeStyle = style.stroke;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Add feature name for points
        if (feature.properties?.name) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.font = 'bold 10px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(feature.properties.name, x, y - 8);
        }
      }
    });

    ctx.restore();
  };

  useEffect(() => {
    renderGISData();
  }, [gisData, canvasState]);

  const handleZoomIn = () => {
    setCanvasState(prev => ({ ...prev, zoom: Math.min(prev.zoom * 1.2, 5) }));
  };

  const handleZoomOut = () => {
    setCanvasState(prev => ({ ...prev, zoom: Math.max(prev.zoom / 1.2, 0.1) }));
  };

  const handleReset = () => {
    setCanvasState({
      zoom: 1,
      panX: 0,
      panY: 0,
      rotation: 0,
    });
  };

  return (
    <div className="h-full relative bg-green-50 dark:bg-green-950">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".geojson,.json,.kml"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Canvas Area */}
      <div className="h-full relative">
        {!gisData ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-96 h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center mb-4 bg-white/50 dark:bg-gray-800/50">
                <div className="text-center">
                  <Map className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Start Importing Your Land
                  </h3>
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleImportGISData}
                      disabled={isLoading}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {isLoading ? "Importing..." : "Import GIS Data"}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Supports GeoJSON, KML files
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Try: /sample-land-features.geojson
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : videoState.showVideo ? (
          <>
            {/* Video Player */}
            <div className="h-full relative">
              <video
                ref={videoRef}
                className="w-full h-full object-contain rounded-lg"
                onTimeUpdate={handleVideoTimeUpdate}
                onLoadedMetadata={handleVideoLoadedMetadata}
                onPlay={() => setVideoState(prev => ({ ...prev, isPlaying: true }))}
                onPause={() => setVideoState(prev => ({ ...prev, isPlaying: false }))}
                autoPlay
                muted
                loop
              >
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              
              
              {/* Import New Data Button */}
              <div className="absolute top-4 left-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleImportGISData}
                  disabled={isLoading}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import New Data
                </Button>
              </div>
              
              {/* Show Canvas Button */}
              <div className="absolute top-4 right-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVideoState(prev => ({ ...prev, showVideo: false }))}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                >
                  <Map className="w-4 h-4 mr-2" />
                  Show Canvas
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-full border border-gray-200 dark:border-gray-700 cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            />
            
            {/* Canvas Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                className="w-10 h-10 p-0"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                className="w-10 h-10 p-0"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="w-10 h-10 p-0"
              >
                <RotateCw className="w-4 h-4" />
              </Button>
            </div>

            {/* Import New Data Button */}
            <div className="absolute top-4 left-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleImportGISData}
                disabled={isLoading}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import New Data
              </Button>
            </div>

            {/* Show Video Button */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVideoState(prev => ({ ...prev, showVideo: true }))}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
              >
                <Layers className="w-4 h-4 mr-2" />
                Show Video
              </Button>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 right-4">
              <Badge variant="outline" className="bg-white/90 dark:bg-gray-800/90">
                <MousePointer className="w-3 h-3 mr-1" />
                Drag to pan, scroll to zoom
              </Badge>
            </div>
          </>
        )}
      </div>

      {/* Status Feedback */}
      <div className="absolute bottom-4 left-4 z-10">
        <Badge variant="outline" className="bg-white/90 dark:bg-gray-800/90">
          {gisData 
            ? `${gisData.features?.length || 1} feature(s) loaded`
            : "Ready to import land data"
          }
        </Badge>
      </div>
    </div>
  );
}
