// Hydrological analysis using HydroATLAS, HydroSHEDS, HydroBASINS, HydroLAKES and HydroRIVERS data.

// Created by Carlos Mendez

// HydroRIVERS

////////////////////////////////////////////////////////////////////////////// Set and configure Basemas  ///////////////////////////////////////////////////////////////////////////////////////

var snazzy = require("users/aazuspan/snazzy:styles");

var MultiBrand = "https://snazzymaps.com/style/20053/multi-brand-network"
var AImap = "https://snazzymaps.com/style/283414/ai-map"
var AccessCall = "https://snazzymaps.com/style/10448/accesscall"
var MutedBlue = "https://snazzymaps.com/style/83/muted-blue"
var Outrun = "https://snazzymaps.com/style/122898/outrun"
var Cobalt = "https://snazzymaps.com/style/30/cobalt"

////////////////////////////////////////////////////////////////////////////// Palette and Symbology  ///////////////////////////////////////////////////////////////////////////////////////

// Import externat palette and symbology from Gena repository 
// https://github.com/gee-community/ee-palettes
var palettes = require('users/gena/packages:palettes');

// Create manual palette 
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

////////////////////////////////////////////////////////////////////////////// Main Script  ///////////////////////////////////////////////////////////////////////////////////////

// Import the Colombia Boundary
var Col_boun = ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level1')
                  .filter('ADM0_NAME == "Colombia"');

var HydroRIVERS = ee.FeatureCollection('WWF/HydroSHEDS/v1/FreeFlowingRivers')
                .filterBounds(Col_boun.geometry());



// BAS_ID: Basin Identifier. Identifies the hydrological river basin according to the HydroSHEDS framework
var BAS_ID = HydroRIVERS.select('BAS_ID')
var BAS_ID_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'BAS_ID', width:0.5 }).clip(Col_boun);

// BAS_NAME: Basin Name Based on HydroSHEDS original basins and other sources.
var BAS_NAME = HydroRIVERS.select('BAS_NAME')

// UPLAND_SKM: Upstream watershed area of river reach in square kilometers (SKM).
var UPLAND_SKM = HydroRIVERS.select('UPLAND_SKM')



// BB_DIS_ORD: Backbone river discharge order. River Order (RIV_ORD) of the most downstream reach of the backbone river.
var BB_DIS_ORD = HydroRIVERS.select('BB_DIS_ORD');
var BB_DIS_ORD_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'BB_DIS_ORD', width:0.5}).clip(Col_boun);

// BB_ID: Backbone River Identifier. Represents the contiguous river unit (defined as flow path from source/headwater to sink/terminus).
var BB_ID = HydroRIVERS.select('BB_ID');
var BB_ID_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'BB_ID', width:0.5}).clip(Col_boun);

// RIV_ORD: River order. River order is here defined and calculated based on the long-term average discharge (DIS_AV_CMS) using logarithmic progression:
var RIV_ORD = HydroRIVERS.select('RIV_ORD');
var RIV_ORD_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'RIV_ORD', width:0.5}).clip(Col_boun);

// BB_LEN_KM: Backbone river length. Sum of length (LENGTH_KM) of the river reaches of the backbone river (BB_ID).
var BB_LEN_KM = HydroRIVERS.select('BB_LEN_KM');
var BB_LEN_KM_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'BB_LEN_KM', width:0.5}).clip(Col_boun);

// LENGTH_KM: Length of the river reach in kilometers.
var LENGTH_KM = HydroRIVERS.select('LENGTH_KM');
var LENGTH_KM_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'LENGTH_KM', width:0.5}).clip(Col_boun);



// BB_VOL_TCM: Backbone river volume. Sum of volume (VOLUME_TCM) of the river reaches of the backbone river (BB_ID).
var BB_VOL_TCM = HydroRIVERS.select('BB_VOL_TCM');
var BB_VOL_TCM_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'BB_VOL_TCM', width:0.5}).clip(Col_boun);

// VOLUME_TCM: Volume of the reach channel in thousand cubic meters (TCM). Calculated using width, length and depth of river channel.
var VOLUME_TCM = HydroRIVERS.select('VOLUME_TCM');
var VOLUME_TCM_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'VOLUME_TCM', width:0.5}).clip(Col_boun);

// DIS_AV_CMS: Average long-term (1971-2000) naturalized discharge in cubic meters per second (CMS).
var DIS_AV_CMS = HydroRIVERS.select('DIS_AV_CMS');
var DIS_AV_CMS_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'DIS_AV_CMS', width:0.5}).clip(Col_boun);



// CSI: Connectivity Status. Index from 0 to 100%; 100% = full connectivity; 0% = no connectivity.
var CSI = HydroRIVERS.select('CSI');
var CSI_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'CSI', width:0.5}).clip(Col_boun);

// CSI_D: Dominant pressure factor (DOM). Possible field values are: DOF; DOR; SED; USE; RDD; URB.
var CSI_D = HydroRIVERS.select('CSI_D');
var CSI_D_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'CSI_D', width:0.5}).clip(Col_boun);

// CSI_FF: CSI above or below free-flowing threshold. Indicates if the CSI value of a river reach is below (value = 0) or above (value = 1) the threshold of 95%. The attribute is used to calculate the free-flowing status of the river (see CSI_FF1 and CSI_FF2).
var CSI_FF = HydroRIVERS.select('CSI_FF');
var CSI_FF_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'CSI_FF', width:0.5}).clip(Col_boun);

// CSI_FF1: Free-flowing status (two categories). Indicates river reaches that belong to a river with "freeflowing" status (value = 1) or "non-free-flowing" status (value = 3). Note that the value 2 is reserved for river stretches with "good connectivity" status (see CSI_FF2).
var CSI_FF1 = HydroRIVERS.select('CSI_FF1');
var CSI_FF1_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'CSI_FF1', width:0.5}).clip(Col_boun);

// CSI_FF2: Free-flowing status (three categories). Indicates river reaches that belong to a river with "free flowing" status (value = 1), or a river stretch with "good connectivity" status (value = 2) or a river or river stretch with "impacted" status(value = 3).
var CSI_FF2 = HydroRIVERS.select('CSI_FF2');
var CSI_FF2_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'CSI_FF2', width:0.5}).clip(Col_boun);

// CSI_FFID: River stretch identifier. Additional identifier to distinguish contiguous river stretches.
var CSI_FFID = HydroRIVERS.select('CSI_FFID');
var CSI_FFID_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'CSI_FFID', width:0.5}).clip(Col_boun);



// DOF: Degree of Fragmentation. Index from 0 to 100% (see extended Data figure 5a of manuscript).
var DOF = HydroRIVERS.select('DOF');
var DOF_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'DOF', width:0.5}).clip(Col_boun);

// DOR: Degree of Regulation. Index from 0 to 100% (see extended Data figure 5b of manuscript).
var DOR = HydroRIVERS.select('DOR');
var DOR_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'DOR', width:0.5}).clip(Col_boun);

// SED: Sediment trapping. Index from 0 to 100% (see extended Data figure 5c of manuscript).
var SED = HydroRIVERS.select('SED');
var SED_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'SED', width:0.5}).clip(Col_boun);

// URB: Urbanization. Index from 0 to 100% (see extended Data figure 5f of manuscript).
var URB = HydroRIVERS.select('URB');
var URB_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'URB', width:0.5}).clip(Col_boun);

// USE: Water consumption. Index from 0 to 100% (see extended Data figure 5d of manuscript).
var USE = HydroRIVERS.select('USE');
var USE_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'USE', width:0.5}).clip(Col_boun);



// ERO_YLD_TO: Sum of erosion in tons per year per river reach. Calculated as the sum of sediment erosion within the river reach catchment (i.e., sediment erosion is not accumulated along the river network).
var ERO_YLD_TO = HydroRIVERS.select('ERO_YLD_TO');
var ERO_YLD_TO_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'ERO_YLD_TO', width:0.5}).clip(Col_boun);

// FLD: Inundation (floodplain) extent in river reach catchment (%).
var FLD = HydroRIVERS.select('FLD');
var FLD_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'FLD', width:0.5}).clip(Col_boun);

// HYFALL: Indicates the presence (1) or absence (0) of one or more waterfalls along the river reach.
var HYFALL = HydroRIVERS.select('HYFALL');
var HYFALL_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'HYFALL', width:0.5}).clip(Col_boun);

// INC: Filter field. In Grill et al. (2019), we considered all river reaches for routing purposes, but only analyzed and produced results for a subset of river reaches (INC = 1).
var INC = HydroRIVERS.select('INC');
var INC_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'INC', width:0.5}).clip(Col_boun);

// NDOID: Identifies the NOID of the next downstream river reach. If value=0, the river reach represents a terminal reach (ocean, inland sink).
var NDOID = HydroRIVERS.select('NDOID');
var NDOID_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'NDOID', width:0.5}).clip(Col_boun);


////////////////////////////////////////////////////////////////////////////// Set Style Images and Hillshade  ///////////////////////////////////////////////////////////////////////////////////////

var hand30_100 = ee.ImageCollection("users/gena/global-hand/hand-100")
var demALOS = ee.Image("JAXA/ALOS/AW3D30/V2_2")

demALOS = demALOS.select('AVE_DSM').clip(Col_boun)

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

var map1 = ui.Map();
map1.add(ui.Label('Basins Information',{position: 'bottom-center'}));
snazzy.addStyle(MultiBrand,"MultiBrand", map1);
map1.addLayer(BAS_ID, {}, 'BAS ID', false, 0.1)
map1.addLayer(BAS_ID_img.randomVisualizer(),{},'BAS ID img', true, 0.9)
map1.addLayer(BAS_NAME, {}, 'BAS NAME', false, 0.1)
map1.addLayer(UPLAND_SKM, {}, 'UPLAND SKM', false, 0.1)
map1.addLayer(hillshade(hand30_100.mosaic().visualize(vis)), {}, 'DEM Base Hillshade', true, 0.3)
map1.centerObject(Col_boun,5)

var map2 = ui.Map();
map2.add(ui.Label('Rivers and Discharge',{position: 'bottom-center'}));
snazzy.addStyle(AImap,"AImap", map2);
map2.addLayer(BB_DIS_ORD, {}, 'BB DIS ORD', false, 0.1)
map2.addLayer(BB_DIS_ORD_img.randomVisualizer(),{},'BB DIS ORD img', false, 0.9)
map2.addLayer(BB_ID, {}, 'BB ID', false, 0.1)
map2.addLayer(BB_ID_img.randomVisualizer(),{},'BB ID img', false, 0.9)
map2.addLayer(RIV_ORD, {}, 'RIV OR', false, 0.1)
map2.addLayer(RIV_ORD_img, Water4,'RIV OR img', true, 0.9)
map2.addLayer(BB_LEN_KM, {}, 'BB LEN KM', false, 0.1)
map2.addLayer(BB_LEN_KM_img.randomVisualizer(),{},'BB LEN KM img', false, 0.9)
map2.addLayer(LENGTH_KM, {}, 'LENGTH KM', false, 0.1)
map2.addLayer(hillshade(hand30_100.mosaic().visualize(vis)), {}, 'DEM Base Hillshade', true, 0.3)
map2.centerObject(Col_boun,5)

var map3 = ui.Map();
map3.add(ui.Label('Volume Average',{position: 'bottom-center'}));
snazzy.addStyle(AccessCall,"AccessCall", map3);
map3.addLayer(BB_VOL_TCM, {}, 'BB VOL TCM', false, 0.1)
map3.addLayer(BB_VOL_TCM_img, Water8,'BB VOL TCM img', true, 0.9)
map3.addLayer(VOLUME_TCM, {}, 'VOLUME TCM', false, 0.1)
map3.addLayer(VOLUME_TCM_img, Water6,'VOLUME TCM img', false, 0.9)
map3.addLayer(DIS_AV_CMS, {}, 'DIS AV CMS', false, 0.1)
map3.addLayer(DIS_AV_CMS_img.randomVisualizer(),{},'DIS AV CMS img', false, 0.9)
map3.addLayer(hillshade(hand30_100.mosaic().visualize(vis)), {}, 'DEM Base Hillshade', true, 0.3)
map3.centerObject(Col_boun,5)

var map4 = ui.Map();
map4.add(ui.Label('Free Flowing',{position: 'bottom-center'}));
snazzy.addStyle(MutedBlue,"MutedBlue", map4);
map4.addLayer(CSI, {}, 'CSI', false, 0.1)
map4.addLayer(CSI_img, Water8,'CSI img', true, 0.9)
map4.addLayer(CSI_D, {}, 'CSI_D', false, 0.1)
//map4.addLayer(CSI_D_img.randomVisualizer(),{},'CSI D img', true, 0.9)
map4.addLayer(CSI_FF, {}, 'CSI FF', false, 0.1)
map4.addLayer(CSI_FF_img.randomVisualizer(),{},'CSI FF img', false, 0.9)
map4.addLayer(CSI_FF1, {}, 'CSI FF1', false, 0.1)
map4.addLayer(CSI_FF1_img.randomVisualizer(),{},'CSI FF1 img', false, 0.9)
map4.addLayer(CSI_FF2, {}, 'CSI FF2', false, 0.1)
map4.addLayer(CSI_FF2_img.randomVisualizer(),{},'CSI FF2 img', false, 0.9)
map4.addLayer(CSI_FFID, {}, 'CSI_FFID', false, 0.1)
map4.addLayer(CSI_FFID_img.randomVisualizer(),{},'CSIF FID img', false, 0.9)
map4.addLayer(hillshade(hand30_100.mosaic().visualize(vis)), {}, 'DEM Base Hillshade', true, 0.3)
map4.centerObject(Col_boun,5)

var map5 = ui.Map();
map5.add(ui.Label('Index and Uses',{position: 'bottom-center'}));
snazzy.addStyle(Outrun,"Outrun", map5);
map5.addLayer(DOF, {}, 'DOF', false, 0.1)
map5.addLayer(DOF_img.randomVisualizer(),{},'DOF img', false, 0.9)
map5.addLayer(DOR, {}, 'DOR', false, 0.1)
map5.addLayer(DOR_img.randomVisualizer(),{},'DOR img', false, 0.9)
map5.addLayer(SED, {}, 'SED', false, 0.1)
map5.addLayer(SED_img.randomVisualizer(),{},'SED img', false, 0.9)
map5.addLayer(URB, {}, 'URB', false, 0.1)
map5.addLayer(URB_img.randomVisualizer(),{},'URB img', false, 0.9)
map5.addLayer(USE, {}, 'USE', false, 0.1)
map5.addLayer(USE_img, Water4,'USE img', true, 0.9)
map5.addLayer(hillshade(hand30_100.mosaic().visualize(vis)), {}, 'DEM Base Hillshade', true, 0.3)
map5.centerObject(Col_boun,5)

var map6 = ui.Map();
map6.add(ui.Label('Erosion and Floods',{position: 'bottom-center'}));
snazzy.addStyle(Cobalt,"Cobalt", map6);
map6.addLayer(ERO_YLD_TO, {}, 'ERO YLD TO', false, 0.1)
map6.addLayer(ERO_YLD_TO_img.randomVisualizer(),{},'ERO YLD TO img', false, 0.9)
map6.addLayer(FLD, {}, 'FLD', false, 0.1)
map6.addLayer(FLD_img, Water8,'FLD img', true, 0.9)
map6.addLayer(HYFALL, {}, 'HYFALL', false, 0.1)
map6.addLayer(HYFALL_img.randomVisualizer(),{},'HYFALL img', false, 0.9)
map6.addLayer(INC, {}, 'INC', false, 0.1)
map6.addLayer(INC_img.randomVisualizer(),{},'INC img', false, 0.9)
map6.addLayer(NDOID, {}, 'NDOID', false, 0.1)
map6.addLayer(NDOID_img.randomVisualizer(),{},'NDOID img', false, 0.9)
map6.addLayer(hillshade(hand30_100.mosaic().visualize(vis)), {}, 'DEM Base Hillshade', true, 0.3)
map6.centerObject(Col_boun,5)


var mapPanel = ui.Panel(

    [
      ui.Panel([map1, map2], null, {stretch: 'both'}),
      ui.Panel([map3, map4], null, {stretch: 'both'}),
      ui.Panel([map5, map6], null, {stretch: 'both'})
    ],

    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
    
var title = ui.Label('HydroRIVERS Colombia', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '20px'
});

// Add images and title to the ui.root.
ui.root.widgets().reset([title, mapPanel]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));




