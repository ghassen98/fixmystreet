(function(){

if (!fixmystreet.maps) {
    return;
}

var defaults = {
    http_options: {
        url: "https://tilma.staging.mysociety.org/mapserver/hounslow",
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
    asset_id_field: 'CentralAssetId',
    attributes: {
        central_asset_id: 'CentralAssetId',
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
            TYPENAME: "bins"
        }
    },
    asset_category: "Litter Bins",
    asset_item: 'bin'
}));

fixmystreet.assets.add($.extend(true, {}, defaults, {
    http_options: {
        params: {
            TYPENAME: "trees"
        }
    },
    asset_category: [
        "Tree Danger/Obstruction",
        "Branches overhanging",
        "Damage By Tree",
        "Dead/Dying/Diseased",
        "Dying or dangerous tree",
        "Empty tree Pit",
        "Fallen or leaning tree",
        "General Maintenance and pruning",
        "Hedge causing obstruction",
        "Illuminated Traffic signal obstructed by vegetation",
        "Pest: Tree/Shrub",
        "Pests in trees and shrubs",
        "Sponsor a tree",
        "Tree Branches Overhanging",
        "Tree Maintenance",
        "Tree causing damage to property",
        "Tree obstructing street light",
        "Trees or shrubs blocking visibility",
        "Trees or shrubs causing obstruction of highway",
        "Trees"
      ],
    asset_item: 'tree'
}));

fixmystreet.assets.add($.extend(true, {}, defaults, {
    http_options: {
        params: {
            TYPENAME: "signs"
        }
    },
    asset_category: [
        "Sign Obstructed: Vegetation",
        "Missing sign",
        "Missing/ damaged traffic sign",
        "Sign or road marking missing following works",
        "Street nameplate damaged",
        "Traffic Sign obstructed (vegetation)",
        "Unlit sign knocked down"
    ],
    asset_item: 'sign'
}));

fixmystreet.assets.add($.extend(true, {}, defaults, {
    http_options: {
        params: {
            TYPENAME: "gulleys"
        }
    },
    asset_category: [
        "Bad smell",
        "Flooding"
    ],
    asset_item: 'gulley'
}));

var pin_prefix = fixmystreet.pin_prefix || document.getElementById('js-map-data').getAttribute('data-pin_prefix');

var streetlight_default = {
    fillColor: "#FFFF00",
    fillOpacity: 0.6,
    strokeColor: "#000000",
    strokeOpacity: 0.8,
    strokeWidth: 2,
    pointRadius: 6
};

var streetlight_select = {
    externalGraphic: pin_prefix + "pin-spot.png",
    fillColor: "#55BB00",
    graphicWidth: 48,
    graphicHeight: 64,
    graphicXOffset: -24,
    graphicYOffset: -56,
    backgroundGraphic: pin_prefix + "pin-shadow.png",
    backgroundWidth: 60,
    backgroundHeight: 30,
    backgroundXOffset: -7,
    backgroundYOffset: -22,
    popupYOffset: -40,
    graphicOpacity: 1.0,

    label: "${FeatureId}",
    labelOutlineColor: "white",
    labelOutlineWidth: 3,
    labelYOffset: 65,
    fontSize: '15px',
    fontWeight: 'bold'
};

// The label for street light markers should be everything after the final
// '/' in the feature's FeatureId attribute.
// This seems to be the easiest way to perform custom processing
// on style attributes in OpenLayers...
var select_style = new OpenLayers.Style(streetlight_select);
select_style.createLiterals = function() {
    var literals = Object.getPrototypeOf(this).createLiterals.apply(this, arguments);
    if (literals.label && literals.label.split) {
        literals.label = literals.label.split("/").slice(-1)[0];
    }
    return literals;
};

var streetlight_stylemap = new OpenLayers.StyleMap({
  'default': new OpenLayers.Style(streetlight_default),
  'select': select_style
});

var labeled_defaults = $.extend(true, {}, defaults, {
    select_action: true,
    stylemap: streetlight_stylemap,
    feature_code: 'FeatureId',
    actions: {
        asset_found: function(asset) {
          var id = asset.attributes[this.fixmystreet.feature_code] || '';
          if (id !== '' && id.split) {
              var code = id.split("/").slice(-1)[0];
              $('.category_meta_message').html('You have selected column <b>' + code + '</b>');
          } else {
              $('.category_meta_message').html('You can pick a <b class="asset-spot">' + this.fixmystreet.asset_item + '</b> from the map &raquo;');
          }
        },
        asset_not_found: function() {
           $('.category_meta_message').html('You can pick a <b class="asset-spot">' + this.fixmystreet.asset_item + '</b> from the map &raquo;');
        }
    }
});

fixmystreet.assets.add($.extend(true, {}, labeled_defaults, {
    http_options: {
        params: {
            TYPENAME: "lighting"
        }
    },
    asset_category: [
        "Bollard Out Of Light",
        "Damage to paintwork",
        "Damage to paintwork/ column",
        "Door Missing/ open",
        "Lights too bright/ dull",
        "New LED lights not working",
        "New LED lights too bright",
        "New LED lights too dull",
        "Not coming on/ faulty",
        "Street light leaning",
        "Street light not working",
        "Street light on during the day",
        "Street light wiring exposed",
        "Street lights on during the day",
        "Subway light faulty",
        "Unauthorised sign",
        "Veg Obstructed: Street Light",
        "Zebra crossing beacon fault",
        "Zebra crossing/ belisha faulty",
        "Illuminated Traffic signal obstructed by vegetation",
        "Tree obstructing street light"
    ],
    asset_item: 'light',
}));

})();
