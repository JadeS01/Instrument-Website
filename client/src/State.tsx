// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { ViolinInstrument } from './instruments/josephkois';
import { HarpInstrument } from './instruments/JadeS01';
import { FluteInstrument } from './instruments/ViP-Cente';
import { DrumsInstrument } from './instruments/kayvaunSF';
import { WaveformVisualizer } from './visualizers/Waveform';
import { JadeS01Visualizer } from './visualizers/JadeS01';
import { JosephkoisVisualizer } from "./visualizers/josephkois";
import { kayvaunSFVisualizer } from './visualizers/kayvaunSF';
import { VicenteVisualizer } from './visualizers/ViP-Cente'
/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, ViolinInstrument, HarpInstrument, FluteInstrument, DrumsInstrument]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, JadeS01Visualizer, JosephkoisVisualizer, kayvaunSFVisualizer, VicenteVisualizer]);    // similar to Visualizer[]


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});