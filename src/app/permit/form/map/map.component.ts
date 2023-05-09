import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, NavigationControl, MapboxEvent } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { Feature } from 'geojson'
import { PermitService } from '../../permit.service';
import { environment } from '../../../../environments/environment'
import { PermitGroup } from '../../permit.interfaces';
import { FormProvider } from '../form-provider';

export interface DrawFeature {
  action: string | undefined;
  features: Feature[];
  type: string;
}


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  map: Map | undefined;
  mapboxDraw: MapboxDraw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      point: false,
      line_string: false,
      polygon: true,
      trash: true
    },

    defaultMode: 'draw_polygon'
  });

  errorMsg: string;
  permitForm: PermitGroup;

     
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(
    private permitService: PermitService,
    private formProvider: FormProvider,
  ) {
    this.permitForm = formProvider.getForm() as PermitGroup;
   }
  

  ngOnInit() {}

  ngAfterViewInit() {

    // use the centroid of the map as center for the map
    const existingCentroid = this.permitForm.value.geometry.centroid;
    const mapCenter: [number, number] = existingCentroid ? existingCentroid : [-73.572545, 45.496200]
    
    // get the zoom
    const existingMapZoom = this.permitForm.value.geometry.mapZoom;
    const mapZoom: number = existingMapZoom ? existingMapZoom : 18

     mapboxgl.accessToken = environment.mapboxToken;

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: mapCenter,
      zoom: mapZoom
    });

    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(new NavigationControl());
    this.map.addControl(new mapboxgl.GeolocateControl());
    
    this.map.addControl(this.mapboxDraw, 'top-left');
    this.map.on('draw.create', this.updateArea());
    this.map.on('draw.delete', this.updateArea());
    this.map.on('draw.update', this.updateArea());

    this.map.on('load', (ev: MapboxEvent) => {

      // add the polygon
      const existingGeom = this.permitForm.value.geometry.geom;
      if (existingGeom) {
        this.mapboxDraw.add(existingGeom);
      }; 

    });
  }


  updateArea() {
    return (e: DrawFeature) => {

      if (['draw.create', 'draw.update'].includes(e.type) &&  e.features) {
        
        // send the geometry to the form
        const currentGeom = e.features[0].geometry
        const currentFeatID = String(e.features[0].id)
        this.permitForm.get('geometry.geom').setValue(currentGeom);
        this.permitForm.get('geometry.mapZoom').setValue(this.map.getZoom());


        // remove all other geometries from the draw
        const allDrawContent = this.mapboxDraw.getAll();
        allDrawContent.features.forEach(feat => {
          if (String(feat.id) != currentFeatID) {
            this.mapboxDraw.delete(String(feat.id));
          };          
        });
      }


      if (e.type == 'draw.delete' && e.features) {
        // delete geometry from the form
        this.permitForm.get('geometry.geom').setValue(null);
        
      }
    }
  }



  ngOnDestroy() {
    this.map?.remove();
  }



}
