import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { PostsModule } from './posts/posts.module';
import {ProfileComponent} from './profile/profile.component';
import {GraphComponent} from './graphs/graph.component';
import {HomeComponent} from './home/home.component';
import {MatVideoModule} from 'mat-video';
import {ReactiveFormsModule} from '@angular/forms';

import {BingMapComponent} from './bing-map/bing-map.component';
import {NewgraphComponent} from './newgraph/newgraph.component';
import {BarchartComponent} from './barchart/barchart.component';

import {WeatherComponent} from './weather/weather.component';
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef,
  DocumentRef, MapServiceFactory,
  BingMapAPILoaderConfig, BingMapAPILoader,
  GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {ApixuService} from './apixu.service';
import {PublishDateFilterPipe} from './newgraph/publishdate-filter';
import {CommentTypeFilterPipe} from './barchart/commnettype-filter';
import {MatListModule} from '@angular/material';
import {JwSocialButtonsModule} from 'jw-angular-social-buttons';


const useBing = true;
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    ProfileComponent,
    GraphComponent,
    HomeComponent,
    BingMapComponent,
    NewgraphComponent,
    BarchartComponent,
    WeatherComponent,
    CommentTypeFilterPipe,
    PublishDateFilterPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule,
    Ng2SearchPipeModule,
    MatVideoModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    useBing ? MapModule.forRootBing() : MapModule.forRootGoogle(),
    MatListModule,
    JwSocialButtonsModule

  ],

  providers: [ [ApixuService],
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: MapAPILoader, deps: [], useFactory: useBing ? BingMapServiceProviderFactory : GoogleMapServiceProviderFactory},
  ],

  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}

export function BingMapServiceProviderFactory() {
  const bc: BingMapAPILoaderConfig = new BingMapAPILoaderConfig();
  bc.apiKey = 'AtbfKo7ohYutD1Ajl494gzUAWB6u9IjfoiV4VoJ0EpmBFo_VqXDxtTlGx5z5uQW-';
  // replace with your bing map key
  // the usage of this key outside this plunker is illegal.
  bc.branch = 'experimental';
  // to use the experimental bing brach. There are some bug fixes for
  // clustering in that branch you will need if you want to use
  // clustering.
  return new BingMapAPILoader(bc, new WindowRef(), new DocumentRef());
}

export function GoogleMapServiceProviderFactory() {
  const gc: GoogleMapAPILoaderConfig = new GoogleMapAPILoaderConfig();
  gc.apiKey = 'AIzaSyAAXZyutzornngMjFPiS7c8F5J0W8hxjX4';
  // replace with your google map key
  // the usage of this key outside this plunker is illegal.
  gc.enableClustering = true;
  return new GoogleMapAPILoader(gc, new WindowRef(), new DocumentRef());
}


