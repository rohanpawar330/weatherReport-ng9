import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherCityComponent } from './weather-city/weather-city.component';
import { WeatherReportComponent } from './weather-report/weather-report.component';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';

// chart
import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// import { WeatherCityComponent } from '../components/components/weather-city/weather-city.component';
// import { WeatherDashboardRoutingModule } from './weather-dahboard-routing';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);

@NgModule({
  declarations: [WeatherReportComponent, WeatherCityComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    FusionChartsModule
    

  ], exports: [WeatherReportComponent, WeatherCityComponent]
})
export class ComponentsModule { }
