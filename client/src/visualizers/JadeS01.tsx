// 3rd party library imports
import { StormTracker16 } from '@carbon/icons-react';
import p5 from 'p5';
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
      // p5.noSmooth();
      p5.noFill();
      p5.noStroke();

      p5.stroke("white");
      p5.angleMode('degrees');

      const values = analyzer.getValue();    

      let angle = Math.PI;
      let pointCount = 18;
      let idx = 0;
      for(let i = angle; i < Math.PI*2 + angle; i += 2 * Math.PI / pointCount){
        let x = 250 * Math.cos(i) + width / 2;
        let y = 250 * Math.sin(i) + height / 2;
        p5.point(x,y);
        p5.stroke('blue')
  
        let size = Number(values[idx]) * 10 * 10
        p5.circle(x,y,size);
      }

      // p5.stroke('red');
      p5.translate(width/2, height/2);
      let change = 0;
      for (let i = -1; i <= 1; i += 2) {
        p5.beginShape();

        for (let j = 0; j <= 180; j += 0.5) {
          const index = p5.floor(p5.map(j, 0, 180, 0, values.length - 1));
          const amplitude = values[index] as number;

          const r = p5.map(amplitude*2, -1, 1, 150, 300);
          const x = r * p5.sin(j) * i;
          const y = r * p5.cos(j);
          // Place vertex
          p5.stroke(change, 255, 255)
          if(change > 255){
            change = 0;
          }else{
            change++;
          }
          p5.vertex(x, y);
        }
        p5.endShape();
      }
       
    },
);

