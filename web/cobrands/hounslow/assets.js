(function(){

if (!fixmystreet.maps) {
    return;
}

var defaults = {
    http_options: {
        url: "https://davea.tilma.dev.mysociety.org/mapserver/hounslow",
        params: {
            SERVICE: "WFS",
            VERSION: "1.1.0",
            REQUEST: "GetFeature",
            SRSNAME: "urn:ogc:def:crs:EPSG::3857"
        }
    },
    format_class: OpenLayers.Format.GML.v3.MultiCurveFix,
    asset_type: 'spot',
    max_resolution: 2.388657133579254,
    min_resolution: 0.5971642833948135,
    asset_id_field: 'CentralAss',
    attributes: {
        central_asset_id: 'CentralAss',
        asset_details: 'FeatureId'
    },
    geometryName: 'msGeometry',
    srsName: "EPSG:3857",
    strategy_class: OpenLayers.Strategy.FixMyStreet,
    body: "Hounslow Borough Council"
};

fixmystreet.assets.add($.extend(true, {}, defaults, {
    http_options: {
        params: {
            TYPENAME: "Bins"
        }
    },
    asset_category: "Litter Bins",
    asset_item: 'bin'
}));

fixmystreet.assets.add($.extend(true, {}, defaults, {
    http_options: {
        params: {
            TYPENAME: "Barriers"
        }
    },
    asset_category: "Damage to pedestrian barrier",
    asset_item: 'barrier'
}));

fixmystreet.assets.add($.extend(true, {}, defaults, {
    http_options: {
        params: {
            TYPENAME: "Signs"
        }
    },
    asset_category: [
        "Sign Obstructed: Vegetation",
        "Missing sign",
        "Street nameplate damaged",
        "Unlit sign knocked down",
        "Sign or road marking missing following works"
    ],
    asset_item: 'sign'
}));

fixmystreet.assets.add($.extend(true, {}, defaults, {
    http_options: {
        params: {
            TYPENAME: "Lighting"
        }
    },
    asset_category: [
        "Street light not working",
        "Damage to paintwork",
        "Unauthorised sign",
        "Street light leaning",
        "Street light on during the day",
        "Street light wiring exposed",
        "Street lights on during the day",
        "New LED lights not working",
        "New LED lights too bright",
        "New LED lights too dull",
        "Bollard Out Of Light",
        "Veg Obstructed: Street Light",
        "Zebra crossing beacon fault"
    ],
    asset_item: 'light',
}));

})();
