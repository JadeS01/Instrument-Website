// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';
import violinImage from '../img/violin.jpg'
import '../violin.css';
// project imports
import { Instrument, InstrumentProps } from '../Instruments';

interface ViolinStringProps {
    note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    minor?: boolean; // True if minor key, false if major key
    octave: number;
    index: number; // octave + index together give a location for the piano key
}

export function ViolinString({
    note,
    synth,
    minor,
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
          'black bg-white h4': !minor, // major keys are white
        })}
        //this styling is for each individual key
        style={{
            // CSS
            top: 0,
            left: `${index * 1.95}rem`, //the spacing left between each key
            zIndex: 10000,
            height: `4rem`,
            width: '2rem',
            marginLeft: 0,
            opacity: 0.001
        }}
    ></div>
    
    );
}

  // eslint-disable-next-line
function ViolinStringWithoutJSX({
    note,
    synth,
    minor,
    index,
}: ViolinStringProps): JSX.Element {
    /**
     * This React component for pedagogical purposes.
     * See `ViolinString` for the React component with JSX (JavaScript XML).
     */
    return React.createElement(
    'div',
    {
        onMouseDown: () => synth?.triggerAttack(`${note}`),
        onMouseUp: () => synth?.triggerRelease('+0.25'),
        className: classNames('ba pointer absolute dim', {
            //'bg-black black h3': minor,
            'black bg-white h4': !minor,
        }),
        style: {
            top: 0,
            left: `${index * 2}rem`,
            zIndex: 1000,
            width: '5rem',
            marginLeft: 0,
        },
    },
    [],
    );
}

function ViolinType({ title, onClick, active }: any): JSX.Element {
    return (
    <div
        onClick={onClick}
        className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
            //'b--black black': active,
            'gray b--light-gray': !active,
        })}
    >
        {title}
    </div>
    );
}

//bottom div is the oscillators styling
//second to bottom div is the instrument styling, it maps the keys
function Violin({ synth, setSynth }: InstrumentProps): JSX.Element {
    const keys = List([
        { note: 'C', idx: 0 },
        { note: 'D', idx: 1 },
        { note: 'E', idx: 2 },
        { note: 'F', idx: 3 },
        { note: 'G', idx: 4 },
        { note: 'A', idx: 5 },
        { note: 'B', idx: 6 },
    ]);

    //constructor for vibrato
    const vibrato = new Tone.Vibrato({
        maxDelay: 0.005,
        frequency: 5,
        depth: 0.1
    }).toDestination();

    

    const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
        oldSynth.disconnect();

        return new Tone.Synth({
            oscillator: { type: newType } as Tone.OmniOscillatorOptions,
            "envelope": { 
                "attack": 0.2,
                "decay": 0.5,
                "sustain": 0.8,
                "release": 0.5,
            },
        }).toDestination().connect(vibrato);
    });
    };

    //list of oscillators that will show up on the page
    const oscillators: List<OscillatorType> = List([
        'sawtooth',
    ]) as List<OscillatorType>;

    return (
    <div className="pv4">
        <img src={violinImage} alt="logo" style={{zIndex:0}}/>
        <div className="keys">
            {Range(2, 4).map(octave =>
            keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
                <ViolinString
                    key={note} //react key
                    note={note}
                    synth={synth}
                    minor={isMinor}
                    octave={octave}
                    index={(octave - 2) * 7 + key.idx}
                />
            );
            }),
        )}
        </div>
        
        <div className={'pl4 pt4 flex'}> 
            {oscillators.map(o => (
            <ViolinType
                string={o}
                title={o}
                onClick={() => setOscillator("sawtooth")}
                active={synth?.oscillator.type === o}
                style={{
                    left: '10rem',
                }}
            />
        ))}
        </div>
    </div>
    );
}

export const ViolinInstrument = new Instrument('josephkois', Violin);