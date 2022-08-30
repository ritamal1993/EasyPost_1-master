import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const axios = require('axios');

@Injectable({
  providedIn: 'root'
})
export class ApixuService {
  constructor(private http: HttpClient) {}

  getWeather(location) {
    const params = {
      access_key: 'db808cce309b8571cfd6ad8b4c008948&query',
      query: location
    };
    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const apiResponse = response.data;
        console.log(response.data);
        console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
      }).catch(error => {
      console.log(error);
    });
  }

  // getWeather(location) {
  //   return this.http.get(
  //     'http://api.weatherstack.com/current?access_key=db808cce309b8571cfd6ad8b4c008948&query='
  //     + location
  //   );
  // }
}



