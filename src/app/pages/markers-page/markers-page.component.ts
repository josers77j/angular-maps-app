import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike, MapMouseEvent } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import {v4 as UUIDv4} from 'uuid'
import { JsonPipe } from '@angular/common';
import { filter } from 'rxjs';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id:string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {

  markers = signal<Marker[]>([]);
  zoom = signal(14);
  map = signal<mapboxgl.Map | null>(null);
  divElement = viewChild<ElementRef>('map');


  async ngAfterViewInit() {

    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80))

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-122.40985, 37.793085], // starting position [lng, lat]
      zoom: 14 // starting zoom
    });

    /*     const marker = new mapboxgl.Marker({})
        .setLngLat([-122.40985, 37.793085])
        .addTo(map) */

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => this.mapClick(event));

    this.map.set(map);


  }

  mapClick(event: mapboxgl.MapMouseEvent) {

    if (!this.map()) return;

    const map = this.map()!;
    const { lng, lat } = event.lngLat;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );


    console.log(event.lngLat)

    const marker = new mapboxgl.Marker({ color: color })
      .setLngLat([lng, lat])
      .addTo(map);

    const newMarker: Marker = {
      id: UUIDv4(),
      mapboxMarker: marker
    };
    //this.markers.update((markers) => [newMarker, ...markers]);
      this.markers.set([newMarker, ...this.markers()]);

      console.log(this.markers())
  }

  flyToMarker( lngLat:LngLatLike){
    if(!this.map()) return;
    this.map()?.flyTo({
      center: lngLat,
    })
  }

  deleteMarker(marker: Marker){
    if(!this.map()) return;

    const map = this.map()!;

    marker.mapboxMarker.remove();

    this.markers.set(this.markers().filter(m => m.id !== marker.id));
  }
}
