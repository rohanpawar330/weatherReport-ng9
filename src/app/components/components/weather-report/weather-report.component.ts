import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import { getLineChart } from '../../../charts/lineChart';

@Component({
  selector: 'weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss']
})
export class WeatherReportComponent implements OnInit {

  private errMsg: any;
  public weatherReport: any;
  // data set for chart
  public last7Days: any = {
    categories: [{ category: [] }],
    dataset: [
      {
        data: [],
        seriesname: "max temp"
      },
      {
        data: [],
        seriesname: "min temp"
      }
    ],

  };
  public tableData: any;
  public dataSource: any;
// get input from other component
  @Input() selectedCity: any = '';
  @Input() selectedCountry: any = '';
  @Input() selectedState: any = '';

  list: any = {
    selectedCity: '',
    selectedCountry: '',
    selectedState: ''
  }

  constructor(private service: ServicesService) {
    this._getweatherReport('Pune');
  }

  ngOnInit(): void {
  }

  /**
   * call every time when select is changed
   * @param changes item in select
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.list.selectedCountry != this.selectedCountry && this.selectedCountry) {
      this.list.selectedCountry = this.selectedCountry
      this._getweatherReport(this.selectedCountry);
    } else if (this.list.selectedState != this.selectedState && this.selectedState) {
      this.list.selectedState = this.selectedState
      this._getweatherReport(this.selectedState);
    }
    else if (this.list.selectedCity != this.selectedCity && this.selectedCity) {
      this.list.selectedCity = this.selectedCity
      this._getweatherReport(this.selectedCity);
    }

    this.last7Days = {
      categories: [{ category: [] }],
      dataset: [
        {
          data: [],
          seriesname: "max temp"
        },
        {
          data: [],
          seriesname: "min temp"
        }
      ]
    }
  }

  /**
   * weather of perticular location
   * @param location selected
   */
  _getweatherReport(location: string) {
    let urlStateList = `http://api.openweathermap.org/data/2.5/weather?q=${location}`;
    this.service.getMethodData(urlStateList).subscribe((data: any) => {
      if (data) {
        var utcSeconds = data.dt;
        var d = new Date(0);
        this.weatherReport = data;
        this.weatherReport.dt = d.setUTCSeconds(utcSeconds)
        this._getweatherReport7Days()
      }
    }, (error) => {
      console.log(error, 'subs')
      this.errMsg = error
    });
  }



/**
 * get data for 7 day of specific day selected
 */
  _getweatherReport7Days() {
    let urlStateList = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.weatherReport.coord.lat}&lon=${this.weatherReport.coord.lon}`;
    this.service.getMethodData(urlStateList).subscribe((data: any) => {
      if (data) {
        this.tableData = data.daily;
        data.daily.forEach((element, index) => {
          let d = new Date(parseInt(element.dt + '000'));
          this.last7Days.dataset[0].data.push({
            value: (element.temp.max - 273.12).toFixed(2) + " 'C",
          })
          this.last7Days.dataset[1].data.push({
            value: (element.temp.min - 273.12).toFixed(2) + " 'C",
          });
          this.last7Days.categories[0].category.push({
            label: d.toLocaleDateString()
          })
          this.tableData[index].dt = `${d.getDate()} - ${d.getMonth()} - ${d.getFullYear()}`;
          this.tableData[index].temp.max = (element.temp.max - 273.12).toFixed(2);
          this.tableData[index].temp.min = (element.temp.min - 273.12).toFixed(2)
          // label: d.toLocaleDateString()
        });
        console.log(this.last7Days)
        this.dataSource = getLineChart(this.last7Days);
      }
    }, (error) => {
      console.log(error, 'subs')
      this.errMsg = error
    });
  }


/**
 * sorting logic
 * @param item selected coloumn
 */
  onClick(item) {
    console.log(item)

    if (item == 'maxTemp' || item == 'minTemp') {
      this.tableData.sort(function (a: any, b: any) {
        return (a.temp.max).toFixed(0) - (b.temp.max).toFixed(0)
      })
    }

   
  }

}
