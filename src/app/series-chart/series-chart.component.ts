import { Component, OnInit, ElementRef, Input, OnChanges, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import * as d3 from 'd3';
import { DataPoint } from 'src/app/series-search/data-point.model';

@Component({
  selector: 'app-series-chart',
  templateUrl: './series-chart.component.html',
  styleUrls: ['./series-chart.component.css'],
  encapsulation: ViewEncapsulation.None
  // Angular doesn’t use Shadow DOM at all. Styles applied to our component are written to the document head
})
export class SeriesChartComponent implements OnChanges, OnInit {

  @ViewChild('chart')
  private chartContainer: ElementRef;
  private margin = {top: 20, right: 20, bottom: 30, left: 70};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3.Line<[number, number]>;


  @Input()
  data: any[];
  @Input()
  series: any;
  title = '';

  ngOnInit(): void {
    // this.initSvg();
    // this.initAxis();
    // this.drawAxis();
    // this.drawLine();
  }

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
   }

   private initSvg() {
     this.svg = d3.select('svg')
     .append('g')
     .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
   }

   private initAxis() {
    const data = this.data
      .map(x =>({date: new Date(x.date), value: x.value}))
      .filter(y => y.date.getFullYear() > 2004);
    this.x = d3.scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, this.width]);
    this.y = d3.scaleLinear()
      .domain([d3.min(data, (d: any) => +d.value), d3.max(data, (d: any) => +d.value)] )
      .range([this.height, 0]).nice();
   }

   private drawAxis() {
     this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x));
     this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - this.margin.left)
      .attr('x', 0 - (this.height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(this.series ? this.series.units : '');
   }

   private drawLine() {
    const data = this.data
    .map(x =>({date: new Date(x.date), value: x.value}))
    .filter(y => y.date.getFullYear() > 2004);

    this.line = d3.line()
    .defined((d: any) => !isNaN(d.value))
    .x((d: any) => this.x(d.date))
    .y((d: any) => this.y(d.value));

    this.svg.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', this.line);
   }




  ngOnChanges(): void {
    if (!this.data) { return; }
    d3.select('#chart').html(null);
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawLine();

    this.title = this.series ? this.series.title : '';

    // this.createChart();
  }

  onResize() {
    this.createChart();
  }

  private createChart(): void {
    const margin = {top: 20, right: 20, bottom: 30, left: 50};

    d3.select('svg').remove();
    const height = 600;
    const width = 900;
    const element = this.chartContainer.nativeElement;
    const data = this.data
                  .map(x =>({date: new Date(x.date), value: x.value}))
                  .filter(y => y.date.getFullYear() > 2010);
    const svg = d3.select('.chart-container').append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('preserveAspectRatio', 'xMinYMin')
    .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
    .append('g')
    .attr('transform', 'translate(' + Math.min(width,height) / 2 + ',' + Math.min(width,height) / 2 + ')');

    // const svg = d3.select(element).append('svg')
    //         .attr('width', width)
    //         .attr('height', height);

    const x = d3.scaleTime()
              .range([0, height])
              .domain(d3.extent(data, (d: any) => d.date));
    const y = d3.scaleLinear()
              .range([width, 0])
              .domain(d3.extent(data, (d: any) => d.value));

    const g = svg.append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.72em')
        .attr('text-anchor', 'end')
        .text('Frequency');

    const line = d3.line<any>()
    .defined(d => !isNaN(d.value))
                  .x((d: any) => x(d.date))
                  .y((d: any) => y(d.value));

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);
  }

}
