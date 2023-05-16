import Table from "../Table/Table";
import {
    structureWineClass,
    WineProp,
    generateRowsData,
} from "../../utils/helpers";

interface MeasureProps {
    wineProperty: string;
    wineData: WineProp[];
}

function Measure({ wineData, wineProperty }: MeasureProps) {
    const alocholStructedData = structureWineClass(wineData, wineProperty);
    const alcoholClass = Object.keys(alocholStructedData);

    const rows = generateRowsData({
        alcoholClass,
        alocholStructedData,
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
