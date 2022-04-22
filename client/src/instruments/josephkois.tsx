// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

interface ViolinKeyProps {
    note: string; 
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    octave: number;
    index: number; // octave + index together give a location for the piano key
}

// export const ViolinInstrument = new Instrument('JosephkoisViolin', Violin);