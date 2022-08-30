// Import stylesheets
import './home.component.css';

// Write TypeScript code!
import { InteractiveFlowers } from './animations/interactive-flowers';

const canvas = <HTMLCanvasElement>document.getElementById('flower');
const flowers = new InteractiveFlowers(canvas);

const btn = document.getElementById('clearBtn');
btn.addEventListener('click', () => {
  flowers.clearCanvas();
});
