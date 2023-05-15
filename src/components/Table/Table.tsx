import React from 'react';

const Table = ({ rows, columns }: any) => {
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
                        {rowData.map((cellData: any, cellIndex: any) => (
                            cellIndex > 0 && <td key={cellIndex}>{cellData}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
