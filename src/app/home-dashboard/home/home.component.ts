import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // variables
  selectedCity: any;
  selectedCountry: any;
  selectedState: any;

  constructor(private service: ServicesService, private router: Router) {
  }

  /**
   * service call for specific date
   */
  ngOnInit(): void {

  }

  gotCity(ev: any) {
    console.log(ev)
    this.selectedCity = ev.city
  }
  gotCountry(ev: any) {
    console.log(ev)
    this.selectedCountry = ev.country
  }
  gotState(ev: any) {
    console.log(ev)
    this.selectedState = ev.state
  }

}
