
import {Component, ViewChild, ElementRef, OnInit, NgZone, Renderer2} from '@angular/core';


import {InteractiveFlowers} from './animations/interactive-flowers';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myVideo: any;
  ngOnInit(): void {
    const canvas = <HTMLCanvasElement>document.getElementById('flower');
    const flowers = new InteractiveFlowers(canvas);

    const btn = document.getElementById('clearBtn');
    btn.addEventListener('click', () => {
      flowers.clearCanvas();
    });


  }

}

