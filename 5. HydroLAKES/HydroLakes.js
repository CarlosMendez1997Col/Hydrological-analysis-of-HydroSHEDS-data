// Hydrological analysis using HydroATLAS, HydroSHEDS, HydroBASINS, HydroLAKES and HydroRIVERS data.

// Created by Carlos Mendez

// HydroLAKES

// Set and configure Basemaps


var iconChange = [
  {
    // Change map saturation.
        stylers: [{ gamma: 0.1,
                    //lightness: -80,        
                    invert_lightness: true,
                    //saturation: 0,
                 }]
  },
  {
    // Change label properties.
    elementType: 'labels',
    stylers: [{visibility: 'on', color: '#000055'}]
  },
  {
    // Change road properties.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{visibility: 'on', color: '#000055'}]
  },
  {
    // Change road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [{visibility: 'on', color: '#000055'}]
  },
  {
    // Change icon properties.
    elementType: 'labels.icon',
    stylers: [{visibility: 'off', color: '#000055'}]
  },
  {
    // Change POI options.
    featureType: 'poi',
    elementType: 'all',
    stylers: [{visibility: 'off', color: '#000055'}]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [{visibility: 'off', color: '#000055'}]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{visibility: 'off', color: '#000055'}]
  }
];


var baseChange = [
  {
          stylers: [{ //gamma: 0.15,
                    invert_lightness: true,
                    //lightness: -90,
                    //saturation: 0
                 }]
  },
  {
    // Change label properties.
    elementType: 'labels',
    stylers: [{visibility: 'on', color: '#000055'}]
  },
  {
    // Change road properties.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{visibility: 'on', color: '#000055'}]
  },
  {
    // Change road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [{visibility: 'off', color: '#000055'}]
  },
  {
    // Change icon properties.
    elementType: 'labels.icon',
    stylers: [{visibility: 'off', color: '#000055'}]
  },
  {
    // Change POI options.
    featureType: 'poi',
    elementType: 'all',
    stylers: [{visibility: 'off', color: '#000055'}]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [{visibility: 'on', color: '#000055'}]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{visibility: 'on', color: '#000055'}]
  },
  
  
  
  {
    featureType: 'landscape.natural.landcover',
    elementType: 'geometry.fill',
    stylers: [{visibility: 'on', color: '#00008B'}]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{visibility: 'on', color: '#00008B'}]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [{visibility: 'on', color: '#00008B'}]
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'geometry.fill',
    stylers: [{visibility: 'on', color: '#00008B'}]
  },
   {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{visibility: 'on', color: '#00008B'}]
  }
  
];

                 
// Import externat palette and symbology                 
var palettes = require('users/gena/packages:palettes');
                 

// Import the Colombia Boundary
var Col_boun = ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level1')
                  .filter('ADM0_NAME == "Colombia"');

// Import HydroLAKES produced by https://github.com/samapriya
// https://github.com/samapriya/awesome-gee-community-datasets.git

var lakes = ee.FeatureCollection("projects/sat-io/open-datasets/HydroLakes/lake_poly_v10")
            .filterBounds(Col_boun.geometry());

var elevation = lakes.select('Elevation');
var elevation_img = ee.Image().byte().paint({featureCollection: elevation , color: 'Elevation'}).clip(Col_boun);

/*
var min_elev = elevation.aggregate_min('Elevation')  
var max_elev = elevation.aggregate_max('Elevation');

print(min_elev, max_elev)

*/

var Lake_area = lakes.select('Lake_area')
var Lake_area_img = ee.Image().byte().paint({featureCollection: Lake_area , color: 'Lake_area'}).clip(Col_boun);


/*
var min_lake_area = Lake_area.aggregate_min('Lake_area')  
var max_lake_area = Lake_area.aggregate_max('Lake_area');

print(min_lake_area, max_lake_area)
*/

var Vol_total = lakes.select('Vol_total')
var Vol_total_img = ee.Image().byte().paint({featureCollection: Lake_area , color: 'Vol_total'}).clip(Col_boun);

/*
var min_vol_total = Vol_total.aggregate_min('Vol_total')  
var max_vol_total = Vol_total.aggregate_max('Vol_total');

print(min_vol_total, max_vol_total)
*/

var Wshd_area = lakes.select('Wshd_area')
var Wshd_area_img = ee.Image().byte().paint({featureCollection: Lake_area , color: 'Wshd_area'}).clip(Col_boun);

/*
var min_wshd_area = Wshd_area.aggregate_min('Wshd_area')  
var max_wshd_area = Wshd_area.aggregate_max('Wshd_area');

print(min_wshd_area, max_wshd_area)
*/

var map1 = ui.Map();
map1.add(ui.Label('LAKES elevation and area',{position: 'bottom-center'}));
map1.addLayer(elevation_img, {min: 0, max: 4482, palette: palettes.colorbrewer.Blues[9]}, 'Lakes elevation');
map1.addLayer(Lake_area_img, {min: 0.1, max : 286.55, palette: palettes.colorbrewer.PuBu[9]}, 'Lake area');
map1.centerObject(Col_boun,5)
map1.setOptions('baseChange', {'baseChange': baseChange,'iconChange': iconChange});

var map2 = ui.Map();
map2.add(ui.Label('LAKES volume and area',{position: 'bottom-center'}));
map2.addLayer(Vol_total_img, {min: 0.06, max: 1970, palette: palettes.colorbrewer.YlGn[9]}, 'Vol total');
map2.addLayer(Wshd_area_img, {min: 0.2, max : 259819.7, palette: palettes.cmocean.Speed[7]}, 'Wshd area');
map2.centerObject(Col_boun,5)
map2.setOptions('iconChange', {'baseChange': baseChange,'iconChange': iconChange});


var mapPanel = ui.Panel(
    [
      ui.Panel([map1], null, {stretch: 'both'}),
      ui.Panel([map2], null, {stretch: 'both'}),
    ],
    
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
    
var title = ui.Label('HydroLAKES Colombia', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '20px'
});


// Add images and title to the ui.root.
ui.root.widgets().reset([title, mapPanel]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));

