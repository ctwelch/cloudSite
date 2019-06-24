import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { NgForm } from '@angular/forms';
import { FredSeries } from './fredSeries.model';
// import { SeriesChart } from './series-chart.componentseries-chart/';

import * as d3 from 'd3';
import { DataPoint } from './data-point.model';
// "d3": "^5.9.1",

@Component({
  selector: 'app-series-search',
  templateUrl: './series-search.component.html',
  styleUrls: ['./series-search.component.css']
})
export class SeriesSearchComponent implements OnInit {
  keywords: string;
  seriess: any;
  selectedSeries: any;
  fredSeries: FredSeries;
  selectedSeriesObservations: DataPoint;
  options: any;

  toLower(value: string) {
    if (value.length > 0) {
      this.keywords = value.toLowerCase();
    }
  }

  constructor(private searchService: SearchService) { }

  ngOnInit() {

  }

  // ngAfterContentInit() {
  //   d3.select('lineChart');
  // }

  search(form: NgForm) {
    // form.value
    this.searchService.keywordSearch(this.keywords)
    .subscribe(data => {
      // console.log('success: ', data);
      this.seriess = data.seriess.sort( (a, b) => {
        return b.popularity - a.popularity;
      }).filter(x => x.popularity >= 25);
      // this.fredSeries = this.seriess.map(x => {
      //   id: string,
      //   frequency: string,
      //   frequencyShort: string,
      //   groupPopularity: number,
      //   lastUpdated: string,
      //   notes: string,
      //   observationEnd: string,
      //   observationStart: string,
      //   popularity: number,
      //   seasonalAdjustmentShort: string,
      //   title: string,
      //   units: string,
      //   unitsShort: string
      // });
      console.log(this.seriess);
      console.log(data.count);
      // this.fredSeries = data;
      console.log(this.fredSeries);
    });
  }

  // sortByPopularity(a, b) {
  //   return a.popularity - b.popularity;
  // }

  handleSeriesSelect(series) {
    this.selectedSeries = series;
    console.log(series.id);
    console.log(this.selectedSeries.id);
    this.searchService.getSeriesObservations(series.id)
    .subscribe(data => {
      this.selectedSeriesObservations = data.observations;
    });
  }

  handleCheck() {
    console.log(this.seriess);
  }
}
