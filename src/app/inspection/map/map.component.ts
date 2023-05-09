import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { Map, NavigationControl, Marker, Popup } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';

import * as layerStyling from './layer-styling'
import { environment } from 'src/environments/environment';

interface FireHydrant {
  id?: number;
  model?: string;
  pressure?: number;
  repair?: boolean;
  year?: number;
}

interface SewerPipe {
  id?: number;
  material?: string;
  year?: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  map: Map | undefined;
  popup: Popup | undefined;
  
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  
  @Input() networkType: number;

  @ViewChild("fhPopupContainer") fhPopupContainer: ElementRef<HTMLDivElement>;
  @ViewChild("sewerPopupContainer") sewerPopupContainer: ElementRef<HTMLDivElement>;
  fhProp: FireHydrant | undefined ;
  spProp: SewerPipe | undefined ;

  constructor() { }
  
  ngOnInit(): void { 

    // Create a popup, but don't add it to the map yet.
    this.popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
    
  }
  
  ngAfterViewInit() {    
    
    mapboxgl.accessToken = environment.mapboxToken;
    const initialState = { lng: -73.961, lat:45.3933, zoom: 16 };


    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom

    });

    this.map.addControl(new NavigationControl());

    this.map.on('load', () => {       
      if (this.networkType == 1) {this.addAqueduct();}
      else if (this.networkType == 2) {this.addSewer();}

    });
    
  }

  addAqueduct() {

    // aqueduct pipes
    this.map.addSource('AqPipeSource', {
      type: 'vector',
      url: 'mapbox://georgigatin.cl94twfjc1sur27p8rm3w3ia2-2xgm4'
    });
    this.map.addLayer({
      'id': 'AqPipeLayer',
      'type': 'line',
      'source': 'AqPipeSource',
      'source-layer': 'aq_pipe_ts',
      'layout': {'visibility': 'visible'},
      'paint': layerStyling.aqPipePaint
    });

    // fire hydrants
    this.map.addSource('firehydrantSource', {
      type: 'vector',
      url: 'mapbox://georgigatin.cl94tvi9d5lj920nld2896efj-0qwx5'
    });

    // fire hydrant labels
    this.map.addLayer({
      'id': 'firehydrantLayer',
      'type': 'circle',
      'source': 'firehydrantSource',
      'source-layer': 'aq_fire_hydrants_ts',
      'layout': {'visibility': 'visible'},
      'paint':  layerStyling.fhGeneralPaint
    });

    this.map.addLayer({
      'id': 'firehydrantLayerLabels',
      'type': 'symbol',
      'source': 'firehydrantSource',
      'source-layer': 'aq_fire_hydrants_ts',
      'layout': layerStyling.aqLabelLayout,
      'paint':  layerStyling.labelPaint
    });

    // popup
    this.map.on('mouseleave', 'firehydrantLayer', () => {

      this.map.getCanvas().style.cursor = '';
      this.popup.remove();
    });

    this.map.on('mouseenter', 'firehydrantLayer', (e) => {
      this.map.getCanvas().style.cursor = 'pointer';      
      
      // get the coordinates of the feature under the mouse cursor
      const geom: any = e.features[0].geometry;
      const coordinates = geom.coordinates.slice();     
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      };

      // read the properties of the first feature under the pointer
      this.fhProp = e.features[0].properties;
         
      // center the popup on the coordinates of the feature
      this.popup.setLngLat(coordinates)

      // inject the div with the properties
      .setDOMContent(this.fhPopupContainer.nativeElement)
      
      // add the popup tp the map
      .addTo(this.map);

    });


  }

  onToggleAqueduct(style = 0) {

    if (style == 0) {
      this.map.setPaintProperty ('AqPipeLayer', 'line-color', layerStyling.aqPipePaint['line-color']);
      this.map.setPaintProperty ('firehydrantLayer', 'circle-color', layerStyling.fhGeneralPaint['circle-color']);
      this.map.setPaintProperty ('firehydrantLayerLabels', 'text-color', layerStyling.labelPaint['text-color']);
    }

    else if (style == 1) {
      this.map.setPaintProperty ('AqPipeLayer', 'line-color', layerStyling.aqPipePaintThematic['line-color']);
      this.map.setPaintProperty ('firehydrantLayer', 'circle-color', layerStyling.fhPressurePaint['circle-color']);
      this.map.setPaintProperty ('firehydrantLayerLabels', 'text-color', layerStyling.labelPaintThematic['text-color']);
    }

    else if (style == 2) {
      this.map.setPaintProperty ('AqPipeLayer', 'line-color', layerStyling.aqPipePaintThematic['line-color']);
      this.map.setPaintProperty ('firehydrantLayer', 'circle-color', layerStyling.fhRepairPaint['circle-color']);     
      this.map.setPaintProperty ('firehydrantLayerLabels', 'text-color', layerStyling.labelPaintThematic['text-color']);
    }


  }


  addSewer() {
    // sewer pipes
    this.map.addSource('swPipeSource', {
      type: 'vector',
      url: 'mapbox://georgigatin.cl94tvxms5hal21nlrujovz2o-55yp8'
    });
    this.map.addLayer({
      'id': 'swPipeLayer',
      'type': 'line',
      'source': 'swPipeSource',
      'source-layer': 'sw_pipe_ts',
      'layout': {'visibility': 'visible'},
      'paint': layerStyling.swPipeGeneralPaint
    });

    // sewer pipe labels
    this.map.addLayer({
      'id': 'swPipeLayerLabels',
      'type': 'symbol',
      'source': 'swPipeSource',
      'source-layer': 'sw_pipe_ts',
      'layout': layerStyling.swLabelLayout,
      'paint':  layerStyling.labelPaint
    });

    // popup
    this.map.on('mouseleave', 'swPipeLayer', () => {
      this.map.getCanvas().style.cursor = '';
      this.popup.remove();
    });

    this.map.on('mouseenter', 'swPipeLayer', (e) => {
      
      // change the cursor when hovering the feature
      this.map.getCanvas().style.cursor = 'pointer';

      // read the properties of the first feature under the pointer
      this.spProp = e.features[0].properties;

      // the popup follows the mouse pointer along the feature
      this.popup.setLngLat(e.lngLat)      
      
      // inject the div with the properties
      .setDOMContent(this.sewerPopupContainer.nativeElement)
      
      // add the popup tp the map
      .addTo(this.map);

    });

  }

  onToggleSewer(style = 0) {

    if (style == 0) {
      this.map.setPaintProperty ('swPipeLayer', 'line-color', layerStyling.swPipeGeneralPaint['line-color']);
      this.map.setLayoutProperty('swPipeLayerLabels', 'visibility', 'visible')
      
    }

    else if (style == 1) {
      this.map.setPaintProperty ('swPipeLayer', 'line-color', layerStyling.swMaterialPaint['line-color']);
      this.map.setLayoutProperty('swPipeLayerLabels', 'visibility', 'none')
    }

  }
  
  ngOnDestroy() {
    this.map?.remove();
  }


}
