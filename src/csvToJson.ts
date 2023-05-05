// src/csvToJson.ts
import * as fs from 'fs';
const csv = require('csv-parser');

export interface IperfData {
  timestamp: string;
  rtt: number;
  rttVar: number;
  latency: number;
  jitter: number;
  mtuSizing: number;
  bitErrorRate: number;
}


interface CsvRow {
    timestamp: string;
    rtt: string;
    rttVar: string;
    latency: string;
    jitter: string;
    mtuSizing: string;
    bitErrorRate: string;
  }
  

export const parseCSV = async (csvFilePath: string): Promise<IperfData[]> => {
  return new Promise((resolve, reject) => {
    const results: IperfData[] = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv({ separator: ',' }))
      .on('data', (data: CsvRow) => results.push({
        timestamp: data.timestamp,
        rtt: parseFloat(data.rtt),
        rttVar: parseFloat(data.rttVar),
        latency: parseFloat(data.latency),
        jitter: parseFloat(data.jitter),
        mtuSizing: parseFloat(data.mtuSizing),
        bitErrorRate: parseFloat(data.bitErrorRate)
      }))      
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};
