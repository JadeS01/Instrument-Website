// 3rd party library imports
import { RecentlyViewed32 } from '@carbon/icons-react';
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
    p5.stroke(255, 255, 255, 255);
    p5.noFill();
    //p5.stroke((Math.random() * 200) + 50,(Math.random() * 200) + 50, (Math.random() * 200) + 50)
    p5.fill("grey");
    p5.background(0, 0, 0, 255);
    p5.strokeWeight(dim * 0.01);
    
    let values = analyzer.getValue();
    let max = -Infinity
    
    p5.beginShape();
    for(let i = 0; i < values.length - 1 ; i++){
      const amplitude = values[i] as number;
      max = Math.max(amplitude, max)
      
      const x = p5.map(amplitude, 0, max, 0, width) ;
      const y = height - 10
      const rectWidth = p5.map(amplitude, 0, max, 0, width ) 
      let rectHeight =  p5.map(amplitude, 0, max, 0, height )
      
      if(amplitude < 0.025 && amplitude > -0.025){
        p5.stroke('blue')
      }else if(amplitude < 0.05 && amplitude > -0.05){
        p5.stroke("green");
      }else if(amplitude < 0.1 && amplitude > -0.1){
        p5.stroke('yellow')
      }else{
        p5.stroke('red')
      }
      
      p5.rect(x , y, -Math.abs(rectWidth) , -Math.abs(rectHeight))
        
    }

    

    p5.endShape();
  }
);