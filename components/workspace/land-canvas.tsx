"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LandCanvas() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImportGISData = () => {
    toast({
      title: "Import GIS Data",
      description: "Opening GIS data import dialog...",
    });
    // Simulate GIS data import
    setTimeout(() => {
      toast({
        title: "GIS Data Imported",
        description: "Successfully imported land parcel data.",
      });
    }, 2000);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Uploaded",
        description: `Successfully uploaded ${file.name}`,
      });
      // Here you would process the file (image, drone footage, etc.)
    }
  };

  return (
    <div className="h-full relative bg-green-50 dark:bg-green-950">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.geojson,.shp,.kml"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Canvas Area */}
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-96 h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center mb-4 bg-white/50 dark:bg-gray-800/50">
            <div className="text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Start Importing Your Land
              </h3>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleImportGISData}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import GIS Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Feedback */}
      <div className="absolute bottom-4 left-4 z-10">
        <Badge variant="outline" className="bg-white/90 dark:bg-gray-800/90">
          Ready to import land data
        </Badge>
      </div>
    </div>
  );
}
