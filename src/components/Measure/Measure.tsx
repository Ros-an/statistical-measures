import React from "react";
import Table from "../Table/Table";
import {
    structureWineClass,
    getMean,
    getMedian,
    getMode,
    WineProp,
} from "../../utils/helpers";

interface MeasureProps {
    wineProperty: string;
    wineData: WineProp[];
}

function Measure({ wineData, wineProperty }: MeasureProps) {
    const alocholStructedData = structureWineClass(wineData, wineProperty);

    const alcoholClass = Object.keys(alocholStructedData);

    const rows = [
        [
            `${wineProperty} Mean`,
            ...alcoholClass.map((item) =>
                getMean(alocholStructedData[item].list).toFixed(3)
            ),
        ],
        [
            `${wineProperty} Median`,
            ...alcoholClass.map((item) =>
                getMedian(alocholStructedData[item].list).toFixed(3)
            ),
        ],
        [
            `${wineProperty} Mode`,
            ...alcoholClass.map((item) => getMode(alocholStructedData[item].list)),
        ],
    ];

    const columns = ["Measure", ...alcoholClass];
    return (
        <section className="measure">
            <h1>{`Table ${wineProperty}`}</h1>
            <Table rows={rows} columns={columns} />
        </section>
    );
}

export default Measure;
