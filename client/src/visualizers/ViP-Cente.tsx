// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const VicenteVisualizer = new Visualizer(
  "ViP-Cente",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    //change angle mode so that circle can be displayed
    p5.angleMode(p5.DEGREES);
    //p5.noFill();
    p5.fill("purple");

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke("purple");

    //center everything
    //p5.translate(p5.width / 2, 0);
    const values = analyzer.getValue();
    //right half of circle
    p5.beginShape();

    let amount = values.length;
    let side = Math.sqrt(amount);
    let idx = 0;
    let size = 8;
    let xInc = 30;
    let yInc = 30;
    let xOffset = 100;
    let yOffset = 50;
    for (let i = 0; i < side; i++) {
      xOffset = 100;
      for (let y = 0; y < side; y++) {
        let circleSize = Number(values[idx]) * 10 * size;
        p5.circle(xOffset, yOffset, circleSize);
        xOffset += xInc;
        idx++;
      }
      yOffset += yInc;
    }

    p5.endShape();
  }
);