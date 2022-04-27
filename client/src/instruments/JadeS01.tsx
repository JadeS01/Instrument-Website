// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useState } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';




interface HarpStringProps {
    note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    octave: number;
    index: number; // octave + index together give a location for the piano key
  }
  
  export function HarpString({
    note,
    synth,
    index,
  }: HarpStringProps): JSX.Element {
    /**
     * This React component corresponds to either a major or minor key in the piano.
     * See `HarpStringWithoutJSX` for the React component without JSX.
     */
    const [sample] = useState(
      new Tone.Sampler({  
        urls:{
          A2: `https://github.com/nbrosowsky/tonejs-instruments/blob/master/samples/harp/A2.mp3`
        },
        baseUrl: "http://localhost:3000" 

      }).toDestination()
    )
    
    const harp_sample = (note: string) => {
      sample.triggerAttackRelease([`${note}`], 1);
    }
  
    const colors =['#A93226','#F9E79F','#F9E79F','#229954','#F9E79F','#F9E79F','#F9E79F'];
    colors.push(...colors)
    return (
      // Observations:
      // 1. The JSX refers to the HTML-looking syntax within TypeScript.
      // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
      // 3. The curly braces `{` and `}` should remind you of string interpolation.
      <div
        onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
        onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
        className={classNames('ba pointer absolute dim', {
          'black bg-red h4': note == 'C', // major keys are white
          'black bg-green h4': note == 'F', // major keys are white
          'black bg-white h4': note !== 'C' && note != 'F', // major keys are white
        })}
        style={{ 
          // CSS
          backgroundColor: colors[index],
          top: 0,
          left: `${index * 2}rem`,
          zIndex: 1,
          width: '1.5rem',
          marginLeft: '0.25rem',
          filter: 'drop-shadow(6px 4px 4px rgba(0, 0, 0, 0.25))'

        }}
      ></div>
    );
  }
  
  // eslint-disable-next-line
  function HarpStringWithoutJSX({
    note,
    synth,
    index,
  }: HarpStringProps): JSX.Element {
    /**
     * This React component for pedagogical purposes.
     * See `HarpString` for the React component with JSX (JavaScript XML).
     */
    return React.createElement(
      'div',
      {
        onMouseDown: () => synth?.triggerAttack(`${note}`),
        onMouseUp: () => synth?.triggerRelease('+0.25'),
        className: classNames('ba pointer absolute dim', {
        }),
        style: {
          top: 0,
          left: `${index * 2}rem`,
        },
      },
      [],
    );
  }
  
  function HarpType({ title, onClick, active }: any): JSX.Element {
    return (
      <div
        onClick={onClick}
        className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
          'b--black black': active,
          'gray b--light-gray': !active,
        })}
      >
        {title}
      </div>
    );
  }


  function Harp({ synth, setSynth }: InstrumentProps): JSX.Element {
    const strings = List([
    // Diatonic scale
      { note: 'C', idx: 0 },
      { note: 'D', idx: 1 },
      { note: 'E', idx: 2 },
      { note: 'F', idx: 3 },
      { note: 'G', idx: 4 },
      { note: 'A', idx: 5 },
      { note: 'B', idx: 6 },
    ]);
  
    const setOscillator = (newType: Tone.ToneOscillatorType) => {
      setSynth(oldSynth => {
        oldSynth.disconnect();
    
        return new Tone.MembraneSynth ({
          oscillator: { type: newType } as Tone.OmniOscillatorOptions,
          // "envelope": {
          //       attack: .005,
          //       attackCurve: 'linear',
          //       decayCurve: 'exponential',
          //       sustain: 0.3,
          //       decay: 0.1,
          //       release: 1,
          //       releaseCurve: 'exponential'
          // },
          "envelope": {
            "attack": 0.001,
            "decay": 0.35,
            "sustain": 0.01,
            "release": 1.4,
          },
          "octaves": 9,
          "pitchDecay": 0.0005,
        }).toDestination();
      });
    };
  
    const oscillators: List<OscillatorType> = List([
      'sine',
      'sawtooth',
      'square',
      'triangle',
      'fmsine',
      'fmsawtooth',
      'fmtriangle',
      'amsine',
      'amsawtooth',
      'amtriangle',
    ]) as List<OscillatorType>;
  
    return (
      <div className="pv4">
        <div className="relative dib h4 w-100 ml4">
          {Range(2, 4).map(octave =>
            strings.map(strings => {
              const note = `${strings.note}${octave}`;
              return (
                <HarpString
                  key={note} //react key
                  note={note}
                  synth={synth}
                  octave={octave}
                  index={(octave - 2) * 7 + strings.idx}
                />
              );
            }),
          )}
        </div>
        <div className={'pl4 pt4 flex'}>
          {oscillators.map(o => (
            <HarpType
              key={o}
              title={o}
              onClick={() => setOscillator(o)}
              active={synth?.oscillator.type === o}
            />
          ))}
        </div>
      </div>
    );
  }
  

export const HarpInstrument = new Instrument('JadeS01Harp', Harp);