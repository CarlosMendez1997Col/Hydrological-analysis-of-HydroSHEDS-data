// Hydrological analysis using HydroATLAS, HydroSHEDS, HydroBASINS, HydroLAKES and HydroRIVERS data.

// Created by Carlos Mendez

// Global Lakes and Wetlands Database (GLWD)
// https://www.hydrosheds.org/products/glwd

// Legend of classes Global Lakes and Wetlands Database (GLWD)

// ID  Class name
// 01  Freshwater lake
// 02  Saline lake
// 03  Reservoir
// 04  Large river
// 05  Large estuarine river
// 06  Other permanent waterbody
// 07  Small streams
// 08  Lacustrine, forested
// 09  Lacustrine, non-forested
// 10  Riverine, regularly flooded, forested
// 11  Riverine, regularly flooded, non-forested
// 12  Riverine, seasonally flooded, forested
// 13  Riverine, seasonally flooded, non-forested
// 14  Riverine, seasonally saturated, forested
// 15  Riverine, seasonally saturated, non-forested
// 16  Palustrine, regularly flooded, forested
// 17  Palustrine, regularly flooded, non-forested
// 18  Palustrine, seasonally saturated, forested
// 19  Palustrine, seasonally saturated, non-forested
// 20  Ephemeral, forested
// 21  Ephemeral, non-forested
// 22  Arctic/boreal peatland, forested
// 23  Arctic/boreal peatland, non-forested
// 24  Temperate peatland, forested
// 25  Temperate peatland, non-forested
// 26  Tropical peatland, forested
// 27  Tropical peatland, non-forested
// 28  Mangrove
// 29  Saltmarsh
// 30  Delta
// 31  Other coastal wetland
// 32  Salt pan, saline/brackish wetland
// 33  Paddy rice
// 00  Dryland (non-wetland)


////////////////////////////////////////////////////////////////////////////// Palette and Symbology  ///////////////////////////////////////////////////////////////////////////////////////

// Import externat palette and symbology from Gena repository 
// https://github.com/gee-community/ee-palettes
var palettes = require('users/gena/packages:palettes');

// Create manual palette 
var flowAccumulationVis = {min: 0.0, max: 500.0, palette: ['000000', '023858', '006837', '1a9850', '66bd63', 'a6d96a', 
                                                           'd9ef8b','ffffbf', 'fee08b', 'fdae61', 'f46d43', 'd73027'],
                          };
///// Hydrologically Conditioned and Void-Filled DEM /////

var elevationVis = {min: -50.0, max: 3000.0, gamma: 2.0,};

///// Drainage Direction /////

var drainageDirectionVis = {min: 1.0, max: 128.0, palette: ['000000', '023858', '006837', '1a9850', '66bd63', 'a6d96a', 
                                                            'd9ef8b', 'ffffbf', 'fee08b', 'fdae61', 'f46d43', 'd73027'],
                           };

var visParams = {lineWidth: 2, color: { property: 'RIV_ORD', mode: 'linear', palette: ['08519c', '3182bd', '6baed6', 'bdd7e7', 'eff3ff'],
                min: 1, max: 10}};

var area_pct_params = {min: 0, max: 100, palette: ['040613', '292851', '3f4b96', '427bb7', '61a8c7', '9cd4da', 'eafdfd'],};


////////////////////////////////////////////////////////////////////////////// Main Script  ///////////////////////////////////////////////////////////////////////////////////////


// Local files with Global Lakes and Wetlands Database (GLWD)

var delta_area_ha_x10 = ee.Image("projects/ee-carlosmendez1997/assets/Col_Combined_GLWD_v2_delta_area_ha_x10");
var delta_area_pct = ee.Image("projects/ee-carlosmendez1997/assets/Col_Combined_GLWD_v2_delta_area_pct");
var delta_main_class = ee.Image("projects/ee-carlosmendez1997/assets/Col_Combined_GLWD_v2_delta_main_class");
var delta_main_class_50pct = ee.Image("projects/ee-carlosmendez1997/assets/Col_Combined_GLWD_v2_delta_main_class_50pct");


///// 1. Colombia Boundary

var dataset = ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level1')
var colombia = dataset.filter(ee.Filter.eq('ADM0_NAME', 'Colombia'));
var geometry = colombia.geometry()

///// 2. Flow Accumulation /////

// HydroSHEDS Flow Accumulation, 15 Arc-Seconds
var flow_accum_15 = ee.Image('WWF/HydroSHEDS/15ACC');
var flowAccumulation_15 = flow_accum_15.select('b1');

///// 3. Hydrologically Conditioned DEM /////

// Hydrologically Conditioned DEM, 03 Arc-Seconds
var Hydro_DEM_03 = ee.Image('WWF/HydroSHEDS/03CONDEM');
var elevation_DEM_03 = Hydro_DEM_03.select('b1');

///// 4. Void-Filled DEM /////

// Void-Filled DEM, 03 Arc-Seconds
var void_dem_03 = ee.Image('WWF/HydroSHEDS/03VFDEM');
var void_fil_dem_03 = void_dem_03.select('b1');

///// 5. Drainage Direction /////

// Drainage Direction, 03 Arc-Seconds
var dra_dir_03 = ee.Image('WWF/HydroSHEDS/03DIR');
var drainageDirection_03 = dra_dir_03.select('b1');

///// 6. Global Surface Water (GSW) /////

// Global Surface Water (GSW) 
var gsw = ee.Image("JRC/GSW1_4/GlobalSurfaceWater");
var lakes_BRB_oc = gsw.select('occurrence');

// Clip all data in Colombia

var BRB_flow_15 = flowAccumulation_15.clip(geometry);
var BRB_hydro_DEM_03 = elevation_DEM_03.clip(geometry);
var BRB_void_fill_DEM_03 = void_fil_dem_03.clip(geometry);
var BRB_dra_dir_03 = drainageDirection_03.clip(geometry);
var BRB_lakes = lakes_BRB_oc.clip(geometry);

// Import palettes and colors

///// Global Lakes and Wetlands Database (GLWD)

var pal_area_ha_x10 = palettes.colorbrewer.Set3[12];
var pal_area_pct = palettes.colorbrewer.YlGnBu[9];
var pal_main_class = palettes.colorbrewer.Paired[12];
var pal_main_class_50pct = palettes.colorbrewer.Paired[12];

////////////////////////////////////////////////////////////////////////////// Set Style Images and Hillshade  ///////////////////////////////////////////////////////////////////////////////////////

var hand30_100 = ee.ImageCollection("users/gena/global-hand/hand-100")
var demALOS = ee.Image("JAXA/ALOS/AW3D30/V2_2")

demALOS = demALOS.select('AVE_DSM').clip(geometry)

var paletteHand = ['grey', 'white'];

var vis = {min: -50.0, max: 3000.0, palette: paletteHand}

// add styled
var utils = require('users/gena/packages:utils')

function hillshade(image) {
  var weight = 0.7
  var extrusion = 5
  var sunAzimuth = 315
  var sunElevation = 35
  var elevation = 45
  var contrast = 0.1
  var brightness = 0
  var saturation = 0.85
  var gamma = 0.1

  return utils.hillshadeRGB(image, demALOS, weight, extrusion, sunAzimuth, sunElevation, contrast, brightness, saturation, gamma)
}
  
////////////////////////////////////////////////////////////////////////////// Set and Create Panels to View Images  ///////////////////////////////////////////////////////////////////////////////////////

function createPanel1() {
  var label1 = ui.Label({
    value: 'HydroSHEDS Database',
    style: {fontWeight: 'bold', fontSize: '10px'}})
  return ui.Panel([ui.Panel([label1], null, {stretch:'vertical'})])
}
  
function createPanel2() {
  var label1 = ui.Label({
    value: 'GLWD Database',
    style: {fontWeight: 'bold', fontSize: '10px'}})
  return ui.Panel([ui.Panel([label1], null, {stretch:'vertical'})])
}  
  
var map1 = ui.Map();

map1.add(createPanel1())
map1.addLayer(colombia, {}, 'Colombia Boundary',true, 0.5);
map1.addLayer(BRB_flow_15, flowAccumulationVis, 'Flow Accumulation 15 Arc Seconds',true, 0.9);
map1.addLayer(BRB_hydro_DEM_03, elevationVis, 'Elevation DEM 03 Arc Seconds', true, 0.9);
map1.addLayer(BRB_void_fill_DEM_03, elevationVis, 'Elevation Void Fill DEM 03 Arc Seconds', true, 0.8);
map1.addLayer(BRB_dra_dir_03, drainageDirectionVis, 'Drainage Direction 03 Arc Seconds', true, 0.5);
map1.addLayer(BRB_lakes, visParams, 'Surface Water and Lakes ', true, 1.0);
map1.addLayer(hillshade(hand30_100.mosaic().visualize(vis)), {}, 'DEM Base Hillshade', true, 0.3)
map1.setOptions('HYBRID')
map1.centerObject(colombia,4)

var map2 = ui.Map();

map2.add(createPanel2())
map2.addLayer(colombia, {}, 'Colombia Boundary',true, 0.5);
map2.addLayer(delta_area_ha_x10, {min: 0, max: 214, palette: pal_area_ha_x10}, 'Combined GLWD area in hectares x10');
map2.addLayer(delta_area_pct, {min: 0, max: 100, palette: pal_area_pct}, 'Combined GLWD area in percent');
map2.addLayer(delta_main_class, {min: 0, max: 33, palette: pal_main_class}, 'Combined GLWD main class');
map2.addLayer(delta_main_class_50pct, {min: 0, max: 33, palette: pal_main_class_50pct}, 'Combined GLWD main class extent exceeds (50%)');
map2.addLayer(hillshade(hand30_100.mosaic().visualize(vis)), {}, 'DEM Base Hillshade', true, 0.3)
map2.setOptions('HYBRID')
map2.centerObject(colombia, 4)


ui.root.clear()
ui.root.add(map1)
ui.root.add(map2)

