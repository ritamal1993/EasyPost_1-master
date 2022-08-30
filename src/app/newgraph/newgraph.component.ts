import {Component, OnInit, OnDestroy, Renderer2} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PostsService } from '../posts/posts.service';
import { Comment } from '../posts/comment/comment.model';
const dates = require('date-and-time');
const pattern = dates.compile('MMM DD YYYY');

const day0 = new Date(new Date(new Date().setDate(new Date().getDate())));
const day1 = new Date(new Date().setDate(new Date().getDate() - 1));
const day2 = new Date(new Date().setDate(new Date().getDate() - 1));
const day3 = new Date(new Date().setDate(new Date().getDate() - 3));
const day4 = new Date(new Date().setDate(new Date().getDate() - 4));
const day5 = new Date(new Date().setDate(new Date().getDate() - 5));
const day6 = new Date(new Date().setDate(new Date().getDate() - 6));
const day7 = new Date(new Date().setDate(new Date().getDate() - 7));


const commentMap = new Map();

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {assertNumber} from '@angular/core/src/render3/assert';
import {async} from '@angular/core/testing';


@Component({
  selector: 'app-linechart',
  templateUrl: './newgraph.component.html',
  styleUrls: ['./newgraph.component.css']
})
export class NewgraphComponent implements OnInit {
  title = 'Line Chart';

  private commentSub: Subscription;
  dataSource: Comment[] = [];

  tempCount: number;
  data: any[];
  public barChartLabels: String[];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };



  private margin = {top: 20, right: 20, bottom: 30, left: 75};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>; // this is line defination

  constructor(public postsService: PostsService) {

    // configure margins and width/height of the graph

    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom; }

  ngOnInit() {


    this.postsService.getAllCommentsGraph();
    this.commentSub = this.postsService.staticsticGet().subscribe(commentData => {
      console.log('jdfkjghjkdjgfhkd');
      this.dataSource = commentData.commetnsData;
      console.log(this.dataSource);

      commentMap.set(dates.format(day0, pattern), 0);
      commentMap.set(dates.format(day1, pattern), 0);
      commentMap.set(dates.format(day2, pattern), 0);
      commentMap.set(dates.format(day3, pattern), 0);
      commentMap.set(dates.format(day4, pattern), 0);
      commentMap.set(dates.format(day5, pattern), 0);
      commentMap.set(dates.format(day6, pattern), 0);
      commentMap.set(dates.format(day7, pattern), 0);

      console.log(commentMap);
      this.dataSource.forEach(c => {
        if (commentMap.has(c.publishDate)) {
          this.tempCount = commentMap.get(c.publishDate);
          commentMap.set(c.publishDate, 1 + this.tempCount);
        } else {
          commentMap.set(c.publishDate, 1);
        }
      });
      this.updateData();
    });
  }

  private updateData() {
    console.log(dates.format(day0, pattern));
    console.log(commentMap.get(dates.format(day0, pattern)));
    this.data = [
      {date: day0, value: commentMap.get(dates.format(day0, pattern))},
      {date: day1, value: commentMap.get(dates.format(day1, pattern))},
      {date: day2, value: commentMap.get(dates.format(day2, pattern))},
      {date: day3, value: commentMap.get(dates.format(day3, pattern))},
      {date: day4, value: commentMap.get(dates.format(day4, pattern))},
      {date: day5, value: commentMap.get(dates.format(day5, pattern))},
      {date: day6, value: commentMap.get(dates.format(day6, pattern))},
      {date: day7, value: commentMap.get(dates.format(day7, pattern))}
    ];
    this.buildSvg();
    this.addXandYAxis();
    this.drawLineAndPath();
  }

  private buildSvg() {
    d3.selectAll('svg > *').remove();
    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }
  private addXandYAxis() {
    // range of data configuring
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.data, (d) => d.date ));
    this.y.domain(d3Array.extent(this.data, (d) => d.value ));

    // Configure the Y Axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    // Configure the Y Axis
    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y));
  }

  private drawLineAndPath() {
    this.line = d3Shape.line()
      .x( (d: any) => this.x(d.date) )
      .y( (d: any) => this.y(d.value) );

    this.svg.append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', this.line);
  }

}



