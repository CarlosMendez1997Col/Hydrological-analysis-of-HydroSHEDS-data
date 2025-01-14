// Hydrological analysis using HydroATLAS, HydroSHEDS, HydroBASINS, HydroLAKES and HydroRIVERS data.

// The original data, are available in:

// HydroBASINS
// https://www.hydrosheds.org/products/hydrobasins

// Import the Basin level 07 of HYdroSEDS
var hydrobasins_7 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_7");
var basin_7 = hydrobasins_7.filter(ee.Filter.eq('HYBAS_ID', 6070130930))
var geometry = basin_7.geometry()

// Import the Basin level 08 of HYdroSEDS
var hydrobasins_8 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_8");
var basin_8 = hydrobasins_8.filter(ee.Filter.inList('HYBAS_ID', [6080130930,6080126950,6080126840,6080124940,6080125020,
                                                                 6080124900,6080124890,6080119160,6080119260,6089084130]))

// Import the Basin level 09 of HYdroSEDS
var hydrobasins_9 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_9");
var basin_9 = hydrobasins_9.filter(ee.Filter.inList('HYBAS_ID', [6090130930, 6090126950, 6090126840, 6090127130, 6090127210, 6090126490,
                                                                 6090126340, 6090124940, 6090125020, 6090124900, 6090124890, 6090123300,
                                                                 6090123460, 6090122470, 6090122380, 6090120740, 6090120730, 6090119870,
                                                                 6090119930, 6090119160, 6090119260, 6090118271, 6090118272, 6099084131,
                                                                 6090118120, 6090117540, 6090117630]))
                                                                 
// Import the Basin level 10 of HYdroSEDS
var hydrobasins_10 = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_10");
var basin_10 = hydrobasins_10.filter(ee.Filter.inList('HYBAS_ID', [6100130930, 6101009660, 6101009320, 6101009140, 6100126950, 6100126840, 6100127130,
                                                                   6100127210, 6100128010, 6100127870, 6100124590, 6100124490, 6101008010, 6100126490,
                                                                   6100126340, 6100124940, 6100125020, 6100124900, 6100124890, 6100125030, 6100124950,
                                                                   6100123690, 6100123760, 6100123300, 6100123460, 6100122470, 6100122380, 6100120740,
                                                                   6100120730, 6100119870, 6100119930, 6100119160, 6100119260, 6100118170, 6100118180,
                                                                   6101007030, 6100118271, 6100118272, 6109084131, 6100118120, 6100117540, 6100117630,
                                                                   6100120670, 6100120661, 6100120662, 6101003980]))

Map.setOptions('SATELLITE')

Map.centerObject(basin_7)
Map.addLayer(basin_7, {color: 'yellow'}, 'Bogota River Basin level 7');
Map.addLayer(basin_8, {color: 'blue'}, 'Bogota River Basin level 8');
Map.addLayer(basin_9, {color: 'gray'}, 'Bogota River Basin level 9');
Map.addLayer(basin_10, {color: 'orange'}, 'Bogota River Basin level 10');
