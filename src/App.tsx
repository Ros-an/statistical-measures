import wineData from "./wine-data.json";
import Measure from './components/Measure/Measure';

const App = () => {

  const gammaAddedData = wineData.map((wineItem) => {
    const { Ash, Hue, Magnesium } = wineItem;
    const gamma = (Number(Ash) * Number(Hue)) / Number(Magnesium);
    return {
      ...wineItem,
      Gamma: Number(gamma.toFixed(2))
    }
  });


  return (
    <main>
      <Measure wineProperty={'Flavanoids'} wineData={wineData} />
      <Measure wineProperty={'Gamma'} wineData={gammaAddedData} />
    </main>
  );
};

export default App;
