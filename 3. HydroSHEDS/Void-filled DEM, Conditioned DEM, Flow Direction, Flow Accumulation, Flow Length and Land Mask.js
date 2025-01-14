
// Hydrological analysis using HydroATLAS, HydroSHEDS, HydroBASINS, HydroLAKES and HydroRIVERS data.

// The original data, are available in:

// HydroSHEDS
// https://www.hydrosheds.org/products/hydrosheds

// HydroLAKES
// https://www.hydrosheds.org/products/hydrolakes

// HydroRIVERS
// https://www.hydrosheds.org/products/hydrorivers

// Import the Basin level 07 of HYdroSEDS
var hydrobasins_7 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_7");
var basin_7 = hydrobasins_7.filter(ee.Filter.eq('HYBAS_ID', 6070130930))
var geometry = basin_7.geometry()

///// Flow Accumulation /////

// HydroSHEDS Flow Accumulation, 15 Arc-Seconds
var flow_accum_15 = ee.Image('WWF/HydroSHEDS/15ACC');
var flowAccumulation_15 = flow_accum_15.select('b1');

// HydroSHEDS Flow Accumulation, 30 Arc-Seconds
var flow_accum_30 = ee.Image('WWF/HydroSHEDS/30ACC');
var flowAccumulation_30 = flow_accum_30.select('b1');

///// Hydrologically Conditioned DEM /////

// Hydrologically Conditioned DEM, 03 Arc-Seconds
var Hydro_DEM_03 = ee.Image('WWF/HydroSHEDS/03CONDEM');
var elevation_DEM_03 = Hydro_DEM_03.select('b1');

// Hydrologically Conditioned DEM, 15 Arc-Seconds
var Hydro_DEM_15 = ee.Image('WWF/HydroSHEDS/15CONDEM');
var elevation_DEM_15 = Hydro_DEM_15.select('b1');

// Hydrologically Conditioned DEM, 30 Arc-Seconds
var Hydro_DEM_30 = ee.Image('WWF/HydroSHEDS/30CONDEM');
var elevation_DEM_30 = Hydro_DEM_30.select('b1');

///// Void-Filled DEM /////

// Void-Filled DEM, 03 Arc-Seconds
var void_dem_03 = ee.Image('WWF/HydroSHEDS/03VFDEM');
var void_fil_dem_03 = void_dem_03.select('b1');

///// Drainage Direction /////

// Drainage Direction, 03 Arc-Seconds
var dra_dir_03 = ee.Image('WWF/HydroSHEDS/03DIR');
var drainageDirection_03 = dra_dir_03.select('b1');

// Drainage Direction, 15 Arc-Seconds
var dra_dir_15 = ee.Image('WWF/HydroSHEDS/15DIR');
var drainageDirection_15 = dra_dir_15.select('b1');

// Drainage Direction, 30 Arc-Seconds
var dra_dir_30 = ee.Image('WWF/HydroSHEDS/30DIR');
var drainageDirection_30 = dra_dir_30.select('b1');

// Import the global surface water (Lakes)
var gsw = ee.Image("JRC/GSW1_4/GlobalSurfaceWater");
var lakes_BRB_oc = gsw.select('occurrence');

// Clip all data in Bogota River Basin (BRB)

var BRB_flow_15 = flowAccumulation_15.clip(basin_7);
var BRB_flow_30 = flowAccumulation_30.clip(basin_7);

var BRB_hydro_DEM_03 = elevation_DEM_03.clip(basin_7);
var BRB_hydro_DEM_15 = elevation_DEM_15.clip(basin_7);
var BRB_hydro_DEM_30 = elevation_DEM_30.clip(basin_7);

var BRB_void_fill_DEM_03 = void_fil_dem_03.clip(basin_7);

var BRB_dra_dir_03 = drainageDirection_03.clip(basin_7);
var BRB_dra_dir_15 = drainageDirection_15.clip(basin_7);
var BRB_dra_dir_30 = drainageDirection_30.clip(basin_7);

var BRB_lakes = lakes_BRB_oc.clip(basin_7);

// Import Symbology

///// Flow Accumulation /////

var flowAccumulationVis = {
  min: 0.0,
  max: 500.0,
  palette: [
    '000000', '023858', '006837', '1a9850', '66bd63', 'a6d96a', 'd9ef8b',
    'ffffbf', 'fee08b', 'fdae61', 'f46d43', 'd73027'
  ],
};

///// Hydrologically Conditioned and Void-Filled DEM /////

var elevationVis = {min: -50.0, max: 3000.0, gamma: 2.0,};


///// Drainage Direction /////

var drainageDirectionVis = {
  min: 1.0,
  max: 128.0,
  palette: [
    '000000', '023858', '006837', '1a9850', '66bd63', 'a6d96a', 'd9ef8b',
    'ffffbf', 'fee08b', 'fdae61', 'f46d43', 'd73027'
  ],
};

var visParams = {lineWidth: 2,
  color: { property: 'RIV_ORD', mode: 'linear',
    palette: ['08519c', '3182bd', '6baed6', 'bdd7e7', 'eff3ff'],
    min: 1,
    max: 10}
};


Map.setOptions('SATELLITE')

Map.centerObject(basin_7)
Map.addLayer(basin_7, {color: 'yellow'}, 'Bogota River Basin level 7');

Map.addLayer(BRB_flow_15, flowAccumulationVis, 'Flow Accumulation 15 Arc Seconds');
Map.addLayer(BRB_flow_30, flowAccumulationVis, 'Flow Accumulation 30 Arc Seconds');

Map.addLayer(BRB_hydro_DEM_03, elevationVis, 'Elevation DEM 03 Arc Seconds');
Map.addLayer(BRB_hydro_DEM_15, elevationVis, 'Elevation DEM 15 Arc Seconds');
Map.addLayer(BRB_hydro_DEM_30, elevationVis, 'Elevation DEM 30 Arc Seconds');

Map.addLayer(BRB_void_fill_DEM_03, elevationVis, 'Elevation Void Fill DEM 03 Arc Seconds');

Map.addLayer(BRB_dra_dir_03, drainageDirectionVis, 'Drainage Direction 03 Arc Seconds');
Map.addLayer(BRB_dra_dir_15, drainageDirectionVis, 'Drainage Direction 15 Arc Seconds');
Map.addLayer(BRB_dra_dir_30, drainageDirectionVis, 'Drainage Direction 30 Arc Seconds');

Map.addLayer(BRB_lakes, visParams, 'Surface Water and Lakes ');
