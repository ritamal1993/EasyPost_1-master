import {Component, NgModule, VERSION, OnInit, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import {BrowserModule} from '@angular/platform-browser';
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory,
  BingMapAPILoaderConfig, BingMapAPILoader,
  GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';

@Component({
  selector: 'app-map',
  templateUrl: './bing-map.component.html',
  styleUrls: [ './bing-map.component.css' ]
})
export class BingMapComponent implements OnInit {
  _markerTypeId = MarkerTypeId;
  @Input() currentUserLat: number;
  @Input() currentUserLng: number;
  _options: IMapOptions = {
    disableBirdseye: false,
    disableStreetside: false,
    navigationBarMode: 1,
    zoom: 100000
  };

  _box: IBox = {
    maxLatitude: 60,
    maxLongitude: -92,
    minLatitude: 29,
    minLongitude: -98
  };

  private _iconInfo: IMarkerIconInfo = {
    markerType: MarkerTypeId.FontMarker,
    fontName: 'FontAwesome',
    fontSize: 48,
    color: 'red',
    markerOffsetRatio: {x: 0.5, y: 1},
    text: '\uF276'
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService) {}

  _click() {
    console.log('hello world...');
  }

  ngOnInit() {
    console.log(this.currentUserLat);
  }

}
