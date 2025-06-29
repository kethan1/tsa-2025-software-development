# GIS Data Import Guide

## Overview
The VerdeCore application now supports importing comprehensive GIS (Geographic Information System) data to visualize and analyze land parcels, including natural features like trees, streams, and man-made structures for regenerative farming planning.

## Supported File Formats
- **GeoJSON** (.geojson, .json) - Fully supported with multiple geometry types
- **KML** (.kml) - Basic support (requires additional parsing libraries for full functionality)

## Supported Feature Types

### Natural Features
- **Trees** (Point geometry) - Individual trees with species, age, and size data
- **Tree Clusters** (Polygon geometry) - Groups of trees or groves
- **Orchards** (Polygon geometry) - Fruit tree plantations
- **Streams** (LineString geometry) - Water courses with flow information
- **Water Bodies** (Polygon geometry) - Ponds, lakes, and other water features
- **Wetlands** (Polygon geometry) - Marsh areas and natural water retention zones

### Man-Made Features
- **Buildings** (Polygon geometry) - Houses, barns, sheds, and other structures
- **Roads** (LineString geometry) - Access roads and pathways
- **Fences** (LineString geometry) - Property boundaries and enclosures
- **Hedgerows** (LineString geometry) - Living fences and windbreaks

### Other Features
- **Boundaries** (Polygon geometry) - Property and field boundaries
- **Geological Features** (Point geometry) - Rock outcrops and natural formations

## How to Import GIS Data

### Step 1: Access the Workspace
1. Navigate to the `/workspace` page in the VerdeCore application
2. You'll see the Land Canvas with an import interface

### Step 2: Import Your Data
1. Click the **"Import GIS Data"** button
2. Select a GeoJSON or KML file from your computer
3. The application will automatically parse and display your data with appropriate styling

### Step 3: Interact with Your Data
Once imported, you can:
- **Pan**: Click and drag to move around the map
- **Zoom**: Use the mouse wheel or zoom buttons
- **Reset View**: Click the reset button to return to the original view
- **Import New Data**: Use the "Import New Data" button to load different files

## Visual Styling

Each feature type is rendered with distinct colors and styles:

- **Trees**: Green circles with brown trunks
- **Streams**: Blue lines with varying widths
- **Water Bodies**: Light blue filled areas
- **Buildings**: Gray filled rectangles
- **Roads**: Orange/yellow lines
- **Boundaries**: Green outlines
- **Wetlands**: Purple areas

## Sample Data
A comprehensive sample file is available at `/sample-land-features.geojson` that includes:
- Main farm boundary
- Individual trees (oak, maple, pine)
- Tree grove and apple orchard
- Willow Creek stream
- Farm pond and wetland area
- Farm house and barn
- Access road and fence lines
- Rock outcrop and hedgerow

## GeoJSON Format Requirements

### Basic Structure
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Feature Name",
        "type": "feature_type",
        "additional_properties": "values"
      },
      "geometry": {
        "type": "GeometryType",
        "coordinates": [...]
      }
    }
  ]
}
```

### Feature Type Examples

#### Tree (Point)
```json
{
  "type": "Feature",
  "properties": {
    "name": "Large Oak Tree",
    "type": "tree",
    "species": "Quercus robur",
    "age_years": 85,
    "height_meters": 25
  },
  "geometry": {
    "type": "Point",
    "coordinates": [-122.4186, 37.7750]
  }
}
```

#### Stream (LineString)
```json
{
  "type": "Feature",
  "properties": {
    "name": "Willow Creek",
    "type": "stream",
    "width_meters": 3.5,
    "flow_rate": "moderate"
  },
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-122.4192, 37.7756],
      [-122.4188, 37.7754],
      [-122.4182, 37.7752]
    ]
  }
}
```

#### Orchard (Polygon)
```json
{
  "type": "Feature",
  "properties": {
    "name": "Apple Orchard",
    "type": "orchard",
    "species": "Malus domestica",
    "count": 45,
    "age_years": 8
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [-122.4185, 37.7745],
        [-122.4180, 37.7748],
        [-122.4175, 37.7746],
        [-122.4185, 37.7745]
      ]
    ]
  }
}
```

## Features
- **Multi-Geometry Support**: Points, lines, and polygons
- **Feature-Specific Styling**: Different colors and symbols for each feature type
- **Automatic Scaling**: Data is automatically scaled to fit the canvas
- **Feature Labels**: Names are displayed on the map
- **Interactive Controls**: Zoom, pan, and reset functionality
- **Visual Feedback**: Loading states and success/error messages
- **Multiple Features**: Support for hundreds of features in a single file

## Troubleshooting
- **File won't import**: Ensure your file is in valid GeoJSON format
- **Data not visible**: Check that your coordinates are in the correct format (longitude, latitude)
- **Wrong colors**: Verify the `type` property in your feature properties matches supported types
- **Performance issues**: Large files may take longer to process

## Future Enhancements
- Support for Shapefile (.shp) format
- Advanced KML parsing
- Layer management and visibility toggles
- Export functionality
- Integration with soil and climate data
- 3D visualization capabilities
- Time-series data support 