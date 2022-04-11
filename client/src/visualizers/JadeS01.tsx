// 3rd party library imports
import { StormTracker16 } from '@carbon/icons-react';
import P5 from 'p5';
import * as Tone from 'tone';
import { couldStartTrivia } from 'typescript';

// project imports
import { Visualizer } from '../Visualizers';

export const JadeS01Visualizer = new Visualizer(
    'JadeS01 Visualizer',
    (p5: P5, analyzer: Tone.Analyser) => {
      const width = window.innerWidth;
      const height = window.innerHeight / 2;
      const dim = Math.min(width, height);
      
      p5.background(0, 0, 0, 255);

      p5.strokeWeight(dim * 0.01);
      p5.stroke(255, 255, 255, 255);
      p5.noFill();

      const values = analyzer.getValue();

      let space = width/ 128;
      p5.beginShape();
      for(let i = 0; i < values.length; i++){
        p5.fill(i, 255, 255);
        const amplitude = values[i] as number;
        const x = p5.map(i, 0, values.length - 1, 0, width);
        const y = height / 2 + amplitude * height;
        const t = p5.map(amplitude, 0, 256, height, 0);
        // Place vertex
        p5.vertex(x, y);
        p5.rect(i*space, t, space, height-t);

      }
      p5.endShape();

      // for (let i = -1; i <= 1; i += 2) {
      //   p5.beginShape();
      //   for (let j = 0; j <= 180; j += 0.5) {
      //     const index = p5.floor(p5.map(j, 0, 180, 0, values.length - 1));
      //     const amplitude = values[index] as number;
      //     const r = p5.map(amplitude, -1, 1, 50, 300);
      //     const x = r * p5.sin(j) * i;
      //     const y = r * p5.cos(j);
      //     p5.line(0,0,x,y);
      //     // Place vertex
      //     p5.vertex(x, y);
      //   }
      //   p5.endShape();
      // }

      
    },
);

