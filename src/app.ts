// src/app.ts
import express from 'express';
import cors from 'cors';
import { parseCSV, IperfData } from './csvToJson';

const app = express();
const port = 3000;

app.use(cors());

// Replace 'data.csv' with the path to your CSV file
const csvFilePath = 'data.csv';
let iperfData: IperfData[] = [];

parseCSV(csvFilePath)
  .then((data) => {
    iperfData = data;
    console.log('CSV data loaded');
  })
  .catch((error) => {
    console.error('Error loading CSV data:', error);
  });

app.get('/iperf-data', (req, res) => {
  res.json(iperfData);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
