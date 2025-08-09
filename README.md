# Hydrological analysis of HydroSHEDS, HydroATLAS, HydroBASINS, HydroRIVERS, HydroLAKES, GLWD, HydroWASTE, GloRiC, LakeTEMP in Google Earth Engine (GEE)

## Use and install this repository

HTTPS
```html
https://github.com/CarlosMendez1997Col/Model-and-forecasts-hydrological-and-energetic-resources-using-ArcGIS-API-for-Python-and-R.git
```

GitHub CLI
```html
gh repo clone CarlosMendez1997Col/Model-and-forecasts-hydrological-and-energetic-resources-using-ArcGIS-API-for-Python-and-R
```

## Description

Repository builded in `Google Earth Engine (GEE)` and `Javascript`.

Each part is described below:

- First part, HydroSHEDS
  ```html
  https://github.com/CarlosMendez1997Col/Hydrological-analysis-of-HydroSHEDS-data/tree/main/1.%20HydroSHEDS
  ```
- Second part, HydroATLAS
  ```html
  https://github.com/CarlosMendez1997Col/Hydrological-analysis-of-HydroSHEDS-data/tree/main/2.%20HydroATLAS
  ```
- Third part, HydroBASINS
  ```html
  https://github.com/CarlosMendez1997Col/Hydrological-analysis-of-HydroSHEDS-data/tree/main/3.%20HydroBASINS
  ```
- Fourth part, HydroRIVERS
  ```html
  https://github.com/CarlosMendez1997Col/Hydrological-analysis-of-HydroSHEDS-data/tree/main/4.%20HydroRIVERS
  ```
- Fifth part, HydroLAKES
  ```html
  https://github.com/CarlosMendez1997Col/Hydrological-analysis-of-HydroSHEDS-data/tree/main/5.%20HydroLAKES
  ```
- Sixth part, Global Lakes and Wetlands Database (GLWD)
  ```html
  https://github.com/CarlosMendez1997Col/Hydrological-analysis-of-HydroSHEDS-data/tree/main/6.%20Global%20Lakes%20and%20Wetlands%20Database%20(GLWD)
  ```
- Seventh part, HydroWASTE
  ```html
  https://github.com/CarlosMendez1997Col/Hydrological-analysis-of-HydroSHEDS-data/tree/main/7.%20HydroWASTE
  ```
- Eighth part, Global River Classification (GloRiC)
  ```html
  https://github.com/CarlosMendez1997Col/Hydrological-analysis-of-HydroSHEDS-data/tree/main/8.%20Global%20River%20Classification%20(GloRiC)
  ```
- Ninth part, LakeTEMP
  ```html
  https://github.com/CarlosMendez1997Col/Hydrological-analysis-of-HydroSHEDS-data/tree/main/9.%20LakeTEMP
  ```

## Versions and releases

Version `2.0`

```HTML
https://github.com/CarlosMendez1997Col/Hydrological-analysis-of-HydroSHEDS-data/releases
```

## Datasets and packages

#### External Basemaps

```Javascript
var snazzy =require("users/aazuspan/snazzy:styles");
var MultiBrand = "https://snazzymaps.com/style/20053/multi-brand-network"
var MidNight = "https://snazzymaps.com/style/2/midnight-commander"
var GeoMap = "https://snazzymaps.com/style/48477/geomap"
var AImap = "https://snazzymaps.com/style/283414/ai-map"
var AccessCall = "https://snazzymaps.com/style/10448/accesscall"
var MutedBlue = "https://snazzymaps.com/style/83/muted-blue"
var Outrun = "https://snazzymaps.com/style/122898/outrun"
var Cobalt = "https://snazzymaps.com/style/30/cobalt"
```
#### Palettes and Symbology

```Javascript

require('users/gena/packages:palettes');

var Water1 = {palette: ['#d4a334','#1bff00','#fff700','#1b00ff','#10fff4','#50c7ff']};
var Water2 = {palette: ['023858', '006837', '1a9850', '66bd63', 'a6d96a', 'd9ef8b', 'ffffbf', 'fee08b', 'fdae61', 'f46d43', 'd73027']};
var Water3 = {palette: ['Red','SandyBrown','Yellow','LimeGreen', 'Blue','DarkBlue']};
var Water4 = {palette: ['#1a1a4b', '#203387', '#254bb3', '#2b63e0', '#4673e6', '#6083ec', '#7a94f2', '#95a4f7', '#afb4fd', '#c8c5ff', 
                            '#dcb3f5', '#df96e2', '#e47ac0', '#e95da0', '#ec407f', '#ee265f', '#f00a3f', '#f20027', '#f30015', '#f30000']};
var Water5 = {palette: ['#0000FF', '#001AEB', '#0035D7', '#004FC3', '#006AAF','#00849B', '#009F87', '#00B973', '#00D45F', '#00EF4B',
                              '#00FF37', '#29FF2E', '#52FF25', '#7BFF1C', '#A4FF13','#CDFF0A', '#F6FF00', '#FFD300', '#FFA600', '#FF7900']};
var Water6 = {palette: ['001219','005f73','0a9396','94d2bd','e9d8a6','ee9b00','ca6702','bb3e03','ae2012','9b2226']};
var Water7 = {palette: ['f94144','f3722c','f8961e','f9844a','f9c74f','90be6d','43aa8b','4d908e','577590','277da1']};
var Water8 = {palette: ['000096','0064ff', '00b4ff', '33db80', '9beb4a','ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000']};

```

#### Hillshade images

```Javascript
ee.ImageCollection("users/gena/global-hand/hand-100")
ee.Image("JAXA/ALOS/AW3D30/V2_2")
```


#### Colombia Boundary (AOI)

```Javascript
ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level1').filter(ee.Filter.eq('ADM0_NAME', 'Colombia'));
```

## Images

- 1. HydroSHEDS

```Javascript

ee.Image('WWF/HydroSHEDS/15ACC');
ee.Image('WWF/HydroSHEDS/30ACC');
ee.Image('WWF/HydroSHEDS/03CONDEM');
ee.Image('WWF/HydroSHEDS/15CONDEM');
ee.Image('WWF/HydroSHEDS/30CONDEM');
ee.Image('WWF/HydroSHEDS/03VFDEM');
ee.Image('WWF/HydroSHEDS/03DIR');
ee.Image('WWF/HydroSHEDS/15DIR');
ee.Image('WWF/HydroSHEDS/30DIR');
```
     
- 2. HydroATLAS

```Javascript
// In construction
```
     
- 3. HydroBASINS

```Javascript
ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_2")
ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_3")
ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_4")
ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_5")
ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_6")
ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_7")
ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_8")
ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_9")
```
     
- 4. HydroRIVERS

```Javascript
ee.FeatureCollection('WWF/HydroSHEDS/v1/FreeFlowingRivers')
```
     
- 5. HydroLAKES

```Javascript
ee.FeatureCollection("projects/sat-io/open-datasets/HydroLakes/lake_poly_v10")
```
     
- 6. Global Lakes and Wetlands Database (GLWD)

```Javascript
ee.Image("projects/ee-carlosmendez1997/assets/Col_Combined_GLWD_v2_delta_area_ha_x10");
ee.Image("projects/ee-carlosmendez1997/assets/Col_Combined_GLWD_v2_delta_area_pct");
ee.Image("projects/ee-carlosmendez1997/assets/Col_Combined_GLWD_v2_delta_main_class");
ee.Image("projects/ee-carlosmendez1997/assets/Col_Combined_GLWD_v2_delta_main_class_50pct");
```
     
- 7. HydroWASTE

```Javascript
// In construction
```
     
- 8. Global River Classification (GloRiC)

```Javascript
ee.FeatureCollection("projects/ee-carlosmendez1997/assets/GloRiC_v10_shapefile")
```
     
- 9. LakeTEMP

```Javascript
// In construction
```

## Credits and repository of data

The original code, repositories and scripts used in this project, are available at:

- 1. HydroSHEDS `https://www.hydrosheds.org/products/hydrosheds`

- 2. HydroATLAS `https://www.hydrosheds.org/products/hydroatlas`
     
- 3. HydroBASINS `https://www.hydrosheds.org/products/hydrobasins`
     
- 4. HydroRIVERS `https://www.hydrosheds.org/products/hydrorivers`
     
- 5. HydroLAKES `https://www.hydrosheds.org/products/hydrolakes`
     
- 6. Global Lakes and Wetlands Database (GLWD) `https://www.hydrosheds.org/products/glwd`
     
- 7. HydroWASTE `https://www.hydrosheds.org/products/hydrowaste`
     
- 8. Global River Classification (GloRiC) `https://www.hydrosheds.org/products/gloric`
     
- 9. LakeTEMP `https://www.hydrosheds.org/products/laketemp`

## Conflict of Interest.

The author declare that there is no conflict of interest in the publication of this data and have approved it for publication.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate. 

## MIT License

Copyright (c) 2025 Carlos Mendez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

