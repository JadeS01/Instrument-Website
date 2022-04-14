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

      p5.strokeWeight(dim * 0.025);
      p5.background(0, 0, 0, 255);
      p5.noSmooth();

      // gradient background following https://www.youtube.com/watch?v=DJgDW3F68Xc
      const topColor = p5.color(171, 71, 188);
      const bottomColor = p5.color(69, 191, 85);

      for(let i = 0; i < height; i++){
        const line = p5.lerpColor(topColor, bottomColor, i / height);
        p5.stroke(line);
        p5.line(0, i, width, i);
      }
      p5.noFill();

      p5.stroke("white");
      p5.angleMode('degrees');
      p5.translate(width/2, height/2);

      const values = analyzer.getValue();      
      for (let i = -1; i <= 1; i += 2) {
        p5.beginShape();

        for (let j = 0; j <= 180; j += 0.5) {
          const index = p5.floor(p5.map(j, 0, 180, 0, values.length - 1));
          const amplitude = values[index] as number;
          const r = p5.map(amplitude*2, -1, 1, 150, 300);
          const x = r * p5.sin(j) * i;
          const y = r * p5.cos(j);
          // Place vertex
          p5.vertex(x, y);

          // particles
          const pX = p5.random(0, 10) + (amplitude * p5.random(0, width * 2));
          const pY = p5.random(0, 10) + (amplitude * p5.random(0, width * 2));
          const pD = p5.random(1, 0.5);
          p5.circle(pX, pY, pD);
        }
        p5.endShape();
      }

      
    },
);

