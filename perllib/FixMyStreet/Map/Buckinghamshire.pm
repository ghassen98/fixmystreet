# FixMyStreet:Map::Buckinghamshire
# More JavaScript, for street assets

package FixMyStreet::Map::Buckinghamshire;
use base 'FixMyStreet::Map::WMTSBase';

use strict;

sub zoom_parameters {
    my $self = shift;
    my $params = {
        zoom_levels    => scalar $self->scales,
        default_zoom   => 8,
        min_zoom_level => 0,
        id_offset      => 0,
    };
    return $params;
}

sub tile_parameters {
    my $self = shift;
    my $params = {
        urls            => [ 'https://maps.buckscc.gov.uk/arcgis/rest/services/Basemapping2018/MapServer/WMTS/tile' ],
        layer_names     => [ 'Basemapping2018' ],
        wmts_version    => '1.0.0',
        layer_style     => 'default',
        matrix_set      => 'default028mm',
        suffix          => '.png', # appended to tile URLs
        size            => 256, # pixels
        dpi             => 96,
        inches_per_unit => 39.3701, # BNG uses metres
        projection      => 'EPSG:27700',
        origin_x        => -5220400.0,
        origin_y        => 4470200.0,
    };
    return $params;
}

sub scales {
    my $self = shift;
    my @scales = (
        '1000000',
        '500000',
        '250000',
        '125000',
        '64000',
        '32000',
        '16000',
        '8000',
        '4000',
        '2000',
        '1000',
    );
    return @scales;

}

sub copyright {
    return '&copy; BCC';
}

sub map_template { 'buckinghamshire' }

sub map_javascript { [
    '/vendor/OpenLayers/OpenLayers.bristol.js',
    '/vendor/OpenLayers.Projection.OrdnanceSurvey.js',
    '/js/map-OpenLayers.js',
    '/js/map-wmts-base.js',
    '/js/map-wmts-buckinghamshire.js',
    '/cobrands/fixmystreet/assets.js',
    '/cobrands/fixmystreet-uk-councils/roadworks.js',
    '/cobrands/buckinghamshire/js.js',
    '/cobrands/buckinghamshire/assets.js',
] }

# Reproject a WGS84 lat/lon into BNG easting/northing
sub reproject_from_latlon($$$) {
    my ($self, $lat, $lon) = @_;
    my ($x, $y) = Utils::convert_latlon_to_en($lat, $lon);
    return ($x, $y);
}

# Reproject a BNG easting/northing into WGS84 lat/lon
sub reproject_to_latlon($$$) {
    my ($self, $x, $y) = @_;
    my ($lat, $lon) = Utils::convert_en_to_latlon($x, $y);
    return ($lat, $lon);
}

1;
