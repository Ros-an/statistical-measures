import Table from './components/Table/Table';
import wineData from "./wine-data.json";
import { getMean, getMedian, getMode, structureWineClass } from './utils/helpers';

const App = () => {
  const wineProperty = "Flavanoids"
  const alocholStructedData = structureWineClass(wineData, wineProperty);

  console.log(alocholStructedData);
  // console.log("median", median([1, 4, 5, 2, 3, 8, 9]))
  // console.log(mode())
  const alcoholClass = Object.keys(alocholStructedData);
  const rows = [
    [`${wineProperty} Mean`, ...alcoholClass.map((item) => getMean(alocholStructedData[item].list).toFixed(3))],
    [`${wineProperty} Median`, ...alcoholClass.map((item) => getMedian(alocholStructedData[item].list))],
    [`${wineProperty} Mode`, ...alcoholClass.map((item) => getMode(alocholStructedData[item].list))],
  ];

  const columns = ["Measure", ...alcoholClass];

  return (
    <main className='main'>
      <h1>Table Flavanoids</h1>
      <Table rows={rows} columns={columns} />
    </main>
  );
};

export default App;
