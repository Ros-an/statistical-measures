import React from 'react';
import Table from './components/Table/Table';
import wineData from "./wine-data.json";
import { getFrequency, mean, median, structureWineClass } from './utils/helpers';

const App = () => {
  const wineProperty = "Flavanoids"
  const alocholStructedData = structureWineClass(wineData, wineProperty);

  console.log(alocholStructedData);
  // console.log("median", median([1, 4, 5, 2, 3, 8, 9]))
  // console.log(mean(result[1].list))
  const alcoholClass = Object.keys(alocholStructedData);
  const rows = [
    [`${wineProperty} Mean`, ...alcoholClass.map((item) => mean(alocholStructedData[item].list).toFixed(3))],
    [`${wineProperty} Median`, ...alcoholClass.map((item) => median(alocholStructedData[item].list))],
    [`${wineProperty} Mode`, 'Bob', 'Johnson', 35],
  ];

  const columns = ["Measure", ...alcoholClass];

  return (
    <div>
      <h1>Table Flavanoids</h1>
      <Table rows={rows} columns={columns} />
    </div>
  );
};

export default App;
