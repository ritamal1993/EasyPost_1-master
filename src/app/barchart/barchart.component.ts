import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { STATISTICS } from './statistics';
import { PostsService } from '../posts/posts.service';
import {Subscription} from 'rxjs';
import {Comment} from '../posts/comment/comment.model';


const commentMap = new Map();
let pf = 0;
let nf = 0;

@Component({
  selector: 'app-barchart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  title = 'Bar Chart Type';

  private commentSub: Subscription;
  dataSource: Comment[] = [];


  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  constructor(public postsService: PostsService) {}

  ngOnInit() {


    this.postsService.getAllCommentsGraph();
    this.commentSub = this.postsService.staticsticGet().subscribe(commentData => {
      this.dataSource = commentData.commetnsData;
      console.log(this.dataSource);


      this.dataSource.forEach(c => {
        if (c.commentType === 'positive') {
          pf = pf + 1;
          STATISTICS.push({letter: 'Positive', frequency: pf});
        } else {
          nf = nf + 1;
          STATISTICS.push({letter: 'Negative', frequency: nf});
        }
      });
      this.updateData();
    });
  }

  private updateData() {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }

  private initSvg() {
    d3.selectAll('svg > *').remove();
    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height =
      +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }

  private initAxis() {
    this.x = d3Scale
      .scaleBand()
      .rangeRound([0, this.width])
      .padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(STATISTICS.map(d => d.letter));
    this.y.domain([0, d3Array.max(STATISTICS, d => d.frequency)]);
  }

  private drawAxis() {
    this.g
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    this.g
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y).ticks(1))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -200)
      .attr('dy', '0.71em')
      .text('Frequency');
  }

  private drawBars() {
    this.g
      .selectAll('.bar')
      .data(STATISTICS)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.x(d.letter))
      .attr('y', d => this.y(d.frequency))
      .attr('width', this.x.bandwidth())
      .attr('height', d => this.height - this.y(d.frequency));
  }
}
