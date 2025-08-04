// Hydrological analysis using HydroATLAS, HydroSHEDS, HydroBASINS, HydroLAKES and HydroRIVERS data.

// Created by Carlos Mendez

// Global River Classification (GloRiC)

////////////////////////////////////////////////////////////////////////////// Set and configure Basemas  ///////////////////////////////////////////////////////////////////////////////////////

var snazzy = require("users/aazuspan/snazzy:styles");
var Cobalt = "https://snazzymaps.com/style/30/cobalt"

var iconChange = 
[
  {
    // Change map saturation.
        stylers: [{ gamma: 0.1,
                    //lightness: -80,        
                    invert_lightness: true,
                    //saturation: 0,
                 }]
  },
    // Change label properties.
  {elementType: 'labels', stylers: [{visibility: 'on', color: '#000055'}]},
  // Change road properties.
  {featureType: 'road', elementType: 'geometry', stylers: [{visibility: 'on', color: '#000055'}]},
  // Change road labels.
  {featureType: 'road', elementType: 'labels', stylers: [{visibility: 'on', color: '#000055'}]},
  // Change icon properties.
  {elementType: 'labels.icon', stylers: [{visibility: 'off', color: '#000055'}]},
  // Change POI options.
  {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off', color: '#000055'}]},
  
  {featureType: 'administrative', elementType: 'geometry.fill', stylers: [{visibility: 'off', color: '#000055'}]},
  
  {featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{visibility: 'off', color: '#000055'}]}
];


var baseChange = [
  {
          stylers: [{ //gamma: 0.15,
                    invert_lightness: true,
                    //lightness: -90,
                    //saturation: 0
                 }]
  },
  // Change label properties.
  {elementType: 'labels', stylers: [{visibility: 'on', color: '#000055'}]},
  // Change road properties.
  {featureType: 'road', elementType: 'geometry', stylers: [{visibility: 'on', color: '#000055'}]},
  // Change road labels.
  {featureType: 'road', elementType: 'labels', stylers: [{visibility: 'off', color: '#000055'}]},
  // Change icon properties.
  {elementType: 'labels.icon', stylers: [{visibility: 'off', color: '#000055'}]},
  // Change POI options.
  {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off', color: '#000055'}]},
  
  {featureType: 'administrative', elementType: 'geometry.fill', stylers: [{visibility: 'on', color: '#000055'}]},
  
  {featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{visibility: 'on', color: '#000055'}]},
  
  {featureType: 'landscape.natural.landcover', elementType: 'geometry.fill', stylers: [{visibility: 'on', color: '#00008B'}]},
  
  {featureType: 'landscape.natural', elementType: 'geometry', stylers: [{visibility: 'on', color: '#00008B'}]},
  
  {featureType: 'landscape.natural', elementType: 'geometry.fill', stylers: [{visibility: 'on', color: '#00008B'}]},
  
  {featureType: 'landscape.natural.terrain', elementType: 'geometry.fill', stylers: [{visibility: 'on', color: '#00008B'}]},
  
  {featureType: 'water', elementType: 'labels.text.fill', stylers: [{visibility: 'on', color: '#00008B'}]}
  
];

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

// Drainage Direction, 03 Arc-Seconds
var dra_dir_03 = ee.Image('WWF/HydroSHEDS/03DIR').clip(Col_boun);
var drainageDirection_03 = dra_dir_03.select('b1');
var drainageDirection_03_img  = ee.Image().byte().paint({featureCollection: dra_dir_03 , color: 'b1'});

var drainageDirectionVis = {min: 1.0, max: 128.0, gamma: 2.0};


// Url with GloRiC database
// https://code.earthengine.google.com/?asset=projects/ee-carlosmendez1997/assets/GloRiC_v10_shapefile
var gloric = ee.FeatureCollection("projects/ee-carlosmendez1997/assets/GloRiC_v10_shapefile");


// CMI_indx: Climate moisture index ------> (precipitation/potential evapotranspiration)-1
var CMI_indx = gloric.select('CMI_indx')
var CMI_indx_img = ee.Image().byte().paint({featureCollection: gloric , color: 'CMI_indx', width:0.5}).clip(Col_boun);

// Class_phys: Classes of physio-climatic sub-classification: (SEE ANEX)
var Class_phys = gloric.select('Class_phys')
var Class_phys_img = ee.Image().byte().paint({featureCollection: gloric , color: 'Class_phys', width:0.5}).clip(Col_boun);

// Temp_min: Long-term average of the minimum air temperature of the coldest month [degrees Celsius]
var Temp_min = gloric.select('Temp_min')
var Temp_min_img = ee.Image().byte().paint({featureCollection: gloric , color: 'Temp_min', width:0.5}).clip(Col_boun);





// Class_geom: Classes of geomorphic sub-classification (SEE ANEX)
var Class_geom = gloric.select('Class_geom')
var Class_geom_img = ee.Image().byte().paint({featureCollection: gloric , color: 'Class_geom', width:0.5}).clip(Col_boun);

// Class_hydr: Classes of hydrologic sub-classification (SEE ANEX)
var Class_hydr = gloric.select('Class_hydr')
var Class_hydr_img = ee.Image().byte().paint({featureCollection: gloric , color: 'Class_hydr', width:0.5}).clip(Col_boun);

// Kmeans_30: Classes of k-means statistical clustering (30 classes; no associated names)
var Kmeans_30 = gloric.select('Kmeans_30')
var Kmeans_30_img = ee.Image().byte().paint({featureCollection: gloric , color: 'Kmeans_30', width:0.5}).clip(Col_boun);

// Stream_pow: Total stream power [kW/m2]
var Stream_pow = gloric.select('Stream_pow')
var Stream_pow_img = ee.Image().byte().paint({featureCollection: gloric , color: 'Stream_pow', width:0.5}).clip(Col_boun);





// Length_km: Length of individual river reach [km]
var Length_km = gloric.select('Length_km')
var Length_km_img = ee.Image().byte().paint({featureCollection: gloric , color: 'Length_km', width:0.5}).clip(Col_boun);

// Log_Q_avg: Log-10 of long-term average discharge [m3/sec]
var Log_Q_avg = gloric.select('Log_Q_avg')
var Log_Q_avg_img = ee.Image().byte().paint({featureCollection: gloric , color: 'Log_Q_avg', width:0.5}).clip(Col_boun);

// Log_Q_var: Log-10 of flow regime variability [-]
var Log_Q_var = gloric.select('Log_Q_var')
var Log_Q_var_img = ee.Image().byte().paint({featureCollection: gloric , color: 'Log_Q_var', width:0.5}).clip(Col_boun);

// Log_elev: Log-10 of average elevation of the reach [meters above sea level]
var Log_elev = gloric.select('Log_elev')
var Log_elev_img = ee.Image().byte().paint({featureCollection: gloric , color: 'Log_elev', width:0.5}).clip(Col_boun);

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
map1.add(ui.Label('Climate and Moisture',{position: 'bottom-center'}));
map1.addLayer(CMI_indx_img, Water8,'CMI indx', true);
map1.addLayer(Class_phys_img, Water2, 'Class phys', false)
map1.addLayer(Temp_min_img, Water3, 'Temp min', false)
map1.addLayer(hillshade(hand30_100.mosaic().visualize(vis)), {}, 'DEM Base Hillshade', true, 0.3)
map1.centerObject(Col_boun,5)
map1.setOptions('baseChange', {'baseChange': baseChange});

var map2 = ui.Map();
map2.add(ui.Label('Hydrologic and Power',{position: 'bottom-center'}));
map2.addLayer(Class_geom_img, Water4, 'Class geom', false)
map2.addLayer(Class_hydr_img, Water5, 'Class hydr', false)
map2.addLayer(Kmeans_30_img, Water6, 'Kmeans 30', false)
map2.addLayer(Stream_pow_img, Water3, 'Stream pow', true)
map2.addLayer(hillshade(hand30_100.mosaic().visualize(vis)), {}, 'DEM Base Hillshade', true, 0.3)
map2.centerObject(Col_boun,5)
map2.setOptions('iconChange', {'iconChange': iconChange});

var map3 = ui.Map();
map3.add(ui.Label('Discharge and Reach',{position: 'bottom-center'}));
snazzy.addStyle(Cobalt,"Cobalt", map3);
map3.addLayer(Length_km_img, Water3, 'Length km', false)
map3.addLayer(Log_Q_avg_img, Water5, 'Log Q avg', true)
map3.addLayer(Log_Q_var_img, Water2, 'Log Q var', false)
map3.addLayer(Log_elev_img, Water1, 'Log elev', false)
map3.addLayer(hillshade(hand30_100.mosaic().visualize(vis)), {}, 'DEM Base Hillshade', true, 0.3)
map3.centerObject(Col_boun,5)

var mapPanel = ui.Panel(
    [
      ui.Panel([map1], null, {stretch: 'both'}),
      ui.Panel([map2], null, {stretch: 'both'}),
      ui.Panel([map3], null, {stretch: 'both'}),
    ],
    
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
    
var title = ui.Label('Global River Classification (GloRiC) Colombia', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '20px'
});


// Add images and title to the ui.root.
ui.root.widgets().reset([title, mapPanel]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));


/*

Class_phys: Classes of physio-climatic sub-classification:

Class number	Minimum	temperature (1st digit)	        CMI (2nd digit)	          	  Elevation (3rd digit)
111	          low temperature		          	          low CMI	          	          low elevation
112	          low temperature		          	          low CMI	          	          high elevation
121	          low temperature		          	          medium CMI	          	      low elevation
122	          low temperature		          	          medium CMI	          	      high elevation
131	          low temperature		          	          high CMI	          	        low elevation
132	          low temperature		          	          high CMI	          	        high elevation
211	          medium temperature		      	          low CMI	          	          low elevation
212	          medium temperature	        	          low CMI	          	          high elevation
221	          medium temperature	        	          medium CMI	          	      low elevation
222	          medium temperature	        	          medium CMI	          	      high elevation
231	          medium temperature	        	          high CMI	          	        low elevation
232	          medium temperature	        	          high CMI	          	        high elevation
311	          high temperature	          	          low CMI	          	          low elevation
312	          high temperature	          	          low CMI	          	          high elevation
321	          high temperature	          	          medium CMI	          	      low elevation
322	          high temperature	          	          medium CMI	          	      high elevation
331	          high temperature	          	          high CMI	          	        low elevation
332	          high temperature	          	          high CMI	          	        high elevation
411	          very high temperature	      	          low CMI	          	          low elevation
412	          very high temperature	      	          low CMI	          	          high elevation
421	          very high temperature	      	          medium CMI	          	      low elevation
422	          very high temperature	      	          medium CMI	          	      high elevation
431	          very high temperature	      	          high CMI	          	        low elevation
432	          very high temperature	      	          high CMI	          	        high elevation


Class_geom: Classes of geomorphic sub-classification

Class number	Reduced physio-climatic class (1st digit)       Reduced hydrologic class (2nd digit)	                                    Reduced geomorphic class (3rd digit)
111	          cold, low and medium moisture region	          very small river	                                                        low stream power
112	          cold, low and medium moisture region	          very small river	                                                        medium and high stream power
113	          cold, low and medium moisture region	          very small river	                                                        lake-wetland influenced
121	          cold, low and medium moisture region	          small river	                                                              low stream power
122	          cold, low and medium moisture region	          small river	                                                              medium and high stream power
123	          cold, low and medium moisture region          	small river	                                                              lake-wetland influenced
131	          cold, low and medium moisture region	          medium river	                                                            low stream power
132	          cold, low and medium moisture region          	medium river	                                                            medium and high stream power
133	          cold, low and medium moisture region	          medium river	                                                            lake-wetland influenced
141	          cold, low and medium moisture region	          large river	                                                              low stream power
142	          cold, low and medium moisture region	          large river	                                                              medium and high stream power
143	          cold, low and medium moisture region	          large river	                                                              lake-wetland influenced
150	          cold, low and medium moisture region	          very large river                                                         	-
211	          cold, high moisture region	                    very small river	                                                        low stream power
212	          cold, high moisture region	                    very small river	                                                        medium and high stream power
213	          cold, high moisture region	                    very small river	                                                        lake-wetland influenced
221	          cold, high moisture region	                    small river	                                                              low stream power
222	          cold, high moisture region	                    small river	                                                              medium and high stream power
223	          cold, high moisture region	                    small river	                                                              lake-wetland influenced
231	          cold, high moisture region	                    medium river	                                                            low stream power
232	          cold, high moisture region	                    medium river	                                                            medium and high stream power
233	          cold, high moisture region	                    medium river	                                                            lake-wetland influenced
241	          cold, high moisture region	                    large river	                                                              low stream power
242	          cold, high moisture region	                    large river	                                                              medium and high stream power
243	          cold, high moisture region	                    large river	                                                              lake-wetland influenced
250	          cold, high moisture region	                    very large river	                                                        -
311	          warm and hot, low moisture region	              very small river	                                                        low stream power
312	          warm and hot, low moisture region	              very small river	                                                        medium and high stream power
313	          warm and hot, low moisture region	              very small river	                                                        lake-wetland influenced
321	          warm and hot, low moisture region	              small river	                                                              low stream power
322	          warm and hot, low moisture region	              small river	                                                              medium and high stream power
323          	warm and hot, low moisture region	              small river	                                                              lake-wetland influenced
331	          warm and hot, low moisture region	              medium river	                                                            low stream power
332          	warm and hot, low moisture region	              medium river	                                                            medium and high stream power
333          	warm and hot, low moisture region	              medium river	                                                            lake-wetland influenced
341          	warm and hot, low moisture region	              large river	                                                              low stream power
342          	warm and hot, low moisture region	              large river	                                                              medium and high stream power
343          	warm and hot, low moisture region	              large river	                                                              lake-wetland influenced
350          	warm and hot, low moisture region	              very large river	                                                        -
411          	warm, medium moisture region	                  very small river	                                                        low stream power
412          	warm, medium moisture region	                  very small river	                                                        medium and high stream power
413          	warm, medium moisture region	                  very small river	                                                        lake-wetland influenced
421	          warm, medium moisture region	                  small river	                                                              low stream power
422          	warm, medium moisture region	                  small river	                                                              medium and high stream power
423	          warm, medium moisture region	                  small river	                                                              lake-wetland influenced
431          	warm, medium moisture region	                  medium river	                                                            low stream power
432          	warm, medium moisture region	                  medium river	                                                            medium and high stream power
433          	warm, medium moisture region	                  medium river	                                                            lake-wetland influenced
441          	warm, medium moisture region	                  large river	                                                              low stream power
442	          warm, medium moisture region	                  large river	                                                              medium and high stream power
443	          warm, medium moisture region	                  large river	                                                              lake-wetland influenced
450          	warm, medium moisture region	                  very large river	                                                        -
511          	warm, high moisture region	                    very small river	                                                        low stream power
512          	warm, high moisture region	                    very small river	                                                        medium and high stream power
513          	warm, high moisture region	                    very small river	                                                        lake-wetland influenced
521          	warm, high moisture region	                    small river	                                                              low stream power
522          	warm, high moisture region	                    small river	                                                              medium and high stream power
523          	warm, high moisture region	                    small river	                                                              lake-wetland influenced
531          	warm, high moisture region	                    medium river	                                                            low stream power
532          	warm, high moisture region	                    medium river	                                                            medium and high stream power
533          	warm, high moisture region	                    medium river	                                                            lake-wetland influenced
541          	warm, high moisture region	                    large river	                                                              low stream power
542	          warm, high moisture region	                    large river	                                                              medium and high stream power
543	          warm, high moisture region	                    large river	                                                              lake-wetland influenced
550	          warm, high moisture region	                    very large river	                                                        -
611          	hot, high moisture region	                      very small river	                                                        low stream power
612	          hot, high moisture region	                      very small river	                                                        medium and high stream power
613	          hot, high moisture region	                      very small river	                                                        lake-wetland influenced
621          	hot, high moisture region	                      small river	                                                              low stream power
622          	hot, high moisture region	                      small river	                                                              medium and high stream power
623          	hot, high moisture region	                      small river	                                                              lake-wetland influenced
631          	hot, high moisture region	                      medium river	                                                            low stream power
632	          hot, high moisture region	                      medium river	                                                            medium and high stream power
633          	hot, high moisture region	                      medium river	                                                            lake-wetland influenced
641          	hot, high moisture region	                      large river	                                                              low stream power
642          	hot, high moisture region	                      large river	                                                              medium and high stream power
643          	hot, high moisture region	                      large river	                                                              lake-wetland influenced
650	          hot, high moisture region	                      very large river	                                                        -
711          	very hot, low moisture region	                  very small river	                                                        low stream power
712          	very hot, low moisture region	                  very small river	                                                        medium and high stream power
713	          very hot, low moisture region	                  very small river	                                                        lake-wetland influenced
721          	very hot, low moisture region	                  small river	                                                              low stream power
722	          very hot, low moisture region	                  small river	                                                              medium and high stream power
723          	very hot, low moisture region	                  small river	                                                              lake-wetland influenced
731          	very hot, low moisture region	                  medium river	                                                            low stream power
732          	very hot, low moisture region	                  medium river	                                                            medium and high stream power
733          	very hot, low moisture region	                  medium river	                                                            lake-wetland influenced
741	          very hot, low moisture region	                  large river	                                                              low stream power
742          	very hot, low moisture region	                  large river	                                                              medium and high stream power
743          	very hot, low moisture region	                  large river	                                                              lake-wetland influenced
750          	very hot, low moisture region	                  very large river	                                                        -
811          	very hot, high moisture region	                very small river	                                                        low stream power
812          	very hot, high moisture region	                very small river	                                                        medium and high stream power
813          	very hot, high moisture region	                very small river	                                                        lake-wetland influenced
821          	very hot, high moisture region	                small river	                                                              low stream power
822          	very hot, high moisture region	                small river	                                                              medium and high stream power
823          	very hot, high moisture region	                small river	                                                              lake-wetland influenced
831          	very hot, high moisture region	                medium river	                                                            low stream power
832          	very hot, high moisture region	                medium river	                                                            medium and high stream power
833	          very hot, high moisture region	                medium river	                                                            lake-wetland influenced
841          	very hot, high moisture region	                large river	                                                              low stream power
842          	very hot, high moisture region	                large river	                                                              medium and high stream power
843          	very hot, high moisture region	                large river	                                                              lake-wetland influenced
850          	very hot, high moisture region	                very large river	                                                        -
911	          cold and warm, high elevation region	          very small river	                                                        low stream power
912          	cold and warm, high elevation region	          very small river	                                                        medium and high stream power
913          	cold and warm, high elevation region	          very small river	                                                        lake-wetland influenced
921	          cold and warm, high elevation region	          small river	                                                              low stream power
922          	cold and warm, high elevation region	          small river	                                                              medium and high stream power
923          	cold and warm, high elevation region	          small river	                                                              lake-wetland influenced
931	          cold and warm, high elevation region	          medium river	                                                            low stream power
932	          cold and warm, high elevation region	          medium river	                                                            medium and high stream power
933          	cold and warm, high elevation region	          medium river	                                                            lake-wetland influenced
941	          cold and warm, high elevation region	          large river	                                                              low stream power
942	          cold and warm, high elevation region	          large river	                                                              medium and high stream power
1011	        hot and very hot, high elevation region	        very small river	                                                        low stream power
1012	        hot and very hot, high elevation region	        very small river	                                                        medium and high stream power
1013	        hot and very hot, high elevation region	        very small river	                                                        lake-wetland influenced
1021	        hot and very hot, high elevation region	        small river	                                                              low stream power
1022	        hot and very hot, high elevation region	        small river	                                                              medium and high stream power
1023	        hot and very hot, high elevation region	        small river	                                                              lake-wetland influenced
1031	        hot and very hot, high elevation region	        medium river	                                                            low stream power
1032        	hot and very hot, high elevation region	        medium river	                                                            medium and high stream power
1033	        hot and very hot, high elevation region	        medium river	                                                            lake-wetland influenced
1041	        hot and very hot, high elevation region	        large river	                                                              low stream power
1042        	hot and very hot, high elevation region	        large river	                                                              medium and high stream power
1043        	hot and very hot, high elevation region	        large river	                                                              lake-wetland influenced


Class_hydr: Classes of hydrologic sub-classification 

Class number	Flow regime variability (1st digit)            Discharge average (2nd digit)
11            low variability                                very low discharge
12            low variability                                low discharge
13            low variability                                medium discharge
14            low variability                                high discharge
15            low variability                                very high discharge
21            medium variability                             very low discharge
22            medium variability                             low discharge
23            medium variability                             medium discharge
24            medium variability                             high discharge
25            medium variability                             very high discharge
31            high variability                               very low discharge
32            high variability                               low discharge
33            high variability                               medium discharge
34            high variability                               high discharge
35            high variability                               very high discharge

*/
