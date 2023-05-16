import wineData from "./wine-data.json";
import Measure from "./components/Measure/Measure";
import { addGamma } from "./utils/helpers";
import { StatisticalMeasure } from "./interface/global";

const App = () => {
  const gammaAddedData = addGamma(wineData);
  const statisticalData: StatisticalMeasure[] = [
    {
      wineProperty: "Flavanoids",
      wineData,
    },
    {
      wineProperty: "Gamma",
      wineData: gammaAddedData,
    },
  ];

  return (
    <main>
      {statisticalData.map((item, ind) => (
        <Measure key={ind} wineProperty={item.wineProperty} wineData={item.wineData} />
      ))}
    </main>
  );
};

export default App;
