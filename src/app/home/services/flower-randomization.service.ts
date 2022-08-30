import { Flower } from '../models/flower';
import { Point } from '../models/point';
import { FlowerCenter } from '../models/flower-center';
import { Petal } from '../models/petal';

export class FlowerRandomizationService {
  private readonly colors = [
    '#f1ebe7',
    '#8ec08b',
    '#8ec08b',
    '#475717',
    '#1a1b15',
    '#e5b981',
    '#d9c8b0',
    '#516119',
    '#c99c63',
    '#79903d',
    '#c5dbc0',
    '#252e03',
    '#ddd6c4',
    '#71a46d',
    '#6f2518',
    '#5c5d43',
    '#ecf6bb',
    '#eceded'
  ];

  constructor() {}

  getFlowerAt(point: Point): Flower {
    const flowerCenter = new FlowerCenter(
      point,
      this.randomIntFromInterval(5, 16),
      this.randomColor()
    );
    const numberOfPetals = this.randomIntFromInterval(4, 8);
    const petalAngleSpacing = this.randomIntFromInterval(5, 25);
    const petalAngleSpan = 360 / numberOfPetals - petalAngleSpacing;
    const petal = new Petal(
      point,
      this.randomIntFromInterval(20, 50),
      this.randomIntFromInterval(9, 14) / 10,
      petalAngleSpan,
      this.randomColor()
    );
    return new Flower(flowerCenter, numberOfPetals, petal);
  }

  getFlowerOnCanvas(canvasWidth: number, canvasHeight: number): Flower {
    return this.getFlowerAt(
      new Point(
        this.randomIntLessThan(canvasWidth),
        this.randomIntLessThan(canvasHeight)
      )
    );
  }

  private randomIntFromInterval(min: number, max: number): number {
    // min: inclusive; max: exclusive
    return Math.floor(Math.random() * (max - min) + min);
  }

  private randomIntLessThan(n: number): number {
    return this.randomIntFromInterval(0, n);
  }

  private randomColor(): string {
    return this.colors[this.randomIntLessThan(this.colors.length)];
  }
}
