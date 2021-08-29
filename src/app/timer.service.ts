import { Injectable } from '@angular/core';


export class Format {
  constructor(public name: string,
              public prepTime: number,
              public speeches: string[],
              public speechesTime: number[]) { }
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  availableFormats = {
    'AP': {
      name: 'AP',
      prepTime: 1800000,
      speeches: ['PM', 'LO', 'DPM', 'DLO', 'GW', 'OW', 'OR', 'GR'],
      speechesTime: [420000, 420000, 420000, 420000, 420000, 420000, 240000, 240000]
    },
    'BP': {
      name: 'BP',
      prepTime: 900000,
      speeches: ['PM', 'LO', 'DPM', 'DLO', 'GM', 'OM', 'GW', 'OW'],
      speechesTime: [420000, 420000, 420000, 420000, 420000, 420000, 420000, 420000]
    },
    'WSDC': {
      name: 'WSDC',
      prepTie: 1800000,
      speeches: ['PM', 'LO', 'DPM', 'DLO', 'GW', 'OW', 'OR', 'GR'],
      speechesTime: [480000, 480000, 480000, 480000, 480000, 480000, 240000, 240000]
    }
  };

  // remember to translate to VNMese
  keyTranslator = {
    'PM': 'Prime Minister',
    'LO': 'Leader of Opposition',
    'DPM': 'Deputy Prime Minister',
    'DLO': 'Deputy Leader of Opposition',
    'GM': 'Goverment Member',
    'OM': 'Opposition Member',
    'GW': 'Government Whip',
    'OW': 'Opposition Whip',
    'GR': 'Government Reply',
    'OR': 'Opposition Reply'
  }

  // change when finalized
  currentFormat: Format = this.availableFormats['AP'];

  constructor() { }

  setFormat(newFormat: Format) {
    this.currentFormat = newFormat;
  }
}
