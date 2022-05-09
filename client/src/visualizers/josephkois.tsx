// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const JosephkoisVisualizer = new Visualizer(
    'Josephkois Visualizer',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        //location where waveform is located
        const height = window.innerHeight / 4;

    p5.colorMode(p5.HSB, 50, 100, 100); //rainbow effect
    p5.background(0, 0, 0, 255);
    p5.noStroke();

    let barWidth = width / 64;
    const values = analyzer.getValue();

    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] as number * 1.5;
        const y = p5.map(amplitude, 0, 1.8, height, 0);
        p5.fill(i, 255, 255); // last 2 values are opacity
        p5.rect(i * barWidth, y, barWidth - 4, height - y);
        //p5.lerp(i, 0, 0.08);
    }
    p5.endShape();
    },
);