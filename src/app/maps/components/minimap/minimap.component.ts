import { AfterViewInit, Component, computed, ElementRef, input, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-minimap',
  imports: [],
  templateUrl: './minimap.component.html',
})
export class MinimapComponent implements AfterViewInit {

  zoom = signal(14);
  map = signal<mapboxgl.Map | null>(null);
  divElement = viewChild<ElementRef>('map');

  houseCoordinates = input.required<{lng:number, lat:number}>({});


  async ngAfterViewInit() {
    console.log('coordenadas', this.houseCoordinates());
    if (!this.divElement()?.nativeElement) return;


    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.houseCoordinates(), // starting position [lng, lat]
      zoom: this.zoom() // starting zoom
    });

         const marker = new mapboxgl.Marker({})
        .setLngLat(this.houseCoordinates())
        .addTo(map)

  }



}
