// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

var start = 0;

export const kayvaunSFVisualizer = new Visualizer(
  'kayvaunSF Visualizer',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    p5.background(10, 10, 25);

    //center circle
    p5.translate(width / 2.5, height / 2);
    p5.noiseDetail(2, 1);

    const values = analyzer.getValue();
    p5.beginShape();
    var space = 1;

for (let i = 0; i < values.length; i += space) {
    const amplitude = values[i] as number;
    console.log("amplitude", amplitude)

    var x = p5.map(Math.cos(i), -1, values.length - 1, 0, 3);
    var y = height / 2 + amplitude * height;;

    var h = p5.map(amplitude*10, 10, 1, -150, 150)

    p5.rotate(space);
    p5.rect(100, 10, h, 2);
    start += 0.03;

    p5.endShape();

  }
}

  );