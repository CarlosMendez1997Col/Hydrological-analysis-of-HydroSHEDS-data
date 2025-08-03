// Hydrological analysis using HydroATLAS, HydroSHEDS, HydroBASINS, HydroLAKES and HydroRIVERS data.

// Created by Carlos Mendez

// HydroBASINS

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

// Import externat palette and symbology                 
var palettes = require('users/gena/packages:palettes');

// Import the Colombia Boundary
var Col_boun = ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level1')
                  .filter('ADM0_NAME == "Colombia"');

var AOI = Col_boun

/*
// Import the Basin level 01 of HYdroBASINS
var hydrobasins_1 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_1")
                      .filterBounds(Col_boun.geometry());
*/

var empty = ee.Image().byte();

// Import the Basin level 02 of HYdroBASINS
var hydrobasins_2 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_2")
                      .filterBounds(Col_boun.geometry());

var basins_2 = empty.paint({featureCollection: hydrobasins_2 , color: 'HYBAS_ID', width: 3});

// Import the Basin level 03 of HYdroBASINS
var hydrobasins_3 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_3")
                      .filterBounds(Col_boun.geometry());

var basins_3 = empty.paint({featureCollection: hydrobasins_3 , color: 'HYBAS_ID', width: 3});

// Import the Basin level 04 of HYdroBASINS
var hydrobasins_4 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_4")
                      .filterBounds(Col_boun.geometry());

var basins_4 = empty.paint({featureCollection: hydrobasins_4 , color: 'HYBAS_ID', width: 3});

// Import the Basin level 05 of HYdroBASINS
var hydrobasins_5 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_5")
                      .filterBounds(Col_boun.geometry());

var basins_5 = empty.paint({featureCollection: hydrobasins_5 , color: 'HYBAS_ID', width: 3});

// Import the Basin level 06 of HYdroBASINS
var hydrobasins_6 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_6")
                      .filterBounds(Col_boun.geometry());

var basins_6 = empty.paint({featureCollection: hydrobasins_6 , color: 'HYBAS_ID', width: 3});

// Import the Basin level 07 of HYdroBASINS
var hydrobasins_7 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_7")
                      .filterBounds(Col_boun.geometry());

var basins_7 = empty.paint({featureCollection: hydrobasins_7 , color: 'HYBAS_ID', width: 3});

// Import the Basin level 08 of HYdroBASINS
var hydrobasins_8 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_8")
                      .filterBounds(Col_boun.geometry());

var basins_8 = empty.paint({featureCollection: hydrobasins_8 , color: 'HYBAS_ID', width: 3});

// Import the Basin level 09 of HYdroBASINS
var hydrobasins_9 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_9")
                      .filterBounds(Col_boun.geometry());

var basins_9 = empty.paint({featureCollection: hydrobasins_9 , color: 'HYBAS_ID', width: 3});

// Activate satellite view with typo protection
var mapTypes = {
  HYBRID: 'HYBRID',
  ROADMAP: 'ROADMAP',
  SATELLITE: 'SATELLITE',
  TERRAIN: 'TERRAIN'
};


var map2 = ui.Map();
map2.add(ui.Label('HYydroBasins level 02',{position: 'bottom-center'}));
snazzy.addStyle(MultiBrand,"MultiBrand", map2);
map2.addLayer(basins_2.randomVisualizer(),{},'HydroBasins level 2',true, 0.9) 
map2.centerObject(AOI,5)

var map3 = ui.Map();
map3.add(ui.Label('HYydroBasins level 03',{position: 'bottom-center'}));
snazzy.addStyle(MidNight,"MidNight", map3);
map3.addLayer(basins_3.randomVisualizer(),{},'Basins Level 3', true, 0.9);
map3.centerObject(AOI,5)

var map4 = ui.Map();
map4.add(ui.Label('HYydroBasins level 04',{position: 'bottom-center'}));
snazzy.addStyle(GeoMap,"GeoMap", map4);
map4.addLayer(basins_4.randomVisualizer(),{},'Basins Level 4', true, 0.9);
map4.centerObject(AOI,5)

var map5 = ui.Map();
map5.add(ui.Label('HYydroBasins level 05',{position: 'bottom-center'}));
snazzy.addStyle(AImap,"AImap", map5);
map5.addLayer(basins_5.randomVisualizer(),{},'Basins Level 5', true, 0.9);
map5.centerObject(AOI,5)

var map6 = ui.Map();
map6.add(ui.Label('HYydroBasins level 06',{position: 'bottom-center'}));
snazzy.addStyle(AccessCall,"AccessCall", map6);
map6.addLayer(basins_6.randomVisualizer(),{},'Basins Level 6', true, 0.9);
map6.centerObject(AOI,5)

var map7 = ui.Map();
map7.add(ui.Label('HYydroBasins level 07',{position: 'bottom-center'}));
snazzy.addStyle(MutedBlue,"MutedBlue", map7);
map7.addLayer(basins_7.randomVisualizer(),{},'Basins Level 7', true, 0.9);
map7.centerObject(AOI,5)

var map8 = ui.Map();
map8.add(ui.Label('HYydroBasins level 08',{position: 'bottom-center'}));
snazzy.addStyle(Outrun,"Outrun", map8);
map8.addLayer(basins_8.randomVisualizer(),{},'Basins Level 8', true, 0.9);
map8.centerObject(AOI,5)

var map9 = ui.Map();
map9.add(ui.Label('HYydroBasins level 09',{position: 'bottom-center'}));
snazzy.addStyle(Cobalt,"Cobalt", map9);
map9.addLayer(basins_9.randomVisualizer(),{},'Basins Level 9', true, 0.5);
map9.centerObject(AOI,5)

var mapPanel = ui.Panel(

    [
      ui.Panel([map2, map3], null, {stretch: 'both'}),
      ui.Panel([map4, map5], null, {stretch: 'both'}),
      ui.Panel([map6, map7], null, {stretch: 'both'}),
      ui.Panel([map8, map9], null, {stretch: 'both'})
    ],

    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
    
var title = ui.Label('HydroBASINS Colombia', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '20px'
});

// Add images and title to the ui.root.
ui.root.widgets().reset([title, mapPanel]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
