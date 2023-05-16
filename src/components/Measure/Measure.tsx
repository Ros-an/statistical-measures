import Table from "../Table/Table";
import { WineProp } from "../../interface/global";
import {
    getAlcoholDataByClass,
    generateRowsData,
} from "../../utils/helpers";

interface MeasureProps {
    wineProperty: string;
    wineData: WineProp[];
}

function Measure({ wineData, wineProperty }: MeasureProps) {
    const alocholDataByClass = getAlcoholDataByClass(wineData, wineProperty);
    const alcoholClass = Object.keys(alocholDataByClass);

    const rows = generateRowsData({
        alcoholClass,
        alocholDataByClass,
        wineProperty,
    });
    const columns = ["Measure", ...alcoholClass];

    return (
        <section className="measure">
            <h1>{`Table ${wineProperty}`}</h1>
            <Table rows={rows} columns={columns} />
        </section>
    );
}

export default Measure;
