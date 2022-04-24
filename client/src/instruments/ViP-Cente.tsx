// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Flute.
 ** ------------------------------------------------------------------------ */

interface FluteKeyProps {
  note: string; // 
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  octave: number;
  index: number; // octave + index together give a location for the Flute key
}

export function FluteKey({
  note,
  synth,
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

// eslint-disable-next-line
// function FluteKeyWithoutJSX({
//   note,
//   synth,
//   minor,
//   index,
// }: FluteKeyProps): JSX.Element {
//   /**
//    * This React component for pedagogical purposes.
//    * See `FluteKey` for the React component with JSX (JavaScript XML).
//    */
//   return React.createElement(
//     'div',
//     {
//       onMouseDown: () => synth?.triggerAttack(`${note}`),
//       onMouseUp: () => synth?.triggerRelease('+0.25'),
//       className: classNames('ba pointer absolute dim', {
//         'bg-black black h3': minor,
//         'black bg-white h4': !minor,
//       }),
//       style: {
//         top: 0,
//         left: `${index * 2}rem`,
//         zIndex: minor ? 1 : 0,
//         width: minor ? '1.5rem' : '2rem',
//         marginLeft: minor ? '0.25rem' : 0,
//       },
//     },
//     [],
//   );
// }

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

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
        envelope: {
          attack: 0.3
        }
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
      <div className="dib w-100 ml4 flex">
        {Range(0, 3).map(octave =>
          keys.map(key => {
            const note = `${key.note}${octave + 2}`;
            const index = (octave) * 7 + key.idx
            if (index < 15) {
              return (
                <FluteKey
                  key={note} //react key
                  note={note}
                  synth={synth}
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
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <FluteType
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

export const FluteInstrument = new Instrument('ViP-Cente', Flute);