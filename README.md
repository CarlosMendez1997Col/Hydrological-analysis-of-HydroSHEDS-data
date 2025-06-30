# Hydrological analysis using HydroATLAS, HydroSHEDS, HydroBASINS, HydroLAKES and HydroRIVERS data.

## Description

Hydrological analysis of HydroATLAS, HydroSHEDS, HydroBASINS, Global Lakes and Wetlands Database (GLWD), HydroLAKES and HydroRIVERS in `ArcGIS Pro` and `Google Earth Engine (GEE)` 

Each section is described below:

- First section, HydroBASINS
- Second section, HydroSHEDS
- Third section, HydroRIVERS and HydroLAKES
- Fourth section, Global Lakes and Wetlands Database (GLWD)
- Fifth section, Global River Classification (GloRiC)

## Libraries 

### ArcGIS API For Python
```Python
import arcpy
from arcpy.sa import*
from arcpy.ia import*
from arcgis.raster.functions import *

# connect to GIS
from arcgis.gis import GIS
from arcgis.geometry import SpatialReference

import pandas as pd
import os
from copy import deepcopy
```
## Datasets

### Google Earth Engine (GEE)
```Javascript

// HydroBasins level 7 to level 10
ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_7");
ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_8");
ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_9");
ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_10");

// HydroSHEDS Flow Accumulation, 15 Arc-Seconds
ee.Image('WWF/HydroSHEDS/15ACC');

// HydroSHEDS Flow Accumulation, 30 Arc-Seconds
ee.Image('WWF/HydroSHEDS/30ACC');

// Hydrologically Conditioned DEM, 03 Arc-Seconds
ee.Image('WWF/HydroSHEDS/03CONDEM');

// Hydrologically Conditioned DEM, 15 Arc-Seconds
ee.Image('WWF/HydroSHEDS/15CONDEM');

// Hydrologically Conditioned DEM, 30 Arc-Seconds
ee.Image('WWF/HydroSHEDS/30CONDEM');

// Void-Filled DEM, 03 Arc-Seconds
ee.Image('WWF/HydroSHEDS/03VFDEM');

// Drainage Direction, 03 Arc-Seconds
ee.Image('WWF/HydroSHEDS/03DIR');

// Drainage Direction, 15 Arc-Seconds
ee.Image('WWF/HydroSHEDS/15DIR');

// Drainage Direction, 30 Arc-Seconds
ee.Image('WWF/HydroSHEDS/30DIR');

// Import the global surface water (Lakes)
ee.Image("JRC/GSW1_4/GlobalSurfaceWater");

ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level1')

```

## Credits and repository of data

The original code, repositories and scripts used in this project, are available at:


-  HydroBASINS `https://www.hydrosheds.org/products/hydrobasins`
-  HHydroSHEDS `https://www.hydrosheds.org/products/hydrosheds`
-  HydroRIVERS and HydroLAKES `https://www.hydrosheds.org/products/hydrorivers`
-  Global Lakes and Wetlands Database (GLWD) `https://www.hydrosheds.org/products/glwd`
-  Global River Classification (GloRiC) `https://www.hydrosheds.org/products/gloric`

## Conflict of Interest.

The author declare that there is no conflict of interest in the publication of this data and that all authors have approved it for publication.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
