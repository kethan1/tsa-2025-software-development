"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Map, Layers, ZoomIn, ZoomOut, RotateCw, MousePointer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GISData {
  type: string;
  features: Array<{
    type: string;
    geometry: {
      type: string;
      coordinates: number[][][] | number[][];
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

export function LandCanvas() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  
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

    // Calculate bounds
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
      }
    });

    const width = maxX - minX;
    const height = maxY - minY;
    const scale = Math.min(canvas.width / width, canvas.height / height) * 0.8;

    // Draw features
    features.forEach((feature, index) => {
      if (feature.geometry.type === "Polygon") {
        const coords = feature.geometry.coordinates as number[][][];
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
        
        // Fill with semi-transparent green
        ctx.fillStyle = `rgba(34, 197, 94, 0.3)`;
        ctx.fill();
        
        // Stroke with darker green
        ctx.strokeStyle = `rgba(34, 197, 94, 0.8)`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Add feature name if available
        if (feature.properties?.name) {
          const centerX = coords[0].reduce((sum, coord) => sum + (coord[0] - minX) * scale, 0) / coords[0].length;
          const centerY = coords[0].reduce((sum, coord) => sum + (coord[1] - minY) * scale, 0) / coords[0].length;
          
          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(feature.properties.name, centerX, centerY);
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
                    Try the sample file: /sample-farm.geojson
                  </p>
                </div>
              </div>
            </div>
          </div>
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
