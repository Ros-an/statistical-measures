import React from "react";

interface TableProps {
    rows: string[][];
    columns: string[];
}
/**
 * 
 * @param accepts an object with property 
 * 1. rows : array of arrays, where 1st array contain mean value , 2nd array contains median value, and 3rd array contains mode of each Alcohol class for a property.
 * 2. columns: field name 'Measure' and Alochol class
 * 
 * @returns table
 */
const Table = ({ rows, columns }: TableProps) => {
    return (
        <table style={{ width: "80%" }}>
            <thead>
                <tr>
                    {columns.map((column: any, index: any) => (
                        <th key={index}>{index > 0 ? `Alochol ${column}` : column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((rowData: any, rowIndex: any) => (
                    <tr key={rowIndex}>
                        <th>{rowData[0]}</th>
                        {rowData.map(
                            (cellData: any, cellIndex: any) =>
                                cellIndex > 0 && <td key={cellIndex}>{cellData}</td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
