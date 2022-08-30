import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ApixuService} from '../apixu.service';
const axios = require('axios');


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public weatherData: any;
  public location: any;
  public locationCountry: any;
  public temp: any;

  constructor(
    private formBuilder: FormBuilder,
    private apixuService: ApixuService
  ) {}

  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });


  }

  sendToAPIXU(formValues) {
    const params = {
      access_key: '89f43f0df9777ba6e873f9687b801740',
      query: formValues
    };
    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const apiResponse = response.data;
        console.log(response.data);
        this.temp = apiResponse.current.temperature;
        this.location = apiResponse.location.name;
        this.locationCountry = apiResponse.location.country;
        console.log(this.temp);
        console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
      }).catch(error => {
      console.log(error);
    });
  }
}
