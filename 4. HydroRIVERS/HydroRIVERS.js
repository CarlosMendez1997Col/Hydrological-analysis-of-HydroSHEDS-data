// Hydrological analysis using HydroATLAS, HydroSHEDS, HydroBASINS, HydroLAKES and HydroRIVERS data.

// Created by Carlos Mendez

// HydroRIVERS

// Import the Colombia Boundary
var Col_boun = ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level1')
                  .filter('ADM0_NAME == "Colombia"');

var HydroRIVERS = ee.FeatureCollection('WWF/HydroSHEDS/v1/FreeFlowingRivers')
                .filterBounds(Col_boun.geometry());



// BAS_ID: Basin Identifier. Identifies the hydrological river basin according to the HydroSHEDS framework
var BAS_ID = HydroRIVERS.select('BAS_ID')
var BAS_ID_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'BAS_ID'}).clip(Col_boun);

// BAS_NAME: Basin Name Based on HydroSHEDS original basins and other sources.
var BAS_NAME = HydroRIVERS.select('BAS_NAME')

// UPLAND_SKM: Upstream watershed area of river reach in square kilometers (SKM).
var UPLAND_SKM = HydroRIVERS.select('UPLAND_SKM')



// BB_DIS_ORD: Backbone river discharge order. River Order (RIV_ORD) of the most downstream reach of the backbone river.
var BB_DIS_ORD = HydroRIVERS.select('BB_DIS_ORD');
var BB_DIS_ORD_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'BB_DIS_ORD'}).clip(Col_boun);

// BB_ID: Backbone River Identifier. Represents the contiguous river unit (defined as flow path from source/headwater to sink/terminus).
var BB_ID = HydroRIVERS.select('BB_ID');
var BB_ID_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'BB_ID'}).clip(Col_boun);

// RIV_ORD: River order. River order is here defined and calculated based on the long-term average discharge (DIS_AV_CMS) using logarithmic progression:
var RIV_ORD = HydroRIVERS.select('RIV_ORD');
var RIV_ORD_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'RIV_ORD'}).clip(Col_boun);

// BB_LEN_KM: Backbone river length. Sum of length (LENGTH_KM) of the river reaches of the backbone river (BB_ID).
var BB_LEN_KM = HydroRIVERS.select('BB_LEN_KM');
var BB_LEN_KM_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'BB_LEN_KM'}).clip(Col_boun);

// LENGTH_KM: Length of the river reach in kilometers.
var LENGTH_KM = HydroRIVERS.select('LENGTH_KM');
var LENGTH_KM_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'LENGTH_KM'}).clip(Col_boun);



// BB_VOL_TCM: Backbone river volume. Sum of volume (VOLUME_TCM) of the river reaches of the backbone river (BB_ID).
var BB_VOL_TCM = HydroRIVERS.select('BB_VOL_TCM');
var BB_VOL_TCM_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'BB_VOL_TCM'}).clip(Col_boun);

// VOLUME_TCM: Volume of the reach channel in thousand cubic meters (TCM). Calculated using width, length and depth of river channel.
var VOLUME_TCM = HydroRIVERS.select('VOLUME_TCM');
var VOLUME_TCM_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'VOLUME_TCM'}).clip(Col_boun);

// DIS_AV_CMS: Average long-term (1971-2000) naturalized discharge in cubic meters per second (CMS).
var DIS_AV_CMS = HydroRIVERS.select('DIS_AV_CMS');
var DIS_AV_CMS_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'DIS_AV_CMS'}).clip(Col_boun);



// CSI: Connectivity Status. Index from 0 to 100%; 100% = full connectivity; 0% = no connectivity.
var CSI = HydroRIVERS.select('CSI');
var CSI_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'CSI'}).clip(Col_boun);

// CSI_D: Dominant pressure factor (DOM). Possible field values are: DOF; DOR; SED; USE; RDD; URB.
var CSI_D = HydroRIVERS.select('CSI_D');
var CSI_D_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'CSI_D'}).clip(Col_boun);

// CSI_FF: CSI above or below free-flowing threshold. Indicates if the CSI value of a river reach is below (value = 0) or above (value = 1) the threshold of 95%. The attribute is used to calculate the free-flowing status of the river (see CSI_FF1 and CSI_FF2).
var CSI_FF = HydroRIVERS.select('CSI_FF');
var CSI_FF_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'CSI_FF'}).clip(Col_boun);

// CSI_FF1: Free-flowing status (two categories). Indicates river reaches that belong to a river with "freeflowing" status (value = 1) or "non-free-flowing" status (value = 3). Note that the value 2 is reserved for river stretches with "good connectivity" status (see CSI_FF2).
var CSI_FF1 = HydroRIVERS.select('CSI_FF1');
var CSI_FF1_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'CSI_FF1'}).clip(Col_boun);

// CSI_FF2: Free-flowing status (three categories). Indicates river reaches that belong to a river with "free flowing" status (value = 1), or a river stretch with "good connectivity" status (value = 2) or a river or river stretch with "impacted" status(value = 3).
var CSI_FF2 = HydroRIVERS.select('CSI_FF2');
var CSI_FF2_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'CSI_FF2'}).clip(Col_boun);

// CSI_FFID: River stretch identifier. Additional identifier to distinguish contiguous river stretches.
var CSI_FFID = HydroRIVERS.select('CSI_FFID');
var CSI_FFID_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'CSI_FFID'}).clip(Col_boun);



// DOF: Degree of Fragmentation. Index from 0 to 100% (see extended Data figure 5a of manuscript).
var DOF = HydroRIVERS.select('DOF');
var DOF_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'DOF'}).clip(Col_boun);

// DOR: Degree of Regulation. Index from 0 to 100% (see extended Data figure 5b of manuscript).
var DOR = HydroRIVERS.select('DOR');
var DOR_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'DOR'}).clip(Col_boun);

// SED: Sediment trapping. Index from 0 to 100% (see extended Data figure 5c of manuscript).
var SED = HydroRIVERS.select('SED');
var SED_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'SED'}).clip(Col_boun);

// URB: Urbanization. Index from 0 to 100% (see extended Data figure 5f of manuscript).
var URB = HydroRIVERS.select('URB');
var URB_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'URB'}).clip(Col_boun);

// USE: Water consumption. Index from 0 to 100% (see extended Data figure 5d of manuscript).
var USE = HydroRIVERS.select('USE');
var USE_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'USE'}).clip(Col_boun);



// ERO_YLD_TO: Sum of erosion in tons per year per river reach. Calculated as the sum of sediment erosion within the river reach catchment (i.e., sediment erosion is not accumulated along the river network).
var ERO_YLD_TO = HydroRIVERS.select('ERO_YLD_TO');
var ERO_YLD_TO_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'ERO_YLD_TO'}).clip(Col_boun);

// FLD: Inundation (floodplain) extent in river reach catchment (%).
var FLD = HydroRIVERS.select('FLD');
var FLD_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'FLD'}).clip(Col_boun);

// HYFALL: Indicates the presence (1) or absence (0) of one or more waterfalls along the river reach.
var HYFALL = HydroRIVERS.select('HYFALL');
var HYFALL_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'HYFALL'}).clip(Col_boun);

// INC: Filter field. In Grill et al. (2019), we considered all river reaches for routing purposes, but only analyzed and produced results for a subset of river reaches (INC = 1).
var INC = HydroRIVERS.select('INC');
var INC_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'INC'}).clip(Col_boun);

// NDOID: Identifies the NOID of the next downstream river reach. If value=0, the river reach represents a terminal reach (ocean, inland sink).
var NDOID = HydroRIVERS.select('NDOID');
var NDOID_img = ee.Image().byte().paint({featureCollection: HydroRIVERS , color: 'NDOID'}).clip(Col_boun);

// Activate satellite view with typo protection
var mapTypes = {
  HYBRID: 'HYBRID',
  ROADMAP: 'ROADMAP',
  SATELLITE: 'SATELLITE',
  TERRAIN: 'TERRAIN'
};

var map1 = ui.Map();
map1.add(ui.Label('HYydroBasins level 02',{position: 'bottom-center'}));
map1.addLayer(BAS_ID, {}, 'BAS ID', false, 0.1)
map1.addLayer(BAS_ID_img.randomVisualizer(),{},'BAS ID img', true, 0.9)
map1.addLayer(BAS_NAME, {}, 'BAS NAME', false, 0.1)
map1.addLayer(UPLAND_SKM, {}, 'UPLAND SKM', false, 0.1)
map1.centerObject(Col_boun,5)
map1.setOptions({mapTypeId: mapTypes.HYBRID});

var map2 = ui.Map();
map2.add(ui.Label('HYydroBasins level 02',{position: 'bottom-center'}));
map2.addLayer(BB_DIS_ORD, {}, 'BB DIS ORD', false, 0.1)
map2.addLayer(BB_DIS_ORD_img.randomVisualizer(),{},'BB DIS ORD img', false, 0.9)
map2.addLayer(BB_ID, {}, 'BB ID', false, 0.1)
map2.addLayer(BB_ID_img.randomVisualizer(),{},'BB ID img', false, 0.9)
map2.addLayer(RIV_ORD, {}, 'RIV OR', false, 0.1)
map2.addLayer(RIV_ORD_img.randomVisualizer(),{},'RIV OR img', true, 0.9)
map2.addLayer(BB_LEN_KM, {}, 'BB LEN KM', false, 0.1)
map2.addLayer(BB_LEN_KM_img.randomVisualizer(),{},'BB LEN KM img', false, 0.9)
map2.addLayer(LENGTH_KM, {}, 'LENGTH KM', false, 0.1)
map2.addLayer(LENGTH_KM_img.randomVisualizer(),{},'LENGTH KM img', false, 0.9)

map2.centerObject(Col_boun,5)
map2.setOptions({mapTypeId: mapTypes.HYBRID});

var map3 = ui.Map();
map3.add(ui.Label('HYydroBasins level 03',{position: 'bottom-center'}));
map3.addLayer(BB_VOL_TCM, {}, 'BB VOL TCM', false, 0.1)
map3.addLayer(BB_VOL_TCM_img.randomVisualizer(),{},'BB VOL TCM img', true, 0.9)
map3.addLayer(VOLUME_TCM, {}, 'VOLUME TCM', false, 0.1)
map3.addLayer(VOLUME_TCM_img.randomVisualizer(),{},'VOLUME TCM img', false, 0.9)
map3.addLayer(DIS_AV_CMS, {}, 'DIS AV CMS', false, 0.1)
map3.addLayer(DIS_AV_CMS_img.randomVisualizer(),{},'DIS AV CMS img', false, 0.9)
map3.centerObject(Col_boun,5)
map3.setOptions({mapTypeId: mapTypes.HYBRID});

var map4 = ui.Map();
map4.add(ui.Label('HYydroBasins level 04',{position: 'bottom-center'}));
map4.addLayer(CSI, {}, 'CSI', false, 0.1)
map4.addLayer(CSI_img.randomVisualizer(),{},'CSI img', true, 0.9)
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
map4.centerObject(Col_boun,5)
map4.setOptions({mapTypeId: mapTypes.HYBRID});

var map5 = ui.Map();
map5.add(ui.Label('HYydroBasins level 05',{position: 'bottom-center'}));
map5.addLayer(DOF, {}, 'DOF', false, 0.1)
map5.addLayer(DOF_img.randomVisualizer(),{},'DOF img', false, 0.9)
map5.addLayer(DOR, {}, 'DOR', false, 0.1)
map5.addLayer(DOR_img.randomVisualizer(),{},'DOR img', false, 0.9)
map5.addLayer(SED, {}, 'SED', false, 0.1)
map5.addLayer(SED_img.randomVisualizer(),{},'SED img', false, 0.9)
map5.addLayer(URB, {}, 'URB', false, 0.1)
map5.addLayer(URB_img.randomVisualizer(),{},'URB img', false, 0.9)
map5.addLayer(USE, {}, 'USE', false, 0.1)
map5.addLayer(USE_img.randomVisualizer(),{},'USE img', true, 0.9)
map5.centerObject(Col_boun,5)
map5.setOptions({mapTypeId: mapTypes.HYBRID});

var map6 = ui.Map();
map6.add(ui.Label('HYydroBasins level 06',{position: 'bottom-center'}));
map6.addLayer(ERO_YLD_TO, {}, 'ERO YLD TO', false, 0.1)
map6.addLayer(ERO_YLD_TO_img.randomVisualizer(),{},'ERO YLD TO img', false, 0.9)
map6.addLayer(FLD, {}, 'FLD', false, 0.1)
map6.addLayer(FLD_img.randomVisualizer(),{},'FLD img', true, 0.9)
map6.addLayer(HYFALL, {}, 'HYFALL', false, 0.1)
map6.addLayer(HYFALL_img.randomVisualizer(),{},'HYFALL img', false, 0.9)
map6.addLayer(INC, {}, 'INC', false, 0.1)
map6.addLayer(INC_img.randomVisualizer(),{},'INC img', false, 0.9)
map6.addLayer(NDOID, {}, 'NDOID', false, 0.1)
map6.addLayer(NDOID_img.randomVisualizer(),{},'NDOID img', false, 0.9)
map6.centerObject(Col_boun,5)
map6.setOptions({mapTypeId: mapTypes.HYBRID});


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


