// Hydrological analysis using HydroATLAS, HydroSHEDS, HydroBASINS, HydroLAKES and HydroRIVERS data.

// Created by Carlos Mendez

// HydroSHEDS

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

var palette_2 = empty.paint({featureCollection: hydrobasins_2 , color: 'HYBAS_ID'});

// Import the Basin level 03 of HYdroBASINS
var hydrobasins_3 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_3")
                      .filterBounds(Col_boun.geometry());

var palette_3 = empty.paint({featureCollection: hydrobasins_3 , color: 'HYBAS_ID'});

// Import the Basin level 04 of HYdroBASINS
var hydrobasins_4 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_4")
                      .filterBounds(Col_boun.geometry());

var palette_4 = empty.paint({featureCollection: hydrobasins_4 , color: 'HYBAS_ID'});

// Import the Basin level 05 of HYdroBASINS
var hydrobasins_5 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_5")
                      .filterBounds(Col_boun.geometry());

var palette_5 = empty.paint({featureCollection: hydrobasins_5 , color: 'HYBAS_ID'});

// Import the Basin level 06 of HYdroBASINS
var hydrobasins_6 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_6")
                      .filterBounds(Col_boun.geometry());

var palette_6 = empty.paint({featureCollection: hydrobasins_6 , color: 'HYBAS_ID'});

// Import the Basin level 07 of HYdroBASINS
var hydrobasins_7 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_7")
                      .filterBounds(Col_boun.geometry());

var palette_7 = empty.paint({featureCollection: hydrobasins_7 , color: 'HYBAS_ID'});

// Import the Basin level 08 of HYdroBASINS
var hydrobasins_8 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_8")
                      .filterBounds(Col_boun.geometry());

var palette_8 = empty.paint({featureCollection: hydrobasins_8 , color: 'HYBAS_ID'});

// Import the Basin level 09 of HYdroBASINS
var hydrobasins_9 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_9")
                      .filterBounds(Col_boun.geometry());

var palette_9 = empty.paint({featureCollection: hydrobasins_9 , color: 'HYBAS_ID'});

var map2 = ui.Map();
map2.add(ui.Label('HYydroBasins level 02',{position: 'bottom-center'}));
map2.addLayer(palette_2.randomVisualizer(),{},'Colombia Basins Level 2', true, 0.5);
map2.centerObject(AOI,5)
map2.setOptions('SATELLITE')

var map3 = ui.Map();
map3.add(ui.Label('HYydroBasins level 03',{position: 'bottom-center'}));
map3.addLayer(palette_3.randomVisualizer(),{},'Colombia Basins Level 3', true, 0.5);
map3.centerObject(AOI,5)
map3.setOptions('SATELLITE')

var map4 = ui.Map();
map4.add(ui.Label('HYydroBasins level 04',{position: 'bottom-center'}));
map4.addLayer(palette_4.randomVisualizer(),{},'Colombia Basins Level 4', true, 0.5);
map4.centerObject(AOI,5)
map4.setOptions('SATELLITE')

var map5 = ui.Map();
map5.add(ui.Label('HYydroBasins level 05',{position: 'bottom-center'}));
map5.addLayer(palette_5.randomVisualizer(),{},'Colombia Basins Level 5', true, 0.5);
map5.centerObject(AOI,5)
map5.setOptions('SATELLITE')

var map6 = ui.Map();
map6.add(ui.Label('HYydroBasins level 06',{position: 'bottom-center'}));
map6.addLayer(palette_6.randomVisualizer(),{},'Colombia Basins Level 6', true, 0.5);
map6.centerObject(AOI,5)
map6.setOptions('SATELLITE')

var map7 = ui.Map();
map7.add(ui.Label('HYydroBasins level 07',{position: 'bottom-center'}));
map7.addLayer(palette_7.randomVisualizer(),{},'Colombia Basins Level 7', true, 0.5);
map7.centerObject(AOI,5)
map7.setOptions('SATELLITE')

var map8 = ui.Map();
map8.add(ui.Label('HYydroBasins level 08',{position: 'bottom-center'}));
map8.addLayer(palette_8.randomVisualizer(),{},'Colombia Basins Level 8', true, 0.5);
map8.centerObject(AOI,5)
map8.setOptions('SATELLITE')

var map9 = ui.Map();
map9.add(ui.Label('HYydroBasins level 09',{position: 'bottom-center'}));
map9.addLayer(palette_9.randomVisualizer(),{},'Colombia Basins Level 9', true, 0.5);
map9.centerObject(AOI,5)
map9.setOptions('SATELLITE')

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

