
// Hydrological analysis using HydroATLAS, HydroSHEDS, HydroBASINS, HydroLAKES and HydroRIVERS data.

// Created by Carlos Mendez

// HydroSHEDS

// Set and configure Basemaps

var snazzy = require("users/aazuspan/snazzy:styles");


var MultiBrand = "https://snazzymaps.com/style/20053/multi-brand-network"
var MidNight = "https://snazzymaps.com/style/2/midnight-commander"
var GeoMap = "https://snazzymaps.com/style/48477/geomap"
var AImap = "https://snazzymaps.com/style/283414/ai-map"
var AccessCall = "https://snazzymaps.com/style/10448/accesscall"
var MutedBlue = "https://snazzymaps.com/style/83/muted-blue"
var Outrun = "https://snazzymaps.com/style/122898/outrun"
var Cobalt = "https://snazzymaps.com/style/30/cobalt"


// Import the Colombia Boundary
var dataset = ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level1')
var Col_boun = dataset.filter(ee.Filter.eq('ADM0_NAME', 'Colombia'));

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

// Clip all data in Colombia Boundary

var Col_flow_15 = flowAccumulation_15.clip(Col_boun);
var Col_flow_30 = flowAccumulation_30.clip(Col_boun);

var Col_hydro_DEM_03 = elevation_DEM_03.clip(Col_boun);
var Col_hydro_DEM_15 = elevation_DEM_15.clip(Col_boun);
var Col_hydro_DEM_30 = elevation_DEM_30.clip(Col_boun);

var Col_void_fill_DEM_03 = void_fil_dem_03.clip(Col_boun);

var Col_dra_dir_03 = drainageDirection_03.clip(Col_boun);
var Col_dra_dir_15 = drainageDirection_15.clip(Col_boun);
var Col_dra_dir_30 = drainageDirection_30.clip(Col_boun);


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


var map1 = ui.Map();
map1.add(ui.Label('Flow Accumulation',{position: 'bottom-center'}));
snazzy.addStyle(MutedBlue,"MutedBlue", map1);
map1.addLayer(Col_flow_15, flowAccumulationVis, 'Flow Accumulation 15 Arc Seconds');
map1.addLayer(Col_flow_30, flowAccumulationVis, 'Flow Accumulation 30 Arc Seconds');
map1.centerObject(Col_boun, 5)


var map2 = ui.Map();
map2.add(ui.Label('Elevation DEM',{position: 'bottom-center'}));
snazzy.addStyle(Outrun,"Outrun", map2);
map2.addLayer(Col_hydro_DEM_03, elevationVis, 'Elevation DEM 03 Arc Seconds');
map2.addLayer(Col_hydro_DEM_15, elevationVis, 'Elevation DEM 15 Arc Seconds');
map2.addLayer(Col_hydro_DEM_30, elevationVis, 'Elevation DEM 30 Arc Seconds');
map2.addLayer(Col_void_fill_DEM_03, elevationVis, 'Elevation Void Fill DEM 03 Arc Seconds');
map2.centerObject(Col_boun, 5)


var map3 = ui.Map();
map3.add(ui.Label('Drainage Direction',{position: 'bottom-center'}));
snazzy.addStyle(Cobalt,"Cobalt", map3);
map3.addLayer(Col_dra_dir_03, drainageDirectionVis, 'Drainage Direction 03 Arc Seconds');
map3.addLayer(Col_dra_dir_15, drainageDirectionVis, 'Drainage Direction 15 Arc Seconds');
map3.addLayer(Col_dra_dir_30, drainageDirectionVis, 'Drainage Direction 30 Arc Seconds');
map3.centerObject(Col_boun, 5)


var mapPanel = ui.Panel(

    [
      ui.Panel([map1], null, {stretch: 'both'}),
      ui.Panel([map2], null, {stretch: 'both'}),
      ui.Panel([map3], null, {stretch: 'both'}),
    ],

    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
    
var title = ui.Label('HydroSHEDS Colombia', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '20px'
});

// Add images and title to the ui.root.
ui.root.widgets().reset([title, mapPanel]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));


