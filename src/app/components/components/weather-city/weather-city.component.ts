import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServicesService } from "../../../services/services.service";

@Component({
  selector: 'weather-city',
  templateUrl: './weather-city.component.html',
  styleUrls: ['./weather-city.component.scss']
})
export class WeatherCityComponent implements OnInit {
// variables
  public errMsg: any;
  public countryList: any;
  public selectedCountry: string;
  public stateList: any;
  public selectedState: string;
  public cityList: any;
  public selectedCity: string;
  // emmit data when gotit
  @Output() gotCity: EventEmitter<any> = new EventEmitter();
  @Output() gotCountry: EventEmitter<any> = new EventEmitter();
  @Output() gotState: EventEmitter<any> = new EventEmitter();

  constructor(public ServicesService: ServicesService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCountry()
  }

  /**
   * get the list of country
   */
  getCountry() {
    let urlCountryList = 'https://api.airvisual.com/v2/countries?';
    this.ServicesService.callForecastApi(urlCountryList).subscribe((data) => {
      if (data) {
        console.log(data)
        this.countryList = data.data;
        this.stateList = []
      }
    }, (error) => {
      console.log(error, 'subs')
      this.errMsg = error
    });
  }

/**
 * get state list based on country
 */
  selectCountry() {
    this.gotCountry.emit({ country: this.selectedCountry })

    console.log(this.selectedCountry)
    let urlStateList = `https://api.airvisual.com/v2/states?country=${this.selectedCountry}`;
    this.ServicesService.callForecastApi(urlStateList).subscribe((data) => {
      if (data) {
        this.stateList = data.data;
        this.cityList = []
      }
    }, (error) => {
      console.log(error, 'subs')
      this.errMsg = error
    });
  }

  /**
   * get city based on state selected and country
   */
  selectState() {
    this.gotState.emit({ state: this.selectedState })
    console.log(this.selectedState)
    let urlStateList = `https://api.airvisual.com/v2/cities?state=${this.selectedState}&country=${this.selectedCountry}`;
    this.ServicesService.callForecastApi(urlStateList).subscribe((data) => {
      if (data) {
        this.cityList = data.data
      }
    }, (error) => {
      console.log(error, 'subs')
      this.errMsg = error
    });
  }

  
  selectedCityFromList() {
    this.gotCity.emit({ city: this.selectedCity })
  }

}
