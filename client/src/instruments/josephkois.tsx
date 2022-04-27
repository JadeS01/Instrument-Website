// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

interface ViolinStringProps {
    note: string; 
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    octave: number;
    index: number; // octave + index together give a location for the piano key
}

export function ViolinString({
    note,
    synth,
    index,
}: ViolinStringProps): JSX.Element {
    /**
     * This React component corresponds to either a major or minor key in the piano.
     * See `PianoKeyWithoutJSX` for the React component without JSX.
     */
    return (
      // Observations:
      // 1. The JSX refers to the HTML-looking syntax within TypeScript.
      // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
      // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
        onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
        onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
        className={classNames('ba pointer absolute dim', {
          //'bg-black black h3': minor, // minor keys are black
          //'black bg-white h4': !minor, // major keys are white
        })}
        style={{
        // CSS
        top: 0,
        left: `${index * 2}rem`,
        zIndex: 1,
        width: '1.5rem',
        marginLeft: '0.25rem',
        }}
    ></div>
    );
}

  // eslint-disable-next-line
// function ViolinStringWithoutJSX({
//     note,
//     synth,
//     index,
// }: ViolinStringProps): JSX.Element {
//     /**
//      * This React component for pedagogical purposes.
//      * See `ViolinKey` for the React component with JSX (JavaScript XML).
//      */
//     return React.createElement(
//     'div',
//     {
//         onMouseDown: () => synth?.triggerAttack(`${note}`),
//         onMouseUp: () => synth?.triggerRelease('+0.25'),
//         className: classNames('ba pointer absolute dim', {
//         }),
//         style: {
//         top: 0,
//         left: `${index * 2}rem`,
//         },
//     },
//     [],
//     );
// }

function ViolinType({ title, onClick, active }: any): JSX.Element {
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

function Violin({ synth, setSynth }: InstrumentProps): JSX.Element {
    const strings = List([
    { note: 'C', idx: 0 },
    { note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    { note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
    { note: 'G', idx: 4 },
    { note: 'Ab', idx: 4.5 },
    { note: 'A', idx: 5 },
    { note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },
    ]);

    const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
        oldSynth.disconnect();

        return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
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
        {Range(2, 7).map(octave =>
            strings.map(strings => {
            const note = `${strings.note}${octave}`;
            return (
                <ViolinString
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
            <ViolinType
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

export const ViolinInstrument = new Instrument('josephkois', Violin);