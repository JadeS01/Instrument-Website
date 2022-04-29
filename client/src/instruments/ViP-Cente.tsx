// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useEffect } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { RecursivePartial } from "tone/Tone/core/util/Interface";
import { OmniOscillatorOptions } from "tone/Tone/source/oscillator/OscillatorInterface";

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Flute.
 ** ------------------------------------------------------------------------ */

interface FluteKeyProps {
  note: string; // 
  duration?: string;
  synth?: Tone.Synth;
  minor?: boolean // Contains library code for making sound
  octave: number;
  index: number; // octave + index together give a location for the Flute key
}

export function FluteKey({
  note,
  synth,
  minor,
  index,
}: FluteKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the Flute.
   * See `FluteKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba bw2 br4 pointer dim grow-large')}
      style={{
        // CSS
        top: '0',
        marginRight: '.2rem',
        height: `${18 - index}em`,
        backgroundColor: 'Sienna',
        borderColor: 'Brown'
      }}>
      <div
        className={classNames('ba br-100')}
        style={{
          // CSS
          top: '0',
          left: `${index * 4}em`,
          width: '1.5rem',
          height: '1em',
          backgroundColor: 'Black'
        }}
      ></div>
    </div>
  );
}


function FluteType({ title, onClick, active }: any): JSX.Element {
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

function Flute({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'D', idx: 1 },
    { note: 'E', idx: 2 },
    { note: 'Gb', idx: 3 },
    { note: 'G', idx: 4 },
    { note: 'A', idx: 5 },
    { note: 'B', idx: 6 },
  ]);

  const setOscillator = () => {
    setSynth(oldSynth => {
        oldSynth.disconnect();
        return new Tone.Synth({
            "volume": 7,
            "detune": 0,
            "portamento": 0,
            "envelope": {
                "attack": 1,
                "attackCurve": "cosine",
                "decay": 2,
                "decayCurve": "linear",
                "release": 1,
                "releaseCurve": "exponential",
                "sustain": 0
            },
            "oscillator": {
                "partialCount": 3,
                "partials": [
                    0.000048225308641975394,
                    0.007236810378086416,
                    1
                ],
                "phase": 3,
                "type": "fatcustom",
                "count": 5,
                "spread": 1
            } as RecursivePartial<OmniOscillatorOptions>,
        }).toDestination();
    }
    )
        ;
};

useEffect(setOscillator, [setSynth]);

  return (
    <div className="pv4">
      <div className="dib w-100 ml4 flex">
        {Range(0, 3).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave + 2}`;
            const index = (octave) * 7 + key.idx
            if (index < 15) {
              return (
                <FluteKey
                  key={note} //react key
                  note={note}
                  synth={synth}
                  minor={isMinor}
                  octave={octave + 2}
                  index={index}
                />
              );
            } else {
              return null
            }
          }),
        )}
      </div>
    </div>
  );
}

export const FluteInstrument = new Instrument('ViP-Cente', Flute);