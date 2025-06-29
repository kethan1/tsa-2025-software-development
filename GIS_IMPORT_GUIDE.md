# GIS Data Import Guide

## Overview
The VerdeCore application now supports importing GIS (Geographic Information System) data to visualize and analyze land parcels for regenerative farming planning.

## Supported File Formats
- **GeoJSON** (.geojson, .json) - Fully supported
- **KML** (.kml) - Basic support (requires additional parsing libraries for full functionality)

## How to Import GIS Data

### Step 1: Access the Workspace
1. Navigate to the `/workspace` page in the VerdeCore application
2. You'll see the Land Canvas with an import interface

### Step 2: Import Your Data
1. Click the **"Import GIS Data"** button
2. Select a GeoJSON or KML file from your computer
3. The application will automatically parse and display your data

### Step 3: Interact with Your Data
Once imported, you can:
- **Pan**: Click and drag to move around the map
- **Zoom**: Use the mouse wheel or zoom buttons
- **Reset View**: Click the reset button to return to the original view
- **Import New Data**: Use the "Import New Data" button to load different files

## Sample Data
A sample farm boundary file is available at `/sample-farm.geojson` for testing purposes. This file contains:
- Main farm boundary
- Two crop fields (Corn and Soybeans)
- Property information including area and soil type

## GeoJSON Format Requirements
Your GeoJSON file should follow this structure:
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Field Name",
        "area_hectares": 10.5,
        "crop_type": "Corn"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [longitude1, latitude1],
            [longitude2, latitude2],
            [longitude3, latitude3],
            [longitude1, latitude1]
          ]
        ]
      }
    }
  ]
}
```

## Features
- **Automatic Scaling**: Data is automatically scaled to fit the canvas
- **Feature Labels**: Field names are displayed on the map
- **Interactive Controls**: Zoom, pan, and reset functionality
- **Visual Feedback**: Loading states and success/error messages
- **Multiple Features**: Support for multiple polygons in a single file

## Troubleshooting
- **File won't import**: Ensure your file is in valid GeoJSON format
- **Data not visible**: Check that your coordinates are in the correct format (longitude, latitude)
- **Performance issues**: Large files may take longer to process

## Future Enhancements
- Support for Shapefile (.shp) format
- Advanced KML parsing
- Layer management
- Export functionality
- Integration with soil and climate data 